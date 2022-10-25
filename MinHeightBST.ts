export class BST {
  value: number
  left: BST | null
  right: BST | null

  constructor(value: number) {
    this.value = value
    this.left = null
    this.right = null
  }

  insert(value: number) {
    if (value < this.value) {
      if (this.left === null) {
        this.left = new BST(value)
      } else {
        this.left.insert(value)
      }
    } else {
      if (this.right === null) {
        this.right = new BST(value)
      } else {
        this.right.insert(value)
      }
    }
  }
}

// Solution 1, O(n^2) time complexity, O(n) space complexity
export function minHeightBst(array: number[]) {
  const rootIdx = Math.floor(array.length / 2)
  const root = new BST(array[rootIdx])

  minHeightBstHelper(array, rootIdx, root)

  return root
}

function minHeightBstHelper(array: number[], midIdx: number, root: BST) {
  if (!array.length) return

  const leftArr = array.slice(0, midIdx)
  const rightArr = array.slice(midIdx + 1)

  if (leftArr.length) {
    const nextLeftNodeIdx = Math.floor(leftArr.length / 2)
    root.insert(leftArr[nextLeftNodeIdx])
    minHeightBstHelper(leftArr, nextLeftNodeIdx, root)
  }

  if (rightArr.length) {
    const nextRightNodeIdx = Math.floor(rightArr.length / 2)
    root.insert(rightArr[nextRightNodeIdx])
    minHeightBstHelper(rightArr, nextRightNodeIdx, root)
  }
}
