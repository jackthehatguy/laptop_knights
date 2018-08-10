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
    for (var i = 0; i < numRolls; i++) with (Math) rolls.push(ceil(random()*numSides));
    return rolls;
  }

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
      rolls = '[' + rolls.join(', ') + ']';
    }

    return rolls
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
    getTotal: getTotal,
    getResultString: getResultString
  };
}
