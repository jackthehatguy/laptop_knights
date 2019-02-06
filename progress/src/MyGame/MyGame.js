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

  // game objects
  this.mHero = null;
  this.mLMinion = null;
  this.mRMinion = null;

  this.mGlobalLightSet = null;

  this.mLgtIndex = 0;
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
};

// do NOT draw in this function
MyGame.prototype.update = function () {
  var msg = `Light #${this.mLgtIndex} `;
  
  this.mCamera.update();

  this.mLMinion.update();
  this.mRMinion.update();
  
  this.mHero.update();

  let
    input = gEngine.Input,
    keys = input.keys,
    kclicked = input.isKeyClicked;

  msg += this._lightControl();

  // quit
  if (kclicked(keys.Esc)) gEngine.GameLoop.stop();

  this.mMsg.setText(msg);
};
