'use strict';

function TextureShader(vertexShaderPath, fragmentShaderPath) {
  // call super class constructor
  SimpleShader.call(this, vertexShaderPath, fragmentShaderPath);

  // ref to aTextureCoordinate within shader
  this.mShaderTextureCoordAttribute = null;
  this.mSamplerRef = null;

  // get ref of texCoord
  var gl = gEngine.Core.getGL();
  this.mSamplerRef = gl.getUniformLocation(this.mCompiledShader, 'uSampler');
  this.mShaderTextureCoordAttribute = gl.getAttribLocation(this.mCompiledShader, 'aTextureCoordinate');
}
gEngine.Core.inheritPrototype(TextureShader, SimpleShader);

TextureShader.prototype.activateShader = function (pixelColor, vpMatrix) {
  SimpleShader.prototype.activateShader.call(this, pixelColor, vpMatrix);

  // enable texture coord array
  var gl = gEngine.Core.getGL();
  gl.bindBuffer(gl.ARRAY_BUFFER, gEngine.VertexBuffer.getGLTexCoordRef());
  gl.enableVertexAttribArray(this.mShaderTextureCoordAttribute);
  gl.vertexAttribPointer(this.mShaderTextureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
  gl.uniform1i(this.mSamplerRef, 0);
};
