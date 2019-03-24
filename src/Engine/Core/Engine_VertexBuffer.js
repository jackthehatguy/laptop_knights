'use strict';

var gEngine = gEngine || {};

// VertexBuffer obj
gEngine.VertexBuffer = (function () {
  // ref vert pos for squ in context
  var mSquareVertexBuffer = null;

  // ref to texture pos
  var mTextureCoordBuffer = null;

  // 0: def verts for square
  var verticesOfSquare = [
    0.5, 0.5, 0.0,
    -0.5, 0.5, 0.0,
    0.5, -0.5, 0.0,
    -0.5, -0.5, 0.0,
  ];

  // def texture coords
  var textureCoordinates = [
    1.0, 1.0,
    0.0, 1.0,
    1.0, 0.0,
    0.0, 0.0
  ];

  var initialize = function () {
    var gl = gEngine.Core.getGL();

    // a: alloc and store vertext pos in webGL
    // create buffer on context for vertex pos
    mSquareVertexBuffer = gl.createBuffer();

    // activate VertexBuffer
    gl.bindBuffer(gl.ARRAY_BUFFER, mSquareVertexBuffer);

    // loads verticesOfSquare into VertexBuffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesOfSquare), gl.STATIC_DRAW);

    // b: alloc and store texture coords
    // create buffer
    mTextureCoordBuffer = gl.createBuffer();

    // activate
    gl.bindBuffer(gl.ARRAY_BUFFER, mTextureCoordBuffer);

    // load texture coords
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);
  };

  var getGLVertexRef = function () { return mSquareVertexBuffer; };
  var getGLTexCoordRef = function () { return mTextureCoordBuffer; };

  var cleanUp = function () {
    var gl = gEngine.Core.getGL();
    gl.deleteBuffer(mSquareVertexBuffer);
    gl.deleteBuffer(mTextureCoordBuffer);
  };

  var mPublic = {
    initialize,
    getGLVertexRef,
    getGLTexCoordRef,
    cleanUp
  };
  return mPublic;
}());
