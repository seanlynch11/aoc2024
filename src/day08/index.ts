import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput;

type antenna = {
  row: number;
  col: number;
  frequency: string;
};

// 357 correct
const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const antinodes = new Set();
  const nodes = new Map<string, antenna[]>();
  const grid = input.split('\n').map((line) => line.split(''));
  const rowMax = grid.length - 1;
  const colMax = grid[0].length - 1;
  grid.forEach((line, row) => {
    line.forEach((item, col) => {
      if (item !== '.') {
        if (!nodes.has(item)) {
          nodes.set(item, []);
        }
        nodes.get(item)?.forEach((antenna) => {
          const deltaR = antenna.row - row;
          const deltaC = antenna.col - col;
          const antinode1 = { row: row - deltaR, col: col - deltaC };
          const antinode2 = {
            row: antenna.row + deltaR,
            col: antenna.col + deltaC,
          };
          if (
            antinode1.row >= 0 &&
            antinode1.row <= rowMax &&
            antinode1.col >= 0 &&
            antinode1.col <= colMax
          ) {
            antinodes.add(`${antinode1.row}|${antinode1.col}`);
          }
          if (
            antinode2.row >= 0 &&
            antinode2.row <= rowMax &&
            antinode2.col >= 0 &&
            antinode2.col <= colMax
          ) {
            antinodes.add(`${antinode2.row}|${antinode2.col}`);
          }
        });
        nodes.get(item)?.push({ row, col, frequency: item });
      }
    });
  });

  return antinodes.size;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const antinodes = new Set();
  const nodes = new Map<string, antenna[]>();
  const grid = input.split('\n').map((line) => line.split(''));
  const rowMax = grid.length - 1;
  const colMax = grid[0].length - 1;
  grid.forEach((line, row) => {
    line.forEach((item, col) => {
      if (item !== '.') {
        antinodes.add(`${row}|${col}`);
        if (!nodes.has(item)) {
          nodes.set(item, []);
        }
        nodes.get(item)?.forEach((antenna) => {
          const deltaR = antenna.row - row;
          const deltaC = antenna.col - col;
          let resonance = 1;
          let nextLocation = {
            row: row - deltaR * resonance,
            col: col - deltaC * resonance,
          };
          while (
            nextLocation.row >= 0 &&
            nextLocation.row <= rowMax &&
            nextLocation.col >= 0 &&
            nextLocation.col <= colMax
          ) {
            antinodes.add(`${nextLocation.row}|${nextLocation.col}`);
            resonance++;
            nextLocation = {
              row: row - deltaR * resonance,
              col: col - deltaC * resonance,
            };
          }
          resonance = 1;
          nextLocation = {
            row: antenna.row + deltaR * resonance,
            col: antenna.col + deltaC * resonance,
          };
          while (
            nextLocation.row >= 0 &&
            nextLocation.row <= rowMax &&
            nextLocation.col >= 0 &&
            nextLocation.col <= colMax
          ) {
            antinodes.add(`${nextLocation.row}|${nextLocation.col}`);
            resonance++;
            nextLocation = {
              row: antenna.row + deltaR * resonance,
              col: antenna.col + deltaC * resonance,
            };
          }
        });
        nodes.get(item)?.push({ row, col, frequency: item });
      }
    });
  });

  return antinodes.size;
};

run({
  part1: {
    tests: [
      {
        /**
          ......#....#
          ...#....0...
          ....#0....#.
          ..#....0....
          ....0....#..
          .#....A.....
          ...#........
          #......#....
          ........A...
          .........A..
          ..........#.
          ..........#.
        */
        input: `
          ............
          ........0...
          .....0......
          .......0....
          ....0.......
          ......A.....
          ............
          ............
          ........A...
          .........A..
          ............
          ............
        `,
        expected: 14,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        /**
          ##....#....#
          .#.#....0...
          ..#.#0....#.
          ..##...0....
          ....0....#..
          .#...#A....#
          ...#..#.....
          #....#.#....
          ..#.....A...
          ....#....A..
          .#........#.
          ...#......##
        */
        input: `
          ............
          ........0...
          .....0......
          .......0....
          ....0.......
          ......A.....
          ............
          ............
          ........A...
          .........A..
          ............
          ............
        `,
        expected: 34,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
