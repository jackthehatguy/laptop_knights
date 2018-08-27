'use strict';

function TextureInfo(name, w, h, id) {
  this.mName = name;
  this.mWidth = w;
  this.mHeight = h;
  this.mGLTexID = id;
}

var gEngine = gEngine || { };

gEngine.Textures = (function () {
  var loadTexture = function (textureName) {
    if (!(gEngine.ResourceMap.isAssetLoaded(textureName))) {
      var img = new Image();

      gEngine.ResourceMap.asyncLoadRequested(textureName);

      img.onload = function () { _processLoadedImage(textureName, img); };

      img.src = textureName;
    } else {
      gEngine.ResourceMap.incAssetRefCount(textureName);
    }
  };

  var unloadTexture = function (textureName) {
    var gl = gEngine.Core.getGL();
    var texInfo = gEngine.ResourceMap.retrieveAsset(textureName);
    gl.deleteTexture(texInfo.mGLTexID);
    gEngine.ResourceMap.unloadAsset(textureName);
  };

  var _processLoadedImage = function (textureName, image) {
    var gl = gEngine.Core.getGL();

    var textureID = gl.createTexture();

    gl.bindTexture(gl.TEXTURE_2D, textureID);

    gl.texImage2D(
      gl.TEXTURE_2D,    // 'binding point': target texture is being loaded to
      0,                // level of detail. used for mipmapping. base: 0
      gl.RGBA,          // internal format. composition of each element (pixels)
      gl.RGBA,          // format of textel data [must match internal format]
      gl.UNSIGNED_BYTE, // data type of textel data
      image             // texture data
    );

    gl.generateMipmap(gl.TEXTURE_2D);

    gl.bindTexture(gl.TEXTURE_2D, null);

    var texInfo = new TextureInfo(
      textureName,
      image.naturalWidth,
      image.naturalHeight,
      textureID
    );
    gEngine.ResourceMap.asyncLoadCompleted(textureName, texInfo);
  };

  var activateTexture = function (textureName) {
    var gl = gEngine.Core.getGL();
    var texInfo = gEngine.ResourceMap.retrieveAsset(textureName);

    gl.bindTexture(gl.TEXTURE_2D, texInfo.mGLTexID);

    // prevent texture wrappings
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    // handles magnification and minimization
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);

    // for sharp textures:
    // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  };

  var deactivateTexture = function () {
    var gl = gEngine.Core.getGL();
    gl.bindTexture(gl.TEXTURE_2D, null);
  };

  var getTextureInfo = function (textureName) { return gEngine.ResourceMap.retrieveAsset(textureName); };

  var mPublic = {
    loadTexture,
    unloadTexture,
    activateTexture,
    deactivateTexture,
    getTextureInfo
  };
  return mPublic;
}());
