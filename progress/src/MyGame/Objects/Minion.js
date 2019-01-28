function Minion(spriteTexture, atY) {
  this.kDelta = (Math.trunc(Math.random() * 3) + 1)/10;
  this.mMinion = new LightRenderable(spriteTexture);
  this.mMinion.setColor([1, 1, 1, 0]);
  this.mMinion.getXform().setPosition(Math.random() * 100, atY);
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
  this.mMinion.setAnimationSpeed(30/(this.kDelta*10));
  
  GameObject.call(this, this.mMinion);
}
gEngine.Core.inheritPrototype(Minion, GameObject);

Minion.prototype.update = function () {
  // remember to update animation
  this.mMinion.updateAnimation();

  var xform = this.getXform();
  xform.incXPosBy(-this.kDelta);

  if (xform.getXPos() < -5) {
    this.kDelta = (Math.trunc(Math.random() * 3) + 1)/10;
    this.mMinion.setAnimationSpeed(30/(this.kDelta*10));
    xform.setXPos(105);
    xform.setYPos(63 * Math.random() + 6);
  }
};
