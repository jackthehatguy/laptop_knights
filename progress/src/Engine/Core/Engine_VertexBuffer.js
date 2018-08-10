"use strict";

var gEngine = gEngine || { };

// VertexBuffer obj
gEngine.VertexBuffer = (function() {
  // 0: def verts for square
  var verticesOfSquare = [
    0.5, 0.5, 0.0,
    -0.5, 0.5, 0.0,
    0.5, -0.5, 0.0,
    -0.5, -0.5, 0.0,
  ];

  // ref vert pos for squ in context
  var mSquareVertexBuffer = null;

  var getGLVertexRef = function() { return mSquareVertexBuffer; };

  var initialize = function() {
    var gl = gEngine.Core.getGL();

    // 1: create buffer on context for vertex pos
    mSquareVertexBuffer = gl.createBuffer();

    // 2: activate VertexBuffer
    gl.bindBuffer(gl.ARRAY_BUFFER, mSquareVertexBuffer);

    // 3: loads verticesOfSquare into VertexBuffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesOfSquare), gl.STATIC_DRAW);
  };

  var mPublic = {
    initialize: initialize,
    getGLVertexRef: getGLVertexRef
  };
  return mPublic;
}());
