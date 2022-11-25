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

  return array.every(el => !el)
}

function getNextIndex(
  currIdx: number,
  modifier: number,
  bound: number
): number {
  const nextIdx = (currIdx + modifier) % bound

  return nextIdx < 0 ? (nextIdx + bound) % bound : nextIdx
}
