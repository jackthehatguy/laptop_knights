var canvas, context, controller, pierre, loop;
const FRICTION = 0; // the closer the number is to zero, the higher the friction

canvas = document.querySelector('canvas');

context = canvas.getContext('2d');

function Solid(x, y, w, h) {
  this.x = x,
  this.y = y,
  this.width = w,
  this.height = h
}

pierre = {
  sprite: new Image(32,32),

  x: canvas.width/2,
  y: canvas.height/2,

  x_vel: 0,
  y_vel: 0,
  spd: 7,

  move: function(controller) {

    // moves Pierre according to controller input
    if (controller.up) pierre.y_vel = -pierre.spd;
    if (controller.down) pierre.y_vel = pierre.spd;
    if (controller.left) pierre.x_vel = -pierre.spd;
    if (controller.right) pierre.x_vel = pierre.spd;

    // makes sure that Pierre doesn't run off the side of the screen
    if (pierre.x+pierre.sprite.width < 0) pierre.x = canvas.width;
    if (pierre.y+pierre.sprite.height < 0) pierre.y = canvas.height;
    if (pierre.x > canvas.width) pierre.x = -pierre.sprite.width;
    if (pierre.y > canvas.height) pierre.y = -pierre.sprite.height;

    pierre.x += pierre.x_vel;
    pierre.y += pierre.y_vel;
    pierre.x_vel *= FRICTION;
    pierre.y_vel *= FRICTION;
  }
}
pierre.sprite.src = 'img/pierre_up.png';

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

var rate = 0;
var frame_x = 0;
var frame_y = 0;

loop = function() {
  context.clearRect(0,0,canvas.width,canvas.height);

  pierre.move(controller);

  context.drawImage(pierre.sprite, frame_x, frame_y, 32, 32, pierre.x, pierre.y, pierre.sprite.width, pierre.sprite.height);

  if (rate % 37 == 0) {
    console.log('rate: '+rate);
    switch (rate % 4) {
    case 0:
      frame_x = 0;
      frame_y = 0;
      console.log('case:',0);
      rate = 0;
      break;
    case 1:
      frame_x = 32;
      frame_y = 0;
      console.log('case:',1);
      break;
    case 2:
      frame_x = 64;
      frame_y = 0;
      console.log('case:',2);
      break;
    case 3:
      frame_x = 96;
      frame_y = 0;
      console.log('case:',3);
      break;
    }
  }
  rate += 1;

  window.requestAnimationFrame(loop);
}

window.addEventListener('keydown', controller.keyListener);
window.addEventListener('keyup', controller.keyListener);
window.requestAnimationFrame(loop);
