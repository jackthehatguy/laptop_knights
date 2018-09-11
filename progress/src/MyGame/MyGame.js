'use strict';

function MyGame() {
  // textures
  this.kMinionSprite = 'assets/minion_sprite.png';
  this.kMinionPortal = 'assets/minion_portal.png';
  this.kBg = 'assets/bg.png'

  // fonts

  // camera
  this.mCamera = null;
  this.mBg = null;

  // text
  this.mMsg = null;

  // game objects
  this.mHero = null;

  this.mBrain = null;
  this.mPortal = null;
  this.mLMinion = null;
  this.mRMinion = null;

  this.mFocusObj = null;

  // audio

  // settings
  this.mChoice = 'D';
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
  // textures
  let texture = gEngine.Textures.loadTexture;
  texture(this.kMinionSprite);
  texture(this.kMinionPortal);
  texture(this.kBg);
  // fonts
  // audio
};

MyGame.prototype.initialize = function () {
  // a: camera
  this.mCamera = new Camera(
    vec2.fromValues(50, 37.5),
    100,
    [0, 0, 640, 480]
  );
  this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);

  // bg img
  var bgR = new SpriteRenderable(this.kBg);
  bgR.setElementPixelPositions(0, 1024, 0, 1024);
  bgR.getXform().setSize(150, 150);
  bgR.getXform().setPosition(50,35);
  this.mBg = new GameObject(bgR);

  // game objects
  this.mHero = new Hero(this.kMinionSprite);

  this.mBrain = new Brain(this.kMinionSprite);

  this.mPortal = new TextureObject(this.kMinionPortal, 50, 30, 10, 10);

  this.mLMinion = new Minion(this.kMinionSprite, 30, 30);
  this.mRMinion = new Minion(this.kMinionSprite, 70, 30);

  this.mFocusObj = this.mHero;

  // text renderables
  this.mMsg = new FontRenderable('Status Message');
  this.mMsg.setColor([1, 1, 1, 1]);
  this.mMsg.getXform().setPosition(2, 4);
  this.mMsg.setTextHeight(3);

  // audio
};

// useless? I hope not...
MyGame.prototype._initText = function (font, posX, posY, color, textH) {
  font.setColor(color);
  font.getXform().setPosition(posX, posY);
  font.setTextHeight(textH);
};

// do NOT change any states in this function
MyGame.prototype.draw = function () {
  // a: clear canvas
  gEngine.Core.clearCanvas([0, 1, 0, 1.0]);

  // camera
  this.mCamera.setupViewProjection();

  // renderables
  let cam = this.mCamera;
  this.mBg.draw(cam);
  this.mHero.draw(cam);
  this.mBrain.draw(cam);
  this.mPortal.draw(cam);
  this.mLMinion.draw(cam);
  this.mRMinion.draw(cam);
  this.mMsg.draw(cam);
};

// do NOT draw in this function
MyGame.prototype.update = function () {
  var zoomDelta = 0.05;
  var msg = '[L/R: Left/Right Minion; H: Hero; P: Portal]: ';
  let cam = this.mCamera;

  cam.update();

  this.mLMinion.update();
  this.mRMinion.update();

  this.mHero.update();

  let keys = gEngine.Input.keys;
  this.mPortal.update(
    keys.Up,
    keys.Down,
    keys.Left,
    keys.Right
  );

  // check the small sprite, not the big one
  var h = [];
  if (!this.mHero.pixelTouches(this.mBrain, h)) {
    this.mBrain.rotateObjPointTo(this.mHero.getXform().getPosition(), 0.01);
    GameObject.prototype.update.call(this.mBrain);
  }

  let clicked = gEngine.Input.isKeyClicked;
  if (clicked(keys.L)) {
    this.mFocusObj = this.mLMinion;
    this.mChoice = 'L';
    cam.panTo(this.mLMinion.getXform().getXPos(), this.mLMinion.getXform().getYPos());
  }
  if (clicked(keys.R)) {
    this.mFocusObj = this.mRMinion;
    this.mChoice = 'R';
    cam.panTo(this.mRMinion.getXform().getXPos(), this.mRMinion.getXform().getYPos());
  }
  if (clicked(keys.P)) {
    this.mFocusObj = this.mPortal;
    this.mChoice = 'P';
  }
  if (clicked(keys.H)) {
    this.mFocusObj = this.mHero;
    this.mChoice = 'H';
    cam.panTo(this.mHero.getXform().getXPos(), this.mHero.getXform().getYPos());
  }

  // zoom
  if (clicked(keys.N)) cam.zoomBy(1 - zoomDelta);
  if (clicked(keys.M)) cam.zoomBy(1 + zoomDelta);
  if (clicked(keys.J)) cam.zoomTowards(this.mFocusObj.getXform().getPosition(), 1 - zoomDelta);
  if (clicked(keys.K)) cam.zoomTowards(this.mFocusObj.getXform().getPosition(), 1 + zoomDelta);

  // shake
  if (clicked(keys.Q)) cam.shake(-2, -2, 20, 30);

  cam.clampAtBoundary(this.mBrain.getXform(), 0.9);
  cam.clampAtBoundary(this.mPortal.getXform(), 0.8);
  switch (this.mChoice) {
    case 'L':
      cam.panTo(this.mLMinion.getXform().getXPos(), this.mLMinion.getXform().getYPos());
      break;
    case 'R':
      cam.panTo(this.mRMinion.getXform().getXPos(), this.mRMinion.getXform().getYPos());
      break;
    default:
      cam.panWith(this.mHero.getXform(), 0.65);
  }

  this.mMsg.setText(msg + this.mChoice);
};

MyGame.prototype.unloadScene = function () {
  let texture = gEngine.Textures.unloadTexture;
  texture(this.kMinionSprite);
  texture(this.kMinionPortal);
  texture(this.kBg);

  var nextLevel = new GameOver();  // next level to be loaded
  gEngine.Core.startScene(nextLevel);
};
