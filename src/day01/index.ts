import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const list1 = [] as any as [number];
  const list2 = [] as any as [number];
  input.split('\n').map((line) => {
    const [first, second] = line.split(/\s+/g);
    list1.push(parseInt(first));
    list2.push(parseInt(second));
  });
  list1.sort();
  list2.sort();

  return list1.reduce((sum, item, idx) => {
    sum += Math.abs(item - list2[idx]);
    return sum;
  }, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const similarities1 = new Map<number, number>();
  const similarities2 = new Map<number, number>();

  input.split('\n').map((line) => {
    const [first, second] = line.split('   ');
    similarities1.set(
      parseInt(first),
      1 + (similarities1.get(parseInt(first)) || 0),
    );
    similarities2.set(
      parseInt(second),
      1 + (similarities2.get(parseInt(second)) || 0),
    );
  });

  return Array.from(similarities1.keys()).reduce(
    (sum, item, idx) =>
      sum +
      item * (similarities1.get(item) ?? 0) * (similarities2.get(item) ?? 0),
    0,
  );
};

run({
  part1: {
    tests: [
      {
        input: `3   4
4   3
2   5
1   3
3   9
3   3`,
        expected: 11,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `3   4
4   3
2   5
1   3
3   9
3   3`,
        expected: 31,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
