"use strict";

function MyGame(htmlCanvasID) {
  // variables of the constant color shader
  this.mConstColorShader = null;

  // variables for squares
  this.mWhiteSq = null;     // these are renderable objects
  this.mRedSq = null;

  // the camera to view the scene
  this.mCamera = null;

  // init webGL context
  gEngine.Core.initializeEngineCore(htmlCanvasID);

  // init game
  this.initialize();
}

MyGame.prototype.initialize = function () {
  // a: set up camera
  this.mCamera = new Camera(
    vec2.fromValues(20, 60),  // position
    20,                       // width
    [20, 40, 600, 300]        // viewport [orgX, orgY, width, height]
  );
  this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);

  // b: create shader
  this.mConstColorShader = new SimpleShader(
    'src/GLSLShaders/SimpleVS.glsl',  // path to vertex shader
    'src/GLSLShaders/SimpleFS.glsl'   // path to fragment shader
  );

  // c: create renderables
  this.mWhiteSq = new Renderable(this.mConstColorShader);
  this.mWhiteSq.setColor([1, 1, 1, 1]);
  this.mRedSq = new Renderable(this.mConstColorShader);
  this.mRedSq.setColor([1, 0, 0, 1]);

  // d: intit white square
  let white = this.mWhiteSq.getXform();
  white.setPosition(20, 60);
  white.setRotationInRad(0.2);
  white.setSize(5, 5);

  // e: init red square
  let red = this.mRedSq.getXform();
  red.setPosition(20, 60);
  red.setSize(2, 2);

  // f: start game loop
  gEngine.GameLoop.start(this);
};

// do NOT draw in this function
MyGame.prototype.update = function () {
  var redXform = this.mRedSq.getXform();
  var whiteXform = this.mWhiteSq.getXform();
  var deltaDist = 0.05;

  // a: test white square movement
  if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
    if (whiteXform.getXPos() > 30) {
      whiteXform.setXPos(10);
    }
    whiteXform.incXPosBy(deltaDist);
    console.log(Math.trunc(whiteXform.getXPos()));
  }
  if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)) {
    if (whiteXform.getYPos() > 65) {
      whiteXform.setYPos(55);
    }
    whiteXform.incYPosBy(deltaDist);
    console.log(Math.trunc(whiteXform.getYPos()));
  }
  if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
    if (whiteXform.getXPos() < 10) {
      whiteXform.setXPos(30);
    }
    whiteXform.incXPosBy(-deltaDist);
    console.log(Math.trunc(whiteXform.getXPos()));
  }
  if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) {
    if (whiteXform.getYPos() < 55) {
      whiteXform.setYPos(65);
    }
    whiteXform.incYPosBy(-deltaDist);
    console.log(Math.trunc(whiteXform.getYPos()));
  }

  // b: test white square rotation
  if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Q)) {
    whiteXform.incRotationByDegree(1);
  }
  if (gEngine.Input.isKeyPressed(gEngine.Input.keys.E)) {
    whiteXform.incRotationByDegree(-1);
  }

  // c: test red square pulse
  if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Down)) {
    if (redXform.getWidth() > 5) {
      redXform.setSize(2, 2);
    }
    redXform.incSizeBy(0.05);
  }
};

// do NOT change any states in this function
MyGame.prototype.draw = function () {
  // a: clear canvas
  gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);

  // b: activate drawing camera
  this.mCamera.setupViewProjection();

  let vp = this.mCamera.getVPMatrix();
  // c: activate white shader
  this.mWhiteSq.draw(vp);

  // d: activate red shader
  this.mRedSq.draw(vp);
};
