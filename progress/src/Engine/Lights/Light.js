function Light() {
  this.mColor = vec4.fromValues(0.1, 0.1, 0.1, 1);
  this.mPosition = vec3.fromValues(0, 0, 5);
  this.mNear = 5;
  this.mFar = 10;
  this.mIntensity = 1;
  this.mIsOn = true;
}

Light.prototype.setColor = function (c) { this.mColor = vec4.clone(c); };
Light.prototype.getColor = function () { return this.mColor; };

Light.prototype.set2DPosition = function (p) { this.mPosition = vec3.fromValues(p[0], p[1], this.mPosition[2]); };
Light.prototype.setXPos = function (x) { this.mPosition[0] = x; };
Light.prototype.setYPos = function (y) { this.mPosition[1] = y; };
Light.prototype.setZPos = function (z) { this.mPosition[2] = z; };
Light.prototype.getPosition = function () { return this.mPosition; };
// Spencer added this
Light.prototype.setPos = function (p) {
  this.setXPos(p[0]);
  this.setYPos(p[1]);
  this.setZPos(p[2]);
};

Light.prototype.setNear = function (x) { this.mNear = x; };
Light.prototype.getNear = function () { return this.mNear; };

Light.prototype.setFar = function (x) { this.mFar = x; };
Light.prototype.getFar = function () { return this.mFar; };

// Spencer added these
Light.prototype.setRadius = function (near, far) {
  this.setNear(near);
  this.setFar(far);
};
Light.prototype.getRadius = function () {
  return {
    near: this.getNear(),
    far: this.getFar()
  }
};

Light.prototype.setIntensity = function (i) { this.mIntensity = i; };
Light.prototype.getIntensity = function () { return this.mIntensity; };

Light.prototype.setLightTo = function (isOn) { this.mIsOn = isOn; };
Light.prototype.isLightOn = function () { return this.mIsOn; };
