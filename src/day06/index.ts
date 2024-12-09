import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput;
type Position = {
  rowIdx: number;
  colIdx: number;
};
type Grid = string[][];
type Direction = 'N' | 'W' | 'E' | 'S';

let grid: string[][];
let rowMax: number;
let colMax: number;

const DIRECTION_SEARCH_LOOKUP = {
  N: { dRow: -1, dCol: 0 },
  W: { dRow: 0, dCol: -1 },
  S: { dRow: 1, dCol: 0 },
  E: { dRow: 0, dCol: 1 },
};
const NEXT_DIRECTION: any = {
  N: 'E',
  E: 'S',
  S: 'W',
  W: 'N',
};

const getSearchPosition = (
  { rowIdx, colIdx }: Position,
  direction: Direction,
): Position => {
  return {
    rowIdx: rowIdx + DIRECTION_SEARCH_LOOKUP[direction].dRow,
    colIdx: colIdx + DIRECTION_SEARCH_LOOKUP[direction].dCol,
  };
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  // Get Position
  let position: Position;
  grid = input.split('\n').map((row, rowIdx) => {
    let colIdx = row.indexOf('^');
    if (colIdx >= 0) {
      position = { rowIdx, colIdx };
      console.log(position);
    }
    return row.split('');
  });
  console.log(grid);
  if (!position) {
    return;
  }
  rowMax = grid.length - 1;
  colMax = grid[0].length - 1;

  // March
  let visited = new Set<string>();
  visited.add(`${position.rowIdx}|${position.colIdx}`);
  let direction: Direction = 'N';
  let nextPosition = getSearchPosition(position, direction);
  while (
    nextPosition.rowIdx <= rowMax &&
    nextPosition.rowIdx >= 0 &&
    nextPosition.colIdx <= colMax &&
    nextPosition.colIdx >= 0
  ) {
    console.log(position, nextPosition);
    if (['.', '^'].includes(grid[nextPosition.rowIdx][nextPosition.colIdx])) {
      visited.add(`${nextPosition.rowIdx}|${nextPosition.colIdx}`);
      position = nextPosition;
      nextPosition = getSearchPosition(nextPosition, direction);
    } else {
      direction = NEXT_DIRECTION[direction];
      nextPosition = getSearchPosition(position, direction);
    }
  }

  return visited.size;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `
        ....#.....
        .........#
        ..........
        ..#.......
        .......#..
        ..........
        .#..^.....
        ........#.
        #.........
        ......#...
        `,
        expected: 41,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
