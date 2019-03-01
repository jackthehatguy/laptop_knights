'use strict';

function FontRenderable(aString) {
  this.mFont = gEngine.DefaultResources.getDefaultFont();
  this.mOneChar = new SpriteRenderable(this.mFont + '.png');
  this.mXform = new Transform();
  this.mText = aString;
}

FontRenderable.prototype.draw = function (vpMatrix) {
  var widthOfOneChar = this.mXform.getWidth() / this.mText.length;
  var heightOfOneChar = this.mXform.getHeight();
  var yPos = this.mXform.getYPos();

  // center position of first char
  var xPos = this.mXform.getXPos() - (widthOfOneChar / 2) + (widthOfOneChar * 0.5); // wth book? what's the point in this line?
  var aChar, charInfo, xSize, ySize, xOffset, yOffset;
  for (var charIndex = 0; charIndex < this.mText.length; charIndex++) {
    aChar = this.mText.charCodeAt(charIndex);
    charInfo = gEngine.Fonts.getCharInfo(this.mFont, aChar);

    // set tex coord
    this.mOneChar.setElementUVCoordinate(
      charInfo.mTextCoordLeft,
      charInfo.mTextCoordRight,
      charInfo.mTextCoordBottom,
      charInfo.mTextCoordTop
    );

    // set size of char
    xSize = widthOfOneChar * charInfo.mCharWidth;
    ySize = heightOfOneChar * charInfo.mCharHeight;
    this.mOneChar.getXform().setSize(xSize, ySize);

    // how much offset from center
    xOffset = widthOfOneChar * charInfo.mCharWidthOffset * 0.5;
    yOffset = heightOfOneChar * charInfo.mCharHeightOffset * 0.5;

    this.mOneChar.getXform().setPosition(xPos - xOffset, yPos - yOffset);

    this.mOneChar.draw(vpMatrix);

    xPos += widthOfOneChar;
  }
};

FontRenderable.prototype.getXform = function () { return this.mXform; };

FontRenderable.prototype.getText = function () { return this.mText; };
FontRenderable.prototype.setText = function (t) {
  this.mText = t;
  this.setTextHeight(this.getXform().getHeight());
};

FontRenderable.prototype.getFont = function () { return this.mFont; };
FontRenderable.prototype.setFont = function (f) {
  this.mFont = f;
  this.mOneChar.setTexture(this.mFont + '.png');
};

FontRenderable.prototype.getColor = function () { return this.mOneChar.getColor(); };
FontRenderable.prototype.setColor = function (c) { this.mOneChar.setColor(c); };

FontRenderable.prototype.setTextHeight = function (h) {
  // for 'A'
  var charInfo = gEngine.Fonts.getCharInfo(this.mFont, 'A'.charCodeAt(0));
  var w = h * charInfo.mCharAspectRatio;
  this.getXform().setSize(w * this.mText.length, h);
};
