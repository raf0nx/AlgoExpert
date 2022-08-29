// Solution 1, O(n) time complexity, O(n) space complexity
export function isPalindrome(string: string) {
  const midIdx = Math.floor(string.length / 2)
  return (
    string.slice(0, midIdx) ===
    [...string.slice(midIdx + (string.length % 2))].reverse().join('')
  )
}
