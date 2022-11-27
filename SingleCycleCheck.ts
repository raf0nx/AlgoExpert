// Solution 1, O(n) time complexity, O(1) space complexity
export function hasSingleCycle(array: number[]) {
  let position = 0

  while (array[position]) {
    const currIdx = position
    position = getNextIndex(position, array[position], array.length)
    array[currIdx] = 0
  }

  return position === 0 && array.every(el => el === 0)
}

// Solution 2, O(n) time complexity, O(1) space complexity
export function hasSingleCycle2(array: number[]) {
  let jumpsLeft = array.length
  let currIdx = 0

  while (jumpsLeft) {
    if (currIdx === 0 && jumpsLeft < array.length - 1) return false

    currIdx = getNextIndex(currIdx, array[currIdx], array.length)
    jumpsLeft--
  }

  return currIdx === 0
}

function getNextIndex(
  currIdx: number,
  modifier: number,
  bound: number
): number {
  const nextIdx = (currIdx + modifier) % bound

  return nextIdx < 0 ? nextIdx + bound : nextIdx
}
