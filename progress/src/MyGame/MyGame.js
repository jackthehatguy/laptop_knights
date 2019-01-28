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

  this.mTheLight = null;
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

  // light
  this.mTheLight = new Light();
  this.mTheLight.setRadius(8);
  this.mTheLight.setXPos(30);
  this.mTheLight.setYPos(30);
  this.mTheLight.setZPos(2);
  this.mTheLight.setColor([0.9, 0.9, 0.6, 1]);

  // bg img
  var bgR = new LightRenderable(this.kBg);
  bgR.setElementPixelPositions(0, 1024, 0, 1024);
  bgR.getXform().setSize(100, 100);
  bgR.getXform().setPosition(50, 35);
  bgR.addLight(this.mTheLight);
  this.mBg = new GameObject(bgR);

  // game objects
  this.mHero = new Hero(this.kMinionSprite);
  this.mHero.getRenderable().addLight(this.mTheLight);
  
  this.mLMinion = new Minion(this.kMinionSprite, 30, 30);
  this.mLMinion.getRenderable().addLight(this.mTheLight);
  this.mRMinion = new Minion(this.kMinionSprite, 70, 30);
  // this.mRMinion.getRenderable().addLight(this.mTheLight);

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
  var msg, i, c;
  var deltaC = 0.01;
  var deltaZ = 0.05;
  
  this.mCamera.update();
  this.mLMinion.update();
  this.mRMinion.update();
  this.mHero.update();

  let
    input = gEngine.Input,
    keys = input.keys,
    button = input.mouseButton,
    kpressed = input.isKeyPressed,
    kclicked = input.isKeyClicked,
    mpressed = input.isButtonPressed;

  if (mpressed(button.Left)) this.mTheLight.set2DPosition(this.mHero.getXform().getPosition());

  if (kpressed(keys.Right)) {
    c = this.mTheLight.getColor();
    for (i = 0; i < 3; i++) c[i] += deltaC;
  }
  if (kpressed(keys.Left)) {
    c = this.mTheLight.getColor();
    for (i = 0; i < 3; i++) c[i] -= deltaC;
  }

  var p = this.mTheLight.getPosition(), r;
  if (kpressed(keys.Z)) p[2] += deltaZ;
  if (kpressed(keys.X)) p[2] -= deltaZ;
  if (kpressed(keys.C)) {
    r = this.mTheLight.getRadius();
    r += deltaC;
    this.mTheLight.setRadius(r);
  }
  if (kpressed(keys.V)) {
    r = this.mTheLight.getRadius();
    r -= deltaC;
    this.mTheLight.setRadius(r);
  }

  c = this.mTheLight.getColor();

  // quit
  if (kclicked(keys.Esc)) gEngine.GameLoop.stop();

  msg = `LightColor:${c[0].toFixed(2)} ${c[1].toFixed(2)} ${c[2].toFixed(2)} ` +
    `Z=${p[2].toFixed(2)} r=${this.mTheLight.getRadius().toFixed(2)}`;
  this.mMsg.setText(msg);
};
