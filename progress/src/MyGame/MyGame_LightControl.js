'use strict';

MyGame.prototype._lightControl = function () {
  var
    dirDelta = 0.005,
    delta = 0.2,
    msg = ``;

  this._selectLight();

  var
    lgt = this.mGlobalLightSet.getLightAt(this.mLgtIndex),
    p = lgt.getPosition(),
    d = lgt.getDirection();
  
  let
    input = gEngine.Input,
    keys = input.keys,
    kpressed = input.isKeyPressed,
    kclicked = input.isKeyClicked;

  // TODO: make more DRY
  if (kpressed(keys.Left)) {
    if (kpressed(keys.Space)) {
      d[0] -= dirDelta;
      lgt.setDirection(d);
    } else {
      lgt.setXPos(p[0] - delta);
    }
  }
  if (kpressed(keys.Right)) {
    if (kpressed(keys.Space)) {
      d[0] += dirDelta;
      lgt.setDirection(d);
    } else {
      lgt.setXPos(p[0] + delta);
    }
  }
  if (kpressed(keys.Up)) {
    if (kpressed(keys.Space)) {
      d[1] += dirDelta;
      lgt.setDirection(d);
    } else {
      lgt.setYPos(p[1] + delta);
    }
  }
  if (kpressed(keys.Down)) {
    if (kpressed(keys.Space)) {
      d[1] -= dirDelta;
      lgt.setDirection(d);
    } else {
      lgt.setYPos(p[1] - delta);
    }
  }
  if (kpressed(keys.Z)) {
    if (kpressed(keys.Space)) {
      d[2] += dirDelta;
      lgt.setDirection(d);
    } else {
      lgt.setZPos(p[2] + delta);
    }
  }
  if (kpressed(keys.X)) {
    if (kpressed(keys.Space)) {
      d[2] -= dirDelta;
      lgt.setDirection(d);
    } else {
      lgt.setZPos(p[2] - delta);
    }
  }
  
  // Radius
  if (kpressed(keys.C)) lgt.setInner(lgt.getInner() + (delta * 0.01));
  if (kpressed(keys.V)) lgt.setInner(lgt.getInner() - (delta * 0.01));
  if (kpressed(keys.B)) lgt.setOuter(lgt.getOuter() + (delta * 0.01));
  if (kpressed(keys.N)) lgt.setOuter(lgt.getOuter() - (delta * 0.01));

  // Intensity
  if (kpressed(keys.K)) lgt.setIntensity(lgt.getIntensity() + delta);
  if (kpressed(keys.L)) lgt.setIntensity(lgt.getIntensity() - delta);

  // on/off
  if (kclicked(keys.H)) lgt.setLightTo(!lgt.isLightOn());

  let lMsg = '';
  if (kpressed(keys.Space)) {
    lMsg = this._printVec3('D', d);
  } else {
    lMsg = this._printVec3('P', p);
  }

  msg = `[${lgt.isLightOn() ? 'On' : 'Off'}] ${lMsg}` +
    `R(${lgt.getInner().toFixed(2)}/${lgt.getOuter().toFixed(2)}) ` +
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

MyGame.prototype._printVec3 = function (msg, p) {
  return `${msg}(${p[0].toFixed(1)} ${p[1].toFixed(1)} ${p[2].toFixed(1)})`;
};
