/* thinking about the code
need:
  canvas & context (to draw the whole thing)
  loop
  event listeners
  controller
  characters (NPCs and actors [PCs])
  menus
  views
  items
  layering system ?will we have specific layers for specific instance groups?
  ?instances (doors, rocks, etc)

controller possibilities:
  wasd &| directional keys &| gamepad?
  free-movement || grid-based
instance possibilities:
  all charaters are of prototype instance
  are separate from characters
views:
  open-world || AC[DnM](NGC) || SMB
*/

// canvas
var canvas = document.getElementById('game');
canvas.width = 640;
canvas.height = 480;
var c = canvas.getContext('2d');

//==============================================================================
// controller
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
// actor
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
};

Actor.prototype.render = function () {
  this.sprite_deck.update();
  this.collision.draw();
  this.sprite_deck.draw(this.x, this.y);
};

//==============================================================================
// Sprite Deck
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
// Animation
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
// engine
pierre = new Actor(canvas.width/2, canvas.height/2, new SpriteDeck(), new Box(canvas.width/2+2, canvas.height/2+20, 27, 12, true));
pierre.sprite_deck.walk_left = new Animation(32, 32, 'img/pierre/pierre_walk_left.png', 4, 10);
pierre.sprite_deck.walk_up = new Animation(32, 32, 'img/pierre/pierre_walk_up.png', 4, 10);
pierre.sprite_deck.walk_right = new Animation(32, 32, 'img/pierre/pierre_walk_right.png', 4, 10);
pierre.sprite_deck.walk_down = new Animation(32, 32, 'img/pierre/pierre_walk_down.png', 4, 10);

pierre.sprite_deck.idle_left = new Animation(32, 32, 'img/pierre/pierre_idle_left.png', 1, 0);
pierre.sprite_deck.idle_up = new Animation(32, 32, 'img/pierre/pierre_idle_up.png', 1, 0);
pierre.sprite_deck.idle_right = new Animation(32, 32, 'img/pierre/pierre_idle_right.png', 1, 0);
pierre.sprite_deck.idle_down = new Animation(32, 32, 'img/pierre/pierre_idle_down.png', 1, 0);

pierre.sprite_deck.cur_anim = pierre.sprite_deck.idle_down;

var bg = new Image(640,480);
bg.src = 'img/Tabletop Knights Cover.jpg';

function loop() {
  canvas.width = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) - 17;
  canvas.height = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - 17;
  c.clearRect(0,0,canvas.width,canvas.height);
  c.drawImage(bg, 0, 0, 1200, 1800, 0, 0, canvas.width, canvas.height);
  pierre.move(controller);
  pierre.render();
  requestAnimationFrame(loop);
}

window.addEventListener('keydown', controller.keyListener);
window.addEventListener('keyup', controller.keyListener);
window.requestAnimationFrame(loop);
