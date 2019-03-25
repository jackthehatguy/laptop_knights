class Pierre extends GameObject {
  /**
   * Jack's character in the game.
   * Using him currently for testing purposes.
   * @param {string} spriteTexture the path of the sprite sheet
   * @param {string} normalTexture the path of the sprite normal sheet
   * @param {number} x the x position of the character
   * @param {number} y the y position of the character
   */
  constructor(spriteTexture, normalTexture, x, y) {
    super();

    this.kDelta = 0.3;

    this.mPierre = normalTexture ? new IllumRenderable(spriteTexture, normalTexture) : new LightRenderable(spriteTexture);
    this.mPierre.setColor([1, 1, 1, 0]);
    this.mPierre.getXform().setPosition(x, y);
    this.mPierre.getXform().setSize(9, 12);
    
    this.mPierre.setSpriteSequence(256, 0, (128 / 3), ((256 / 4) - 1), 3, 0);
    this.mPierre.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    this.mPierre.setAnimationSpeed(30);
    
    GameObject.call(this, this.mPierre);
  }
  
  /**
   * updates the animation and checks for user input
   */
  update() {
    this.mPierre.updateAnimation();
    
    let
      xform = this.getXform(),
      input = gEngine.Input,
      pressed = input.isKeyPressed,
      clicked = input.isKeyClicked,
      keys = input.keys;
    
    if (pressed(keys.W)) xform.incYPosBy(this.kDelta);
    if (pressed(keys.S)) xform.incYPosBy(-this.kDelta);
    if (pressed(keys.A)) xform.incXPosBy(-this.kDelta);
    if (pressed(keys.D)) xform.incXPosBy(this.kDelta);
    
    if (clicked(keys.F)) console.log(this);
  }
}
