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

// reverse :: Array -> Array
const reverse = ([h, ...t]) =>
  h === undefined
  ? []
  : push(reverse(t), h);

const compose = (x, [h, ...t]) => h === undefined ? x : h(compose(x,t));

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

const pickRandSet = n => range(n).sort(_ => 0.5 - Math.random());

const isEven = n => n % 2 === 0;

const rotateLeft = ([h, ...t]) => push(t, h);

function* fWave(array) {
  let n = 0;
  while (true) {
    while (n < array.length-1) {
      yield array[n++];
    }
    while (n > 0) {
      yield array[n--];
    }
  }
}

//==============================================================================

const Pig = function () {
  var first;

  const isVowel = char => ['a','e','i','o','u','y'].includes(char);

  const rotate = ([h, ...t]) => t.concat(h);

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
