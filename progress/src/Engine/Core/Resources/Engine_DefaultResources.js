'use strict';

var gEngine = gEngine || { };

gEngine.DefaultResources = (function () {
  const kSimpleVS = 'src/GLSLShaders/SimpleVS.glsl';
  const kSimpleFS = 'src/GLSLShaders/SimpleFS.glsl';
  var mConstColorShader = null;

  const kTextureVS = 'src/GLSLShaders/TextureVS.glsl';
  const kTextureFS = 'src/GLSLShaders/TextureFS.glsl';
  var mTextureShader = null;

  var mSpriteShader = null;

  var _createShaders = function (callbackFunction) {
    gEngine.ResourceMap.setLoadCompleteCallback(null);
    mConstColorShader = new SimpleShader(kSimpleVS, kSimpleFS);
    mTextureShader = new TextureShader(kTextureVS, kTextureFS);
    mSpriteShader = new SpriteShader(kTextureVS, kTextureFS);
    callbackFunction();
  };

  var getConstColorShader = function () { return mConstColorShader; };
  var getTextureShader = function () { return mTextureShader; };
  var getSpriteShader = function () { return mSpriteShader; };

  var initialize = function (callbackFunction) {
    // constant color shader
    gEngine.TextFileLoader.loadTextFile(kSimpleVS, gEngine.TextFileLoader.eTextFileType.eTextFile);
    gEngine.TextFileLoader.loadTextFile(kSimpleFS, gEngine.TextFileLoader.eTextFileType.eTextFile);

    // texture shader
    gEngine.TextFileLoader.loadTextFile(kTextureVS, gEngine.TextFileLoader.eTextFileType.eTextFile);
    gEngine.TextFileLoader.loadTextFile(kTextureFS, gEngine.TextFileLoader.eTextFileType.eTextFile);

    gEngine.ResourceMap.setLoadCompleteCallback(function () { _createShaders(callbackFunction); });
  };

  var mPublic = {
    initialize,
    getConstColorShader,
    getTextureShader,
    getSpriteShader
  };
  return mPublic;
}());
