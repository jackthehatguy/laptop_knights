/**
 * /!\ all repeating iterations continue from beginning of range, not start input
 * /!\ range from 0 (inclusive) to length (exclusive)
 * @param {Number} length: number of iterations per cycle
 * @param {String || Number} type: which cycle function to execute
 * @param {Number} step: vector from one value to the next
 * @param {Number} start: the inital position of the return value
 */
const iterator = (length, type, step = 1, start = 0) => {
  if (!length || isNaN(length)) {
    console.log(`Must be a number other than 0`);
    return;
  }
  if (start >= length) start = length-1;

  let
    cur = start,      // the curent value of incrementer
    times = type,     // numbers of complete loops left in the complete run
    next = null,      // the function to acuire the proceeding value in the iterator
    started = false;  // flag signifying the firs iteration value in the loop

  const once = _ => {
    let result = {
      value: cur,
      done: false
    };
    if (!started) {
      started = true;
    } else {
      if ((step > 0 && cur >= length-step) || (step < 0 && cur <= -step-1)) {
        result.done = true;
      } else {
        cur += step;
        result.value = cur;
      }
    }
    return result;
  };

  const chain = _ => {
    if (times > 0) {
      let next = once();
      if (!next.done) return next;
      if (--times <= 0) return {value: cur, done: true};
      cur = 0;
      return once();
    }
    return {value: cur, done: true};
  }

  const loop = _ => {
    let next = once();
    if (!next.done) return next;
    started = false;
    cur = 0;
    return once();
  };

  const swing = _ => {
    let next = once();

    if (!next.done) return next;
    step *= -1;
    return once();
  };

  switch (type) {
    case 'loop':
      next = loop;
      break;
    case 'wave': case 'swing':
      next = swing;
      break;
    case 'once': default:
      type = 'once';
      next = once;
      break;
  }
  if (!isNaN(type)) {
    next = chain;
    times = type;
  }

  const getCur = _ => cur;

  const setCur = num => cur = num;

  const setStep = num => step = num;

  const resetPosition = _ => setCur(start);

  const resetState = _ => {
    resetPosition();
    times = type;
    started = false;
  };

  const debug = {
    length,
    type,
    step,
    start,
    cur,
    times,
    next,
    started
  };

  return {
    debug,
    getCur,
    setCur,
    setStep,
    next,
    resetPosition
  };
}

let
  iter = iterator(10),
  next = {};
  
console.log(iter.debug);
// while (!next.done) if (!(next = iter.next()).done) console.log(next);
while (!iter.next().done) console.log(iter.getCur());
