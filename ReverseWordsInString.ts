// Solution 1, O(n) time complexity, O(n) space complexity
// where n is the length of the string
export function reverseWordsInString(string: string) {
  const result: string[] = []
  const wordStack: string[] = []

  for (let i = string.length - 1; i >= 0; i--) {
    const currentChar = string[i]

    if (!currentChar.trim()) {
      while (wordStack.length) {
        result.push(wordStack.pop()!)
      }

      result.push(currentChar)
    } else {
      wordStack.push(currentChar)
    }
  }

  while (wordStack.length) {
    result.push(wordStack.pop()!)
  }

  return result.join('')
}
