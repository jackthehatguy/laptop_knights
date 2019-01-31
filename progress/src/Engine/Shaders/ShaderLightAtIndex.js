function ShaderLightAtIndex(shader, index) {
  this._setShaderReferences(shader, index);
}

ShaderLightAtIndex.prototype._setShaderReferences = function (aLightShader, index) {
  var gl = gEngine.Core.getGL();

  this.mColorRef = gl.getUniformLocation(aLightShader, `uLights[${index}].Color`);
  this.mPosRef = gl.getUniformLocation(aLightShader, `uLights[${index}].Position`);
  this.mNearRef = gl.getUniformLocation(aLightShader, `uLights[${index}].Near`);
  this.mFarRef = gl.getUniformLocation(aLightShader, `uLights[${index}].Far`);
  this.mIntensityRef = gl.getUniformLocation(aLightShader, `uLights[${index}].Intensity`);
  this.mIsOnRef = gl.getUniformLocation(aLightShader, `uLights[${index}].IsOn`);
};

ShaderLightAtIndex.prototype.loadToShader = function (aCamera, aLight) {
  var gl = gEngine.Core.getGL();

  gl.uniform1i(this.mIsOnRef, aLight.isLightOn());
  if (aLight.isLightOn()) {
    var
      p = aCamera.wcPosToPixel(aLight.getPosition()),
      ic = aCamera.wcSizeToPixel(aLight.getNear()),
      oc = aCamera.wcSizeToPixel(aLight.getFar()),
      c = aLight.getColor();
    gl.uniform4fv(this.mColorRef, c);
    gl.uniform3fv(this.mPosRef, vec3.fromValues(p[0], p[1], p[2]));
    gl.uniform1f(this.mNearRef, ic);
    gl.uniform1f(this.mFarRef, oc);
    gl.uniform1f(this.mIntensityRef, aLight.getIntensity());
  }
};

// why do they have me swithing it only one way?
// why not make it a toggle?
ShaderLightAtIndex.prototype.switchOffLight = function () {
  var gl = gEngine.Core.getGL();
  gl.uniform1f(this.mIsOnRef, false);
}