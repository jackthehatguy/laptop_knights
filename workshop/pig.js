const Pig = function () {
  var first;

  const isVowel = char => ['a','e','i','o','u','y'].includes(char);

  const rotate = ([h, ...t]) => t.concat(h);

  const translate = word => ([first] = word) && (isVowel(first)) ? word.concat('ay') : translate(rotate(word));

  const yayCheck = word => ([first] = word) && (isVowel(first) && first !== 'y') ? word.concat('yay') : translate(word);

  const isCapital = string => string.toUpperCase() === string;

  const toProper = ([h, ...t]) => h.toUpperCase().concat(t.join('').toLowerCase());

  const isProper = ([h, ...t]) => isCapital(h) && !isCapital(t.join(''));

  const hasNoVowels = ([...word]) => word.reduce((acc, cur) => acc && !isVowel(cur), true);

  const keepCase = (word, funct) => isCapital(word) ? funct(word.toLowerCase()).toUpperCase() : isProper(word) ? toProper(funct(word.toLowerCase())) : funct(word.toLowerCase());

  const compose = (val, [funct, ...rest]) => funct === undefined ? val : compose(funct(val),rest);

  const nebula = ([...string], funct) => funct(string).join('');

  const pig = string => keepCase(string, (string => hasNoVowels(string) ? string : nebula(string, yayCheck)));

  const splice = (body, graft, index) => body.slice(0, index).concat(graft).concat(body.slice(index));

  const reverse = ([h, ...t]) => t.length === 0 ? h : reverse(t).concat(h);

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
}
