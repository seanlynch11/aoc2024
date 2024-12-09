import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput;

type Order = {
  afters: Set<string>;
  befores: Set<string>;
};

const buildOrderLookup = (orders: string) => {
  const orderLookup = new Map<string, Order>();
  orders.split('\n').forEach((order) => {
    const [before, after] = order.match(/\d+/g);
    if (!orderLookup.has(before)) {
      orderLookup.set(before, {
        afters: new Set<string>(),
        befores: new Set<string>(),
      });
    }
    if (!orderLookup.has(after)) {
      orderLookup.set(after, {
        afters: new Set<string>(),
        befores: new Set<string>(),
      });
    }
    orderLookup.get(before)?.afters.add(after);
    orderLookup.get(after)?.befores.add(before);
  });
  return orderLookup;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const [orders, updates] = input.split('\n\n');

  const orderLookup = buildOrderLookup(orders);

  let total = 0;
  updates.split('\n').forEach((update) => {
    const updateList = update.match(/\d+/g);
    if (!updateList) {
      return;
    }

    let priorItem: string;
    for (let item of updateList) {
      if (!priorItem) {
        priorItem = item;
        continue;
      }
      if (orderLookup.get(item)?.afters.has(priorItem)) {
        return;
      }
      priorItem = item;
    }
    total += parseInt(updateList[Math.floor(updateList.length / 2)]);
  });

  return total;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const [orders, updates] = input.split('\n\n');

  const orderLookup = buildOrderLookup(orders);

  let total = 0;
  const badUpdates = updates.split('\n').map((update) => {
    const updateList = update.match(/\d+/g);
    if (!updateList) {
      return;
    }

    let priorItem: string;
    for (let item of updateList) {
      if (!priorItem) {
        priorItem = item;
        continue;
      }
      if (orderLookup.get(item)?.afters.has(priorItem)) {
        return updateList;
      }
      priorItem = item;
    }
  });
  badUpdates
    .filter((update) => update?.length)
    .forEach((update) => {
      update?.sort((a, b) => {
        if (orderLookup.get(a)?.afters.has(b)) {
          return -1;
        } else {
          return 1;
        }
      });
      console.log('after', update);
      total += parseInt(update[Math.floor(update.length / 2)]);
    });

  return total;
};

run({
  part1: {
    tests: [
      {
        input: `
          47|53
          97|13
          97|61
          97|47
          75|29
          61|13
          75|53
          29|13
          97|29
          53|29
          61|53
          97|53
          61|29
          47|13
          75|47
          97|75
          47|61
          75|61
          47|29
          75|13
          53|13

          75,47,61,53,29
          97,61,53,29,13
          75,29,13
          75,97,47,61,53
          61,13,29
          97,13,75,29,47
        `,
        expected: 143,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          47|53
          97|13
          97|61
          97|47
          75|29
          61|13
          75|53
          29|13
          97|29
          53|29
          61|53
          97|53
          61|29
          47|13
          75|47
          97|75
          47|61
          75|61
          47|29
          75|13
          53|13

          75,47,61,53,29
          97,61,53,29,13
          75,29,13
          75,97,47,61,53
          61,13,29
          97,13,75,29,47
        `,
        expected: 123,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
