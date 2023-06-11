// Solution 1, O(n * m + k) time complexity, O(n * m + k) space complexity
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
