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

  // light shader
  var kLightFS = 'src/GLSLShaders/LightFS.glsl';
  var mLightShader = null;

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
    mLightShader = new LightShader(kTextureVS, kLightFS);
    callbackFunction();
  };

  var getConstColorShader = function () { return mConstColorShader; };
  var getTextureShader = function () { return mTextureShader; };
  var getSpriteShader = function () { return mSpriteShader; };
  var getLightShader = function () { return mLightShader; };

  var initialize = function (callbackFunction) {
    let
      tfl = gEngine.TextFileLoader,
      loadTextFile = tfl.loadTextFile,
      eTextFile = tfl.eTextFileType.eTextFile;
    
    // constant color shader
    loadTextFile(kSimpleVS, eTextFile);
    loadTextFile(kSimpleFS, eTextFile);

    // texture shader
    loadTextFile(kTextureVS, eTextFile);
    loadTextFile(kTextureFS, eTextFile);

    // light shader
    loadTextFile(kLightFS, eTextFile);

    // default font
    gEngine.Fonts.loadFont(kDefaultFont);

    gEngine.ResourceMap.setLoadCompleteCallback(function () { _createShaders(callbackFunction); });
  };

  var cleanUp = function () {
    mConstColorShader.cleanUp();
    mTextureShader.cleanUp();
    mSpriteShader.cleanUp();
    mLightShader.cleanUp();

    let unloadTextFile = gEngine.TextFileLoader.unloadTextFile;

    unloadTextFile(kSimpleVS);
    unloadTextFile(kSimpleFS);

    unloadTextFile(kTextureVS);
    unloadTextFile(kTextureFS);

    unloadTextFile(kLightFS);

    gEngine.Fonts.unloadFont(kDefaultFont);
  };

  var mPublic = {
    initialize,
    getConstColorShader,
    getTextureShader,
    getSpriteShader,
    getLightShader,
    getDefaultFont,
    getGlobalAmbientColor,
    setGlobalAmbientColor,
    getGlobalAmbientIntensity,
    setGlobalAmbientIntensity,
    cleanUp
  };
  return mPublic;
}());
