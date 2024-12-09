import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const total = input.match(/mul\(\d+,\d+\)/g)?.reduce((sum, match) => {
    const [first, second] = match.match(/\d+/g);
    return sum + first * second;
  }, 0);
  return total;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let active = true;
  const matches = input.match(/mul\(\d+,\d+\)|don't\(\)|do\(\)/g);
  const total = matches?.reduce((sum, match) => {
    if (match === "don't()") {
      active = false;
    } else if (match === 'do()') {
      active = true;
    } else {
      if (active) {
        const [first, second] = match.match(/\d+/g);
        sum += first * second;
      }
    }
    return sum;
  }, 0);
  return total;
};

run({
  part1: {
    tests: [
      {
        input: `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`,
        expected: 161,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`,
        expected: 48,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
