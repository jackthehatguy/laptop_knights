"use strict";

function SimpleShader(vertexShaderID, fragmentShaderID) {
  this.mCompiledShader = null;
  this.mShaderVertexPositionAttribute = null;
  this.mPixelColor = null;                      // in SimpleFS
  this.mModelTransform = null;
  this.mViewProjTransform = null;

  var gl = gEngine.Core.getGL();

  //-----start constructor------------------------------------------------------

  // 0: load and compile vert & frag shaders
  var vertexShader = this._loadAndCompileShader(vertexShaderID, gl.VERTEX_SHADER);
  var fragmentShader = this._loadAndCompileShader(fragmentShaderID, gl.FRAGMENT_SHADER);

  // 1: create and link shaders
  this.mCompiledShader = gl.createProgram();
  gl.attachShader(this.mCompiledShader, vertexShader);
  gl.attachShader(this.mCompiledShader, fragmentShader);
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
  this.mModelTransform = gl.getUniformLocation(this.mCompiledShader, 'uModelTransform');
  this.mPixelColor = gl.getUniformLocation(this.mCompiledShader, 'uPixelColor');
  this.mViewProjTransform = gl.getUniformLocation(this.mCompiledShader, 'uViewProjTransform');

  //-----end constructor--------------------------------------------------------
}

// returns compiled shader from shader in DOM:: id: script id
SimpleShader.prototype._loadAndCompileShader = function (filePath, shaderType) {
  var xmlReq, shaderSource, compiledShader;
  var gl = gEngine.Core.getGL();

  // 0: get shader source
  xmlReq = new XMLHttpRequest();
  xmlReq.open('GET', filePath, false);
  xmlReq.overrideMimeType('text/plain; charset=utf-8'); // to get rid of the pesky error messages
  try {
    xmlReq.send();
  } catch (error) {
    console.error('Failed to load shader: ' + filePath);
    return null;
  }
  shaderSource = xmlReq.responseText;

  if (shaderSource === null) {
    console.error('WARNING: Loading of: ' + filePath + ' Failed!');
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

SimpleShader.prototype.activateShader = function (pixelColor, vpMatrix) {
  var gl = gEngine.Core.getGL();
  gl.useProgram(this.mCompiledShader);
  gl.uniformMatrix4fv(this.mViewProjTransform, false, vpMatrix);
  gl.enableVertexAttribArray(this.mShaderVertexPositionAttribute);
  gl.uniform4fv(this.mPixelColor, pixelColor);
};

SimpleShader.prototype.getShader = function () { return this.mCompiledShader; };

/**
 * Loads per-object model transform to the vertex shader
 * @param  {[type]} modelTransform [description]
 * @return {[type]}                [description]
 */
SimpleShader.prototype.loadObjectTransform = function (modelTransform) {
  var gl = gEngine.Core.getGL();
  gl.uniformMatrix4fv(this.mModelTransform, false, modelTransform);
};
