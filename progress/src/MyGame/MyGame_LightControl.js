'use strict';

MyGame.prototype._lightControl = function () {
  var 
    delta = 0.2,
    msg = ``;

  this._selectLight();

  var
    lgt = this.mGlobalLightSet.getLightAt(this.mLgtIndex),
    p = lgt.getPosition();
  
  let
    input = gEngine.Input,
    keys = input.keys,
    kpressed = input.isKeyPressed,
    kclicked = input.isKeyClicked;

  // TODO: make more DRY
  // Position
  if (kpressed(keys.Left)) lgt.setXPos(p[0] - delta);
  if (kpressed(keys.Right)) lgt.setXPos(p[0] + delta);
  if (kpressed(keys.Up)) lgt.setYPos(p[1] + delta);
  if (kpressed(keys.Down)) lgt.setYPos(p[1] - delta);
  if (kpressed(keys.Z)) lgt.setZPos(p[2] + delta);
  if (kpressed(keys.X)) lgt.setZPos(p[2] - delta);
  
  // Radius
  if (kpressed(keys.C)) lgt.setNear(lgt.getNear() + delta);
  if (kpressed(keys.V)) lgt.setNear(lgt.getNear() - delta);
  if (kpressed(keys.B)) lgt.setFar(lgt.getFar() + delta);
  if (kpressed(keys.N)) lgt.setFar(lgt.getFar() - delta);

  // Intensity
  if (kpressed(keys.K)) lgt.setIntensity(lgt.getIntensity() + delta);
  if (kpressed(keys.L)) lgt.setIntensity(lgt.getIntensity() - delta);

  // on/off
  if (kclicked(keys.H)) lgt.setLightTo(!lgt.isLightOn());

  msg = `[${lgt.isLightOn() ? 'On' : 'Off'}] ` +
    `${this._printVec3("P", p)} ` +
    `R(${lgt.getNear().toFixed(1)}/${lgt.getFar().toFixed(1)}) ` +
    `I(${lgt.getIntensity().toFixed(1)})`;
  return msg;
};

MyGame.prototype._selectLight = function () {
  let
    input = gEngine.Input,
    keys = input.keys,
    kclicked = input.isKeyClicked;

  if (kclicked(keys.Zero)) this.mLgtIndex = 0;
  if (kclicked(keys.One)) this.mLgtIndex = 1;
  if (kclicked(keys.Two)) this.mLgtIndex = 2;
  if (kclicked(keys.Three)) this.mLgtIndex = 3;
}

MyGame.prototype._printVec3 = function (msg, p) { return `${msg}(${p[0].toFixed(1)} ${p[1].toFixed(1)} ${p[2].toFixed(1)})`; };
