'use strict';

MyGame.prototype._createALight = function (pos, color, near, far, intensity) {
  var light = new Light();
  light.setColor(color);
  light.setPos(pos);
  light.setRadius(near, far);
  light.setIntensity(intensity);

  return light;
};

MyGame.prototype._initializeLights = function () {
  this.mGlobalLightSet = new LightSet();

  var l = this._createALight(
    [21, 58, 5],        // position
    [0.2, 0.2, 0.8, 1], // color
    20,                 // near
    50,                 // far
    5.5                 // intensity
  );
  this.mGlobalLightSet.addToSet(l);

  l = this._createALight(
    [24, 24, 8],        // position
    [0.4, 0.7, 0.4, 1], // color
    20,                 // near
    45,                 // far
    2.8                 // intensity
  );
  this.mGlobalLightSet.addToSet(l);

  l = this._createALight(
    [66, 23, 10],       // position
    [0.7, 0.7, 0.7, 1], // color
    10,                 // near
    35,                 // far
    3                   // intensity
  );
  this.mGlobalLightSet.addToSet(l);

  l = this._createALight(
    [72, 57, 6],        // position
    [0.8, 0.6, 0.6, 1], // color
    15,                 // near
    40,                 // far
    3                   // intensity
  );
  this.mGlobalLightSet.addToSet(l);
};

MyGame.prototype._applyAllLights = function (renderable) {
  for (let i = 0; i < 4; i++) renderable.addLight(this.mGlobalLightSet.getLightAt(i));
};