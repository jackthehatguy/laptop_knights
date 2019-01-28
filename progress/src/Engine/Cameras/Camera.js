'use strict';

function PerRenderCache() {
  this.mWCToPixelRatio = 1;
  this.mCameraOrgX = 1;
  this.mCameraOrgY = 1;
}

function Camera(wcCenter, wcWidth, viewportArray, bound) {
  // WorldCoordinate and viewport pos and size
  this.mCameraState = new CameraState(wcCenter, wcWidth);
  this.mCameraShake = null;

  this.mViewport = []; // [x, y, width, height]
  this.mViewportBound = 0;
  if (bound !== undefined) {
    this.mViewportBound = bound;
  }
  this.mScissorBound = [];
  this.setViewport(viewportArray, this.mViewportBound);

  this.mNearPlane = 0;
  this.mFarPlane = 1000;

  // transformation matrices
  this.mViewMatrix = mat4.create();
  this.mProjMatrix = mat4.create();
  this.mVPMatrix = mat4.create();

  // background color
  this.mBgColor = [0.8, 0.8, 0.8, 1]; // RGBA

  // per render cached info
  // updates every setupViewProjection
  this.mRenderCache = new PerRenderCache();
}

Camera.eViewport = Object.freeze({
  eOrgX: 0,
  eOrgY: 1,
  eWidth: 2,
  eHeight: 3
});

// HACK: more terse?
Camera.prototype.setWCCenter = function (xPos, yPos) {
  var p = vec2.fromValues(xPos, yPos);
  this.mCameraState.setCenter(p);
};
Camera.prototype.getWCCenter = function () { return this.mCameraState.getCenter(); };

Camera.prototype.setWCWidth = function (width) { this.mCameraState.setWidth(width); };
Camera.prototype.getWCWidth = function () { return this.mCameraState.getWidth(); };

// there is no setter for height (must keep ratio w/ width)
Camera.prototype.getWCHeight = function () { return this.mCameraState.getWidth() * this.mViewport[Camera.eViewport.eHeight] / this.mViewport[Camera.eViewport.eWidth]; };

Camera.prototype.setViewport = function (viewportArray, bound) {
  if (bound === undefined) {
    bound = this.mViewportBound;
  }

  this.mViewport[0] = viewportArray[0] + bound;         // x
  this.mViewport[1] = viewportArray[1] + bound;         // y
  this.mViewport[2] = viewportArray[2] - (2 * bound);   // width
  this.mViewport[3] = viewportArray[3] - (2 * bound);   // height

  this.mScissorBound[0] = viewportArray[0];   // x
  this.mScissorBound[1] = viewportArray[1];   // y
  this.mScissorBound[2] = viewportArray[2];   // width
  this.mScissorBound[3] = viewportArray[3];   // height
};
Camera.prototype.getViewport = function () {
  var out = [];
  out[0] = this.mScissorBound[0];
  out[1] = this.mScissorBound[1];
  out[2] = this.mScissorBound[2];
  out[3] = this.mScissorBound[3];
  return out;
};

Camera.prototype.setBackgroundColor = function (newColor) { this.mBgColor = newColor; };
Camera.prototype.getBackgroundColor = function () { return this.mBgColor; };

Camera.prototype.getVPMatrix = function () { return this.mVPMatrix; };

Camera.prototype.setupViewProjection = function () {
  var gl = gEngine.Core.getGL();

  // 0: config vp; set up and clear the vp
  gl.viewport(
    this.mViewport[0],  // x pos bottom left
    this.mViewport[1],  // y pos bottom right
    this.mViewport[2],  // width
    this.mViewport[3]   // height
  );

  gl.scissor(
    this.mScissorBound[0],  // x pos bottom left
    this.mScissorBound[1],  // y pos bottom right
    this.mScissorBound[2],  // width
    this.mScissorBound[3]   // height
  );

  gl.clearColor(
    this.mBgColor[0], // r
    this.mBgColor[1], // g
    this.mBgColor[2], // b
    this.mBgColor[3]  // a
  );

  // cut w/ scissors
  gl.enable(gl.SCISSOR_TEST);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.disable(gl.SCISSOR_TEST);

  // 1: define v-proj matrix
  // def view matrix
  var center = [];
  if (this.mCameraShake !== null) {
    center = this.mCameraShake.getCenter();
  } else {
    center = this.getWCCenter();
  }

  mat4.lookAt(
    this.mViewMatrix,
    [center[0], center[1], 10], // WC center
    [center[0], center[1], 0],
    [0, 1, 0]                   // orientation
  );

  // def proj matrix
  var halfWCWidth = 0.5 * this.getWCWidth();
  var halfWCHeight = 0.5 * this.getWCHeight();
  mat4.ortho(
    this.mProjMatrix,
    -halfWCWidth,     // dist left
    halfWCWidth,      // dist right
    -halfWCHeight,    // dist bottom
    halfWCHeight,     // dist top
    this.mNearPlane,  // z-dist near
    this.mFarPlane    // z-dist far
  );

  // concat view & proj matrices
  mat4.multiply(this.mVPMatrix, this.mProjMatrix, this.mViewMatrix);

  // compute and cache per-render info
  this.mRenderCache.mWCToPixelRatio = this.mViewport[Camera.eViewport.eWidth] / this.getWCWidth();
  this.mRenderCache.mCameraOrgX = center[0] - (this.getWCWidth()/2);
  this.mRenderCache.mCameraOrgY = center[1] - (this.getWCHeight()/2);
};

Camera.prototype.collideWCBound = function (aXform, zone) {
  var bbox = new BoundingBox(aXform.getPosition(), aXform.getWidth(), aXform.getHeight());
  var w = zone * this.getWCWidth();
  var h = zone * this.getWCHeight();
  var cameraBound = new BoundingBox(this.getWCCenter(), w, h);
  return cameraBound.boundCollideStatus(bbox);
};

Camera.prototype.clampAtBoundary = function (aXform, zone) {
  var status = this.collideWCBound(aXform, zone);
  if (status !== BoundingBox.eBoundCollideStatus.eInside) {
    var pos = aXform.getPosition();
    if ((status & BoundingBox.eBoundCollideStatus.eCollideTop) !== 0) {
      pos[1] = (this.getWCCenter())[1] + (zone * this.getWCHeight() / 2) - (aXform.getHeight() / 2);
    }
    if ((status & BoundingBox.eBoundCollideStatus.eCollideBottom) !== 0) {
      pos[1] = (this.getWCCenter())[1] - (zone * this.getWCHeight() / 2) + (aXform.getHeight() / 2);
    }
    if ((status & BoundingBox.eBoundCollideStatus.eCollideRight) !== 0) {
      pos[0] = (this.getWCCenter())[0] + (zone * this.getWCWidth() / 2) - (aXform.getWidth() / 2);
    }
    if ((status & BoundingBox.eBoundCollideStatus.eCollideLeft) !== 0) {
      pos[0] = (this.getWCCenter())[0] - (zone * this.getWCWidth() / 2) + (aXform.getWidth() / 2);
    }
  }
  return status;
};
