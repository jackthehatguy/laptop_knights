"use strict";

var gEngine = gEngine || { };

gEngine.Input = (function () {
  var kKeys = {
    // etc
    Esc: 27,
    Space: 32,
    
    // arrows
    Left: 37,
    Up: 38,
    Right: 39,
    Down: 40,

    // numbers:
    Zero: 48,
    One: 49,
    Two: 50,
    Three: 51,
    // Four: 52,
    Five: 53,
    Six: 54,
    Seven: 55,
    Eight: 56,
    Nine: 57,

    // alphabet
    A: 65,
    B: 66,
    C: 67,
    D: 68,
    E: 69,
    F: 70,
    H: 72,
    I: 73,
    // J: 74,
    K: 75,
    L: 76,
    // M: 77,
    N: 78,
    O: 79,
    P: 80,
    // Q: 81,
    R: 82,
    S: 83,
    T: 84,
    U: 85,
    V: 86,
    W: 87,
    X: 88,
    Y: 89,
    Z: 90,

    LastKeyCode: 222
  };

  var mKeyPreviousState = [];
  var mIsKeyPressed = [];
  var mIsKeyClicked = [];

  // support mouse
  var kMouseButton = {
    Left: 0,
    // Middle: 1,
    // Right: 2
  };

  var mCanvas = null;
  var mButtonPreviousState = [];
  var mIsButtonPressed = [];
  var mIsButtonClicked = [];
  var mMousePosX = -1;
  var mMousePosY = -1;

  // event service functions
  var _onKeyDown = function (event) { mIsKeyPressed[event.keyCode] = true; };
  var _onKeyUp = function (event) { mIsKeyPressed[event.keyCode] = false; };

  var _onMouseMove = function (event) {
    var inside = false;
    var bBox = mCanvas.getBoundingClientRect();

    var x = Math.round((event.clientX - bBox.left) * (mCanvas.width / bBox.width));
    var y = Math.round((event.clientY - bBox.top) * (mCanvas.width / bBox.width));

    if (
      (x >= 0) && (x < mCanvas.width) &&
      (y >= 0) && (y < mCanvas.height)
    ) {
      mMousePosX = x;
      mMousePosY = mCanvas.height - 1 - y;
      inside = true;
    }
    return inside;
  };

  var _onMouseDown = function (event) { if (_onMouseMove(event)) mIsButtonPressed[event.button] = true; };

  var _onMouseUp = function (event) {
    _onMouseMove(event);
    mIsButtonPressed[event.button] = false;
  };

  var initialize = function (canvasID) {
    // keyboard support
    for (var i = 0; i < kKeys.LastKeyCode; i++) {
      mIsKeyPressed[i] = false;
      mKeyPreviousState[i] = false;
      mIsKeyClicked[i] = false;
    }

    // reg handlers
    window.addEventListener('keyup', _onKeyUp);
    window.addEventListener('keydown', _onKeyDown);

    // mouse support
    for (var i = 0; i < 3; i++) {
      mButtonPreviousState[i] = false;
      mIsButtonPressed[i] = false;
      mIsKeyClicked[i] = false;
    }

    window.addEventListener('mousedown', _onMouseDown);
    window.addEventListener('mouseup', _onMouseUp);
    window.addEventListener('mousemove', _onMouseMove);

    mCanvas = document.getElementById(canvasID);
  };

  var update = function () {
    for (var i = 0; i < kKeys.LastKeyCode; i++) {
      mIsKeyClicked[i] = (!mKeyPreviousState[i]) && mIsKeyPressed[i];
      mKeyPreviousState[i] = mIsKeyPressed[i];
    }

    for (var i = 0; i < 3; i++) {
      mIsButtonClicked[i] = (!mButtonPreviousState[i] && mIsButtonPressed[i]);
      mButtonPreviousState[i] = mIsButtonPressed[i];
    }
  };

  // for Gameengine programmer to test if key is pressed down
  var isKeyPressed = function (keyCode) { return mIsKeyPressed[keyCode]; };
  var isKeyClicked = function (keyCode) { return mIsKeyClicked[keyCode]; };

  var isButtonPressed = function (button) { return mIsButtonPressed[button]; };
  var isButtonClicked = function (button) { return mIsButtonClicked[button]; };

  var getMousePosX = function () { return mMousePosX; };
  var getMousePosY = function () { return mMousePosY; };

  var mPublic = {
    initialize,
    update,

    // keyboard
    isKeyPressed,
    isKeyClicked,
    keys: kKeys,

    // mouse
    isButtonPressed,
    isButtonClicked,
    getMousePosX,
    getMousePosY,
    mouseButton: kMouseButton
  };
  return mPublic;
}());
