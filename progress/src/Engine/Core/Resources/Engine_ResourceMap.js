"use strict";

var gEngine = gEngine || { };

gEngine.ResourceMap = (function () {
  var MapEntry = function (rName) {
    this.mAsset = rName;
  };

  // resource storage
  var mResourceMap = {};

  var mNumOutstandingLoads = 0;

  var mLoadCompleteCallback = null;

  var mPublic = {

  };
  return mPublic;
}());
