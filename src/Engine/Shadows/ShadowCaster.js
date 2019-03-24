'use strict';

function ShadowCaster(shadowCaster, shadowReceiver) {
  this.mShadowCaster = shadowCaster;
  this.mShadowReceiver = shadowReceiver;
  this.mCasterShader = gEngine.DefaultResources.getShadowCasterShader();
  this.mShadowColor = [0, 0, 0, 0.2];
  this.mSaveXform = new Transform();

  this.kCasterMaxScale = 3;
  this.kVerySmall = 0.001;
  this.kDistanceFudge = 0.01;
  this.kReceiverDistanceFudge = 0.6;
}

ShadowCaster.prototype.setShadowColor = function (c) { this.mShadowColor = c; };

/*
* FIXME:
* The bug HAS to be here.
* it's the common denominator of the shadow transforms
*/
ShadowCaster.prototype._computeShadowGeometry = function (aLight) {
  // region 1: var init
  let cxf = this.mShadowCaster.getXform();
  let rxf = this.mShadowReceiver.getXform();

  // creates default vals for each var
  let
    lgtToCaster = vec3.create(),
    lgtToReceiverZ,
    receiverToCasterZ,
    distToCaster, distToReceiver,
    scale,
    offset = vec3.fromValues(0, 0, 0);

  receiverToCasterZ = rxf.getZPos() - cxf.getZPos();

  if (aLight.getLightType() === Light.eLightType.eDirectionalLight) {
    // region 2: parallel projection based on the directional light
    if (((Math.abs(aLight.getDirection())[2]) < this.kVerySmall)
      || ((receiverToCasterZ * (aLight.getDirection())[2]) < 0)
    ) {
      return false;
    }

    vec3.copy(lgtToCaster, aLight.getDirection());
    vec3.normalize(lgtToCaster, lgtToCaster);

    distToReceiver = Math.abs(receiverToCasterZ / lgtToCaster[2]);
    scale = Math.abs(1 / lgtToCaster[2]);
  } else {
    // region 3: projection from a point
    vec3.sub(lgtToCaster, cxf.get3DPosition(), aLight.getPosition());
    lgtToReceiverZ = rxf.getZPos() - (aLight.getPosition())[2];

    if ((lgtToReceiverZ * lgtToCaster[2]) < 0) return false;

    if ((Math.abs(lgtToReceiverZ) < this.kVerySmall)
      || ((Math.abs(lgtToCaster[2]) < this.kVerySmall))
    ) {
      return false;
    }


    distToCaster = vec3.length(lgtToCaster);
    vec3.scale(lgtToCaster, lgtToCaster, 1 / distToCaster);

    distToReceiver = Math.abs(receiverToCasterZ / lgtToCaster[2]);
    scale = (distToCaster + (distToReceiver * this.kReceiverDistanceFudge)) / distToCaster;
  }
  vec3.scaleAndAdd(offset, cxf.get3DPosition(), lgtToCaster, distToReceiver + this.kDistanceFudge);

  //region 4: sets cxf transform
  cxf.setRotationInRad(cxf.getRotationInRad());
  cxf.setPosition(offset[0], offset[1]);
  cxf.setZPos(offset[2]);
  cxf.setWidth(cxf.getWidth() * scale);
  cxf.setHeight(cxf.getHeight() * scale);

  return true;
};

ShadowCaster.prototype.draw = function (aCamera) {
  var casterRenderable = this.mShadowCaster.getRenderable();
  this.mShadowCaster.getXform().cloneTo(this.mSaveXform);
  var s = casterRenderable.swapShader(this.mCasterShader);
  var c = casterRenderable.getColor();
  casterRenderable.setColor(this.mShadowColor);
  var l, lgt;
  for (l = 0; l < casterRenderable.numLights(); l++) {
    lgt = casterRenderable.getLightAt(l);
    if (lgt.isLightOn() && lgt.isLightCastShadow()) {
      this.mSaveXform.cloneTo(this.mShadowCaster.getXform());
      if (this._computeShadowGeometry(lgt)) {
        this.mCasterShader.setLight(lgt);
        SpriteRenderable.prototype.draw.call(casterRenderable, aCamera);
      }
    }
  }
  this.mSaveXform.cloneTo(this.mShadowCaster.getXform());
  casterRenderable.swapShader(s);
  casterRenderable.setColor(c);
};
