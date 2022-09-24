// Solution 1, O(n) time complexity, O(1) space complexity
export function moveElementToEnd(array: number[], toMove: number) {
  let left = 0,
    right = array.length - 1

  while (left < right) {
    if (array[left] === toMove && array[right] !== toMove) {
      ;[array[left], array[right]] = [array[right], array[left]]
      left++
      right--
    } else if (array[right] === toMove) right--
    else left++
  }

  return array
}
