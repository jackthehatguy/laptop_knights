'use strict';

function Hero(spriteTexture, normalMap, atX, atY) {
  this.kDelta = 0.3;
  if (normalMap !== null) {
    this.mDye = new IllumRenderable(spriteTexture, normalMap);
  } else {
    this.mDye = new LightRenderable(spriteTexture);
  }
  this.mDye.setColor([1, 1, 1, 0]);
  this.mDye.getXform().setPosition(atX, atY);
  this.mDye.getXform().setSize(18, 24);
  this.mDye.setElementPixelPositions(0, 120, 0, 180);
  GameObject.call(this, this.mDye);
}
gEngine.Core.inheritPrototype(Hero, GameObject);

Hero.prototype.update = function () {
  var xform = this.getXform();

  let
    input = gEngine.Input,
    pressed = input.isKeyPressed,
    clicked = input.isKeyClicked,
    keys = input.keys;

  if (pressed(keys.W)) xform.incYPosBy(this.kDelta);
  if (pressed(keys.S)) xform.incYPosBy(-this.kDelta);
  if (pressed(keys.A)) xform.incXPosBy(-this.kDelta);
  if (pressed(keys.D)) xform.incXPosBy(this.kDelta);
  if (clicked(keys.F)) {
    let coords = xform.getPosition();
    console.log({x: coords[0], y: coords[1]});
  }
};
