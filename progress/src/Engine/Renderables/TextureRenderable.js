'use strict';

function TextureRenderable(myTexture) {
  Renderable.call(this);
  Renderable.prototype.setColor.call(this, [1, 1, 1, 0]); // alpha 0 (no tint)
  Renderable.prototype._setShader.call(this, gEngine.DefaultResources.getTextureShader());
  this.mTexture = myTexture;  // object's texture cannot be null
}
gEngine.Core.inheritPrototype(TextureRenderable, Renderable);

TextureRenderable.prototype.draw = function (vpMatrix) {
  // activate texture
  gEngine.Textures.activateTexture(this.mTexture);
  Renderable.prototype.draw.call(this, vpMatrix);
};

TextureRenderable.prototype.getTexture = function () { return this.mTexture; };
TextureRenderable.prototype.setTexture = function (t) { this.mTexture = t; };
