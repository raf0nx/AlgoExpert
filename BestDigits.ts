// Solution 1, O(n) time complexity, O(n) space complexity
// where n is the length of the input string
export function bestDigits(number: string, numDigits: number) {
  const result = number.split('')
  let numsToRemove = numDigits
  let i = 0

  while (numsToRemove) {
    const nextIdx = (i + 1) % result.length

    if (result[i] <= result[nextIdx]) {
      result.splice(i, 1)
      numsToRemove -= 1
      i = 0
    } else {
      i = nextIdx
    }
  }

  return result.join('')
}
