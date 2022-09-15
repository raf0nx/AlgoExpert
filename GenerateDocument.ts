/**
 * Solution 1, O(n + m) time complexity, O(c) space complexity,
 * where n is the length of characters, m is the length of the document and
 * c is the number of unique characters in the characters string
 */
export function generateDocument(characters: string, document: string) {
  const charactersFrequencyMap = createCharsFrequencyMap(characters)

  for (const char of document) {
    if (
      !charactersFrequencyMap.hasOwnProperty(char) ||
      charactersFrequencyMap[char] === 0
    )
      return false

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
