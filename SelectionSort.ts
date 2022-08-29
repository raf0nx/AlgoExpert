// Solution 1, O(n^2) time complexity, O(1) space complexity
export function selectionSort(array: number[]) {
  for (let i = 0; i < array.length - 1; i++) {
    let minValueIdx = i

    for (let j = minValueIdx + 1; j <= array.length - 1; j++) {
      if (array[j] < array[minValueIdx]) minValueIdx = j
    }

    if (i !== minValueIdx) {
      ;[array[i], array[minValueIdx]] = [array[minValueIdx], array[i]]
    }
  }

  return array
}
