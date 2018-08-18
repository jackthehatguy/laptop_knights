"use strict";

var gEngine = gEngine || { };

gEngine.ResourceMap = (function () {
  var MapEntry = function (rName) {
    this.mAsset = rName;
    this.mRefCount = 1;
  };

  // resource storage
  var mResourceMap = {};

  var mNumOutstandingLoads = 0;

  var mLoadCompleteCallback = null;

  var _checkForAllLoadCompleted = function () {
    if ((mNumOutstandingLoads === 0) && (mLoadCompleteCallback !== null)) {
      // ensures the load complete call back will only be called once
      var funToCall = mLoadCompleteCallback;
      mLoadCompleteCallback = null;
      funToCall();
    }
  };

  // make sure to set the callback _AFTER_ all load commands are issued
  var setLoadCompleteCallback = function (funct) {
    mLoadCompleteCallback = funct;
    _checkForAllLoadCompleted();
  };

  var asyncLoadRequested = function (rName) {
    mResourceMap[rName] = new MapEntry(rName);
    ++mNumOutstandingLoads;
  };

  var asyncLoadCompleted = function (rName, loadedAsset) {
    if (!isAssetLoaded(rName)) console.error(`gEngine.asyncLoadCompleted: [${rName}] not in map!`);

    mResourceMap[rName].mAsset = loadedAsset;
    --mNumOutstandingLoads;
    _checkForAllLoadCompleted();
  };

  var isAssetLoaded = function (rName) {
    return (rName in mResourceMap);
  };

  var retrieveAsset = function (rName) {
    var r = null;
    if (rName in mResourceMap) r = mResourceMap[rName].mAsset;
    return r;
  };

  var unloadAsset = function (rName) {
    var cnt = 0;
    if (rName in mResourceMap) {
      mResourceMap[rName].mRefCount -= 1;
      cnt = mResourceMap[rName].mRefCount;
      if (cnt === 0) {
        delete mResourceMap[rName];
      }
    }
    return cnt;
  };

  var incAssetRefCount = function (rName) {
    ++mResourceMap[rName].mRefCount;
  };

  var mPublic = {
    // async resource loading support
    asyncLoadRequested,
    asyncLoadCompleted,
    setLoadCompleteCallback,

    // resource storage
    retrieveAsset,
    unloadAsset,
    isAssetLoaded,
    incAssetRefCount
  };
  return mPublic;
}());
