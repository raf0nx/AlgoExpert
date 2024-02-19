// Solution 1, O(n * m^2) time complexity, O(n * m) space complexity,
// where n is the number of strings and m is the length of the longest string
export function longestMostFrequentPrefix(strings: string[]) {
  const prefixesFrequencies: Record<string, number> = {}

  for (const string of strings) {
    for (let i = 0; i < string.length; i++) {
      const prefix = string.slice(0, i + 1)
      prefixesFrequencies[prefix] = (prefixesFrequencies[prefix] || 0) + 1
    }
  }

  const highestPrefixFrequency = Math.max(...Object.values(prefixesFrequencies))
  const mostCommonPrefixes = Object.keys(prefixesFrequencies).filter(
    key => prefixesFrequencies[key] === highestPrefixFrequency
  )

  return mostCommonPrefixes.reduce((a, b) => (a.length > b.length ? a : b), '')
}

// Solution 2, O(n * m) time complexity, O(n * m) space complexity,
// where n is the number of strings and m is the length of the longest string
export function longestMostFrequentPrefix2(strings: string[]) {
  const trie: Record<string, any> = {}

  let maxPrefixCount = 0
  let maxPrefixLength = 0
  let maxPrefixFullString = ''

  for (const string of strings) {
    let currentNode = trie

    for (const char of string) {
      if (!(char in currentNode)) currentNode[char] = {}

      currentNode[char].count = (currentNode[char].count || 0) + 1
      currentNode[char].length = (currentNode.length || 0) + 1
      currentNode = currentNode[char]

      if (currentNode.count > maxPrefixCount) {
        maxPrefixCount = currentNode.count
        maxPrefixLength = currentNode.length
        maxPrefixFullString = string
      } else if (
        currentNode.count === maxPrefixCount &&
        currentNode.length > maxPrefixLength
      ) {
        maxPrefixLength = currentNode.length
        maxPrefixFullString = string
      }
    }
  }

  return maxPrefixFullString.slice(0, maxPrefixLength)
}
