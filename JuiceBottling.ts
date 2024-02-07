// Solution 1, O(n^2) time complexity, O(n) space complexity,
// where n is the length of prices
export function juiceBottling(prices: number[]) {
  return juiceBottlingHelper(prices, prices.length - 1, {})[0].sort()
}

function juiceBottlingHelper(
  prices: number[],
  quantityLeft: number,
  memo: Record<number, [number[], number]>
): [number[], number] {
  if (quantityLeft in memo) return memo[quantityLeft]

  if (quantityLeft <= 0) return [[], 0]

  let maxPrice = 0
  let quantities: number[] = []

  for (let quantity = 1; quantity <= quantityLeft; quantity++) {
    const currPrice = prices[quantity]
    const [prevQuantities, prevMaxPrice] = juiceBottlingHelper(
      prices,
      quantityLeft - quantity,
      memo
    )

    if (currPrice + prevMaxPrice > maxPrice) {
      maxPrice = currPrice + prevMaxPrice
      quantities = [...prevQuantities, quantity]
    }
  }

  memo[quantityLeft] = [quantities, maxPrice]

  return [quantities, maxPrice]
}
