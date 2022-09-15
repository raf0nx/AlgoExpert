// Solution 1, O(n) time complexity, O(1) space complexity - because the input string is an english alphabet which is composed of 26 characters
export function firstNonRepeatingCharacter(string: string) {
  const charFreqMap: { [key: string]: number } = {}

  for (const char of string) {
    if (!charFreqMap[char]) charFreqMap[char] = 0
    charFreqMap[char]++
  }

  for (let i = 0; i < string.length; i++) {
    if (charFreqMap[string[i]] === 1) return i
  }

  return -1
}
