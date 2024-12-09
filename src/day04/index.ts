import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput;

type Position = {
  rowIdx: number;
  colIdx: number;
};
type Grid = string[][];
type Direction = 'NW' | 'N' | 'NE' | 'W' | 'E' | 'SW' | 'S' | 'SE';
const DIRECTIONS: Direction[] = ['NW', 'N', 'NE', 'W', 'E', 'SW', 'S', 'SE'];
const XMAS = 'XMAS';

let grid: Grid;
let rowMax: number;
let colMax: number;

const DIRECTION_SEARCH_LOOKUP = {
  NE: { dRow: -1, dCol: 1 },
  N: { dRow: -1, dCol: 0 },
  NW: { dRow: -1, dCol: -1 },
  W: { dRow: 0, dCol: -1 },
  SW: { dRow: 1, dCol: -1 },
  S: { dRow: 1, dCol: 0 },
  SE: { dRow: 1, dCol: 1 },
  E: { dRow: 0, dCol: 1 },
};

const checkForLetter = (
  { rowIdx, colIdx }: Position,
  letter: string,
): boolean => {
  return (
    rowIdx >= 0 &&
    rowIdx <= rowMax &&
    colIdx >= 0 &&
    colIdx <= colMax &&
    grid[rowIdx][colIdx] === letter
  );
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

const isNextLetterInDirection = (
  { rowIdx, colIdx }: Position,
  direction: Direction,
  letter: string,
): boolean => {
  const searchPosition = getSearchPosition({ rowIdx, colIdx }, direction);
  return (
    checkForLetter(searchPosition, letter) &&
    (letter === 'S' ||
      isNextLetterInDirection(
        searchPosition,
        direction,
        XMAS[XMAS.indexOf(letter) + 1],
      ))
  );
};

const searchForLetter = (
  { rowIdx, colIdx }: Position,
  letter: string,
): Direction[] => {
  let directions = [...DIRECTIONS];
  const numRemaining = 4 - XMAS.indexOf(letter);
  if (rowIdx < numRemaining) {
    directions = directions.filter((direction) => !direction.includes('N'));
  }
  if (colIdx < numRemaining) {
    directions = directions.filter((direction) => !direction.includes('W'));
  }
  if (rowIdx > rowMax - numRemaining) {
    directions = directions.filter((direction) => !direction.includes('S'));
  }
  if (colIdx > colMax - numRemaining) {
    directions = directions.filter((direction) => !direction.includes('E'));
  }

  let foundDirections = directions.filter((direction) =>
    isNextLetterInDirection({ rowIdx, colIdx }, direction, letter),
  );

  return foundDirections;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let total = 0;
  grid = input.split('\n').map((row) => row.split(''));
  rowMax = grid.length - 1;
  colMax = grid[0].length - 1;

  grid.forEach((row, rowIdx) => {
    row.forEach((letter, colIdx) => {
      if (letter === 'X') {
        total += searchForLetter({ rowIdx, colIdx }, 'M').length;
      }
    });
  });

  return total;
};

const searchForXMAS = ({ rowIdx, colIdx }: Position): boolean => {
  return (
    ((checkForLetter(getSearchPosition({ rowIdx, colIdx }, 'NW'), 'S') ||
      checkForLetter(getSearchPosition({ rowIdx, colIdx }, 'SE'), 'S')) &&
      (checkForLetter(getSearchPosition({ rowIdx, colIdx }, 'NE'), 'S') ||
        checkForLetter(getSearchPosition({ rowIdx, colIdx }, 'SW'), 'S')) &&
      (checkForLetter(getSearchPosition({ rowIdx, colIdx }, 'SE'), 'M') ||
        checkForLetter(getSearchPosition({ rowIdx, colIdx }, 'NW'), 'M')) &&
      (checkForLetter(getSearchPosition({ rowIdx, colIdx }, 'SW'), 'M') ||
        checkForLetter(getSearchPosition({ rowIdx, colIdx }, 'NE'), 'M'))) ||
    ((checkForLetter(getSearchPosition({ rowIdx, colIdx }, 'NE'), 'S') ||
      checkForLetter(getSearchPosition({ rowIdx, colIdx }, 'SW'), 'S')) &&
      (checkForLetter(getSearchPosition({ rowIdx, colIdx }, 'NW'), 'S') ||
        checkForLetter(getSearchPosition({ rowIdx, colIdx }, 'SE'), 'S')) &&
      (checkForLetter(getSearchPosition({ rowIdx, colIdx }, 'SW'), 'M') ||
        checkForLetter(getSearchPosition({ rowIdx, colIdx }, 'NE'), 'M')) &&
      (checkForLetter(getSearchPosition({ rowIdx, colIdx }, 'SE'), 'M') ||
        checkForLetter(getSearchPosition({ rowIdx, colIdx }, 'NW'), 'M')))
  );
};

// Find the number of A's which have 2 M's and 2 S's on opposite sides
const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let total = 0;
  grid = input.split('\n').map((row) => row.split(''));
  rowMax = grid.length - 1;
  colMax = grid[0].length - 1;

  grid.forEach((row, rowIdx) => {
    row.forEach((letter, colIdx) => {
      if (letter === 'A' && searchForXMAS({ rowIdx, colIdx })) {
        total++;
      }
    });
  });

  return total;
};

run({
  part1: {
    tests: [
      {
        input: `
          MMMSXXMASM
          MSAMXMSMSA
          AMXSXMAAMM
          MSAMASMSMX
          XMASAMXAMM
          XXAMMXXAMA
          SMSMSASXSS
          SAXAMASAAA
          MAMMMXMMMM
          MXMXAXMASX
        `,
        expected: 18,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          MMMSXXMASM
          MSAMXMSMSA
          AMXSXMAAMM
          MSAMASMSMX
          XMASAMXAMM
          XXAMMXXAMA
          SMSMSASXSS
          SAXAMASAAA
          MAMMMXMMMM
          MXMXAXMASX
        `,
        expected: 9,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
