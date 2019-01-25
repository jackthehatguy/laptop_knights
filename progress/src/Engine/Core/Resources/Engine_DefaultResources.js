'use strict';

var gEngine = gEngine || { };

gEngine.DefaultResources = (function () {
  // const color shader
  const kSimpleVS = 'src/GLSLShaders/SimpleVS.glsl';
  const kSimpleFS = 'src/GLSLShaders/SimpleFS.glsl';
  var mConstColorShader = null;

  // texture shader
  const kTextureVS = 'src/GLSLShaders/TextureVS.glsl';
  const kTextureFS = 'src/GLSLShaders/TextureFS.glsl';
  var mTextureShader = null;

  // sprite shader
  var mSpriteShader = null;

  // default font
  var kDefaultFont = 'assets/fonts/system-default-font';
  var getDefaultFont = function () { return kDefaultFont; };
  
  // Global ambient color
  var mGlobalAmbientColor = [0.3, 0.3, 0.3, 1];
  var mGlobalAmbientIntensity = 1;

  var getGlobalAmbientIntensity = function() { return mGlobalAmbientIntensity; };
  var setGlobalAmbientIntensity = function(v) { mGlobalAmbientIntensity = v; };
  var getGlobalAmbientColor = function() { return mGlobalAmbientColor; };
  var setGlobalAmbientColor = function(v) { mGlobalAmbientColor = vec4.fromValues(v[0], v[1], v[2], v[3]); };

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

    // default font
    gEngine.Fonts.loadFont(kDefaultFont);

    gEngine.ResourceMap.setLoadCompleteCallback(function () { _createShaders(callbackFunction); });
  };

  var cleanUp = function () {
    mConstColorShader.cleanUp();
    mTextureShader.cleanUp();
    mSpriteShader.cleanUp();

    gEngine.TextFileLoader.unloadTextFile(kSimpleVS);
    gEngine.TextFileLoader.unloadTextFile(kSimpleFS);

    gEngine.TextFileLoader.unloadTextFile(kTextureVS);
    gEngine.TextFileLoader.unloadTextFile(kTextureFS);

    gEngine.Fonts.unloadFont(kDefaultFont);
  };

  var mPublic = {
    initialize,
    getConstColorShader,
    getTextureShader,
    getSpriteShader,
    getDefaultFont,
    getGlobalAmbientColor,
    setGlobalAmbientColor,
    getGlobalAmbientIntensity,
    setGlobalAmbientIntensity,
    cleanUp
  };
  return mPublic;
}());
