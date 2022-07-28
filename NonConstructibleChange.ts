// Solution 1, O(n * log(n)) time complexity, O(n) space complexity
export function nonConstructibleChange(coins: number[]) {
  const sortedCoins = [...coins].sort((a, b) => a - b)

  let change = 0
  let i = 0

  for (const coin of sortedCoins) {
    if (coin > change + 1) return change + 1

    change += coin
    i++
  }

  return change + 1
}
