'use strict';

var gEngine = gEngine || { };

gEngine.DefaultResources = (function () {
  // Global ambient color
  var mGlobalAmbientColor = [0.5, 0.5, 0.5, 1];
  var mGlobalAmbientIntensity = 1;
  var getGlobalAmbientIntensity = function() { return mGlobalAmbientIntensity; };
  var setGlobalAmbientIntensity = function(v) { mGlobalAmbientIntensity = v; };
  var getGlobalAmbientColor = function() { return mGlobalAmbientColor; };
  var setGlobalAmbientColor = function(v) { mGlobalAmbientColor = vec4.fromValues(v[0], v[1], v[2], v[3]); };

  // simple shader
  const kSimpleVS = 'src/GLSLShaders/SimpleVS.glsl';
  const kSimpleFS = 'src/GLSLShaders/SimpleFS.glsl';
  var mConstColorShader = null;

  // line shader
  // const kLineFS = 'src/GLSLShaders/LineFS.glsl';
  // var mLineShader = null;

  // texture shader
  const kTextureVS = 'src/GLSLShaders/TextureVS.glsl';
  const kTextureFS = 'src/GLSLShaders/TextureFS.glsl';
  var mTextureShader = null;
  var mSpriteShader = null;

  // light shader
  const kLightFS = 'src/GLSLShaders/LightFS.glsl';
  var mLightShader = null;

  // illum shader
  const kIllumFS = 'src/GLSLShaders/IllumFS.glsl';
  var mIllumShader = null;

  // shadow shader
  const kShadowReceiverFS = 'src/GLSLShaders/ShadowReceiverFS.glsl';
  var mShadowReceiverShader = null;
  const kShadowCasterFS = 'src/GLSLShaders/ShadowCasterFS.glsl';
  var mShadowCasterShader = null;

  // default font
  const kDefaultFont = 'assets/fonts/system-default-font';
  const getDefaultFont = function () { return kDefaultFont; };

  const _createShaders = function (callbackFunction) {
    gEngine.ResourceMap.setLoadCompleteCallback(null);
    mConstColorShader = new SimpleShader(kSimpleVS, kSimpleFS);
    // mLineShader = new LineShader(kSimpleVS, kLineFS);
    mTextureShader = new TextureShader(kTextureVS, kTextureFS);
    mSpriteShader = new SpriteShader(kTextureVS, kTextureFS);
    mLightShader = new LightShader(kTextureVS, kLightFS);
    mIllumShader = new IllumShader(kTextureVS, kIllumFS);
    mShadowReceiverShader = new SpriteShader(kTextureVS, kShadowReceiverFS);
    mShadowCasterShader = new ShadowCasterShader(kTextureVS, kShadowCasterFS);
    callbackFunction();
  };

  const getConstColorShader = function () { return mConstColorShader; };
  const getTextureShader = function () { return mTextureShader; };
  // const getLineShader = function () { return mLineShader; };
  const getSpriteShader = function () { return mSpriteShader; };
  const getLightShader = function () { return mLightShader; };
  const getIllumShader = function () { return mIllumShader; };
  const getShadowReceiverShader = function () { return mShadowReceiverShader; };
  const getShadowCasterShader = function () { return mShadowCasterShader; };

  var initialize = function (callbackFunction) {
    // TODO: use destructuring to make more terse
    let
      tfl = gEngine.TextFileLoader,
      loadTextFile = tfl.loadTextFile,
      eTextFile = tfl.eTextFileType.eTextFile;
    
    /*
    * FIXME:
    *   Why do I have to pass in the enum file type?
    *   Does it read any other kinds of files?
    */
    // simple shader
    loadTextFile(kSimpleVS, eTextFile);
    loadTextFile(kSimpleFS, eTextFile);

    // line shader
    // loadTextFile(kLineFS, eTextFile);

    // texture shader
    loadTextFile(kTextureVS, eTextFile);
    loadTextFile(kTextureFS, eTextFile);

    // light shader
    loadTextFile(kLightFS, eTextFile);

    // illumination shader
    loadTextFile(kIllumFS, eTextFile);

    // shadow caster & receiver shaders
    loadTextFile(kShadowReceiverFS, eTextFile);
    loadTextFile(kShadowCasterFS, eTextFile);

    // default font
    gEngine.Fonts.loadFont(kDefaultFont);

    gEngine.ResourceMap.setLoadCompleteCallback(function () { _createShaders(callbackFunction); });
  };

  const cleanUp = function () {
    mConstColorShader.cleanUp();
    // mLineShader.cleanUp();
    mTextureShader.cleanUp();
    mSpriteShader.cleanUp();
    mLightShader.cleanUp();
    mIllumShader.cleanUp();
    mShadowReceiverShader.cleanUp();
    mShadowCasterShader.cleanUp();

    let unloadTextFile = gEngine.TextFileLoader.unloadTextFile;

    unloadTextFile(kSimpleVS);
    unloadTextFile(kSimpleFS);

    // unloadTextFile(kLineFS);

    unloadTextFile(kTextureVS);
    unloadTextFile(kTextureFS);

    unloadTextFile(kLightFS);

    unloadTextFile(kIllumFS);

    unloadTextFile(kShadowReceiverFS);
    unloadTextFile(kShadowCasterFS);

    gEngine.Fonts.unloadFont(kDefaultFont);
  };

  const mPublic = {
    initialize,
    getConstColorShader,
    // getLineShader,
    getTextureShader,
    getSpriteShader,
    getLightShader,
    getIllumShader,
    getShadowReceiverShader,
    getShadowCasterShader,
    getDefaultFont,
    getGlobalAmbientColor,
    setGlobalAmbientColor,
    getGlobalAmbientIntensity,
    setGlobalAmbientIntensity,
    cleanUp
  };
  return mPublic;
}());
