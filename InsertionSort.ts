// Solution 1, Best: O(n), Avg and worst: O(n^2) time complexity, O(1) space complexity
export function insertionSort(array: number[]) {
  for (let i = 1; i <= array.length - 1; i++) {
    let swappedElemIdx = i

    for (let j = i - 1; j >= 0; j--) {
      if (array[swappedElemIdx] < array[j]) {
        ;[array[j], array[swappedElemIdx]] = [array[swappedElemIdx], array[j]]
        swappedElemIdx -= 1
      } else break
    }
  }

  return array
}

// Solution 2, Best: O(n), Avg and worst: O(n^2) time complexity, O(1) space complexity
export function insertionSort2(array: number[]) {
  for (let i = 1; i <= array.length - 1; i++) {
    let j = i

    while (j > 0 && array[j] < array[j - 1]) {
      ;[array[j - 1], array[j]] = [array[j], array[j - 1]]
      j--
    }
  }

  return array
}
