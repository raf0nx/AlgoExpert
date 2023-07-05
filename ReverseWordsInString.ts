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

// Solution 2, O(n) time complexity, O(n) space complexity
// where n is the length of the string
export function reverseWordsInString2(string: string) {
  const result: string[] = []
  const words: string[] = []
  let currentWord: string[] = []

  for (const char of string) {
    if (char.trim()) {
      currentWord.push(char)
    } else {
      words.push(currentWord.join(''), char)
      currentWord = []
    }
  }

  words.push(currentWord.join(''))

  for (let i = words.length - 1; i >= 0; i--) {
    result.push(words[i])
  }

  return result.join('')
}
