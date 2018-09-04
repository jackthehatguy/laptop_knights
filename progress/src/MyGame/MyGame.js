'use strict';

function MyGame() {
  // textures
  this.kMinionSprite = 'assets/minion_sprite.png';
  this.kMinionCollector = 'assets/minion_collector.png';
  this.kMinionPortal = 'assets/minion_portal.png';

  // fonts

  // camera
  this.mCamera = null;

  // renderables
  this.mPortal = null;
  this.mCollector = null;

  // text renderables
  this.mMsg = null;

  // audio
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
  // textures
  gEngine.Textures.loadTexture(this.kMinionSprite);
  gEngine.Textures.loadTexture(this.kMinionCollector);
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
  this.mDyePack = new DyePack(this.kMinionSprite);
  this.mDyePack.setVisibility(false);

  this.mCollector = new TextureObject(this.kMinionCollector, 50, 30, 30, 30);
  this.mPortal = new TextureObject(this.kMinionPortal, 70, 30, 10, 10);

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
  this.mCollector.draw(this.mCamera);
  this.mPortal.draw(this.mCamera);
  this.mDyePack.draw(this.mCamera);
  this.mMsg.draw(this.mCamera);
};

// do NOT draw in this function
MyGame.prototype.update = function () {
  var msg = 'No Collision';

  let keys = gEngine.Input.keys;

  this.mCollector.update(keys.W, keys.S, keys.A, keys.D, keys.Q, keys.E);
  this.mPortal.update(keys.I, keys.K, keys.J, keys.L, keys.U, keys.O);

  var h = [];

  // check the small sprite, not the big one
  if (this.mPortal.pixelTouches(this.mCollector, h)) {
    msg = `Collided!: (${h[0].toPrecision(4)} ${h[1].toPrecision(4)})`;
    this.mDyePack.setVisibility(true);
    this.mDyePack.getXform().setPosition(h[0], h[1]);
  } else {
    this.mDyePack.setVisibility(false);
  }

  this.mMsg.setText(msg);
};

MyGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kMinionSprite);
    gEngine.Textures.unloadTexture(this.kMinionPortal);
    gEngine.Textures.unloadTexture(this.kMinionCollector);

    var nextLevel = new GameOver();  // next level to be loaded
    gEngine.Core.startScene(nextLevel);
};
