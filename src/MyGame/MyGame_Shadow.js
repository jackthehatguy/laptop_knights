'use strict';

MyGame.prototype._setupShadow = function () {
  this.mBgShadow = new ShadowReceiver(this.mBg);
  this.mBgShadow.addShadowCaster(this.mIllumHero);
  this.mBgShadow.addShadowCaster(this.mIllumMinion);
  this.mBgShadow.addShadowCaster(this.mLgtMinion);

  this.mMinionShadow = new ShadowReceiver(this.mIllumMinion);
  this.mMinionShadow.addShadowCaster(this.mIllumHero);
  this.mMinionShadow.addShadowCaster(this.mLgtMinion);

  this.mLgtMinionShadow = new ShadowReceiver(this.mLgtMinion);
  this.mLgtMinionShadow.addShadowCaster(this.mIllumHero);
}