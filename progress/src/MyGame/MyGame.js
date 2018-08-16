"use strict";

function MyGame() {
  // scene file name
  this.kSceneFile = 'assets/scene.xml';

  // all squares
  this.mSqSet = new Array();

  // the camera to view the scene
  this.mCamera = null;
}

MyGame.prototype.initialize = function () {
  var sceneParser = new SceneFileParser(this.kSceneFile);

  // a: parse cam
  this.mCamera = sceneParser.parseCamera();

  // b: parse all squares
  sceneParser.parseSquares(this.mSqSet);
};

// do NOT draw in this function
MyGame.prototype.update = function () {
  var whiteXform = this.mSqSet[0].getXform();
  var redXform = this.mSqSet[1].getXform();
  var deltaDist = 0.05;

  // a: test white square movement
  if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
    if (whiteXform.getXPos() > 30) {
      whiteXform.setXPos(10);
    }
    whiteXform.incXPosBy(deltaDist);
  }
  if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)) {
    if (whiteXform.getYPos() > 65) {
      whiteXform.setYPos(55);
    }
    whiteXform.incYPosBy(deltaDist);
  }
  if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
    if (whiteXform.getXPos() < 10) {
      whiteXform.setXPos(30);
    }
    whiteXform.incXPosBy(-deltaDist);
  }
  if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) {
    if (whiteXform.getYPos() < 55) {
      whiteXform.setYPos(65);
    }
    whiteXform.incYPosBy(-deltaDist);
  }

  // b: test white square rotation
  if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Q)) {
    whiteXform.incRotationByDegree(1);
  }
  if (gEngine.Input.isKeyPressed(gEngine.Input.keys.E)) {
    whiteXform.incRotationByDegree(-1);
  }

  // white square announce
  if (gEngine.Input.isKeyClicked(gEngine.Input.keys.F)) {
    console.log(`x: ${whiteXform.getXPos()} y: ${whiteXform.getYPos()} a: ${whiteXform.getRotationInRad()}`);
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

  // c: draw all squares
  for (var i = 0; i < this.mSqSet.length; i++) {
    this.mSqSet[i].draw(this.mCamera.getVPMatrix());
  }
};

MyGame.prototype.loadScene = function () {
  gEngine.TextFileLoader.loadTextFile(this.kSceneFile, gEngine.TextFileLoader.eTextFileType.eXMLFile);
};

MyGame.prototype.unloadScene = function () {
  gEngine.TextFileLoader.unloadTextFile(this.kSceneFile);
};
