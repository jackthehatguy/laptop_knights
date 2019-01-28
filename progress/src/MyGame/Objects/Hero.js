'use strict';

function Hero(spriteTexture) {
  this.kDelta = 0.3;
  this.mDye = new LightRenderable(spriteTexture);
  this.mDye.setColor([1, 1, 1, 0]);
  this.mDye.getXform().setPosition(35, 50);
  this.mDye.getXform().setSize(9, 12);
  this.mDye.setElementPixelPositions(0, 120, 0, 180);
  GameObject.call(this, this.mDye);
}
gEngine.Core.inheritPrototype(Hero, GameObject);

Hero.prototype.update = function () {
  var xform = this.getXform();

  let input = gEngine.Input;
  let pressed = input.isKeyPressed;
  let clicked = input.isKeyClicked;
  let keys = input.keys;

  if (pressed(keys.W)) xform.incYPosBy(this.kDelta);
  if (pressed(keys.S)) xform.incYPosBy(-this.kDelta);
  if (pressed(keys.A)) xform.incXPosBy(-this.kDelta);
  if (pressed(keys.D)) xform.incXPosBy(this.kDelta);
  if (clicked(keys.F)) console.log(xform.getPosition());
};
