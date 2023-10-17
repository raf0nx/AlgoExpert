// Solution 1, O(n! * n) time complexity, O(n! * n) space complexity,
// where n is the length of the input array
type KnapsackItemWithIdx = [number, number, number]
type KnapsackItemCombination = KnapsackItemWithIdx[]

export function knapsackProblem(
  items: [number, number][],
  capacity: number
): [number, number[]] {
  const itemsWithIdxs = items.map((item, i) => [
    ...item,
    i,
  ]) as KnapsackItemWithIdx[]
  const knapsackItemCombinations: KnapsackItemCombination[] = []

  getCombinedItems(itemsWithIdxs, knapsackItemCombinations, [], capacity)

  return findMaxCombinedValue(knapsackItemCombinations)
}

function getCombinedItems(
  items: KnapsackItemWithIdx[],
  combinations: KnapsackItemCombination[],
  currentCombination: KnapsackItemCombination,
  remainingCapacity: number
) {
  for (let i = 0; i < items.length; i++) {
    const [value, weight, itemIdx] = items[i]

    if (weight <= remainingCapacity) {
      const newCombination = [
        ...currentCombination,
        [value, weight, itemIdx],
      ] as KnapsackItemCombination

      combinations.push(newCombination)

      getCombinedItems(
        items.slice(i + 1),
        combinations,
        newCombination,
        remainingCapacity - weight
      )
    }
  }
}

function findMaxCombinedValue(
  combinations: KnapsackItemCombination[]
): [number, number[]] {
  let maxCombinationIdxs: number[] = []
  let max = -Infinity

  for (const combination of combinations) {
    const currentCombinationIdxs: number[] = []
    let sum = 0

    for (const [value, _, itemIdx] of combination) {
      sum += value
      currentCombinationIdxs.push(itemIdx)
    }

    if (sum > max) {
      max = sum
      maxCombinationIdxs = currentCombinationIdxs
    }
  }

  return [max === -Infinity ? 0 : max, maxCombinationIdxs]
}

// Solution 2, O(n * c) time complexity, O(n * c) space complexity,
// where n is the number of items and c is the capacity
export function knapsackProblem2(
  items: [number, number][],
  capacity: number
): [number, number[]] {
  const maxValues = Array.from<number, number[]>(
    { length: items.length + 1 },
    () => new Array(capacity + 1).fill(0)
  )

  for (let i = 1; i < maxValues.length; i++) {
    for (let j = 1; j <= capacity; j++) {
      const [value, weight] = items[i - 1]
      const currentAndPreviousMaxSum =
        weight > j ? 0 : value + maxValues[i - 1][j - weight]

      maxValues[i][j] = Math.max(maxValues[i - 1][j], currentAndPreviousMaxSum)
    }
  }

  return [maxValues[items.length][capacity], getKnapsackItems(items, maxValues)]
}

function getKnapsackItems(items: [number, number][], maxValues: number[][]) {
  const itemsIdxs: number[] = []
  let currentPosition = [maxValues.length - 1, maxValues[0].length - 1]

  while (currentPosition[0] > 0 && currentPosition[1] > 0) {
    const [row, col] = currentPosition

    if (maxValues[row][col] === maxValues[row - 1][col]) {
      currentPosition = [row - 1, col]
    } else {
      itemsIdxs.push(row - 1)
      currentPosition = [row - 1, col - items[row - 1][1]]
    }
  }

  return itemsIdxs.reverse()
}
