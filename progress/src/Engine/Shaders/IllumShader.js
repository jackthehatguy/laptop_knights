function IllumShader(vertexShaderPath, fragmentShaderPath) {
  LightShader.call(this, vertexShaderPath, fragmentShaderPath);

  var gl = gEngine.Core.getGL();
  this.mNormalSamplerRef = gl.getUniformLocation(this.mCompiledShader, 'uNormalSampler');
}
gEngine.Core.inheritPrototype(IllumShader, LightShader);

IllumShader.prototype.activateShader = function (pixelColor, aCamera) {
  LightShader.prototype.activateShader.call(this, pixelColor, aCamera);
  var gl = gEngine.Core.getGL();
  gl.uniform1i(this.mNormalSamplerRef, 1);
};
