'use strict';

Camera.prototype.panBy = function (dx, dy) {
  this.mWCCenter[0] += dx;
  this.mWCCenter[1] += dy;
};

Camera.prototype.panTo = function (cx, cy) { this.setWCCenter(cx, cy); };

Camera.prototype.panWith = function (aXform, zone) {
  var status = this.collideWCBound(aXform, zone);
  if (status !== BoundingBox.eBoundCollideStatus.eInside) {
    var pos = aXform.getPosition();
    var newC = this.getWCCenter();
    if ((status & BoundingBox.eBoundCollideStatus.eCollideTop) !== 0) {
      newC[1] = pos[1] + (aXform.getHeight() / 2) - (zone * this.getWCHeight() / 2);
    }
    if ((status & BoundingBox.eBoundCollideStatus.eCollideBottom) !== 0) {
      newC[1] = pos[1] - (aXform.getHeight() / 2) + (zone * this.getWCHeight() / 2);
    }
    if ((status & BoundingBox.eBoundCollideStatus.eCollideRight) !== 0) {
      newC[0] = pos[0] + (aXform.getWidth() / 2) - (zone * this.getWCWidth() / 2);
    }
    if ((status & BoundingBox.eBoundCollideStatus.eCollideLeft) !== 0) {
      newC[0] = pos[0] - (aXform.getWidth() / 2) + (zone * this.getWCWidth() / 2);
    }
  }
};

Camera.prototype.zoomBy = function (zoom) { if (zoom > 0) this.mWCWidth *= zoom; };

Camera.prototype.zoomTowards = function (pos, zoom) {
  var delta = [];
  vec2.sub(delta, pos, this.mWCCenter);
  vec2.scale(delta, delta, zoom - 1);
  vec2.sub(this.mWCCenter, this.mWCCenter, delta);
  this.zoomBy(zoom);
};
