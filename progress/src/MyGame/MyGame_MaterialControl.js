MyGame.prototype.materialControl = function () {
  var delta = 0.01;
  var msg = '';

  this._selectMaterialChannel();

  let
    input = gEngine.Input,
    kPressed = input.isKeyPressed,
    keys = input.keys;

  if (kPressed(keys.E)) this.mMaterialCh[0] += delta;
  if (kPressed(keys.R)) this.mMaterialCh[0] -= delta;
  if (kPressed(keys.T)) this.mMaterialCh[1] += delta;
  if (kPressed(keys.Y)) this.mMaterialCh[1] -= delta;
  if (kPressed(keys.U)) this.mMaterialCh[2] += delta;
  if (kPressed(keys.I)) this.mMaterialCh[2] -= delta;

  var mat = this.mSelectedCh.getRenderable().getMaterial();
  if (kPressed(keys.O)) mat.setShininess(mat.getShininess() + delta);
  if (kPressed(keys.P)) mat.setShininess(mat.getShininess() - delta);

  msg += `n(${mat.getShininess().toFixed(2)})` + 
    this._printVec3('D', mat.getDiffuse()) +
    this._printVec3('S', mat.getSpecular()) +
    this._printVec3('A', mat.getAmbient());

  return msg;
};

MyGame.prototype._selectMaterialChannel = function () {
  let
    input = gEngine.Input,
    kClicked = input.isKeyPressed,
    keys = input.keys;

  if (kClicked(keys.Seven)) this.mMaterialCh = this.mSelectedCh.getRenderable().getMaterial().getAmbient();
  if (kClicked(keys.Eight)) this.mMaterialCh = this.mSelectedCh.getRenderable().getMaterial().getDiffuse();
  if (kClicked(keys.Nine)) this.mMaterialCh = this.mSelectedCh.getRenderable().getMaterial().getSpecular();
}
