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

// Solution 2, O(n^2) time complexity, O(n) space complexity,
// where n is the length of prices
export function juiceBottling2(prices: number[]) {
  const maxProfits = new Array(prices.length).fill(0)
  const dividingPoints = new Array(prices.length).fill(0)

  for (let size = 1; size < prices.length; size++) {
    maxProfits[size] = prices[size]
    dividingPoints[size] = size

    for (let dividingPoint = 1; dividingPoint < size; dividingPoint++) {
      const possibleProfit =
        prices[dividingPoint] + maxProfits[size - dividingPoint]

      if (possibleProfit > maxProfits[size]) {
        maxProfits[size] = possibleProfit
        dividingPoints[size] = dividingPoint
      }
    }
  }

  const result: number[] = []
  let currentDividingPoint = dividingPoints.length - 1

  while (currentDividingPoint > 0) {
    result.push(dividingPoints[currentDividingPoint])
    currentDividingPoint -= dividingPoints[currentDividingPoint]
  }

  return result
}
