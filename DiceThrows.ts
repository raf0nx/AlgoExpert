// Solution 1, O(d * s * t) time complexity, O(d * t) space complexity,
// where d is the number of throws, s is the number of sides, and t is the target
export function diceThrows(
  numDice: number,
  numSides: number,
  target: number,
  memo: Record<string, number> = {}
) {
  const memoKey = `${numDice}_${target}`

  if (memoKey in memo) return memo[memoKey]

  if (target < 0) return 0

  if (numDice === 0) return target === 0 ? 1 : 0

  let result = 0

  for (let num = 1; num <= numSides; num++) {
    result += diceThrows(numDice - 1, numSides, target - num, memo)
  }

  memo[memoKey] = result

  return result
}
