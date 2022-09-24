// Solution 1, O(n) time complexity, O(1) space complexity
export function moveElementToEnd(array: number[], toMove: number) {
  let left = 0,
    right = array.length - 1

  while (left < right) {
    if (array[right] !== toMove) {
      if (array[left] === toMove)
        [array[left], array[right]] = [array[right], array[left]]
      left++
    } else right--
  }

  return array
}
