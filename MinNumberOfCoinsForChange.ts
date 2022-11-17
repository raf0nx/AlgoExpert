// Solution 1, O(n * d) time complexity, O(n) space complexity where d is the number of denoms
export function minNumberOfCoinsForChange(n: number, denoms: number[]) {
  const minNumOfCoins = Array.from<number, number>({ length: n + 1 }, (_, i) =>
    !i ? 0 : Infinity
  )

  for (const denom of denoms) {
    for (let amount = denom; amount < minNumOfCoins.length; amount++) {
      minNumOfCoins[amount] = Math.min(
        minNumOfCoins[amount],
        minNumOfCoins[amount - denom] + 1
      )
    }
  }

  return minNumOfCoins[n] === Infinity ? -1 : minNumOfCoins[n]
}
