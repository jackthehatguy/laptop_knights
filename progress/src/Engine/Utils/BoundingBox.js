'use strict';

function BoundingBox(centerPos, w, h) {
  this.mLL = vec2.fromValues(0, 0);
  this.setBounds(centerPos, w, h);
}

BoundingBox.prototype.setBounds = function (centerPos, w, h) {
  this.mWidth = w;
  this.mHeight = h;
  this.mLL[0] = centerPos[0] - (w / 2);
  this.mLL[1] = centerPos[1] - (h / 2);
};

BoundingBox.prototype.containsPoint = function (x, y) {
  return (
    (x > this.minX()) &&
    (x < this.maxX()) &&
    (y > this.minY()) &&
    (y < this.maxY())
  );
};

BoundingBox.prototype.intersectsBound = function (otherBound) {
  return (
    (this.minX() < otherBound.maxX()) &&
    (this.maxX() > otherBound.minX()) &&
    (this.minY() < otherBound.maxY()) &&
    (this.maxY() > otherBound.minY())
  );
};

BoundingBox.prototype.boundCollideStatus = function (otherBound) {
  var status = BoundingBox.eBoundCollideStatus.eOutside;
  if (this.intersectsBound(otherBound)) {
    if (otherBound.minX() < this.minX()) status |= BoundingBox.eBoundCollideStatus.eCollideLeft;
    if (otherBound.maxX() > this.maxX()) status |= BoundingBox.eBoundCollideStatus.eCollideRight;
    if (otherBound.minY() < this.minY()) status |= BoundingBox.eBoundCollideStatus.eCollideBottom;
    if (otherBound.maxY() > this.maxY()) status |= BoundingBox.eBoundCollideStatus.eCollideTop;

    if (status === BoundingBox.eBoundCollideStatus.eOutside) status = BoundingBox.eBoundCollideStatus.eInside;
  }
  return status;
};

BoundingBox.prototype.minX = function () { return this.mLL[0]; };
BoundingBox.prototype.maxX = function () { return this.mLL[0] + this.mWidth; };
BoundingBox.prototype.minY = function () { return this.mLL[1]; };
BoundingBox.prototype.maxY = function () { return this.mLL[1] + this.mHeight; };

BoundingBox.eBoundCollideStatus = Object.freeze({
  eCollideLeft: 1,
  eCollideRight: 2,
  eCollideTop: 4,
  eCollideBottom: 8,
  eInside: 16,
  eOutside: 0
});
