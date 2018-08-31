function Minion(spriteTexture, atY) {
  this.kDelta = (Math.trunc(Math.random() * 3) + 1)/10;
  this.mMinion = new SpriteAnimateRenderable(spriteTexture);
  this.mMinion.setColor([1, 1, 1, 0]);
  this.mMinion.getXform().setPosition(Math.random() * 100, atY);
  this.mMinion.getXform().setSize(12, 9.6);
  this.mMinion.setSpriteSequence(512, 0, 204, 162, 5, 0);
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
    xform.setYPos(65 * Math.random());
  }
};
