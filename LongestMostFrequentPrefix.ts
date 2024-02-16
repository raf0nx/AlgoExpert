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
