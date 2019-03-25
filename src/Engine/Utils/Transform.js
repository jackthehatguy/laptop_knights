'use strict';

function Transform() {
  this.mPosition = vec2.fromValues(0, 0); // Translation operator
  this.mScale = vec2.fromValues(1, 1);    // Scaling operator
  this.mZ = 0.0;                          // must be positive; larger is closer to eye
  this.mRotationInRad = 0.0;              // Rotation in radians
}

Transform.prototype.cloneTo = function (aXform) {
  aXform.mPosition = vec2.clone(this.mPosition);
  aXform.mScale = vec2.clone(this.mScale);
  aXform.mZ = this.mZ;
  aXform.mRotationInRad = this.mRotationInRad;
};

//=====Position=================================================================
Transform.prototype.getPosition = function () { return this.mPosition; };
Transform.prototype.setPosition = function (xPos, yPos) {
  this.setXPos(xPos);
  this.setYPos(yPos);
};

Transform.prototype.get3DPosition = function () {
  return vec3.fromValues(this.getXPos(), this.getYPos(), this.getZPos());
};

Transform.prototype.getXPos = function () { return this.mPosition[0]; };
Transform.prototype.setXPos = function (xPos) { this.mPosition[0] = xPos; };
Transform.prototype.incXPosBy = function (delta) { this.mPosition[0] += delta; };

Transform.prototype.getYPos = function () { return this.mPosition[1]; };
Transform.prototype.setYPos = function (yPos) { this.mPosition[1] = yPos; };
Transform.prototype.incYPosBy = function (delta) { this.mPosition[1] += delta; };

Transform.prototype.getZPos = function () { return this.mZ; };
Transform.prototype.setZPos = function (zPos) { this.mZ = zPos; };
Transform.prototype.incZPosBy = function (delta) { this.mZ += delta; };

//=====Scale====================================================================
Transform.prototype.setSize = function (width, height) {
  this.setWidth(width);
  this.setHeight(height);
};
Transform.prototype.getSize = function () { return this.mScale; };
Transform.prototype.incSizeBy = function (delta) {
  this.incWidthBy(delta);
  this.incHeightBy(delta);
};

Transform.prototype.getWidth = function () { return this.mScale[0]; };
Transform.prototype.setWidth = function (width) { this.mScale[0] = width; };
Transform.prototype.incWidthBy = function (delta) { this.mScale[0] += delta };

Transform.prototype.getHeight = function () { return this.mScale[1]; };
Transform.prototype.setHeight = function (height) { this.mScale[1] = height; };
Transform.prototype.incHeightBy = function (delta) { this.mScale[1] += delta };

//=====Rotation=================================================================
Transform.prototype.getRotationInRad = function () { return this.mRotationInRad; };
Transform.prototype.setRotationInRad = function (rotationInRadians) {
  this.mRotationInRad = rotationInRadians;
  while (this.mRotationInRad > (2 * Math.PI)) this.mRotationInRad -= (2 * Math.PI);
};
Transform.prototype.incRotationByRad = function (delta) { this.setRotationInRad(this.mRotationInRad + delta); };

Transform.prototype.getRotationInDegree = function () { return this.mRotationInRad * 180.0 / Math.PI; };
Transform.prototype.setRotationInDegree = function (rotationInDegree) { this.setRotationInRad(rotationInDegree * Math.PI / 180.0); };
Transform.prototype.incRotationByDegree = function (delta) { this.incRotationByRad(delta * Math.PI / 180.0); };

Transform.prototype.getXform = function () {
  // create blank entity matrix
  var matrix = mat4.create();

  // 0: compute translation
  mat4.translate(matrix, matrix, this.get3DPosition());

  // 1: concat w/ rotation
  mat4.rotateZ(matrix, matrix, this.getRotationInRad());

  // 2: concat w/ scaling
  mat4.scale(matrix, matrix, vec3.fromValues(this.getWidth(), this.getHeight(), 1.0));

  return matrix;
};
