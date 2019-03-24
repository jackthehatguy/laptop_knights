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
  light.setLightCastShadowTo(true);

  return light;
};

MyGame.prototype._initializeLights = function () {
  this.mGlobalLightSet = new LightSet();
  let l;

  l = this._createALight(
    Light.eLightType.ePointLight, // type
    [20, 25, 10],                 // position
    [0, 0, -1],                   // direction: not used
    [1, 0.8, 0.5, 1],             // color
    8, 20,                        // near & far
    0.1, 0.2,                     // inner & outer cones: not used
    3,                            // intensity
    1.0                           // drop off: not used
  );
  this.mGlobalLightSet.addToSet(l);

  l = this._createALight(
    Light.eLightType.eDirectionalLight, // type
    [0, 0, 0],                          // position: not used
    [0.4, 0.4, -1],                     // direction
    [0.3, 0.3, 0.3, 1],                 // color
    0, 0,                               // near & far: not used
    0, 0,                               // inner & outer cones: not used
    2,                                  // intensity
    0                                   // drop-off: not used
  );
  l.setLightTo(false);  // turns off light
  this.mGlobalLightSet.addToSet(l);

  l = this._createALight(
    Light.eLightType.eSpotLight,  // type
    [65, 25, 12],                 // position
    [0, 0, -1],                   // direction
    [0.5, 0.5, 0.5, 1],           // color
    10, 25,                       // near & far
    1.5, 2.2,                     // inner & outer cones
    5,                            // intensity
    1.2                           // drop-off
  );
  this.mGlobalLightSet.addToSet(l);

  l = this._createALight(
    Light.eLightType.eSpotLight,
    [60, 50, 12],
    [0.02, -0.02, -1],
    [0.8, 0.8, 0.2, 1],
    20, 40,
    1.2, 1.3,
    2,
    1.5
  );
  this.mGlobalLightSet.addToSet(l);
};

// added by Spencer
MyGame.prototype._applyAllLights = function (...renderables) {
  this.mGlobalLightSet.mSet.map(lgt => renderables.map(renderable => renderable.addLight(lgt)));
};
