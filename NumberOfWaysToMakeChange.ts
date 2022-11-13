// Solution 1, O(n * d) time complexity, O(n) space complexity where d is the number of denoms
export function numberOfWaysToMakeChange(n: number, denoms: number[]) {
  const numOfWays = Array.from<number, number>({ length: n + 1 }, (_, i) =>
    !i ? 1 : 0
  )

  for (const denom of denoms) {
    for (let amount = denom; amount < numOfWays.length; amount++) {
      numOfWays[amount] += numOfWays[amount - denom]
    }
  }

  return numOfWays[n]
}
