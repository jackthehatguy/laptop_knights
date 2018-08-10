"use strict";

var gEngine = gEngine || { }; // no redef

gEngine.Core = (function() {
  // context
  var mGL = null;

  // getter
  var getGL = function() { return mGL; };

  // int WebGL, vertex buffer & compile shaders
  var _initializeWebGL = function(htmlCanvasID) {
    var canvas = document.getElementById(htmlCanvasID);

    // get & bind webgl :: store in mGL
    mGL = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    if (mGL === null) {
      document.write('<br /><strong>WebGL is not supported!</strong>');
      return;
    }
  };

  var clearCanvas = function(color) {
    mGL.clearColor(color[0], color[1], color[2], color[3]); // set color
    mGL.clear(mGL.COLOR_BUFFER_BIT);
  }

  var initializeEngineCore = function (htmlCanvasID) {
    _initializeWebGL(htmlCanvasID);
    gEngine.VertexBuffer.initialize();
    gEngine.Input.initialize();
  };

  // make public
  var mPublic = {
    getGL: getGL,
    initializeEngineCore: initializeEngineCore,
    clearCanvas, clearCanvas
  };
  return mPublic;
}());
