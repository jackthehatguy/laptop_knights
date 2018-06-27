function Actor() {
  this.x = -1;
  this.y = -1;

  this.sprite_sheet = null;

  this.spd = 7;

  this.hp = 0;
  this.sp = 0;

  this.status_fx = null;
}

Actor.prototype.move = function () {

};

Actor.prototype.render = function () {
  this.sprite_sheet.render(this.x, this.y)
};

Actor.prototype.update = function () {
  this.sprite_sheet.update();
};

//==============================================================================

function SpriteDeck(idle_animation) {
  this.idle_animation = idle_animation;

  this.cur_animation = this.idle_animation;
}

SpriteDeck.prototype.update = function () {
  return this.cur_animation.update();
};

SpriteDeck.prototype.switch_animation = function (animation) {
  this.cur_animation = animation;
  this.cur_animation.cur_frame = 0;
};

SpriteDeck.prototype.render = function (x, y) {

};

//==============================================================================

function Animation(width, height, src, num_frames, spd) {
  this.frames = new Image(width, height);
  this.frames.src = src;
  this.num_frames = num_frames;
  this.spd = spd; // the number of ticks that must pass before the next frame is shown
  this.tick = 0;
}

Animation.prototype.update = function () {
  if (this.tick++ >= this.spd) {
    this.tick = 0;
    this.cur_frame++;
    if (this.cur_frame >= this.frames.length) {
      this.cur_frame = 0;
      return 1;
    }
    return 0;
  }
  return -1;
};

Animation.prototype.render = function (x, y) {

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
