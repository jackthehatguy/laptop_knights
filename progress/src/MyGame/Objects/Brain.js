'use strict';

function Brain(spriteTexture) {
  this.kDeltaDegree = 1;
  this.kDeltaRad = Math.PI * this.kDeltaDegree / 180;
  this.kDeltaSpeed = 0.01;
  this.mBrain = new SpriteRenderable(spriteTexture);
  this.mBrain.setColor([1, 1, 1, 0]);
  this.mBrain.getXform().setPosition(50, 10);
  this.mBrain.getXform().setSize(3, 5.4);
  this.mBrain.setElementPixelPositions(600, 700, 0, 180);

  GameObject.call(this, this.mBrain);

  this.setSpeed(0.05);
}
gEngine.Core.inheritPrototype(Brain, GameObject);

Brain.prototype.update = function () {
  GameObject.prototype.update.call(this);

  var xf = this.getXform();
  var fdir = this.getCurrentFrontDir();

  let input = gEngine.Input;
  let keys = input.keys;
  if (input.isKeyPressed(keys.Left)) {
    xf.incRotationByDegree(this.kDeltaDegree);
    vec2.rotate(fdir, fdir, this.kDeltaRad);
  }
  if (input.isKeyPressed(keys.Right)) {
    xf.incRotationByRad(-this.kDeltaRad);
    vec2.rotate(fdir, fdir, -this.kDeltaRad);
  }
  if (input.isKeyClicked(keys.Up)) this.incSpeedBy(this.kDeltaSpeed);
  if (input.isKeyClicked(keys.Down)) this.incSpeedBy(-this.kDeltaSpeed);
};
