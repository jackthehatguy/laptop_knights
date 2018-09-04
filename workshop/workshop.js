// push :: (Array, Value) -> Array
const push = (a, x) => a.push(x) && a;

const fibonacci = n => { switch (n) {
    case 0: case 1: return n;
    default: return fibonacci(n-2)+fibonacci(n-1);
}};

// range :: (Number, Number) -> Array
const range = (n, m) =>
  m === undefined
  ? range(1, n)
  : n === m
    ? [m]
    : n < m
      ? push(range(n, m-1),m)
      : push(range(n, m+1),m);

// teddy :: Integer -> Boolean
const teddy = n => {
  console.log(n);
  if (n === 42) return true;
  if (n < 42) return console.log('.') || false;
  if (!(n%5) && teddy(n-42)) return true;
  if (!(n%2) && teddy(n>>1)) return true;
  if (!(n%3) || !(n%4)) {
    let prod = Math.trunc(n%10) * Math.trunc(n%100/10);
    return !!(prod > 0 && teddy(n - prod));
  }
  return false;
}

const genRandSet = n => range(n).sort(_ => 0.5 - Math.random());

// TODO: functionize this
function genRandLetters(num) {
  let in_set = 'qwertyuiopasdfghjklzxcvbnm';
  let out_set = [];
  for (var i = 0; i < num; i++) { out_set.push(in_set.charAt(Math.floor(Math.random()*in_set.length))); }
  return out_set;
}

const sigma = (f, index, bounds) => summation(range(n, top).map(f));

//==============================================================================

const SlidePuzzle = sideLength => {
  'use strict';

  sideLength = sideLength || 3;
  if (sideLength < 3) {
    console.log(`Puzzle side length cannot be less than 3`);
    return;
  }

  let array = [];
  const getArray = _ => array;

  const sum = (a, b) => a + b;
  const summation = a => a.reduce(sum);
  const cntLessThan = (x, a) => a.filter(h => h < x).length;
  const cntNumInversions = a => summation(a.map((x, n) => cntLessThan(x, a.slice(n+1))));
  const getNumInversions = _ => cntNumInversions(array.slice(0, -1));

  const isEven = n => !(n % 2);
  const isSolvable = _ => isEven(getNumInversions()); // TODO: check accuracy

  const rotateLeft = ([h, ...t]) => t.push(h) && t;

  /*
  * couldn't think of a good name (thakfully this will be a private function)
  * if the number of inversions is even, this function makes it odd and vice vera
  * the name comes from the "My Life as a Teenage Robot" episode with the Rubix cube
  * the other students cheat by swapping a couple of the stickers on the cube
  * making the cube unsolvable (much like the slide puzzle)
  * all it took was to swap the stickers back, and it was solvable again
  */
  const jenny = _ => (array = rotateLeft(array)) && array;

  const dif = (a, b) => a - b;
  const solve = _ => array.push(array.sort(dif).shift()) && getPuzzle();
  const equals = (a1, a2) => a1.every((n, i) => n === a2[i]);
  const isSolved = _ => equals(array.slice(0, -1), array.slice(0, -1).sort()) && array[array.length-1] === 0;

  const init = _ => {
    array = genRandSet(sideLength ** 2 - 1);
    while (!isSolvable()) jenny();
    while (getNumInversions() < 11) array.reverse();
    array.push(0);
  };
  init();

  const getPuzzle = _ => {
    let puzzle = [];
    for (var i = 0; i < sideLength; i++) puzzle.push(array.slice(sideLength*i,sideLength*i+sideLength));
    return puzzle;
  };

  const left = _ => {
    let empty = array.indexOf(0);
    if (empty !== -1 && empty % sideLength !== sideLength-1) {
      array[empty] = array[empty+1];
      array[empty+1] = 0;
      return true;
    }
    return false;
  };

  const right = _ => {
    let empty = array.indexOf(0);
    if (empty !== -1 && empty % sideLength !== 0) {
      array[empty] = array[empty-1];
      array[empty-1] = 0;
      return true;
    }
    return false;
  };

  const down = _ => {
    let empty = array.indexOf(0);
    if (empty !== -1 && empty - sideLength >= 0) {
      array[empty] = array[empty-sideLength];
      array[empty-sideLength] = 0;
      return true;
    }
    return false;
  };

  const up = _ => {
    let empty = array.indexOf(0);
    if (empty !== -1 && empty < sideLength*(sideLength-1)) {
      array[empty] = array[empty+sideLength];
      array[empty+sideLength] = 0;
      return true;
    }
    return false;
  };

  const debug = {
    getArray,
    getNumInversions,
    isSolvable,
    jenny,
    solve
  };

  const slide = {
    right,
    up,
    left,
    down
  }

  return {
    init,
    getPuzzle,
    slide,
    isSolved,
    debug
  };
};

//==============================================================================

const Pig = function () {
  var first;

  const isVowel = char => ['a','e','i','o','u','y'].includes(char);

  const rotate = ([h, ...t]) => t.push(h) && t;

  const translate = word =>
    ([first] = word)
    && (isVowel(first))
      ? word.concat('ay')
      : translate(rotate(word));

  const yayCheck = word =>
    ([first] = word)
    && (isVowel(first) && first !== 'y')
      ? word.concat('yay')
      : translate(word);

  const isCapital = string => string.toUpperCase() === string;

  const toProper = ([h, ...t]) => h.toUpperCase().concat(t.join('').toLowerCase());

  const isProper = ([h, ...t]) => isCapital(h) && !isCapital(t.join(''));

  const hasNoVowels = ([...word]) => word.reduce((acc, cur) => acc && !isVowel(cur), true);

  const keepCase = (word, funct) =>
    isCapital(word)
    ? funct(word.toLowerCase()).toUpperCase()
    : isProper(word)
      ? toProper(funct(word.toLowerCase()))
      : funct(word.toLowerCase());

  const compose = (val, [funct, ...rest]) =>
    funct === undefined
    ? val
    : compose(funct(val),rest);

  const nebula = ([...string], funct) => funct(string).join('');

  const pig = string => keepCase(string, (string => hasNoVowels(string) ? string : nebula(string, yayCheck)));

  const splice = (body, graft, index) => body.slice(0, index).concat(graft).concat(body.slice(index));

  // HACK: use built-in?
  const reverse = ([h, ...t]) =>
    t.length === 0
    ? h
    : reverse(t).concat(h);

  const handlePunct = string => {
    let punct = (/[^a-z]/i).exec(reverse(string));
    let index = string.lastIndexOf(punct);
    return index === -1 ? pig(string) : index === string.length-1 ? handlePunct(string.slice(0, -1)).concat(punct) : splice(handlePunct(string.replace(punct,'')), punct, index);
  }

  const line = l => l.split(' ').map(handlePunct).join(' ');

  return {
    pig,
    line
  };
};

//==============================================================================

const Dice = (numSides, numRolls, resultModifier) => {
  'use strict';

  numSides = numSides || 6;
  if (numSides < 2) {
    console.log(`A die cannot have fewer than two sides.`);
    return;
  }

  numRolls = numRolls || 1;
  if (numRolls < 1) {
    console.log(`A dice roll cannot have fewer than one die.`);
    return;
  }

  resultModifier = resultModifier || 0;

  let rolls = new Array(numRolls);

  const roll = _ => Math.ceil(Math.random() * numSides);
  const rollDice = _ => rolls = rolls.fill(0).map(roll);
  rollDice();

  const sum = (a, b) => a + b;
  const summation = a => a.reduce(sum);
  const getTotal = _ => summation(rolls) + resultModifier;

  const toResultString = _ => `[${rolls.join(', ')}] `
    + `${resultModifier ? resultModifier > 0 ? `+${resultModifier} ` : `${resultModifier} ` : ``}`
    + `= ${getTotal()}`;

  return {
    roll: rollDice,
    getTotal,
    toResultString
  };
};
