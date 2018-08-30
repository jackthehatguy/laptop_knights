'use strict';

function MyGame() {
  // textures
  this.kFontImage = 'assets/Consolas-72.png';
  this.kMinionSprite = 'assets/minion_sprite.png';

  // fonts
  this.kFontCon16 = 'assets/fonts/Consolas-16';
  this.kFontCon24 = 'assets/fonts/Consolas-24';
  this.kFontCon32 = 'assets/fonts/Consolas-32';
  this.kFontCon72 = 'assets/fonts/Consolas-72';
  this.kFontSeg96 = 'assets/fonts/Segment7-96';

  // renderables
  this.mHero = null;
  // this.mPortal = null;
  // this.mCollector = null;
  this.mFontImage = null;
  this.mRightMinion = null;
  // this.mLeftMinion = null;

  // text renderables
  this.mTextSysFont = null;
  this.mTextCon16 = null;
  this.mTextCon24 = null;
  this.mTextCon32 = null;
  this.mTextCon72 = null;
  this.mTextSeg96 = null;

  this.mTextToWork = null;

  // camera
  this.mCamera = null;

  // audio
  // this.kBgClip = 'assets/sounds/AHiT_MainTheme.mp3';
  // this.kCue = 'assets/sounds/0x53.wav';
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
  // textures
  gEngine.Textures.loadTexture(this.kFontImage);
  gEngine.Textures.loadTexture(this.kMinionSprite);

  // fonts
  gEngine.Fonts.loadFont(this.kFontCon16);
  gEngine.Fonts.loadFont(this.kFontCon24);
  gEngine.Fonts.loadFont(this.kFontCon32);
  gEngine.Fonts.loadFont(this.kFontCon72);
  gEngine.Fonts.loadFont(this.kFontSeg96);

  // audio
  // gEngine.AudioClips.loadAudio(this.kBgClip);
  // gEngine.AudioClips.loadAudio(this.kCue);
};

MyGame.prototype.initialize = function () {
  // a: camera
  this.mCamera = new Camera(
    vec2.fromValues(50, 33),
    100,
    [0, 0, 600, 400]
  );
  this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);

  // game objects
  // this.mPortal = new SpriteRenderable(this.kMinionSprite);
  // this.mPortal.setColor([1, 0, 0, 0.2]);
  // this.mPortal.getXform().setPosition(25, 60);
  // this.mPortal.getXform().setSize(3, 3);
  // this.mPortal.setElementPixelPositions(130, 310, 0, 180);
  //
  // this.mCollector = new SpriteRenderable(this.kMinionSprite);
  // this.mCollector.setColor([0, 0, 0, 0]);
  // this.mCollector.getXform().setPosition(15, 60);
  // this.mCollector.getXform().setSize(3, 3);
  // this.mCollector.setElementPixelPositions(315, 495, 0, 180);

  // font sample
  this.mFontImage = new SpriteRenderable(this.kFontImage);
  this.mFontImage.setColor([1, 1, 1, 0]);
  this.mFontImage.getXform().setPosition(15, 50);
  this.mFontImage.getXform().setSize(20, 20);

  // animated
  this.mRightMinion = new SpriteAnimateRenderable(this.kMinionSprite);
  this.mRightMinion.setColor([1, 1, 1, 0]);
  this.mRightMinion.getXform().setPosition(15, 25);
  this.mRightMinion.getXform().setSize(24, 19.2);
  this.mRightMinion.setSpriteSequence(512, 0, 204, 164, 5, 0);
  this.mRightMinion.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
  this.mRightMinion.setAnimationSpeed(7);

  // this.mLeftMinion = new SpriteAnimateRenderable(this.kMinionSprite);
  // this.mLeftMinion.setColor([1, 1, 1, 0]);
  // this.mLeftMinion.getXform().setPosition(15, 56.5);
  // this.mLeftMinion.getXform().setSize(4, 3.2);
  // this.mLeftMinion.setSpriteSequence(
  //   348,
  //   0,
  //   204,
  //   164,
  //   5,
  //   0
  // );
  // this.mLeftMinion.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
  // this.mLeftMinion.setAnimationSpeed(50);

  // hero
  this.mHero = new SpriteRenderable(this.kMinionSprite);
  this.mHero.setColor([1, 1, 1, 0]);
  this.mHero.getXform().setPosition(35, 50);
  this.mHero.getXform().setSize(12, 18);
  this.mHero.setElementPixelPositions(0, 120, 0, 180);

  // fonts
  this.mTextSysFont = new FontRenderable('System Font: in Red');
  this._initText(this.mTextSysFont, 50, 60, [1, 0, 0, 1], 3);

  this.mTextCon16 = new FontRenderable('Consolas 16: in black');
  this.mTextCon16.setFont(this.kFontCon16);
  this._initText(this.mTextCon16, 50, 55, [0, 0, 0, 1], 2);

  this.mTextCon24 = new FontRenderable('Consolas 24: in black');
  this.mTextCon24.setFont(this.kFontCon24);
  this._initText(this.mTextCon24, 50, 50, [0, 0, 0, 1], 3);

  this.mTextCon32 = new FontRenderable('Consolas 32: in white');
  this.mTextCon32.setFont(this.kFontCon32);
  this._initText(this.mTextCon32, 40, 40, [1, 1, 1, 1], 4);

  this.mTextCon72 = new FontRenderable('Consolas 72: in blue');
  this.mTextCon72.setFont(this.kFontCon72);
  this._initText(this.mTextCon72, 30, 30, [0, 0, 1, 1], 6);

  this.mTextSeg96  = new FontRenderable('Segment7-92');
  this.mTextSeg96.setFont(this.kFontSeg96);
  this._initText(this.mTextSeg96, 30, 15, [1, 1, 0, 1], 7);

  this.mTextToWork = this.mTextCon16;

  // gEngine.AudioClips.playBackgroundAudio(this.kBgClip);
};

MyGame.prototype._initText = function (font, posX, posY, color, textH) {
  font.setColor(color);
  font.getXform().setPosition(posX, posY);
  font.setTextHeight(textH);
};

// do NOT change any states in this function
MyGame.prototype.draw = function () {
  // a: clear canvas
  gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);

  // camera
  this.mCamera.setupViewProjection();

  // renderables
  let vp = this.mCamera.getVPMatrix();
  // this.mPortal.draw(vp);
  // this.mCollector.draw(vp);
  this.mHero.draw(vp);
  this.mFontImage.draw(vp);
  this.mRightMinion.draw(vp);
  // this.mLeftMinion.draw(vp);

  // fonts
  this.mTextSysFont.draw(vp);
  this.mTextCon16.draw(vp);
  this.mTextCon24.draw(vp);
  this.mTextCon32.draw(vp);
  this.mTextCon72.draw(vp);
  this.mTextSeg96.draw(vp);
};

// do NOT draw in this function
MyGame.prototype.update = function () {
    let xform = this.mHero.getXform();
    let deltaV = 0.5;

    // Support hero movements
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
        xform.incXPosBy(deltaV);
        if (xform.getXPos() > 106) { // this is the right-bound of the window
            xform.setXPos(-6);
        }
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
        xform.incXPosBy(-deltaV);
        if (xform.getXPos() < -6) {  // this is the left-bound of the window
            gEngine.GameLoop.stop();
            // xform.setXPos(106);
        }
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)) {
        xform.incYPosBy(deltaV);
        if (xform.getYPos() > 75) { // this is the right-bound of the window
            xform.setYPos(-9);
        }
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) {
        xform.incYPosBy(-deltaV);
        if (xform.getYPos() < -9) {  // this is the left-bound of the window
          xform.setYPos(75);
        }
    }

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.F)) {
      console.log(xform.getPosition());
      // gEngine.AudioClips.playACue(this.kCue);
    }

    // let c = this.mPortal.getColor();
    // let ca = c[3] + deltaV;
    // if (ca > 1) ca = 0;
    // c[3] = ca;

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
    // this.mLeftMinion.updateAnimation();

    // if (gEngine.Input.isKeyClicked(gEngine.Input.keys.One)) {
    //   this.mRightMinion.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateLeft);
    //   this.mLeftMinion.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateLeft);
    // }
    //
    // if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Two)) {
    //   this.mRightMinion.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    //   this.mLeftMinion.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    // }
    //
    // if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Three)) {
    //   this.mRightMinion.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
    //   this.mLeftMinion.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
    // }
    //
    // if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Four)) {
    //   this.mRightMinion.incAnimationSpeed(-2);
    //   this.mLeftMinion.incAnimationSpeed(-2);
    // }
    //
    // if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Five)) {
    //   this.mRightMinion.incAnimationSpeed(2);
    //   this.mLeftMinion.incAnimationSpeed(2);
    // }

    // fonts
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Zero)) this.mTextToWork = this.mTextCon16;
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.One)) this.mTextToWork = this.mTextCon24;
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Three)) this.mTextToWork = this.mTextCon32;
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Four)) this.mTextToWork = this.mTextCon72;

    var deltaF = 0.005;
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Up)) {
      if (gEngine.Input.isKeyPressed(gEngine.Input.keys.X)) this.mTextToWork.getXform().incWidthBy(deltaF);
      if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Y)) this.mTextToWork.getXform().incHeightBy(deltaF);
      this.mTextSysFont.setText(
        this.mTextToWork.getXform().getWidth().toFixed(2)
        + 'x'
        + this.mTextToWork.getXform().getHeight().toFixed(2)
      );
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Down)) {
      if (gEngine.Input.isKeyPressed(gEngine.Input.keys.X)) this.mTextToWork.getXform().incWidthBy(-deltaF);
      if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Y)) this.mTextToWork.getXform().incHeightBy(-deltaF);
      this.mTextSysFont.setText(
        this.mTextToWork.getXform().getWidth().toFixed(2)
        + 'x'
        + this.mTextToWork.getXform().getHeight().toFixed(2)
      );
    }
};

MyGame.prototype.unloadScene = function () {
  // audio
  // gEngine.AudioClips.stopBackgroundAudio();
  // gEngine.AudioClips.unloadAudio(this.kBgClip);  // the book says to comment this out?
  // gEngine.AudioClips.unloadAudio(this.kCue);

  // textures
  gEngine.Textures.unloadTexture(this.kFontImage);
  gEngine.Textures.unloadTexture(this.kMinionSprite);

  // fonts
  gEngine.Fonts.unloadFont(this.kFontCon16);
  gEngine.Fonts.unloadFont(this.kFontCon24);
  gEngine.Fonts.unloadFont(this.kFontCon32);
  gEngine.Fonts.unloadFont(this.kFontCon72);
  gEngine.Fonts.unloadFont(this.kFontSeg96);

  var nextLevel = new GameOver();
  gEngine.Core.startScene(nextLevel);
};
