function Minion(spriteTexture, normalMap, atX, atY, atZ = 2) {
  this.kDelta = (Math.trunc(Math.random() * 3) + 1) / 10;

  if (normalMap === null) {
    this.mMinion = new LightRenderable(spriteTexture);
  } else {
    this.mMinion = new IllumRenderable(spriteTexture, normalMap);
  }

  this.mMinion.setColor([1, 1, 1, 0]);
  this.mMinion.getXform().setPosition(atX, atY);
  this.mMinion.getXform().setZPos(atZ);
  this.mMinion.getXform().setSize(12, 9.6);
  this.mMinion.setSpriteSequence(
    512,  // top
    0,    // left
    204,  // width
    162,  // height
    5,    // number of elements
    0     // padding
  );
  this.mMinion.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
  this.mMinion.setAnimationSpeed(30 / (this.kDelta * 10));

  GameObject.call(this, this.mMinion);
}
gEngine.Core.inheritPrototype(Minion, GameObject);

Minion.prototype.update = function () {
  // remember to update animation
  this.mMinion.updateAnimation();

  var xform = this.getXform();
  xform.incXPosBy(-this.kDelta);

  if (xform.getXPos() < -5) {
    this.kDelta = (Math.trunc(Math.random() * 3) + 1) / 10;
    this.mMinion.setAnimationSpeed(30 / (this.kDelta * 10));
    xform.setXPos(105);
    xform.setYPos(63 * Math.random() + 6);
  }
};
