'use strict';

function SpriteRenderable(myTexture) {
  TextureRenderable.call(this, myTexture);
  Renderable.prototype._setShader.call(this, gEngine.DefaultResources.getSpriteShader());

  // boundaries of texture coords
  this.mTexLeft = 0.0;
  this.mTexRight = 1.0;
  this.mTexTop = 1.0;
  this.mTexBottom = 0.0;

  this._setTexInfo();
}
gEngine.Core.inheritPrototype(SpriteRenderable, TextureRenderable);

// expected texture coord[] : float[8]
// [0][1] top-right
// [2][3] top-left
// [4][5] bottom-right
// [6][7] bottom-left
SpriteRenderable.eTexCoordArray = Object.freeze({
  eLeft: 2,
  eRight: 0,
  eTop: 1,
  eBottom: 5
});

SpriteRenderable.prototype.setElementUVCoordinate = function (left, right, bottom, top) {
  this.mTexLeft = left;
  this.mTexRight = right;
  this.mTexBottom = bottom;
  this.mTexTop = top;
  this._setTexInfo();
};

SpriteRenderable.prototype.setElementPixelPositions = function (left, right, bottom, top) {
  var texInfo = gEngine.ResourceMap.retrieveAsset(this.mTexture);

  // entire image width and height
  var imageW = texInfo.mWidth;
  var imageH = texInfo.mHeight;

  this.mTexLeft = left / imageW;
  this.mTexRight = right / imageW;
  this.mTexBottom = bottom / imageH;
  this.mTexTop = top / imageH;

  this._setTexInfo();
};

SpriteRenderable.prototype.getElementUVCoordinateArray = function () {
  // (x, y): tr, tl, br, bl
  return [
    this.mTexRight, this.mTexTop,
    this.mTexLeft, this.mTexTop,
    this.mTexRight, this.mTexBottom,
    this.mTexLeft, this.mTexBottom
  ];
};

SpriteRenderable.prototype.draw = function (pixelColor, vpMatrix) {
  this.mShader.setTextureCoordinate(this.getElementUVCoordinateArray());
  TextureRenderable.prototype.draw.call(this, pixelColor, vpMatrix);
};
