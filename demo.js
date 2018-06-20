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
pierre.sprite.src = 'img/dummy_pierre.png';
pierre.sprite.style.clip = 'rect(32px, 32px, 32px, 32px)';

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

loop = function() {
  context.clearRect(0,0,canvas.width,canvas.height);

  pierre.move(controller);

  context.drawImage(pierre.sprite, pierre.x, pierre.y);

  window.requestAnimationFrame(loop);
}

window.addEventListener('keydown', controller.keyListener);
window.addEventListener('keyup', controller.keyListener);
window.requestAnimationFrame(loop);
