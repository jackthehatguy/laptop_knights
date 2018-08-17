"use strict";

function BlueLevel() {
  this.kSceneFile = 'assets/BlueLevel.xml';

  this.mSqSet = [];

  this.mCamera = null;
}
gEngine.Core.inheritPrototype(BlueLevel, Scene);

BlueLevel.prototype.loadScene = function () {
  gEngine.TextFileLoader.loadTextFile(this.kSceneFile, gEngine.TextFileLoader.eTextFileType.eXMLFile);
};

BlueLevel.prototype.initialize = function () {
  var sceneParser = new SceneFileParser(this.kSceneFile);

  // a: parse cam
  this.mCamera = sceneParser.parseCamera();

  // b: parse all squares
  sceneParser.parseSquares(this.mSqSet);
};

// do NOT change any states in this function
BlueLevel.prototype.draw = function () {
  // a: clear canvas
  gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);

  // b: activate drawing camera
  this.mCamera.setupViewProjection();

  // c: draw all squares
  for (var i = 0; i < this.mSqSet.length; i++) {
    this.mSqSet[i].draw(this.mCamera.getVPMatrix());
  }
};

// do NOT draw in this function
BlueLevel.prototype.update = function () {
    // For this very simple game, let's move the first square
    var xform = this.mSqSet[1].getXform();
    var deltaV = 0.05;

    // Support hero movements
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
        xform.incXPosBy(deltaV);
        if (xform.getXPos() > 29) { // right-bound of the window
            xform.setXPos(11);
        }
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
        xform.incXPosBy(-deltaV);
        if (xform.getXPos() < 11) {  // left-bound of the window
            gEngine.GameLoop.stop();
        }
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)) {
        xform.incYPosBy(deltaV);
        if (xform.getYPos() > 63.5) { // upper-bound of the window
            xform.setYPos(56.5);
        }
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) {
        xform.incYPosBy(-deltaV);
        if (xform.getYPos() < 56.5) {  // lower-bound of the window
          xform.setYPos(63.5);
        }
    }
};

BlueLevel.prototype.unloadScene = function () {
  gEngine.TextFileLoader.unloadTextFile(this.kSceneFile);

  var nextLevel = new MyGame();
  gEngine.Core.startScene(nextLevel);
};
