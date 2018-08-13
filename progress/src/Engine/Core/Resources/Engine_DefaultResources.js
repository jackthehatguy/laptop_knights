var gEngine = gEngine || { };

gEngine.DefaultResources = (function () {
  // Simple Shader file paths
  const kSimpleVS = 'src/GLSLShaders/SimpleVS.glsl';
  const kSimpleFS = 'src/GLSLShaders/SimpleFS.glsl';

  var mConstColorShader = null;
  var _getConstColorShader = function () { return mConstColorShader; };

  // callback function after loadings are done
  var _createShaders = function (callbackFunction) {
    mConstColorShader = new SimpleShader(kSimpleVS, kSimpleFS);
    callbackFunction();
  };

  // init async loading of GLSL files
  var _initialize = function (callbackFunction) {
    gEngine.TextFileLoader.loadTextFile(kSimpleVS,gEngine.TextFileLoader.eTextFileType.eTextFile);
    gEngine.TextFileLoader.loadTextFile(kSimpleFS,gEngine.TextFileLoader.eTextFileType.eTextFile);

    gEngine.ResourceMap.setLoadCompleteCallback(function () { _createShaders(callbackFunction); });
  };

  var mPublic = {
    initialize: _initialize,
    getConstColorShader: _getConstColorShader
  };
  return mPublic;
}());
