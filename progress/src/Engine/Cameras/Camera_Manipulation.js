'use strict';

Camera.prototype.update = function () { this.mCameraState.updateCameraState(); };

Camera.prototype.panBy = function (dx, dy) {
  var newC = vec2.clone(this.getWCCenter());
  this.mWCCenter[0] += dx;
  this.mWCCenter[1] += dy;
  this.mCameraState.setCenter(newC);
};

Camera.prototype.panTo = function (cx, cy) { this.setWCCenter(cx, cy); };

Camera.prototype.panWith = function (aXform, zone) {
  var status = this.collideWCBound(aXform, zone);
  if (status !== BoundingBox.eBoundCollideStatus.eInside) {
    var pos = aXform.getPosition();
    var newC = vec2.clone(this.getWCCenter());
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
    this.mCameraState.setCenter(newC);
  }
};

Camera.prototype.zoomBy = function (zoom) { if (zoom > 0) this.setWCWidth(this.getWCWidth() * zoom); };

Camera.prototype.zoomTowards = function (pos, zoom) {
  var delta = [];
  var newC = [];
  vec2.sub(delta, pos, this.getWCCenter());
  vec2.scale(delta, delta, zoom - 1);
  vec2.sub(newC, this.getWCCenter(), delta);
  this.zoomBy(zoom);
  this.mCameraState.setCenter(newC);
};

Camera.prototype.configInterpolation = function (stiffness, duration) {
  this.mCameraState.configInterpolation(stiffness, duration);
};
