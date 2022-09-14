// Solution 1, O(n) time complexity, O(n) space complexity
export function runLengthEncoding(string: string) {
  let encodedStrArr: string[] = [],
    consecutiveCharsCount = 1

  for (let i = 1; i <= string.length; i++) {
    const currLetter = string[i],
      prevLetter = string[i - 1]

    if (currLetter !== prevLetter || consecutiveCharsCount === 9) {
      encodedStrArr.push(`${consecutiveCharsCount}${prevLetter}`)
      consecutiveCharsCount = 0
    }

    consecutiveCharsCount++
  }

  return encodedStrArr.join('')
}
