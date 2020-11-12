import { getRandomInt } from './getRandomInt';

export function genWord() {
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  const consts = [
    'b',
    'c',
    'd',
    'f',
    'g',
    'h',
    'j',
    'k',
    'l',
    'm',
    'n',
    'p',
    'qu',
    'r',
    's',
    't',
    'v',
    'w',
    'x',
    'y',
    'z',
    'tt',
    'ch',
    'sh',
  ];

  const len = getRandomInt(3, 8);

  let word = '';

  let is_vowel = false;

  let arr;

  for (let i = 0; i < len; i++) {
    if (is_vowel) arr = vowels;
    else arr = consts;
    is_vowel = !is_vowel;

    word += arr[Math.round(Math.random() * (arr.length - 1))];
  }

  return word;
}
