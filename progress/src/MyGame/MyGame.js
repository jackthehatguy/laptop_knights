'use strict';

function MyGame() {
  // textures
  this.kMinionSprite = 'assets/minion_sprite.png';

  // camera
  this.mCamera = null;

  // fonts

  // renderables
  this.mHero = null;
  this.mMinionSet = null;
  this.mDyePack = null;

  // text renderables
  this.mMsg = null;

  // audio
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
  // textures
  gEngine.Textures.loadTexture(this.kMinionSprite);

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
  this.mDyePack = new DyePack(this.kMinionSprite);

  this.mMinionSet = new GameObjectSet();
  for (var i = 0; i < 5; i++) {
    let randY = Math.random() * 63 + 6;
    let aMinion = new Minion(this.kMinionSprite, randY);
    this.mMinionSet.addToSet(aMinion);
  }

  this.mHero = new Hero(this.kMinionSprite);

  // text renderables
  this.mMsg = new FontRenderable('Status Message');
  this.mMsg.setColor([0, 0, 0, 1]);
  this.mMsg.getXform().setPosition(1, 2);
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
  gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);

  // camera
  this.mCamera.setupViewProjection();

  // renderables
  this.mDyePack.draw(this.mCamera);
  this.mHero.draw(this.mCamera);
  this.mMinionSet.draw(this.mCamera);
  this.mMsg.draw(this.mCamera);
};

// do NOT draw in this function
MyGame.prototype.update = function () {
  this.mHero.update();
  this.mMinionSet.update();
  this.mDyePack.update();
};

MyGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kMinionSprite);

    var nextLevel = new GameOver();  // next level to be loaded
    gEngine.Core.startScene(nextLevel);
};
