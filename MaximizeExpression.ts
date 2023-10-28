// Solution 1, O(n^4) time complexity, O(1) space complexity,
// where n is the length of the input array
export function maximizeExpression(array: number[]) {
  let maxSum = -Infinity

  for (let i = 0; i < array.length - 3; i++) {
    for (let j = i + 1; j < array.length - 2; j++) {
      for (let k = j + 1; k < array.length - 1; k++) {
        for (let l = k + 1; l < array.length; l++) {
          maxSum = Math.max(maxSum, array[i] - array[j] + array[k] - array[l])
        }
      }
    }
  }

  return maxSum === -Infinity ? 0 : maxSum
}

// Solution 2, O(n) time complexity, O(n) space complexity,
// where n is the length of the input array
export function maximizeExpression2(array: number[]) {
  if (array.length < 4) return 0

  const maxA: number[] = new Array(array.length).fill(-Infinity)
  const maxAMinusB: number[] = new Array(array.length).fill(-Infinity)
  const maxAminusBPlusC: number[] = new Array(array.length).fill(-Infinity)
  const maxAMinusBPlusCMinusD: number[] = new Array(array.length).fill(
    -Infinity
  )

  for (let i = 0; i < array.length; i++) {
    maxA[i] = Math.max(maxA[i - 1] || -Infinity, array[i])
  }

  for (let i = 1; i < array.length; i++) {
    maxAMinusB[i] = Math.max(maxAMinusB[i - 1], maxA[i - 1] - array[i])
  }

  for (let i = 2; i < array.length; i++) {
    maxAminusBPlusC[i] = Math.max(
      maxAminusBPlusC[i - 1],
      maxAMinusB[i - 1] + array[i]
    )
  }

  for (let i = 3; i < array.length; i++) {
    maxAMinusBPlusCMinusD[i] = Math.max(
      maxAMinusBPlusCMinusD[i - 1],
      maxAminusBPlusC[i - 1] - array[i]
    )
  }

  return maxAMinusBPlusCMinusD[maxAMinusBPlusCMinusD.length - 1]
}
