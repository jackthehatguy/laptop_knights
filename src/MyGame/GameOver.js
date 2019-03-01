'use strict';

function GameOver() {
  this.mCamera = null;
  this.mMsg = null;
}
gEngine.Core.inheritPrototype(GameOver, Scene);

GameOver.prototype.initialize = function () {
  this.mCamera = new Camera(
    vec2.fromValues(50, 37.5),
    100,
    [0, 0, 640, 480]
  );
  this.mCamera.setBackgroundColor([0, 0, 0, 1]);

  this.mMsg = new FontRenderable('Thanks for Playing!');
  this.mMsg.setColor([1, 1, 1, 1]);
  this.mMsg.getXform().setPosition(15, 40);
  this.mMsg.setTextHeight(6.7);
};

GameOver.prototype.draw = function () {
  gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1]);

  this.mCamera.setupViewProjection();
  this.mMsg.draw(this.mCamera);
};

GameOver.prototype.update = function () { gEngine.GameLoop.stop(); };

GameOver.prototype.unloadScene = function () { gEngine.Core.cleanUp(); };
