// Solution 1, O(n * log(n)) time complexity, O(n) space complexity
export function nonConstructibleChange(coins: number[]) {
  const sortedCoins = [...coins].sort((a, b) => a - b)

  let minChange = 0

  for (const coin of sortedCoins) {
    if (coin > minChange + 1) break
    minChange += coin
  }

  return minChange + 1
}
