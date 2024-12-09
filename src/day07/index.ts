import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput;

const testValues = (
  goal: number,
  items: number[],
  prevTotal: number,
): boolean => {
  let nextVal = items.shift();
  if (!nextVal) {
    return prevTotal == goal;
  }

  return (
    testValues(goal, [...items], prevTotal * nextVal) ||
    testValues(goal, [...items], prevTotal + nextVal)
  );
};
const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const lines = input
    .split('\n')
    .map((line) => line.match(/\d+/g)?.map((value) => parseInt(value)));

  const total = lines.reduce((tot, numbers) => {
    if (!numbers) {
      return tot;
    }
    let [goal, nextVal, ...items] = numbers;

    return testValues(goal, items, nextVal) ? tot + goal : tot;
  }, 0);

  return total;
};

const testOperations = (
  goal: number,
  items: number[],
  prevTotal: number,
): boolean => {
  let nextVal = items.shift();
  if (!nextVal) {
    return prevTotal == goal;
  }

  return (
    testOperations(goal, [...items], prevTotal * nextVal) ||
    testOperations(goal, [...items], prevTotal + nextVal) ||
    testOperations(goal, [...items], parseInt('' + prevTotal + nextVal))
  );
};
const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const lines = input
    .split('\n')
    .map((line) => line.match(/\d+/g)?.map((value) => parseInt(value)));

  const total = lines.reduce((tot, numbers) => {
    let [goal, nextVal, ...items] = numbers;
    return testOperations(goal, items, nextVal) ? tot + goal : tot;
  }, 0);

  return total;
};

run({
  part1: {
    tests: [
      {
        input: `
          190: 10 19
          3267: 81 40 27
          83: 17 5
          156: 15 6
          7290: 6 8 6 15
          161011: 16 10 13
          192: 17 8 14
          21037: 9 7 18 13
          292: 11 6 16 20
        `,
        expected: 3749,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          190: 10 19
          3267: 81 40 27
          83: 17 5
          156: 15 6
          7290: 6 8 6 15
          161011: 16 10 13
          192: 17 8 14
          21037: 9 7 18 13
          292: 11 6 16 20
        `,
        expected: 11387,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
