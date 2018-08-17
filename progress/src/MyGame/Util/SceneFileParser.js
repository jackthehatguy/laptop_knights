"use strict";

function SceneFileParser(sceneFilePath) {
  this.mSceneXml = gEngine.ResourceMap.retrieveAsset(sceneFilePath);
}

SceneFileParser.prototype._getElm = function (tagElm) {
  var theElm = this.mSceneXml.getElementsByTagName(tagElm);
  if (theElm.length === 0) console.error(`Warning: Level element: [${tagElm}] is not found!`);
  return theElm;
};

SceneFileParser.prototype.parseCamera = function () {
  var camElm = this._getElm('Camera');
  var cx = +(camElm[0].getAttribute('CenterX'));
  var cy = +(camElm[0].getAttribute('CenterY'));
  var w = +(camElm[0].getAttribute('Width'));
  var viewport = camElm[0].getAttribute('Viewport').split(' ');
  var bgColor = camElm[0].getAttribute('BgColor').split(' ');

  // make sure viewport & color are #
  for (var i = 0; i < 4; i++) {
    viewport[i] = +viewport[i];
    bgColor[i] = +bgColor[i];
  }

  var cam = new Camera(
    vec2.fromValues(cx, cy),  // pos of camera
    w,                        // width of cam
    viewport                  // [orgX, orgY, width, height]
  );

  cam.setBackgroundColor(bgColor);

  return cam;
};

SceneFileParser.prototype.parseSquares = function (sqSet) {
  var elm = this._getElm('Square');
  var x, y, w, h, r, c, sq;
  for (var i = 0; i < elm.length; i++) {
    x = +(elm.item(i).attributes.getNamedItem('PosX').value);
    y = +(elm.item(i).attributes.getNamedItem('PosY').value);
    w = +(elm.item(i).attributes.getNamedItem('Width').value);
    h = +(elm.item(i).attributes.getNamedItem('Height').value);
    r = +(elm.item(i).attributes.getNamedItem('Rotation').value);
    c = elm.item(i).attributes.getNamedItem('Color').value.split(' ');
    sq = new Renderable(gEngine.DefaultResources.getConstColorShader());

    for (var j = 0; j < 4; j++) c[j] = +c[j];

    sq.setColor(c);
    let sqX = sq.getXform();
    sqX.setPosition(x, y);
    sqX.setRotationInDegree(r);
    sqX.setSize(w, h);
    sqSet.push(sq);
  }
};
