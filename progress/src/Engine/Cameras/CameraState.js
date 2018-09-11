'use strict';

function CameraState(center, width) {
  this.kCycles = 300;     // number of cycles to complete the transition
  this.kRate = 0.1;       // rate of change for each cycle
  this.mCenter = new InterpolateVec2(center, this.kCycles, this.kRate);
  this.mWidth = new Interpolate(width, this.kCycles, this.kRate);
}

CameraState.prototype.getCenter = function () { return this.mCenter.getValue(); };
CameraState.prototype.setCenter = function (c) { this.mCenter.setFinalValue(c); };

CameraState.prototype.getWidth = function () { return this.mWidth.getValue(); };
CameraState.prototype.setWidth = function (w) { this.mWidth.setFinalValue(w); };

CameraState.prototype.updateCameraState = function () {
  this.mCenter.updateInterpolation();
  this.mWidth.updateInterpolation();
};

CameraState.prototype.configInterpotaion = function (stiffness, duration) {
  this.mCenter.configInterpotaion(stiffness, duration);
  this.mWidth.configInterpotaion(stiffness, duration);
};
