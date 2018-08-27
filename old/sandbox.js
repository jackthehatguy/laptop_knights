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
function Actor(x, y, sprite_deck) {
  this.x = x;
  this.y = y;

  this.sprite_deck = sprite_deck;

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
  c.drawImage(
    this.frames,                  // the image
    this.cur_frame * this.width,  // x_start
    0,                            // y_start
    this.width,                   // x_end
    this.height,                  // y_end
    x,                            // where to draw hori
    y,                            // where to draw vert
    this.width,                   // size
    this.height                   // size
  );
};

//==============================================================================
// engine
pierre = new Actor(canvas.width/2, canvas.height/2, new SpriteDeck());
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

function loop() {
  c.clearRect(0,0,canvas.width,canvas.height);
  pierre.move(controller);
  pierre.render();
  requestAnimationFrame(loop);
}

window.addEventListener('keydown', controller.keyListener);
window.addEventListener('keyup', controller.keyListener);
window.requestAnimationFrame(loop);

//==============================================================================

function drawSpotlight(x, y, r) {
  c.beginPath();
  c.fillStyle = "rgba(255,255,255,0.15)";
  c.arc(x, y, r, 0, 2*Math.PI, false);
  c.fill();
  c.closePath();
}

//==============================================================================

/**
 * generates an array of num length filled with random letters
 * @param  {Number} num   the number of randomized letters in the array
 * @return {String Array} the resulting filled array
 */
function genRandLetters(num) {
  let in_set = 'qwertyuiopasdfghjklzxcvbnm';
  let out_set = [];
  for (var i = 0; i < num; i++) { out_set.push(in_set.charAt(Math.floor(Math.random()*in_set.length))); }
  return out_set;
}

//==============================================================================
