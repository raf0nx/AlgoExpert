// Solution 1, O(n^2) time complexity, O(d) space complexity
// where n is the number of nodes in each array and d is the depth of the BST that they represent
export function sameBsts(arrayOne: number[], arrayTwo: number[]) {
  return sameBstsHelper(arrayOne, arrayTwo, 0, 0, -Infinity, Infinity)
}

function sameBstsHelper(
  arrayOne: number[],
  arrayTwo: number[],
  arr1NodeIdx: number,
  arr2NodeIdx: number,
  min: number,
  max: number
): boolean {
  if (arr1NodeIdx === -1 && arr2NodeIdx === -1) return true

  const currArr1Node = arrayOne[arr1NodeIdx]
  const currArr2Node = arrayTwo[arr2NodeIdx]

  if (currArr1Node !== currArr2Node) return false

  const arr1LeftNodeIdx = findNextLeftNodeIdx(arrayOne, arr1NodeIdx, min)
  const arr2LeftNodeIdx = findNextLeftNodeIdx(arrayTwo, arr2NodeIdx, min)
  const arr1RightNodeIdx = findNextRightNodeIdx(arrayOne, arr1NodeIdx, max)
  const arr2RightNodeIdx = findNextRightNodeIdx(arrayTwo, arr2NodeIdx, max)

  return (
    sameBstsHelper(
      arrayOne,
      arrayTwo,
      arr1LeftNodeIdx,
      arr2LeftNodeIdx,
      min,
      currArr1Node
    ) &&
    sameBstsHelper(
      arrayOne,
      arrayTwo,
      arr1RightNodeIdx,
      arr2RightNodeIdx,
      currArr1Node,
      max
    )
  )
}

function findNextLeftNodeIdx(
  array: number[],
  startingIdx: number,
  min: number
) {
  for (let i = startingIdx + 1; i < array.length; i++) {
    if (array[i] < array[startingIdx] && array[i] >= min) return i
  }

  return -1
}

function findNextRightNodeIdx(
  array: number[],
  startingIdx: number,
  max: number
) {
  for (let i = startingIdx + 1; i < array.length; i++) {
    if (array[i] >= array[startingIdx] && array[i] < max) return i
  }

  return -1
}
