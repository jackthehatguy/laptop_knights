'use strict';

function Hero(spriteTexture) {
  this.kDelta = 0.3;
  this.mDye = new SpriteRenderable(spriteTexture);
  this.mDye.setColor([1, 1, 1, 0]);
  this.mDye.getXform().setPosition(35, 50);
  this.mDye.getXform().setSize(9, 12);
  this.mDye.setElementPixelPositions(0, 120, 0, 180);
  GameObject.call(this, this.mDye);
}
gEngine.Core.inheritPrototype(Hero, GameObject);

Hero.prototype.update = function () {
  var xform = this.getXform();
  if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)) xform.getYPos() > 80 ? xform.setYPos(-6) : xform.incYPosBy(this.kDelta);
  if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) xform.getYPos() < -6 ? xform.setYPos(80) : xform.incYPosBy(-this.kDelta);
  if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) xform.getXPos() < -5 ? xform.setXPos(105) : xform.incXPosBy(-this.kDelta);
  if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) xform.getXPos() > 105 ? xform.setXPos(-5) : xform.incXPosBy(this.kDelta);
  if (gEngine.Input.isKeyClicked(gEngine.Input.keys.F)) console.log(xform.getPosition());
  if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Esc)) gEngine.GameLoop.stop();
};
