'use strict';

function MyGame() {
  // textures
  this.kMinionSprite = 'assets/minion_sprite.png';
  this.kBg = 'assets/bg.png'

  // camera
  this.mCamera = null;
  this.mBg = null;

  // text
  this.mMsg = null;

  // game objects
  this.mHero = null;
  this.mLMinion = null;
  this.mRMinion = null;
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
  let loadTexture = gEngine.Textures.loadTexture;
  loadTexture(this.kMinionSprite);
  loadTexture(this.kBg);
};

MyGame.prototype.unloadScene = function () {
  let unloadTexture = gEngine.Textures.unloadTexture;
  unloadTexture(this.kMinionSprite);
  unloadTexture(this.kBg);

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

  // bg img
  var bgR = new SpriteRenderable(this.kBg);
  bgR.setElementPixelPositions(0, 1900, 0, 1000);
  bgR.getXform().setSize(190, 100);
  bgR.getXform().setPosition(50,35);
  this.mBg = new GameObject(bgR);

  // game objects
  this.mHero = new Hero(this.kMinionSprite);

  this.mLMinion = new Minion(this.kMinionSprite, 30, 30);
  this.mRMinion = new Minion(this.kMinionSprite, 70, 30);

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

// do NOT change any states in this function
MyGame.prototype.draw = function () {
  // a: clear canvas
  gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);

  // camera
  this.drawCamera(this.mCamera);
  this.mMsg.draw(this.mCamera);
};

// do NOT draw in this function
MyGame.prototype.update = function () {
  var deltaAmbient = 0.01;
  var msg = '[Current Ambient]: ';
  
  this.mCamera.update();

  this.mLMinion.update();
  this.mRMinion.update();

  this.mHero.update();

  this.mCamera.panWith(this.mHero.getXform(), 0.8);
  
  let
    dr = gEngine.DefaultResources,
    input = gEngine.Input,
    keys = input.keys,
    button = input.mouseButton,
    kpressed = input.isKeyPressed,
    kclicked = input.isKeyClicked,
    mpressed = input.isButtonPressed;

  var v = dr.getGlobalAmbientColor();

  if (mpressed(button.Left)) v[0] += deltaAmbient;
  if (mpressed(button.Middle)) v[0] -= deltaAmbient;

  if (kpressed(keys.Left)) dr.setGlobalAmbientIntensity(dr.getGlobalAmbientIntensity() - deltaAmbient);
  if (kpressed(keys.Right)) dr.setGlobalAmbientIntensity(dr.getGlobalAmbientIntensity() + deltaAmbient);

  // quit
  if (kclicked(keys.Esc)) gEngine.GameLoop.stop();

  msg += ` Red=${v[0].toPrecision(3)} Intensity=${dr.getGlobalAmbientIntensity().toPrecision(3)}`;
  this.mMsg.setText(msg);
};
