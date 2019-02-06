function IllumRenderable(myTexture, myNormalMap) {
  LightRenderable.call(this, myTexture);
  Renderable.prototype._setShader.call(this, gEngine.DefaultResources.getIllumShader());

  this.mNormalMap = myNormalMap;
}
gEngine.Core.inheritPrototype(IllumRenderable, LightRenderable);

IllumRenderable.prototype.draw = function (aCamera) {
  gEngine.Textures.activateNormalMap(this.mNormalMap);
  LightRenderable.prototype.draw.call(this, aCamera);
};
