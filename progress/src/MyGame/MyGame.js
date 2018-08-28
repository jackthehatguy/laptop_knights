'use strict';

function MyGame() {
  // textures
  this.kFontImage = 'assets/Consolas-72.png';
  this.kMinionSprite = 'assets/minion_sprite.png';

  // all renderable objects
  this.mHero = null;
  this.mPortal = null;
  this.mCollector = null;
  this.mFontImage = null;
  this.mRightMinion = null;
  this.mLeftMinion = null;

  // camera
  this.mCamera = null;

  // audio
  this.kBgClip = 'assets/sounds/AHiT_MainTheme.mp3';
  this.kCue = 'assets/sounds/0x53.wav';
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
  // textures
  gEngine.Textures.loadTexture(this.kFontImage);
  gEngine.Textures.loadTexture(this.kMinionSprite);

  // audio
  gEngine.AudioClips.loadAudio(this.kBgClip);
  gEngine.AudioClips.loadAudio(this.kCue);
};

MyGame.prototype.initialize = function () {
  // a: camera
  this.mCamera = new Camera(
    vec2.fromValues(20, 60),
    20,
    [20, 40, 600, 300]
  );
  this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);

  // game objects
  this.mPortal = new SpriteRenderable(this.kMinionSprite);
  this.mPortal.setColor([1, 0, 0, 0.2]);
  this.mPortal.getXform().setPosition(25, 60);
  this.mPortal.getXform().setSize(3, 3);
  this.mPortal.setElementPixelPositions(130, 310, 0, 180);

  this.mCollector = new SpriteRenderable(this.kMinionSprite);
  this.mCollector.setColor([0, 0, 0, 0]);
  this.mCollector.getXform().setPosition(15, 60);
  this.mCollector.getXform().setSize(3, 3);
  this.mCollector.setElementPixelPositions(315, 495, 0, 180);

  // font sample
  this.mFontImage = new SpriteRenderable(this.kFontImage);
  this.mFontImage.setColor([1, 1, 1, 0]);
  this.mFontImage.getXform().setPosition(13, 62);
  this.mFontImage.getXform().setSize(4, 4);

  // animated
  this.mRightMinion = new SpriteAnimateRenderable(this.kMinionSprite);
  this.mRightMinion.setColor([1, 1, 1, 0]);
  this.mRightMinion.getXform().setPosition(26, 56.5);
  this.mRightMinion.getXform().setSize(4, 3.2);
  this.mRightMinion.setSpriteSequence(
    512,
    0,
    204,
    164,
    5,
    0
  );
  this.mRightMinion.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
  this.mRightMinion.setAnimationSpeed(50);

  this.mLeftMinion = new SpriteAnimateRenderable(this.kMinionSprite);
  this.mLeftMinion.setColor([1, 1, 1, 0]);
  this.mLeftMinion.getXform().setPosition(15, 56.5);
  this.mLeftMinion.getXform().setSize(4, 3.2);
  this.mLeftMinion.setSpriteSequence(
    348,
    0,
    204,
    164,
    5,
    0
  );
  this.mLeftMinion.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
  this.mLeftMinion.setAnimationSpeed(50);

  // hero
  this.mHero = new SpriteRenderable(this.kMinionSprite);
  this.mHero.setColor([1, 1, 1, 0]);
  this.mHero.getXform().setPosition(20, 60);
  this.mHero.getXform().setSize(2, 3);
  this.mHero.setElementPixelPositions(0, 120, 0, 180);

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
  this.mPortal.draw(vp);
  this.mCollector.draw(vp);
  this.mHero.draw(vp);
  this.mFontImage.draw(vp);
  this.mRightMinion.draw(vp);
  this.mLeftMinion.draw(vp);
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
            // gEngine.GameLoop.stop();
            xform.setXPos(29);
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

    let deltaT = 0.001;

    // font image
    var texCoord = this.mFontImage.getElementUVCoordinateArray();
    var b = texCoord[SpriteRenderable.eTexCoordArray.eBottom] + deltaT;
    var r = texCoord[SpriteRenderable.eTexCoordArray.eRight] - deltaT;

    if (b > 1.0) b = 0;
    if (r < 0) r = 1.0;
    this.mFontImage.setElementUVCoordinate(
      texCoord[SpriteRenderable.eTexCoordArray.eLeft],
      r,
      b,
      texCoord[SpriteRenderable.eTexCoordArray.eTop]
    );

    // remeber to update the animation state!
    this.mRightMinion.updateAnimation();
    this.mLeftMinion.updateAnimation();

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.One)) {
      this.mRightMinion.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateLeft);
      this.mLeftMinion.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateLeft);
    }

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Two)) {
      this.mRightMinion.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
      this.mLeftMinion.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    }

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Three)) {
      this.mRightMinion.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
      this.mLeftMinion.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
    }

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Four)) {
      this.mRightMinion.incAnimationSpeed(-2);
      this.mLeftMinion.incAnimationSpeed(-2);
    }

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Five)) {
      this.mRightMinion.incAnimationSpeed(2);
      this.mLeftMinion.incAnimationSpeed(2);
    }
};

MyGame.prototype.unloadScene = function () {
  // audio
  gEngine.AudioClips.stopBackgroundAudio();
  // gEngine.AudioClips.unloadAudio(this.kBgClip);  // the book says to comment this out?
  gEngine.AudioClips.unloadAudio(this.kCue);

  // textures
  gEngine.Textures.unloadTexture(this.kFontImage);
  gEngine.Textures.unloadTexture(this.kMinionSprite);

  var nextLevel = new BlueLevel();
  gEngine.Core.startScene(nextLevel);
};
