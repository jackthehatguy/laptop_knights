const iterator = (start, end, type) => {
  if (start === end) {
    console.log(`start (${start}) and end (${end}) cannot be the same...`);
    return;
  }
  if (end === undefined) {
    end = start;
    start = 0;
  }

  let cur = start,
    times,
    next;

  const once = _ =>
    start < end
    ? cur <= end
      ? {value: cur++, done: false}
      : {value: cur, done: true}
    : cur >= end
      ? {value: cur--, done: false}
      : {value: cur, done: true};

  const chain = _ => {
    if (times > 0) {
      let next = once();
      if (!next.done) return next;
      if (--times <= 0) return {value: cur, done: true};
      cur = start;
      return once();
    }
    return {value: cur, done: true};
  }

  const loop = _ => {
    let next = once();
    if(!next.done) return next;
    cur = start;
    return once();
  };

  const wave = _ => {
    let next = once(),
      tmp = start;

    if (!next.done) return next;
    start = end;
    end = tmp;
    cur = start;
    once();
    return once();
  };

  switch (type) {
    case 'loop':
      next = loop;
      break;
    case 'wave':
      next = wave;
      break;
    case 'once': default:
      next = once;
      break;
  }
  if (!isNaN(type)) {
    next = chain;
    times = type;
  }

  const getCur = _ => cur;

  const reset = _ => {
    cur = start;
    if (!isNaN(type)) times = type;
  }

  return {
    cur: getCur,
    next,
    reset
  };
}

let iter = iterator(3,0,2),
  next = {};
while (!next.done) if (!(next = iter.next()).done) console.log(next.value);

console.log('');

iter.reset();
next = {};
for (let i = 0; i < 20; i++) {
  next = iter.next();
  if (!next.done) {
    console.log(next.value);
  } else {
    console.log(`done: ${i}`);
    break;
  }
}
