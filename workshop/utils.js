const max = (a, b) => a > b ? a : b > a ? b : undefined;

const sum = (a,b) => a+b;
const summation = a => a.reduce(sum)

const isEven = x => !isNaN(x) && !(x%2);
const isOdd = x => !isNaN(x) && !isEven(x);
