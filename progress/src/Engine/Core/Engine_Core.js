'use strict';

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
    mGL = canvas.getContext('webgl', {alpha: false}) || canvas.getContext('experimental-webgl', {alpha: false});

    // allows transparency w/ textures
    mGL.blendFunc(mGL.SRC_ALPHA, mGL.ONE_MINUS_SRC_ALPHA);
    mGL.enable(mGL.BLEND);

    // invert img y-axis to match coord space
    mGL.pixelStorei(mGL.UNPACK_FLIP_Y_WEBGL, true);

    if (mGL === null) {
      document.write('<br /><strong>WebGL is not supported!</strong>');
      return;
    }
  };

  var clearCanvas = function(color) {
    mGL.clearColor(color[0], color[1], color[2], color[3]); // set color
    mGL.clear(mGL.COLOR_BUFFER_BIT);
  };

  var initializeEngineCore = function (htmlCanvasID, myGame) {
    _initializeWebGL(htmlCanvasID);
    gEngine.VertexBuffer.initialize();
    gEngine.Input.initialize();
    gEngine.AudioClips.initAudioContext();

    gEngine.DefaultResources.initialize(function () { startScene(myGame); });
  };

  var startScene = function (myGame) {
    myGame.loadScene.call(myGame); // called in this way to keep correct context
    gEngine.GameLoop.start(myGame);
  };

  var inheritPrototype = function (subClass, superClass) {
    var prototype = Object.create(superClass.prototype);
    prototype.constructor = subClass;
    subClass.prototype = prototype;
  };

  var cleanUp = function () {
    gEngine.VertexBuffer.cleanUp();
    gEngine.DefaultResources.cleanUp();
  };

  // make public
  var mPublic = {
    clearCanvas,
    getGL,
    inheritPrototype,
    initializeEngineCore,
    startScene,
    cleanUp
  };
  return mPublic;
}());
