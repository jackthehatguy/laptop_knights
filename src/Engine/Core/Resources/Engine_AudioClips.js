"use strict";

var gEngine = gEngine || { };

gEngine.AudioClips = (function () {
  var mAudioContext = null;
  var mBgAudioNode = null;

  var initAudioContext = function () {
    try {
      var AudioContext = window.AudioContext || window.webkitAudioContext;
      mAudioContext = new AudioContext();
    } catch (e) {
      console.error('Web Audio not supported.');
    }
  };

  var loadAudio = function (clipName) {
    if (!(gEngine.ResourceMap.isAssetLoaded(clipName))) {
      gEngine.ResourceMap.asyncLoadRequested(clipName);

      var req = new XMLHttpRequest();
      req.onreadystatechange = function () {
        if ((req.readyState === 4) && (req.status !== 200)) {
          console.error(`${clipName}: loading failed!
            [Hint: you cannot double click index.html to run this project.
            The index.html file must be loaded be a web-server.]`);
        }
      };
      req.open('GET', clipName, true);
      // Specify that the requst retrieves binary data
      req.responseType = 'arraybuffer';

      req.onload = function () {
        mAudioContext.decodeAudioData(req.response, function (buffer) {
          gEngine.ResourceMap.asyncLoadCompleted(clipName, buffer);
        })
      };
      req.send();
    } else {
      gEngine.ResourceMap.incAssetRefCount(clipName);
    }
  };

  var unloadAudio = function (clipName) {
    gEngine.ResourceMap.unloadAsset(clipName);
  };

  var playACue = function (clipName) {
    var clipInfo = gEngine.ResourceMap.retrieveAsset(clipName);
    if (clipInfo !== null) {
      var sourceNode = mAudioContext.createBufferSource();
      sourceNode.buffer = clipInfo;
      sourceNode.connect(mAudioContext.destination);
      sourceNode.start(0);
    }
  };

  var playBackgroundAudio = function (clipName) {
    var clipInfo = gEngine.ResourceMap.retrieveAsset(clipName);
    if (clipInfo !== null) {
      stopBackgroundAudio();

      mBgAudioNode = mAudioContext.createBufferSource();
      mBgAudioNode.buffer = clipInfo;
      mBgAudioNode.connect(mAudioContext.destination);
      mBgAudioNode.loop = true;
      mBgAudioNode.start(0);
    }
  };

  var stopBackgroundAudio = function () {
    if (mBgAudioNode !== null) {
      mBgAudioNode.stop(0);
      mBgAudioNode = null;
    }
  };

  var isBackgroundAudioPlaying = function () {
    return (mBgAudioNode !== null);
  };

  var mPublic = {
    initAudioContext,
    loadAudio,
    unloadAudio,
    playACue,
    playBackgroundAudio,
    stopBackgroundAudio,
    isBackgroundAudioPlaying
  };
  return mPublic;
}());
