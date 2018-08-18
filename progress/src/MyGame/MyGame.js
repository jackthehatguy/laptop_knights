"use strict";

function MyGame() {
  this.kSceneFile = 'assets/WhiteLevel.xml';

  this.mCamera = null;

  // all squares
  this.mHero = null;
  this.mSupport = null;

  // audio
  this.kBgClip = 'assets/sounds/BGClip.mp3';
  this.kCue = 'assets/sounds/MyGame_cue.wav';
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
  gEngine.TextFileLoader.loadTextFile(this.kSceneFile, gEngine.TextFileLoader.eTextFileType.eXMLFile);

  gEngine.AudioClips.loadAudio(this.kBgClip);
  gEngine.AudioClips.loadAudio(this.kCue);
};

MyGame.prototype.initialize = function () {
  var sceneParser = new SceneFileParser(this.kSceneFile);

  this.mCamera = sceneParser.parseCamera();

  let sqSet = [];
  sceneParser.parseSquares(sqSet);
  this.mSupport = sqSet[0];
  this.mHero = sqSet[1];

  gEngine.AudioClips.playBackgroundAudio(this.kBgClip);
};

// do NOT change any states in this function
MyGame.prototype.draw = function () {
  // a: clear canvas
  gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);

  // b: activate drawing camera
  this.mCamera.setupViewProjection();

  // c: draw all objects
  let vp = this.mCamera.getVPMatrix();

  this.mSupport.draw(vp);
  this.mHero.draw(vp);
};

// do NOT draw in this function
MyGame.prototype.update = function () {
    let xform = this.mHero.getXform();
    let deltaV = 0.05;

    // Support hero movements
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
        xform.incXPosBy(deltaV);
        if (xform.getXPos() > 29) { // this is the right-bound of the window
            xform.setXPos(11);
        }
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
        xform.incXPosBy(-deltaV);
        if (xform.getXPos() < 11) {  // this is the left-bound of the window
            gEngine.GameLoop.stop();
        }
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)) {
        xform.incYPosBy(deltaV);
        if (xform.getYPos() > 63.5) { // this is the right-bound of the window
            xform.setYPos(56.5);
        }
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) {
        xform.incYPosBy(-deltaV);
        if (xform.getYPos() < 56.5) {  // this is the left-bound of the window
          xform.setYPos(63.5);
        }
    }

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.F)) {
      console.log(xform.getPosition());
      gEngine.AudioClips.playACue(this.kCue);
    }
};

MyGame.prototype.unloadScene = function () {
  gEngine.TextFileLoader.unloadTextFile(this.kSceneFile);

  gEngine.AudioClips.stopBackgroundAudio();
  // gEngine.AudioClips.unloadAudio(this.kBgClip);  // the book says to comment this out?
  gEngine.AudioClips.unloadAudio(this.kCue);

  var nextLevel = new BlueLevel();
  gEngine.Core.startScene(nextLevel);
};
