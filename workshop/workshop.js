// push :: (Array, Value) -> Array
const push = (a, x) => a.push(x) && a;

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

function genRandLetters(num) {
  let in_set = 'qwertyuiopasdfghjklzxcvbnm';
  let out_set = [];
  for (var i = 0; i < num; i++) { out_set.push(in_set.charAt(Math.floor(Math.random()*in_set.length))); }
  return out_set;
}

//==============================================================================

const SlidePuzzle = sideLength => {
  'use strict';

  sideLength = sideLength || 3;
  let array = [];

  const cntLessThan = (n, [h, ...t]) =>
    h === undefined
    ? 0
    : n > h
      ? 1 + cntLessThan(n, t)
      : cntLessThan(n, t);

  const cntNumInversions = ([h, ...t]) =>
    h === undefined
    ? 0
    : cntLessThan(h, t) + cntNumInversions(t);

  const isEven = n => !(n % 2);

  // FIXME: only works on a 3x3 grid; on other sizes, assumes to be solvable
  const isSolvable = _ => sideLength === 3 ? isEven(cntNumInversions(array)) : true;

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

  const reverse = ([h, ...t]) =>
    h === undefined
    ? []
    : reverse(t).concat(h);

  const mirror = _ => (array = reverse(array)) && array;

  const getArray = _ => array;
  const getNumInversions = _ => cntNumInversions(array);

  const equals = ([h1, ...t1], [h2, ...t2]) =>
  h1 === undefined && h2 === undefined
  ? true
  : h1 === h2
  ? true && equals(t1, t2)
  : false;

  const sort = ([h, ...t]) => h === undefined ? [] : sort(t.filter(x => x <= h)).concat(h).concat(sort(t.filter(x => x > h)));

  const solve = _ => {
    array = sort(array);
    array.shift();
    array.push(0);
  }

  const isSolved = _ => equals(array.slice(0, -1), sort(array.slice(0, -1))) && array[array.length-1] === 0;

  const init = _ => {
    array = genRandSet(sideLength ** 2 - 1);
    if (!isSolvable()) jenny();
    if (cntNumInversions(array) < 11) mirror();
    array.push(0);
  };

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
    mirror,
    sort,
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

// feels a bit clunky
const Dice = (numSides=6, numRolls=1, resultModifier=0) => {
  let rolls = [];

  if (numRolls < 1) {
    numRolls = 1;
    console.log('A dice roll cannot have less than one die.');
  }
  if (numSides < 2) {
    numSides = 2;
    console.log('A die cannot lave less than two sides');
  }

  const roll = _ => {
    for (var i = 0; i < numRolls; i++) rolls.push(Math.ceil(Math.random()*numSides));
    return rolls;
  }

  // there's probably a more terse way of doing this
  const sum = _ => (rolls.reduce(((a, b) => a + b), 0) + resultModifier);

  const getTotal = _ => {
    rolls = [];
    roll();
    return sum();
  }

  const getResultString = _ => {
    let total;

    if (numRolls === 1) {
      total = getTotal();
      if (resultModifier === 0) {
        return total.toString();
      }
    } else {
      total = getTotal();
    }

    return `[${rolls.join(', ')}]`
    + (
      resultModifier === 0
      ? ''
      : (
        resultModifier > 0
        ? ' +'
        : ' -'
      )
      + resultModifier
    )
    + ' = '
    + total;
  }

  return {
    getTotal,
    getResultString
  };
};
