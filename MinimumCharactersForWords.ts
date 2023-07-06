// Solution 1, O(n * m + p) time complexity, O(n * m + p) space complexity
// where n is the number of words, m is the length of the longest word, and p is the total number of unique characters in all the words
export function minimumCharactersForWords(words: string[]) {
  const result: string[] = []
  const minCharCount: Record<string, number> = {}

  for (const word of words) {
    const wordCharCount: Record<string, number> = {}

    for (const char of word) {
      wordCharCount[char] = (wordCharCount[char] || 0) + 1
    }

    for (const char in wordCharCount) {
      if (minCharCount[char] > wordCharCount[char]) continue

      minCharCount[char] = wordCharCount[char]
    }
  }

  for (const [key, value] of Object.entries(minCharCount)) {
    result.push(...new Array(value).fill(key))
  }

  return result
}
