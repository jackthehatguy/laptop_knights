'use strict';

MyGame.prototype._createALight = function (type, pos, dir, color, n, f, inner, outer, intensity, dropOff) {
  var light = new Light();
  
  light.setLightType(type);
  light.setColor(color);
  light.setXPos(pos[0]);
  light.setYPos(pos[1]);
  light.setZPos(pos[2]);
  light.setDirection(dir);
  light.setNear(n);
  light.setFar(f);
  light.setInner(inner);
  light.setOuter(outer);
  light.setIntensity(intensity);
  light.setDropOff(dropOff);

  return light;
};

MyGame.prototype._initializeLights = function () {
  this.mGlobalLightSet = new LightSet();
  let l;

  l = this._createALight(
    Light.eLightType.ePointLight, // type
    [15, 50, 5],                  // position
    [0, 0, -1],                   // direction
    [1.0, 0.0, 0.0, 1],           // color
    8, 20,                        // near & far
    0.1, 0.2,                     // inner & outer cones
    5,                            // intensity
    1.0                           // drop off
  );
  this.mGlobalLightSet.addToSet(l);

  l = this._createALight(
    Light.eLightType.eDirectionalLight,
    [15, 50, 4],
    [-0.2, -0.2, -1],
    [0.5, 0.5, 0.5, 1],
    500, 500,
    0.1, 0.2,
    2,
    1.0
  );
  this.mGlobalLightSet.addToSet(l);

  l = this._createALight(
    Light.eLightType.eSpotLight,
    [80, 18, 10],
    [-0.07, 0, -1],
    [0.0, 0.0, 1.0, 1],
    100, 100,
    1.65, 1.7,
    5,
    1.2         
  );
  this.mGlobalLightSet.addToSet(l);

  l = this._createALight(
    Light.eLightType.eSpotLight,
    [64, 43, 10],
    [0.0, 0.03, -1],
    [0.0, 1.0, 0.0, 1],
    100, 100,
    1.9, 2.0,
    2,
    1
  );
  this.mGlobalLightSet.addToSet(l);
};

MyGame.prototype._applyAllLights = function (renderable) {
  for (let i = 0; i < this.mGlobalLightSet.mSet.length; i++) renderable.addLight(this.mGlobalLightSet.getLightAt(i));
};
