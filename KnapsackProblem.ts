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
