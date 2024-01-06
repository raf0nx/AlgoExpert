// Solution 1, O(d * (n + b)) time complexity, O(n + b) space complexity,
// where n is the length of the input array, d is the max number of digits, and b is the base of the numbering system used
export function radixSort(array: number[]) {
  if (array.length === 0) return array

  const maxNumber = Math.max(...array)
  let digit = 0

  while (maxNumber / 10 ** digit > 0) {
    array = countingSort(array, digit)
    digit++
  }

  return array
}

function countingSort(array: number[], digit: number) {
  const counts = new Array(10).fill(0)
  const sorted = new Array(array.length).fill(0)
  const digitColumn = 10 ** digit

  for (const num of array) {
    const countIndex = Math.floor(num / digitColumn) % 10
    counts[countIndex]++
  }

  for (let i = 1; i < counts.length; i++) {
    counts[i] += counts[i - 1]
  }

  for (let i = array.length - 1; i >= 0; i--) {
    const countIndex = Math.floor(array[i] / digitColumn) % 10
    counts[countIndex]--
    sorted[counts[countIndex]] = array[i]
  }

  return sorted
}
