'use strict';

function CharacterInfo() {
  // text coord (0-1) maps to entire img
  this.mTextCoordLeft = 0;
  this.mTextCoordRight = 1;
  this.mTextCoordBottom = 0;
  this.mTextCoordLeft = 0;

  // nominal character size
  this.mCharWidth = 1;
  this.mCharHeight = 1;
  this.mCharWidthOffset = 1;
  this.mCharHeightOffset = 1;

  // ref of char w/h ratio
  this.mCharAspectRatio = 1;
}

var gEngine = gEngine || {};

gEngine.Fonts = (function () {
  var loadFont = function (fontName) {
    if (!(gEngine.ResourceMap.isAssetLoaded(fontName))) {
      var fontInfoSourceString = fontName + '.fnt';
      var textureSourceString = fontName + '.png';

      // reg entry in map
      gEngine.ResourceMap.asyncLoadRequested(fontName);

      gEngine.Textures.loadTexture(textureSourceString);
      gEngine.TextFileLoader.loadTextFile(
        fontInfoSourceString,
        gEngine.TextFileLoader.eTextFileType.eXMLFile,
        _storeLoadedFont
      );
    } else {
      gEngine.ResourceMap.incAssetRefCount(fontName);
    }
  };

  var _storeLoadedFont = function (fontInfoSourceString) {
    var fontName = fontInfoSourceString.slice(0, -4); // trim .fnt ext
    var fontInfo = gEngine.ResourceMap.retrieveAsset(fontInfoSourceString);
    fontInfo.FontImage = fontName + '.png';
    gEngine.ResourceMap.asyncLoadCompleted(fontName, fontInfo);
  };

  var unloadFont = function (fontName) {
    gEngine.ResourceMap.unloadAsset(fontName);
    if (!(gEngine.ResourceMap.isAssetLoaded(fontName))) {
      var fontInfoSourceString = fontName + '.fnt';
      var textureSourceString = fontName + '.png';

      gEngine.Textures.unloadTexture(textureSourceString);
      gEngine.TextFileLoader.unloadTextFile(fontInfoSourceString);
    }
  };

  var getCharInfo = function (fontName, aChar) {
    var returnInfo = null;
    var fontInfo = gEngine.ResourceMap.retrieveAsset(fontName);
    var commonPath = 'font/common';
    var commonInfo = fontInfo.evaluate(commonPath, fontInfo, null, XPathResult.ANY_TYPE, null);
    commonInfo = commonInfo.iterateNext();
    if (commonInfo === null) return returnInfo;

    var charHeight = commonInfo.getAttribute('base');

    var charPath = 'font/chars/char[@id=' + aChar + ']';
    var charInfo = fontInfo.evaluate(charPath, fontInfo, null, XPathResult.ANY_TYPE, null);
    charInfo = charInfo.iterateNext();
    if (charInfo === null) return returnInfo;

    returnInfo = new CharacterInfo();
    var texInfo = gEngine.Textures.getTextureInfo(fontInfo.FontImage);
    var leftPixel = +(charInfo.getAttribute('x'));
    var rightPixel = leftPixel + +(charInfo.getAttribute('width')) - 1;
    var topPixel = (texInfo.mHeight - 1) - +(charInfo.getAttribute('y'));
    var bottomPixel = topPixel - +(charInfo.getAttribute('height')) + 1;

    // texture coord info
    returnInfo.mTextCoordLeft = leftPixel / (texInfo.mWidth - 1);
    returnInfo.mTextCoordTop = topPixel / (texInfo.mHeight - 1);
    returnInfo.mTextCoordRight = rightPixel / (texInfo.mWidth - 1);
    returnInfo.mTextCoordBottom = bottomPixel / (texInfo.mHeight - 1);

    //  relative char size
    var charWidth = charInfo.getAttribute('xadvance');
    returnInfo.mCharWidth = charInfo.getAttribute('width') / charWidth;
    returnInfo.mCharHeight = charInfo.getAttribute('height') / charHeight;
    returnInfo.mCharWidthOffset = charInfo.getAttribute('xoffset') / charWidth;
    returnInfo.mCharHeightOffset = charInfo.getAttribute('yoffset') / charHeight;
    returnInfo.mCharAspectRatio = charWidth / charHeight;

    return returnInfo;
  };

  var mPublic = {
    loadFont,
    unloadFont,
    getCharInfo
  }
  return mPublic;
}());
