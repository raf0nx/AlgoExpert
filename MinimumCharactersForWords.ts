// Solution 1, O(n * l) time complexity, O(c) space complexity
// where n is the number of words, l is the length of the longest word, and c is the total number of unique characters in all the words
export function minimumCharactersForWords(words: string[]) {
  const result: string[] = []
  const maxCharFrequencies: Record<string, number> = {}

  for (const word of words) {
    const charFrequencies: Record<string, number> = {}

    for (const char of word) {
      charFrequencies[char] = (charFrequencies[char] || 0) + 1
    }

    for (const char in charFrequencies) {
      if (maxCharFrequencies[char] > charFrequencies[char]) continue

      maxCharFrequencies[char] = charFrequencies[char]
    }
  }

  Object.entries(maxCharFrequencies).forEach(([char, frequency]) => {
    for (let i = 0; i < frequency; i++) {
      result.push(char)
    }
  })

  return result
}
