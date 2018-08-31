'use strict';

function GameObject(renderableObj) {
  this.mRenderComponent = renderableObj;
}

GameObject.prototype.getXform = function () { return this.mRenderComponent.getXform(); };

GameObject.prototype.update = function () { };

GameObject.prototype.getRenderable = function () { return this.mRenderComponent; };

GameObject.prototype.draw = function (aCamera) { this.mRenderComponent.draw(aCamera); };
