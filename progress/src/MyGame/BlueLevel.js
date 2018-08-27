'use strict';

function BlueLevel() {
  this.kSceneFile = 'assets/BlueLevel.xml';

  // !: jpg doesn't support transparency
  this.kPortal = 'assets/minion_portal.jpg';
  this.kCollector = 'assets/minion_collector.jpg';

  this.mSqSet = [];

  this.mCamera = null;

  // audio
  this.kBgClip = 'assets/sounds/AHiT_MainTheme.mp3';
  this.kCue = 'assets/sounds/0x56.wav';
}
gEngine.Core.inheritPrototype(BlueLevel, Scene);

BlueLevel.prototype.loadScene = function () {
  gEngine.TextFileLoader.loadTextFile(this.kSceneFile, gEngine.TextFileLoader.eTextFileType.eXMLFile);

  // textures
  gEngine.Textures.loadTexture(this.kPortal);
  gEngine.Textures.loadTexture(this.kCollector);

  // audio
  gEngine.AudioClips.loadAudio(this.kBgClip);
  gEngine.AudioClips.loadAudio(this.kCue);
};

BlueLevel.prototype.initialize = function () {
  var sceneParser = new SceneFileParser(this.kSceneFile);

  // a: parse cam
  this.mCamera = sceneParser.parseCamera();

  // b: parse all drawn objects
  sceneParser.parseSquares(this.mSqSet);
  sceneParser.parseTextureSquares(this.mSqSet);

  gEngine.AudioClips.playBackgroundAudio(this.kBgClip);
};

// do NOT change any states in this function
BlueLevel.prototype.draw = function () {
  // a: clear canvas
  gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);

  // b: activate drawing camera
  this.mCamera.setupViewProjection();

  // c: draw all squares
  for (var i = 0; i < this.mSqSet.length; i++) this.mSqSet[i].draw(this.mCamera.getVPMatrix());
};

// do NOT draw in this function
BlueLevel.prototype.update = function () {
    // For this very simple game, let's move the first square
    var xform = this.mSqSet[0].getXform();
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

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.F)) {
      gEngine.AudioClips.playACue(this.kCue);
    }

    // continuously change texture tinting
    let c = this.mSqSet[1].getColor();
    let ca = c[3] + deltaV;
    if (ca > 1) ca = 0;
    c[3] = ca;
};

BlueLevel.prototype.unloadScene = function () {
  gEngine.AudioClips.stopBackgroundAudio();

  gEngine.TextFileLoader.unloadTextFile(this.kSceneFile);

  // textures
  gEngine.Textures.unloadTexture(this.kPortal);
  gEngine.Textures.unloadTexture(this.kCollector);

  // audio
  gEngine.AudioClips.unloadAudio(this.kBgClip);
  gEngine.AudioClips.unloadAudio(this.kCue);

  var nextLevel = new MyGame();
  gEngine.Core.startScene(nextLevel);
};
