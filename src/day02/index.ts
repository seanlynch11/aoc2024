import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return input.split('\n').reduce((sum, row) => {
    let lastNum;
    let lastDiff;
    for (let item of row.match(/\d+/g)) {
      const nextNum = parseInt(item);
      let nextDiff;
      if (!lastNum) {
        lastNum = nextNum;
        continue;
      }
      nextDiff = lastNum - nextNum;
      if (Math.abs(nextDiff) < 1 || Math.abs(nextDiff) > 3) {
        return sum;
      }
      if (!lastDiff) {
        lastNum = nextNum;
        lastDiff = nextDiff;
        continue;
      }
      if ((lastDiff < 0 && nextDiff > 0) || (lastDiff > 0 && nextDiff < 0)) {
        return sum;
      }
      lastNum = nextNum;
      lastDiff = nextDiff;
    }
    return ++sum;
  }, 0);
};

const testRow = (row: string[], canSkip = true): boolean => {
  let lastNum: number;
  let isIncreasing;
  // console.log(row, canSkip);
  for (let i = 0; i < row.length; i++) {
    let nextNum = parseInt(row[i]);
    if (!lastNum) {
      lastNum = nextNum;
      continue;
    }
    let nextDiff = nextNum - lastNum;
    if (Math.abs(nextDiff) < 1 || Math.abs(nextDiff) > 3) {
      // console.log('retrying without numbers');
      return (
        canSkip &&
        row.some((item, idx) =>
          testRow([...row.slice(0, idx), ...row.slice(idx + 1)], false),
        )
      );
    }
    if (
      isIncreasing != undefined &&
      ((nextDiff < 0 && isIncreasing) || (nextDiff > 0 && !isIncreasing))
    ) {
      return (
        canSkip &&
        row.some((item, idx) =>
          testRow([...row.slice(0, idx), ...row.slice(idx + 1)], false),
        )
      );
    }
    if (isIncreasing === undefined) {
      isIncreasing = nextDiff > 0;
    }
    lastNum = nextNum;
  }
  return true;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return input.split('\n').reduce((sum, row) => {
    let parsedRow = row.match(/\d+/g);
    return testRow(parsedRow, true) ? ++sum : sum;
  }, 0);
};

run({
  part1: {
    tests: [
      {
        input: `
          7 6 4 2 1
          1 2 7 8 9
          9 7 6 2 1
          1 3 2 4 5
          8 6 4 4 1
          1 3 6 7 9
        `,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          7 6 4 2 1
          1 2 7 8 9
        `,
        expected: 1,
      },
      {
        input: `
          9 7 6 2 1
        `,
        expected: 0,
      },
      {
        input: `
          1 3 2 4 5
        `,
        expected: 1,
      },
      {
        input: `
          8 6 4 4 1
        `,
        expected: 1,
      },
      {
        input: `
          1 3 6 7 9
        `,
        expected: 1,
      },
      {
        input: `
          7 6 8 9 10
        `,
        expected: 1,
      },
      {
        input: `
          7 7 8 9 10
        `,
        expected: 1,
      },
      {
        input: `
          7 6 6 9 10
        `,
        expected: 0,
      },
      {
        input: `
          7 6 8 9 6
        `,
        expected: 0,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
