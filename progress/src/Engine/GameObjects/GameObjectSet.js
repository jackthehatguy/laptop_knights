'use strict';

function GameObjectSet() {
  this.mSet = [];
}

GameObjectSet.prototype.getObjectAt = function (index) { return this.mSet[index]; };

GameObjectSet.prototype.addToSet = function (obj) { this.mSet.push(obj); };

GameObjectSet.prototype.update = function () { for (var i = 0; i < this.mSet.length; i++) this.mSet[i].update(); };

GameObjectSet.prototype.draw = function (aCamera) { for (var i = 0; i < this.mSet.length; i++) this.mSet[i].draw(aCamera); };
