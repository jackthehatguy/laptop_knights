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
  const kLightFS = 'src/GLSLShaders/LightFS.glsl';
  var mLightShader = null;

  const kIllumFS = 'src/GLSLShaders/IllumFS.glsl';
  var mIllumShader = null;

  // default font
  var kDefaultFont = 'assets/fonts/system-default-font';
  var getDefaultFont = function () { return kDefaultFont; };
  
  // Global ambient color
  var mGlobalAmbientColor = [0.5, 0.5, 0.5, 1];
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
    mIllumShader = new IllumShader(kTextureVS, kIllumFS);
    callbackFunction();
  };

  var getConstColorShader = function () { return mConstColorShader; };
  var getTextureShader = function () { return mTextureShader; };
  var getSpriteShader = function () { return mSpriteShader; };
  var getLightShader = function () { return mLightShader; };
  var getIllumShader = function () { return mIllumShader; };

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

    // illumination shader
    loadTextFile(kIllumFS, eTextFile);

    // default font
    gEngine.Fonts.loadFont(kDefaultFont);

    gEngine.ResourceMap.setLoadCompleteCallback(function () { _createShaders(callbackFunction); });
  };

  var cleanUp = function () {
    mConstColorShader.cleanUp();
    mTextureShader.cleanUp();
    mSpriteShader.cleanUp();
    mLightShader.cleanUp();
    mIllumShader.cleanUp();

    let unloadTextFile = gEngine.TextFileLoader.unloadTextFile;

    unloadTextFile(kSimpleVS);
    unloadTextFile(kSimpleFS);

    unloadTextFile(kTextureVS);
    unloadTextFile(kTextureFS);

    unloadTextFile(kLightFS);

    unloadTextFile(kIllumFS);

    gEngine.Fonts.unloadFont(kDefaultFont);
  };

  var mPublic = {
    initialize,
    getConstColorShader,
    getTextureShader,
    getSpriteShader,
    getLightShader,
    getIllumShader,
    getDefaultFont,
    getGlobalAmbientColor,
    setGlobalAmbientColor,
    getGlobalAmbientIntensity,
    setGlobalAmbientIntensity,
    cleanUp
  };
  return mPublic;
}());
