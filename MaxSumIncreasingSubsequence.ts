// Solution 1, O(n^2) time complexity, O(n) space complexity
// where n is the length of the input array
export function maxSumIncreasingSubsequence(
  array: number[]
): [number, number[]] {
  const sums = Array.from(array)
  const sequences: Array<number | null> = Array(array.length).fill(null)
  let maxSumIdx = 0

  for (let i = 1; i < array.length; i++) {
    for (let j = 0; j < i; j++) {
      if (array[j] >= array[i]) continue

      if (array[i] + sums[j] > sums[i]) {
        sums[i] = array[i] + sums[j]
        sequences[i] = j
      }
    }

    if (sums[i] > sums[maxSumIdx]) maxSumIdx = i
  }

  return [sums[maxSumIdx], buildSequence(array, sequences, maxSumIdx)]
}

function buildSequence(
  array: number[],
  sequences: Array<number | null>,
  startPoint: number
) {
  const sequence: number[] = []
  let currIdx: number | null = startPoint

  while (currIdx !== null) {
    sequence.push(array[currIdx])
    currIdx = sequences[currIdx]
  }

  return sequence.reverse()
}
