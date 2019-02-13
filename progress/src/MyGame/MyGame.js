'use strict';

function MyGame() {
  // textures
  this.kMinionSprite = 'assets/minion_sprite.png';
  this.kMinionSpriteNormal = 'assets/minion_sprite_normal.png';
  this.kBg = 'assets/bg.png';
  this.kBgNormal = 'assets/bg_normal.png';

  // camera
  this.mCamera = null;
  this.mBg = null;

  // text
  this.mMsg = null;
  this.mMatMsg = null;
  this.mSelectedChMsg = null;

  // game objects
  this.mHero = null;
  this.mLMinion = null;
  this.mRMinion = null;

  this.mGlobalLightSet = null;

  this.mLgtIndex = 0;
  this.mSelectedCh = null;
  this.mMaterialCh = null;
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
  let loadTexture = gEngine.Textures.loadTexture;
  loadTexture(this.kMinionSprite);
  loadTexture(this.kBg);
  loadTexture(this.kMinionSpriteNormal);
  loadTexture(this.kBgNormal);
};

MyGame.prototype.unloadScene = function () {
  let unloadTexture = gEngine.Textures.unloadTexture;
  unloadTexture(this.kMinionSprite);
  unloadTexture(this.kBg);
  unloadTexture(this.kMinionSpriteNormal);
  unloadTexture(this.kBgNormal);

  // starts new level once current level is unloaded
  var nextLevel = new GameOver();
  gEngine.Core.startScene(nextLevel);
};

MyGame.prototype.initialize = function () {
  // cameras
  this.mCamera = new Camera(
    vec2.fromValues(50, 37.5),
    100,
    [0, 0, 640, 480]
  );
  this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);

  // light
  this._initializeLights(); // in MyGame_Lights.js

  // bg img
  var bgR = new IllumRenderable(this.kBg, this.kBgNormal);
  bgR.setElementPixelPositions(0, 1024, 0, 1024);
  bgR.getXform().setSize(100, 100);
  bgR.getXform().setPosition(50, 35);
  bgR.getMaterial().setShininess(100);
  bgR.getMaterial().setSpecular([1, 0, 0, 1]);
  this._applyAllLights(bgR);  // in MyGame_Lights.js
  this.mBg = new GameObject(bgR);

  // game objects
  this.mHero = new Hero(this.kMinionSprite, this.kMinionSpriteNormal);
  this._applyAllLights(this.mHero.getRenderable()); // in MyGame_Lights.js
  
  this.mLMinion = new Minion(this.kMinionSprite, this.kMinionSpriteNormal, 30, 30);
  this.mLMinion.getRenderable().addLight(this.mGlobalLightSet.getLightAt(1));
  this.mLMinion.getRenderable().addLight(this.mGlobalLightSet.getLightAt(3));
  
  this.mRMinion = new Minion(this.kMinionSprite, null, 70, 30);
  this.mRMinion.getRenderable().addLight(this.mGlobalLightSet.getLightAt(0));
  this.mRMinion.getRenderable().addLight(this.mGlobalLightSet.getLightAt(2));

  // TODO: ? move to external file
  // text renderables
  this.mMsg = new FontRenderable('Status Message');
  this.mMsg.setColor([1, 1, 1, 1]);
  this.mMsg.getXform().setPosition(1, 2);
  this.mMsg.setTextHeight(3);

  this.mMatMsg = new FontRenderable('Status Message');
  this.mMatMsg.setColor([1, 1, 1, 1]);
  this.mMatMsg.getXform().setPosition(1, 73);
  this.mMatMsg.setTextHeight(3);

  this.mSelectedCh = this.mHero;
  this.mSelectedChMsg = 'R:';
  this.mMaterialCh = this.mSelectedCh.getRenderable().getMaterial().getDiffuse();
};

// useless? I hope not...
MyGame.prototype._initText = function (font, posX, posY, color, textH) {
  font.setColor(color);
  font.getXform().setPosition(posX, posY);
  font.setTextHeight(textH);
};

MyGame.prototype.drawCamera = function (camera) {
  camera.setupViewProjection();

  this.mBg.draw(camera);
  this.mHero.draw(camera);
  this.mLMinion.draw(camera);
  this.mRMinion.draw(camera);
};

// do **NOT** change any states in this function
MyGame.prototype.draw = function () {
  // a: clear canvas
  gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);

  // camera
  this.drawCamera(this.mCamera);
  this.mMsg.draw(this.mCamera);
  this.mMatMsg.draw(this.mCamera);
};

// do NOT draw in this function
MyGame.prototype.update = function () {
  this.mCamera.update();

  this.mLMinion.update();
  this.mRMinion.update();
  this.mHero.update();

  var msg = `L=${this.mLgtIndex} ${this._lightControl()}`;
  this.mMsg.setText(msg);

  msg = `${this._selectCharacter()}${this.materialControl()}`;
  this.mMatMsg.setText(msg);

  // quit
  let input = gEngine.Input;
  if (input.isKeyClicked(input.keys.Esc)) gEngine.GameLoop.stop();
};

MyGame.prototype._selectCharacter = function () {
  let
    input = gEngine.Input,
    kClicked = input.isKeyClicked,
    keys = input.keys;

  if (kClicked(keys.Five)) {
    this.mSelectedCh = this.mLMinion;
    this.mMaterialCh = this.mSelectedCh.getRenderable().getMaterial().getDiffuse();
    this.mSelectedChMsg = 'L:';
  }
  if (kClicked(keys.Six)) {
    this.mSelectedCh = this.mHero;
    this.mMaterialCh = this.mSelectedCh.getRenderable().getMaterial().getDiffuse();
    this.mSelectedChMsg = 'H:';
  }
  return this.mSelectedChMsg;
};
