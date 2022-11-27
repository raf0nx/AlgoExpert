// Solution 1, O(n) time complexity, O(1) space complexity
export function hasSingleCycle(array: number[]) {
  let jumpsLeft = array.length
  let nextIndex = 0
  let jumpBy = array[nextIndex]

  while (jumpsLeft) {
    nextIndex = getNextIndex(nextIndex, jumpBy, array.length)
    jumpBy = array[nextIndex]
    array[nextIndex] = 0
    jumpsLeft--
  }

  return nextIndex === 0 && jumpBy !== 0
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
