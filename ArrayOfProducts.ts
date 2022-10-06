// Solution 1, O(n^2) time complexity, O(n) space complexity
export function arrayOfProducts(array: number[]) {
  const result: number[] = []

  for (let i = 0; i < array.length; i++) {
    let product = 1

    for (let j = 0; j < array.length; j++) {
      if (j !== i) product *= array[j]
    }

    result.push(product)
  }

  return result
}

// Solution 2, O(n) time complexity, O(n) space complexity
export function arrayOfProducts2(array: number[]) {
  const result: number[] = []

  let leftRunningProduct = 1
  for (let i = 0; i < array.length; i++) {
    result.push(leftRunningProduct)
    leftRunningProduct *= array[i]
  }

  let rightRunningProduct = 1
  for (let i = array.length - 1; i >= 0; i--) {
    result[i] *= rightRunningProduct
    rightRunningProduct *= array[i]
  }

  return result
}
