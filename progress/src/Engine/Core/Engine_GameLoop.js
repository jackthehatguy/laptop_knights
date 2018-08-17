"use strict";

var gEngine = gEngine || { };

gEngine.GameLoop = (function () {
  var kFPS = 60;          // frames per second
  var kMPF = 1000 / kFPS; // milliseconds per frame

  // variables for timing gameloop
  var mPreviousTime;
  var mLagTime;
  var mCurrentTime;
  var mElapsedTime;

  // current loop state (running || stopped)
  var mIsLoopRunning = false;

  // ref game logic
  var mMyGame = null;

  // assumes is sub-classed from MyGame
  var _runLoop = function () {
    if (mIsLoopRunning) {
      // a: set up for next call to _runLoop and update input!
      requestAnimationFrame( function () { _runLoop.call(mMyGame); });

      // b: compute elapsed time since last RunLoop was executed
      mCurrentTime = Date.now();
      mElapsedTime = mCurrentTime - mPreviousTime;
      mPreviousTime = mCurrentTime;
      mLagTime += mElapsedTime;

      // c: update the game the appropriate number of times
      //  update only milliseconds per frame
      //  lag > update frames ? update until caught up
      while ((mLagTime >= kMPF) && mIsLoopRunning) {
        gEngine.Input.update();
        this.update();  // call MyGame.update()
        mLagTime -= kMPF;
      }

      // d: draw
      this.draw();  // call MyGame.draw()
    } else {
      mMyGame.unloadScene();
    }
  };

  var _startLoop = function () {
    // a: reset frame time
    mPreviousTime = Date.now();
    mLagTime = 0.0;

    // b: remember that loop is now running
    mIsLoopRunning = true;

    // c: request _runLoop to start when loading is done
    requestAnimationFrame(function () { _runLoop.call(mMyGame); });
  };

  var start = function (myGame) {
    mMyGame = myGame;
    gEngine.ResourceMap.setLoadCompleteCallback(
      function () {
        mMyGame.initialize();
        _startLoop();
      }
    );
  };

  var stop = function () {
    mIsLoopRunning = false;
  };

  var mPublic = {
    start,
    stop
  };
  return mPublic;
}());
