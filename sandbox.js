var canvas = document.getElementById('game');
canvas.width = 640;
canvas.height = 480;
var c = canvas.getContext('2d');

//==============================================================================
function Actor(x, y, sprite_deck) {
  this.x = x;
  this.y = y;

  this.sprite_deck = sprite_deck;

  this.spd = 7;

  this.hp = 0;
  this.sp = 0;

  this.status_fx = null;
}

Actor.prototype.move = function () {

};

Actor.prototype.render = function () {
  this.sprite_deck.update();
  this.sprite_deck.draw(this.x, this.y);
};

//==============================================================================

function Box(x, y, width, height) {
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
  this.cur_anim.cur_frame = 0;
  this.cur_anim.tick = 0;
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
  c.clearRect(
    x,
    y,
    this.frames.width,
    this.frames.height
  );
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

controller = {
  left: false,
  up: false,
  right: false,
  down: false,
  keyListener: function(e) {
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

pierre = new Actor(canvas.width/2, canvas.height/2, new SpriteDeck());
pierre.sprite_deck.walk_left = new Animation(32, 32, 'img/pierre_left.png', 4, 10);
pierre.sprite_deck.walk_up = new Animation(32, 32, 'img/pierre_up.png', 4, 10);
pierre.sprite_deck.walk_right = new Animation(32, 32, 'img/pierre_right.png', 4, 10);
pierre.sprite_deck.walk_down = new Animation(32, 32, 'img/pierre_down.png', 4, 10);
pierre.sprite_deck.cur_anim = pierre.sprite_deck.walk_down;

window.onload = function loop() {
  pierre.render();
  requestAnimationFrame(loop);
}
