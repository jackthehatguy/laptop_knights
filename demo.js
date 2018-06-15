var canvas, context, controller, pierre, loop;

canvas = document.querySelector('canvas');

context = canvas.getContext('2d');

pierre = {
  x: canvas.width/2,
  x_vel: 0,
  y: canvas.height/2,
  y_vel: 0,
  spd: 10
}
pierre.sprite = new Image(227,501);
pierre.sprite.src = 'img/pierre2.png';

controller = {
  left: false,
  up: false,
  right: false,
  down: false,
  keyListener:function(e) {
    var key_state = (e.type == 'keydown');

    switch (e.keyCode) {
      case 37: case 65:
        controller.left = key_state;
        break;
      case 38: case 87:
        controller.up = key_state;
        break;
      case 39: case 68:
        controller.right = key_state;
        break;
      case 40: case 83:
        controller.down = key_state;
        break;
    }
  }
}

loop = function() {
  canvas.width = window.innerWidth - 30;
  canvas.height = window.innerHeight - 30;

  context.clearRect(0,0,canvas.width,canvas.height);

  if (controller.up) {
    // pierre.y_vel -= pierre.spd;
    pierre.y_vel = -pierre.spd;
  }
  if (controller.down) {
    // pierre.y_vel += pierre.spd;
    pierre.y_vel = pierre.spd;
  }
  if (controller.left) {
    // pierre.x_vel -= pierre.spd;
    pierre.x_vel = -pierre.spd;
  }
  if (controller.right) {
    // pierre.x_vel += pierre.spd;
    pierre.x_vel = pierre.spd;
  }

  if (pierre.x+pierre.sprite.width < 0) {
    pierre.x = canvas.width;
  }
  if (pierre.y+pierre.sprite.height < 0) {
    pierre.y = canvas.height;
  }
  if (pierre.x > canvas.width) {
    pierre.x = -pierre.sprite.width;
  }
  if (pierre.y > canvas.height) {
    pierre.y = -pierre.sprite.height;
  }

  pierre.x += pierre.x_vel;
  pierre.y += pierre.y_vel;
  pierre.x_vel *= 0.5;
  pierre.y_vel *= 0.5;

  context.drawImage(pierre.sprite, pierre.x, pierre.y);
  // context.stroke();

  window.requestAnimationFrame(loop);
}

window.addEventListener('keydown', controller.keyListener);
window.addEventListener('keyup', controller.keyListener);
window.requestAnimationFrame(loop);
