'use strict';

function MyGame() {
  // textures
  this.kMinionSprite = 'assets/images/minion_sprite.png';
  this.kMinionSpriteNormal = 'assets/images/minion_sprite_normal.png';
  this.kBg = 'assets/images/bg.png';
  this.kBgNormal = 'assets/images/bg_normal.png';

  // camera
  this.mCamera = null;
  this.mBg = null;

  // text
  this.mMsg = null;
  this.mMatMsg = null;

  // game objects
  // hero
  this.mLgtHero = null;
  this.mIllumHero = null;
  
  // minion
  this.mLgtMinion = null;
  this.mIllumMinion = null;

  this.mGlobalLightSet = null;

  this.mLgtIndex = 0;
  this.mLgtRotateTheta = 0;
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
  gEngine.Textures.loadTexture(this.kMinionSprite);
  gEngine.Textures.loadTexture(this.kBg);
  gEngine.Textures.loadTexture(this.kMinionSpriteNormal);
  gEngine.Textures.loadTexture(this.kBgNormal);
};

MyGame.prototype.unloadScene = function () {
  gEngine.Textures.unloadTexture(this.kMinionSprite);
  gEngine.Textures.unloadTexture(this.kBg);
  gEngine.Textures.unloadTexture(this.kMinionSpriteNormal);
  gEngine.Textures.unloadTexture(this.kBgNormal);

  // starts new level once current level is unloaded
  var nextLevel = new GameOver();
  gEngine.Core.startScene(nextLevel);
};

MyGame.prototype.initialize = function () {
  // cameras
  this.mCamera = new Camera(
    vec2.fromValues(50, 37.5),  // position
    100,                        // width
    [0, 0, 640, 480]            // viewport
  );
  this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);

  // light
  this._initializeLights(); // in MyGame_Lights.js

  // bg img
  var bgR = new IllumRenderable(this.kBg, this.kBgNormal);
  bgR.setElementPixelPositions(0, 1024, 0, 1024);
  bgR.getXform().setSize(100, 100);
  bgR.getXform().setPosition(50, 35);
  bgR.getMaterial().setSpecular([1, 0, 0, 1]);
  // this._applyAllLights(bgR);  // in MyGame_Lights.js
  for (let i = 0; i < this.mGlobalLightSet.mSet.length; i++) bgR.addLight(this.mGlobalLightSet.getLightAt(i));
  this.mBg = new GameObject(bgR);

  // game objects
  this.mIllumHero = new Hero(this.kMinionSprite, this.kMinionSpriteNormal, 15, 50);
  this.mLgtHero = new Hero(this.kMinionSprite, null, 80, 50);
  
  this.mIllumMinion = new Minion(this.kMinionSprite, this.kMinionSpriteNormal, 17, 15);
  this.mLgtMinion = new Minion(this.kMinionSprite, null, 87, 15);

  for (let i = 0; i < this.mGlobalLightSet.mSet.length; i++) {
    this.mIllumHero.getRenderable().addLight(this.mGlobalLightSet.getLightAt(i));
    this.mLgtHero.getRenderable().addLight(this.mGlobalLightSet.getLightAt(i));
    this.mIllumMinion.getRenderable().addLight(this.mGlobalLightSet.getLightAt(i));
    this.mLgtMinion.getRenderable().addLight(this.mGlobalLightSet.getLightAt(i));
  }
  
  // ? -> extern file
  // text renderables
  this.mMsg = new FontRenderable('Status Message');
  this.mMsg.setColor([1, 1, 1, 1]);
  this.mMsg.getXform().setPosition(1, 2);
  this.mMsg.setTextHeight(3);

  this.mMatMsg = new FontRenderable('Status Message');
  this.mMatMsg.setColor([1, 1, 1, 1]);
  this.mMatMsg.getXform().setPosition(1, 73);
  this.mMatMsg.setTextHeight(3);

  this.mSelectedCh = this.mIllumHero;
  this.mMaterialCh = this.mSelectedCh.getRenderable().getMaterial().getDiffuse();
  this.mSelectedChMsg = 'H:';
};

/**
 * why isn't the book using this?
 */
MyGame.prototype._initText = function (font, posX, posY, color, textH) {
  font.setColor(color);
  font.getXform().setPosition(posX, posY);
  font.setTextHeight(textH);
};

MyGame.prototype.drawCamera = function (camera) {
  camera.setupViewProjection();

  this.mBg.draw(camera);

  this.mLgtHero.draw(camera);
  this.mIllumHero.draw(camera);
  
  this.mLgtMinion.draw(camera);
  this.mIllumMinion.draw(camera);
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

  this.mIllumMinion.update();
  this.mLgtMinion.update();

  this.mIllumHero.update();

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
    this.mSelectedCh = this.mIllumMinion;
    this.mMaterialCh = this.mSelectedCh.getRenderable().getMaterial().getDiffuse();
    this.mSelectedChMsg = 'L:';
  }
  if (kClicked(keys.Six)) {
    this.mSelectedCh = this.mIllumHero;
    this.mMaterialCh = this.mSelectedCh.getRenderable().getMaterial().getDiffuse();
    this.mSelectedChMsg = 'H:';
  }
  return this.mSelectedChMsg;
};
