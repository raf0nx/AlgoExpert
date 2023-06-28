// Solution 1, O(n^3) time complexity, O(n) space complexity
// where n is the length of the string
export function longestPalindromicSubstring(string: string) {
  let longestSubstring = ''

  for (let i = 0; i < string.length; i++) {
    for (let j = i; j < string.length; j++) {
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

// Solution 2, O(n^2) time complexity, O(n) space complexity
// where n is the length of the string
export function longestPalindromicSubstring2(string: string) {
  let currentLongest = ''

  for (let i = 0; i < string.length; i++) {
    // Need to loop two times since palindrome can be either even or odd
    for (let j = 0; j < 2; j++) {
      const [leftIdx, rightIdx] = getPalindromeBoundaries(string, i, i + j)
      const possibleLongestPalindrome = string.slice(leftIdx, rightIdx + 1)

      if (possibleLongestPalindrome.length > currentLongest.length) {
        currentLongest = possibleLongestPalindrome
      }
    }
  }

  return currentLongest
}

function getPalindromeBoundaries(
  string: string,
  leftIdx: number,
  rightIdx: number
) {
  while (
    leftIdx >= 0 &&
    rightIdx < string.length &&
    string[leftIdx] === string[rightIdx]
  ) {
    leftIdx--
    rightIdx++
  }

  return [leftIdx + 1, rightIdx - 1]
}
