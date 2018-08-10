"use strict";

function Camera(wcCenter, wcWidth, viewportArray) {
  // WorldCoordinate and viewport pos and size
  this.mWCCenter = wcCenter;
  this.mWCWidth = wcWidth;
  this.mViewport = viewportArray; // [x, y, width, height]
  this.mNearPlane = 0;
  this.mFarPlane = 1000;

  // transformation matrices
  this.mViewMatrix = mat4.create();
  this.mProjMatrix = mat4.create();
  this.mVPMatrix = mat4.create();

  // background color
  this.mBgColor = [0.8, 0.8, 0.8, 1]; // RGBA
}

Camera.prototype.setWCCenter = function (xPos, yPos) {
  this.mWCCenter[0] = xPos;
  this.mWCCenter[1] = yPos;
};
Camera.prototype.getWCCenter = function () { return this.mWCCenter; };

Camera.prototype.setWCWidth = function (width) { this.mWCWidth = width; };

Camera.prototype.setViewport = function (viewportArray) { this.mViewport = viewportArray; };
Camera.prototype.getViewport = function () { return this.mViewport; };

Camera.prototype.setBackgroundColor = function (newColor) { this.mBgColor = newColor; };
Camera.prototype.getBackgroundColor = function () { return this.mBgColor; };

Camera.prototype.getVPMatrix = function () { return this.mVPMatrix; };

Camera.prototype.setupViewProjection = function () {
  var gl = gEngine.Core.getGL();

  // 0: config vp; set up and clear the vp
  // set up the area on the canvas
  gl.viewport(
    this.mViewport[0],  // x pos bottom left
    this.mViewport[1],  // y pos bottom right
    this.mViewport[2],  // width
    this.mViewport[3]   // height
  );

  // scissor area
  gl.scissor(
    this.mViewport[0],  // x pos bottom left
    this.mViewport[1],  // y pos bottom right
    this.mViewport[2],  // width
    this.mViewport[3]   // height
  );

  // color clear
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
  mat4.lookAt(
    this.mViewMatrix,
    [this.mWCCenter[0], this.mWCCenter[1], 10], // WC center
    [this.mWCCenter[0], this.mWCCenter[1], 0],
    [0, 1, 0]                                   // orientation
  );

  // def proj matrix
  var halfWCWidth = 0.5 * this.mWCWidth;
  var halfWCHeight = halfWCWidth * this.mViewport[3] / this.mViewport[2]; // wcH = wcW*vpH/vpW
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
};
