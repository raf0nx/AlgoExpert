// Solution 1, O(n^3) time complexity, O(1) space complexity
// where n is the length of the string
export function longestPalindromicSubstring(string: string) {
  let longestSubstring = ''

  for (let i = 0; i < string.length; i++) {
    for (let j = 0; j < string.length; j++) {
      if (string[i] !== string[j]) continue

      const potentialPalindrome = string.slice(i, j + 1)

      if (
        isPalindrome(potentialPalindrome) &&
        potentialPalindrome.length > longestSubstring.length
      ) {
        longestSubstring = potentialPalindrome
      }
    }
  }

  return longestSubstring
}

function isPalindrome(string: string) {
  let left = 0
  let right = string.length - 1

  while (left < right) {
    if (string[left] !== string[right]) return false

    left++
    right--
  }

  return true
}
