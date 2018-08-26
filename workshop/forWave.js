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
