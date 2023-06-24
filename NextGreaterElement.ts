// Solution 1, O(n^2) time complexity, O(n) space complexity
// where n is the number of elements in the input array
export function nextGreaterElement(array: number[]) {
  if (array.length === 1) return [-1]

  return findNextGreaterElement(array)
}

function findNextGreaterElement(array: number[]) {
  const output: number[] = []
  let nextItemIdx = 0

  for (let i = 0; i < array.length; i++) {
    nextItemIdx = getNextCircularIndex(i, array.length)

    while (nextItemIdx !== i) {
      if (array[nextItemIdx] > array[i]) {
        output.push(array[nextItemIdx])
        break
      }

      nextItemIdx = getNextCircularIndex(nextItemIdx, array.length)

      if (nextItemIdx === i) {
        output.push(-1)
      }
    }
  }

  return output
}

function getNextCircularIndex(currIdx: number, arrayLength: number) {
  return (currIdx + 1) % arrayLength
}
