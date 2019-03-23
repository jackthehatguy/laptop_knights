function ShaderLightAtIndex(shader, index) {
  this._setShaderReferences(shader, index);
}

ShaderLightAtIndex.prototype._setShaderReferences = function (aLightShader, index) {
  var gl = gEngine.Core.getGL();

  // Spencer added this bc he was tired of looking at all of the typing
  let gul = attribute => gl.getUniformLocation(aLightShader, `uLights[${index}].${attribute}`);

  this.mColorRef = gul('Color');
  this.mPosRef = gul('Position');
  this.mDirRef = gul('Direction');
  this.mNearRef = gul('Near');
  this.mFarRef = gul('Far');
  this.mInnerRef = gul('CosInner');
  this.mOuterRef = gul('CosOuter');
  this.mIntensityRef = gul('Intensity');
  this.mDropOffRef = gul('DropOff');
  this.mIsOnRef = gul('IsOn');
  this.mLightTypeRef = gul('LightType');
};

ShaderLightAtIndex.prototype.loadToShader = function (aCamera, aLight) {
  var gl = gEngine.Core.getGL();

  gl.uniform1i(this.mIsOnRef, aLight.isLightOn());
  if (aLight.isLightOn()) {
    var
      p = aCamera.wcPosToPixel(aLight.getPosition()),
      n = aCamera.wcSizeToPixel(aLight.getNear()),
      f = aCamera.wcSizeToPixel(aLight.getFar()),
      c = aLight.getColor();
    gl.uniform4fv(this.mColorRef, c);
    gl.uniform3fv(this.mPosRef, vec3.fromValues(p[0], p[1], p[2]));
    gl.uniform1f(this.mNearRef, n);
    gl.uniform1f(this.mFarRef, f);
    gl.uniform1f(this.mInnerRef, 0.0);
    gl.uniform1f(this.mOuterRef, 0.0);
    gl.uniform1f(this.mIntensityRef, aLight.getIntensity());
    gl.uniform1f(this.mDropOffRef, 0);
    gl.uniform1i(this.mLightTypeRef, aLight.getLightType());

    if (aLight.getLightType() === Light.eLightType.ePointLight) {
      gl.uniform3fv(this.mDirRef, vec3.fromValues(0, 0, 0));
    } else {
      var d = aCamera.wcDirToPixel(aLight.getDirection());
      gl.uniform3fv(this.mDirRef, vec3.fromValues(d[0], d[1], d[2]));
      if (aLight.getLightType() === Light.eLightType.eSpotLight) {
        gl.uniform1f(this.mInnerRef, Math.cos(0.5 * aLight.getInner()));
        gl.uniform1f(this.mOuterRef, Math.cos(0.5 * aLight.getOuter()));
        gl.uniform1f(this.mDropOffRef, aLight.getDropOff());
      }
    }
  }
};

// why do they have me switching it only one way?
// why not make it a toggle?
ShaderLightAtIndex.prototype.switchOffLight = function () {
  var gl = gEngine.Core.getGL();
  gl.uniform1f(this.mIsOnRef, false);
}