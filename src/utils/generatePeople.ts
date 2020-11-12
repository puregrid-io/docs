import cuid from 'cuid';
import { getRandomInt } from './getRandomInt';
import { genWord } from './genWord';

interface Person {
  uid: string;
  name: string;
  age: number;
}

export function generatePeople(count: number) {
  const people: Person[] = [];
  for (let i = 0; i < count; i++) {
    people.push({
      uid: cuid(),
      name: `${genWord()} ${genWord()}`,
      age: getRandomInt(1, 99),
    });
  }
  return people;
}
