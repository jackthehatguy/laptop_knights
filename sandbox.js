var canvas = document.getElementById('game');
canvas.width = 640;
canvas.height = 480;
var c = canvas.getContext('2d');
const FRICTION = 0; //what has Jack done now?? daijoubu desuyo!

//==============================================================================

controller = {
  left: false,
  up: false,
  right: false,
  down: false,
  keyListener: function(e) {
    // console.log('e',e);
    var key_state = (e.type == 'keydown');

    switch (e.keyCode) {
      case 37: case 65: // kb.left & a
        controller.left = key_state;
        break;
      case 38: case 87: // kb.up & w
        controller.up = key_state;
        break;
      case 39: case 68: // kb.right & d
        controller.right = key_state;
        break;
      case 40: case 83: // kb.down & s
        controller.down = key_state;
        break;
    }
  }
}

//==============================================================================
function Actor(x, y, sprite_deck, box) {
  this.x = x;
  this.y = y;

  this.sprite_deck = sprite_deck;
  this.collision = box;

  this.spd = 2;
  this.x_vel = 0;
  this.y_vel = 0;

  this.hp = 0;
  this.sp = 0;

  this.status_fx = null;
  this.position = 3;
}

Actor.prototype.move = function (controller) {
  // console.log(controller);
  // this code is Jack's fault, lol; don't worry about it, Spencer will fix it
  if(controller.left) {
    this.x_vel = -this.spd;
    this.sprite_deck.trade(this.sprite_deck.walk_left);
    this.position = 0;
  }
  if (controller.up) {
    this.y_vel = -this.spd;
    this.sprite_deck.trade(this.sprite_deck.walk_up);
    this.position = 1;
  }
  if (controller.right) {
    this.x_vel = this.spd;
    this.sprite_deck.trade(this.sprite_deck.walk_right);
    this.position = 2;
  }
  if (controller.down) {
    this.y_vel = this.spd;
    this.sprite_deck.trade(this.sprite_deck.walk_down);
    this.position = 3;
  }
  if (!controller.left && !controller.up && !controller.right && !controller.down) {
    this.x_vel = 0;
    this.y_vel = 0;
    switch (this.position) {
      case 0:
        this.sprite_deck.trade(this.sprite_deck.idle_left);
        break;
      case 1:
        this.sprite_deck.trade(this.sprite_deck.idle_up);
        break;
      case 2:
        this.sprite_deck.trade(this.sprite_deck.idle_right);
        break;
      case 3:
        this.sprite_deck.trade(this.sprite_deck.idle_down);
        break;
    }
  }

  this.x += this.x_vel;
  this.y += this.y_vel;
  this.collision.x += this.x_vel;
  this.collision.y += this.y_vel;
  this.x_vel *= FRICTION;
  this.y_vel *= FRICTION;
};

Actor.prototype.render = function () {
  this.sprite_deck.update();
  this.collision.draw();
  this.sprite_deck.draw(this.x, this.y);
};

//==============================================================================

function Box(x, y, width, height, display) {
  this.sprite = new Image(width, height);
  this.sprite.src = 'img/collide.png';
  this.display = display;

  this.x = x,
  this.y = y,

  this.width = width,
  this.height = height
}

Box.prototype.overlaps = function (box) {
  if (
      (this.x >= box.x && this.x <= box.x+box.width)
      &&
      (this.y >= box.y && this.y <= box.y+box.height)
    ||
      (this.x+this.width >= box.x && this.x+this.width <= box.x+box.width)
      &&
      (this.y+this.height >= box.y && this.y+this.height <= box.y+box.height)
  ) {
    return true;;
  }
  return false;
};

Box.prototype.draw = function () {
  if (this.display) {
    // c.drawImage(this.sprite, this.x, this.y);
    c.drawImage(this.sprite, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
  }
}

//==============================================================================

function SpriteDeck() {
  this.cur_anim = null;
}

/**
* moves the current anim to the next frame if possible
*/
SpriteDeck.prototype.update = function () {
  return this.cur_anim.update();
};

SpriteDeck.prototype.trade = function (animation) {
  this.cur_anim = animation;
  // this.cur_anim.cur_frame = 0;
  // this.cur_anim.tick = 0;
};

SpriteDeck.prototype.draw = function (x, y) {
  this.cur_anim.draw(x, y);
};

//==============================================================================

function Animation(width, height, src, num_frames, delay) {
  this.width = width;
  this.height = height;

  this.frames = new Image(width, height);
  this.frames.src = src;
  this.num_frames = num_frames;
  this.delay = delay; // the number of ticks that must pass before the next frame is shown
  this.tick = 0;
  this.cur_frame = 0;
}

Animation.prototype.update = function () {
  if (this.tick++ >= this.delay) {
    this.tick = 0;
    this.cur_frame++;
    if (this.cur_frame >= this.num_frames) {
      this.cur_frame = 0;
      return 1;
    }
    return 0;
  }
  return -1;
};

Animation.prototype.draw = function (x, y) {
  // c.clearRect(
  //   x,
  //   y,
  //   this.frames.width,
  //   this.frames.height
  // );
  c.drawImage(
    this.frames,
    this.cur_frame * this.width,
    0,
    this.width,
    this.height,
    x,
    y,
    this.width,
    this.height
  );
};

//==============================================================================

pierre = new Actor(canvas.width/2, canvas.height/2, new SpriteDeck(), new Box(canvas.width/2+2, canvas.height/2+20, 27, 12, true));
pierre.sprite_deck.walk_left = new Animation(32, 32, 'img/pierre_left.png', 4, 10);
pierre.sprite_deck.walk_up = new Animation(32, 32, 'img/pierre_walk_up.png', 4, 10);
pierre.sprite_deck.walk_right = new Animation(32, 32, 'img/pierre_right.png', 4, 10);
pierre.sprite_deck.walk_down = new Animation(32, 32, 'img/pierre_down.png', 4, 10);

pierre.sprite_deck.idle_left = new Animation(32, 32, 'img/pierre_idle_left.png', 1, 0);
pierre.sprite_deck.idle_up = new Animation(32, 32, 'img/pierre_idle_up.png', 1, 0);
pierre.sprite_deck.idle_right = new Animation(32, 32, 'img/pierre_idle_right.png', 1, 0);
pierre.sprite_deck.idle_down = new Animation(32, 32, 'img/pierre_idle_down.png', 1, 0);

pierre.sprite_deck.cur_anim = pierre.sprite_deck.walk_down;

var bg = new Image(640,480);
bg.src = 'img/Tabletop Knights Cover.jpg';

function loop() {
  c.clearRect(0,0,640,480);
  c.drawImage(bg, 0, 0, 1200, 1800, 0, 0, canvas.width, canvas.height);
  pierre.move(controller);
  pierre.render();
  requestAnimationFrame(loop);
}

window.addEventListener('keydown', controller.keyListener);
window.addEventListener('keyup', controller.keyListener);
window.requestAnimationFrame(loop);
