'use strict';

function GameObject(renderableObj) {
  this.mRenderComponent = renderableObj;
  this.mVisible = true;
  this.mCurrentFrontDir = vec2.fromValues(0, 1);
  this.mSpeed = 0;
}

GameObject.prototype.getXform = function () { return this.mRenderComponent.getXform(); };
GameObject.prototype.setVisibility = function (f) { this.mVisible = f; };
GameObject.prototype.isVisible = function () { return this.mVisible; };

GameObject.prototype.setSpeed = function (s) { this.mSpeed = s; };
GameObject.prototype.getSpeed = function () { return this.mSpeed; };
GameObject.prototype.incSpeedBy = function (delta) { this.mSpeed += delta; };

GameObject.prototype.setCurrentFrontDir = function (f) { vec2.normalize(this.mCurrentFrontDir, f); };
GameObject.prototype.getCurrentFrontDir = function () { return this.mCurrentFrontDir; };

GameObject.prototype.getRenderable = function () { return this.mRenderComponent; };

GameObject.prototype.getBBox = function () {
  var xform = this.getXform();
  var b = new BoundingBox(xform.getPosition(), xform.getWidth(), xform.getHeight());
  return b;
};

GameObject.prototype.update = function () {
  // simple default behavior
  var pos = this.getXform().getPosition();
  vec2.scaleAndAdd(pos, pos, this.getCurrentFrontDir(), this.getSpeed());
};
GameObject.prototype.draw = function (aCamera) { if (this.isVisible()) this.mRenderComponent.draw(aCamera); };

GameObject.prototype.rotateObjPointTo = function (p, rate) {
  // a: has reached dest?
  var dir = [];
  vec2.sub(dir, p, this.getXform().getPosition());
  var len = vec2.length(dir);
  if (len < Number.MIN_VALUE) return;
  vec2.scale(dir, dir, 1 / len);  // div by zero error?

  // b: compute angle
  var fdir = this.getCurrentFrontDir();
  var cosTheta = vec2.dot(dir, fdir);
  if (cosTheta > 0.999999) return;

  // c: clamp theta to -1 to 1
  // TODO: ? change to ternary
  if (cosTheta > 1) {
    cosTheta = 1;
  } else if (cosTheta < -1) {
    cosTheta = -1;
  }

  // d: clockwise?
  var dir3d = vec3.fromValues(dir[0], dir[1], 0);
  var f3d = vec3.fromValues(fdir[0], fdir[1], 0);
  var r3d = [];
  vec3.cross(r3d, f3d, dir3d);

  var rad = Math.acos(cosTheta);
  if (r3d[2] < 0) rad = -rad;

  // e: rotate
  rad *= rate;
  vec2.rotate(this.getCurrentFrontDir(), this.getCurrentFrontDir(), rad);
  this.getXform().incRotationByRad(rad);
};
