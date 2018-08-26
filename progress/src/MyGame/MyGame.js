'use strict';

function MyGame() {
  // textures
  this.kPortal = 'assets/minion_portal.png';
  this.kPortal = 'assets/minion_collector.png';

  // all renderable objects
  this.mHero = null;
  this.mPortal = null;
  this.mCollector = null;

  this.mCamera = null;

  // audio
  this.kBgClip = 'assets/sounds/AHiT_MainTheme.mp3';
  this.kCue = 'assets/sounds/0x53.wav';
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
  // textures
  gEngine.Textures.loadTexture(this.kPortal);
  gEngine.Textures.loadTexture(this.kCollector);

  // audio
  gEngine.AudioClips.loadAudio(this.kBgClip);
  gEngine.AudioClips.loadAudio(this.kCue);
};

MyGame.prototype.initialize = function () {
  console.log('pog');
  // a: camera
  this.mCamera = new Camera(
    vec2.fromValues(20, 60),
    20,
    [20, 40, 600, 300]
  );
  this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);

  // b: game objects
  this.mPortal = new TextureRenderable(this.kPortal);
  this.mPortal.setColor([1, 0, 0, 0.2]);
  this.mPortal.getXform().setPosition(25, 60);
  this.mPortal.getXform().setSize(3, 3);

  this.mCollector = new TextureRenderable(this.kCollector);
  this.mCollector.setColor([0, 0, 0, 0]);
  this.mCollector.getXform().setPosition(15, 60);
  this.mCollector.getXform().setSize(3, 3);

  this.mHero = new Renderable();
  this.mHero.setColor([0, 0, 1, 1]);
  this.mHero.getXform().setPosition(20, 60);
  this.mHero.getXform().setSize(2, 3);

  gEngine.AudioClips.playBackgroundAudio(this.kBgClip);
};

// do NOT change any states in this function
MyGame.prototype.draw = function () {
  // a: clear canvas
  gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);

  // b: activate drawing camera
  this.mCamera.setupViewProjection();

  // c: draw all objects
  let vp = this.mCamera.getVPMatrix;
  this.mPortal.draw(vp());
  this.mHero.draw(vp());
  this.mCollector.draw(vp());
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

    let c = this.mPortal.getColor();
    let ca = c[3] + deltaV;
    if (ca > 1) ca = 0;
    c[3] = ca;
};

MyGame.prototype.unloadScene = function () {
  // audio
  gEngine.AudioClips.stopBackgroundAudio();
  // gEngine.AudioClips.unloadAudio(this.kBgClip);  // the book says to comment this out?
  gEngine.AudioClips.unloadAudio(this.kCue);

  // textures
  gEngine.Textures.unloadTexture(this.kPortal);
  gEngine.Textures.unloadTexture(this.kCollector);

  var nextLevel = new BlueLevel();
  gEngine.Core.startScene(nextLevel);
};
