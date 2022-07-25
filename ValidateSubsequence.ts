// Solution 1, O(n) time complexity, O(1) space complexity
export function isValidSubsequence(array: number[], sequence: number[]) {
  if (sequence.length > array.length) return false

  return (
    array.reduce((numOfSequences, value) => {
      if (value === sequence[numOfSequences]) numOfSequences++
      return numOfSequences
    }, 0) === sequence.length
  )
}
