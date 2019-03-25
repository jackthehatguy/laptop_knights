'use strict';

function ShadowReceiver(theReceiverObject) {
  this.kShadowStencilBit = 0x01;
  this.kShadowStencilMask = 0xFF;
  this.mReceiverShader = gEngine.DefaultResources.getShadowReceiverShader();

  this.mReceiver = theReceiverObject;

  this.mShadowCaster = [];
}

// why isn't this a one-liner?
ShadowReceiver.prototype.addShadowCaster = function (lgtRenderable) {
  var c = new ShadowCaster(lgtRenderable, this.mReceiver);
  this.mShadowCaster.push(c);
};

ShadowReceiver.prototype.draw = function (aCamera) {
  // A: draw receiver as a regular renderable
  this.mReceiver.draw(aCamera);

  // B
  this._shadowReceiverStencilOn();
  var s = this.mReceiver.getRenderable().swapShader(this.mReceiverShader);
  this.mReceiver.draw(aCamera);
  this.mReceiver.getRenderable().swapShader(s);
  this._shadowReceiverStencilOff();

  // C & D: draw shadow on correct locations
  for (let c = 0; c < this.mShadowCaster.length; c++) this.mShadowCaster[c].draw(aCamera);

  this._shadowReceiverStencilDisable();
};