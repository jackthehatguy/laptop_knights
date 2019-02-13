function IllumShader(vertexShaderPath, fragmentShaderPath) {
  LightShader.call(this, vertexShaderPath, fragmentShaderPath);

  var gl = gEngine.Core.getGL();

  this.mMaterial = null;
  this.mMaterialLoader = new ShaderMaterial(this.mCompiledShader);

  this.mCameraPos = null;
  this.mCameraPosRef = gl.getUniformLocation(this.mCompiledShader, 'uCameraPosition');

  this.mNormalSamplerRef = gl.getUniformLocation(this.mCompiledShader, 'uNormalSampler');
}
gEngine.Core.inheritPrototype(IllumShader, LightShader);

IllumShader.prototype.activateShader = function (pixelColor, aCamera) {
  LightShader.prototype.activateShader.call(this, pixelColor, aCamera);
  var gl = gEngine.Core.getGL();
  gl.uniform1i(this.mNormalSamplerRef, 1);
  this.mMaterialLoader.loadToShader(this.mMaterial);
  gl.uniform3fv(this.mCameraPosRef, this.mCameraPos);
};

IllumShader.prototype.setMaterialAndCameraPos = function (m, p) {
  this.mMaterial = m;
  this.mCameraPos = p;
};
