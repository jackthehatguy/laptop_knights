'use strict';

function SimpleShader(vertexShaderPath, fragmentShaderPath) {
  this.mCompiledShader = null;
  this.mShaderVertexPositionAttribute = null;
  this.mPixelColor = null;                      // in SimpleFS
  this.mModelTransform = null;
  this.mViewProjTransform = null;

  this.mGlobalAmbientColor = null;
  this.mGlobalAmbientIntensity = null;

  var gl = gEngine.Core.getGL();

  //-----start constructor------------------------------------------------------

  // 0: load and compile vert & frag shaders
  this.mVertexShader = this._compileShader(vertexShaderPath, gl.VERTEX_SHADER);
  this.mFragmentShader = this._compileShader(fragmentShaderPath, gl.FRAGMENT_SHADER);

  // 1: create and link shaders
  this.mCompiledShader = gl.createProgram();
  gl.attachShader(this.mCompiledShader, this.mVertexShader);
  gl.attachShader(this.mCompiledShader, this.mFragmentShader);
  gl.linkProgram(this.mCompiledShader);

  // 2: check for error
  if (!gl.getProgramParameter(this.mCompiledShader, gl.LINK_STATUS)) {
    console.error('Error linking shader!');
    return null;
  }

  // 3: get ref: aSquareVertexPosition attr
  this.mShaderVertexPositionAttribute = gl.getAttribLocation(this.mCompiledShader, 'aSquareVertexPosition');

  // 4: activate vert buff :: Engine.Core_VertexBuffer
  gl.bindBuffer(gl.ARRAY_BUFFER, gEngine.VertexBuffer.getGLVertexRef());

  // 5: desc characteristic vert pos attr
  gl.vertexAttribPointer(
    this.mShaderVertexPositionAttribute,
    3,          // each element is a 3-float
    gl.FLOAT,   // data type is FLOAT
    false,      // if content is normalized vectors
    0,          // number of bytes to skip between elements
    0           // offsets to the first element
  );

  // 6: get ref: uPixelColor in SimpleFS
  this.mPixelColor = gl.getUniformLocation(this.mCompiledShader, 'uPixelColor');
  this.mModelTransform = gl.getUniformLocation(this.mCompiledShader, 'uModelTransform');
  this.mViewProjTransform = gl.getUniformLocation(this.mCompiledShader, 'uViewProjTransform');
  this.mGlobalAmbientColor = gl.getUniformLocation(this.mCompiledShader, 'uGlobalAmbientColor');
  this.mGlobalAmbientIntensity = gl.getUniformLocation(this.mCompiledShader, 'uGlobalAmbientIntensity');

  //-----end constructor--------------------------------------------------------
}

// returns compiled shader from shader in DOM:: id: script id
SimpleShader.prototype._compileShader = function (filePath, shaderType) {
  var gl = gEngine.Core.getGL();
  var shaderSource = null, compiledShader = null;

  // 0: get shader source
  shaderSource = gEngine.ResourceMap.retrieveAsset(filePath);

  if (shaderSource === null) {
    console.error(`WARNING: Loading of: ${filePath} Failed!`);
    return null;
  }

  // 1: create shader based on type (vert | frag)
  compiledShader = gl.createShader(shaderType);

  // 2: compile and create shader
  gl.shaderSource(compiledShader, shaderSource);
  gl.compileShader(compiledShader);

  // 3: check for errors
  if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
    console.error('A shader compiling error has occurred: ' + gl.getShaderInfoLog(compiledShader));
  }

  return compiledShader;
};

SimpleShader.prototype.activateShader = function (pixelColor, aCamera) {
  var gl = gEngine.Core.getGL();
  gl.useProgram(this.mCompiledShader);
  gl.uniformMatrix4fv(this.mViewProjTransform, false, aCamera.getVPMatrix());
  gl.bindBuffer(gl.ARRAY_BUFFER, gEngine.VertexBuffer.getGLVertexRef());
  gl.vertexAttribPointer(
    this.mShaderVertexPositionAttribute,
    3,        // each element is a 3-float (x,y,z)
    gl.FLOAT, // data is of type FLOAT
    false,    // if content is normalized vectors
    0,        // number of bytes to skip in between elements
    0         // offsets to the first element
  );
  gl.enableVertexAttribArray(this.mShaderVertexPositionAttribute);
  gl.uniform4fv(this.mPixelColor, pixelColor);
  gl.uniform4fv(this.mGlobalAmbientColor, gEngine.DefaultResources.getGlobalAmbientColor());
  gl.uniform1f(this.mGlobalAmbientIntensity, gEngine.DefaultResources.getGlobalAmbientIntensity());
};

SimpleShader.prototype.getShader = function () { return this.mCompiledShader; };

// Loads per-object model transform to the vertex shader
SimpleShader.prototype.loadObjectTransform = function (modelTransform) {
  var gl = gEngine.Core.getGL();
  gl.uniformMatrix4fv(this.mModelTransform, false, modelTransform);
};

SimpleShader.prototype.cleanUp = function () {
  var gl = gEngine.Core.getGL();
  gl.detachShader(this.mCompiledShader, this.mVertexShader);
  gl.detachShader(this.mCompiledShader, this.mFragmentShader);
  gl.deleteShader(this.mVertexShader);
  gl.deleteShader(this.mFragmentShader);
};
