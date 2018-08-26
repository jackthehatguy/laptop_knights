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
