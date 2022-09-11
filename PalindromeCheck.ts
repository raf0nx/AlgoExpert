// Solution 1, O(n) time complexity, O(n) space complexity
export function isPalindrome(string: string) {
  const midIdx = Math.floor(string.length / 2)
  return (
    string.slice(0, midIdx) ===
    [...string.slice(midIdx + (string.length % 2))].reverse().join('')
  )
}

// Solution 2, O(n) time complexity, O(1) space complexity
export function isPalindrome2(string: string) {
  let i = 0

  while (i <= Math.floor(string.length / 2) - 1) {
    if (string[i] !== string[string.length - i - 1]) {
      return false
    }

    i++
  }

  return true
}
