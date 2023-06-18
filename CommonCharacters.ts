// Solution 1, O(n * m + k) time complexity, O(n * m + k) space complexity
// where n is the number of input strings, m is the average length of the strings, and k is the total length of the joined strings.
export function commonCharacters(strings: string[]): string[] {
  const joinedStrings = deduplicateStrings(strings).join('')
  const charMap: Record<string, number> = {}

  for (let char of joinedStrings) {
    charMap[char] = (charMap[char] || 0) + 1
  }

  return Object.keys(charMap).filter(char => charMap[char] === strings.length)
}

function deduplicateStrings(strings: string[]): string[] {
  return strings.map(str => [...new Set(str)].join(''))
}

// Solution 2, O(n * m) time complexity, O(c) space complexity
// where n is the number of strings, m is the length of the longest string and c is the number of unique characters
export function commonCharacters2(strings: string[]) {
  const charMap: Record<string, number> = {}

  for (const string of strings) {
    const characters = new Set(string)

    for (const char of characters) {
      charMap[char] = (charMap[char] || 0) + 1
    }
  }

  return Object.keys(charMap).filter(char => charMap[char] === strings.length)
}
