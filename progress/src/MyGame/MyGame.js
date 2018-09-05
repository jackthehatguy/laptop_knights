'use strict';

function MyGame() {
  // textures
  this.kMinionSprite = 'assets/minion_sprite.png';
  this.kMinionPortal = 'assets/minion_portal.png';

  // fonts

  // camera
  this.mCamera = null;

  // renderables
  this.mHero = null;
  this.mBrain = null;
  this.mPortalHit = null;
  this.mHeroHit = null;

  this.mPortal = null;
  this.mLMinion = null;
  this.mRMinion = null;

  this.mCollide = null;

  // text renderables
  this.mMsg = null;

  // audio
  // settings
  this.mChoice = 'H';
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
  // textures
  gEngine.Textures.loadTexture(this.kMinionSprite);
  gEngine.Textures.loadTexture(this.kMinionPortal);

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

  // game objects
  this.mBrain = new Brain(this.kMinionSprite);

  this.mHero = new Hero(this.kMinionSprite);

  this.mPortalHit = new DyePack(this.kMinionSprite);
  this.mPortalHit.setVisibility(false);

  this.mHeroHit = new DyePack(this.kMinionSprite);
  this.mHeroHit.setVisibility(false);

  this.mPortal = new TextureObject(this.kMinionPortal, 50, 30, 10, 10);

  this.mLMinion = new Minion(this.kMinionSprite, 30, 30);
  this.mRMinion = new Minion(this.kMinionSprite, 70, 30);

  // text renderables
  this.mMsg = new FontRenderable('Status Message');
  this.mMsg.setColor([0, 0, 0, 1]);
  this.mMsg.getXform().setPosition(1, 2);
  this.mMsg.setTextHeight(3);

  this.mCollide = this.mHero;

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
  gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);

  // camera
  this.mCamera.setupViewProjection();

  // renderables
  this.mHero.draw(this.mCamera);
  this.mBrain.draw(this.mCamera);
  this.mPortal.draw(this.mCamera);
  this.mLMinion.draw(this.mCamera);
  this.mRMinion.draw(this.mCamera);
  this.mPortalHit.draw(this.mCamera);
  this.mHeroHit.draw(this.mCamera);
  this.mMsg.draw(this.mCamera);
};

// do NOT draw in this function
MyGame.prototype.update = function () {
  var msg = '[L/R: Left/Right Minion; H: Hero; B: Brain]: ';

  this.mLMinion.update();
  this.mRMinion.update();

  this.mHero.update();

  let keys = gEngine.Input.keys;

  this.mPortal.update(keys.Up, keys.Down, keys.Left, keys.Right, keys.U, keys.O);

  var h = [];

  // check the small sprite, not the big one
  if (this.mPortal.pixelTouches(this.mCollide, h)) {
    this.mPortalHit.setVisibility(true);
    this.mPortalHit.getXform().setPosition(h[0], h[1]);
  } else {
    this.mPortalHit.setVisibility(false);
  }

  if (!this.mHero.pixelTouches(this.mBrain, h)) {
    this.mBrain.rotateObjPointTo(this.mHero.getXform().getPosition(), 0.05);
    GameObject.prototype.update.call(this.mBrain);
    this.mHeroHit.setVisibility(false);
  } else {
    this.mHeroHit.setVisibility(true);
    this.mHeroHit.getXform().setPosition(h[0], h[1]);
  }

  let input = gEngine.Input;
  if (input.isKeyClicked(keys.L)) {
    this.mCollide = this.mLMinion;
    this.mChoice = 'L';
  }
  if (input.isKeyClicked(keys.R)) {
    this.mCollide = this.mRMinion;
    this.mChoice = 'R';
  }
  if (input.isKeyClicked(keys.B)) {
    this.mCollide = this.mBrain;
    this.mChoice = 'B';
  }
  if (input.isKeyClicked(keys.H)) {
    this.mCollide = this.mHero;
    this.mChoice = 'H';
  }

  this.mMsg.setText(msg + this.mChoice);
};

MyGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kMinionSprite);
    gEngine.Textures.unloadTexture(this.kMinionPortal);

    var nextLevel = new GameOver();  // next level to be loaded
    gEngine.Core.startScene(nextLevel);
};
