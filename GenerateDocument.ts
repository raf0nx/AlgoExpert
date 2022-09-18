/**
 * Solution 1, O(n + m) time complexity, O(c) space complexity,
 * where n is the length of characters, m is the length of the document and
 * c is the number of unique characters in the characters string
 */
export function generateDocument(characters: string, document: string) {
  const charactersFrequencyMap = createCharsFrequencyMap(characters)

  for (const char of document) {
    if (!charactersFrequencyMap[char]) return false
    charactersFrequencyMap[char]--
  }

  return true
}

function createCharsFrequencyMap(chars: string) {
  const charsMap: { [key: string]: number } = {}

  for (const char of chars) {
    charsMap[char] ? charsMap[char]++ : (charsMap[char] = 1)
  }

  return charsMap
}

/**
 * Solution 2, O(n + m) time complexity, O(c) space complexity,
 * where n is the length of characters, m is the length of the document and
 * c is the number of unique characters in the characters string
 */
export function generateDocument2(characters: string, document: string) {
  const charactersFrequencyMap = createCharsFrequencyMap2(characters)

  for (const char of document) {
    if (!charactersFrequencyMap.get(char)) return false
    charactersFrequencyMap.set(char, charactersFrequencyMap.get(char)! - 1)
  }

  return true
}

function createCharsFrequencyMap2(chars: string) {
  const charsMap = new Map<string, number>()

  for (const char of chars) {
    charsMap.set(char, (charsMap.get(char) || 0) + 1)
  }

  return charsMap
}
