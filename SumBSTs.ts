export class BinaryTree {
  value: number
  left: BinaryTree | null
  right: BinaryTree | null

  constructor(value: number) {
    this.value = value
    this.left = null
    this.right = null
  }
}

interface TreeInfo {
  isBst: boolean
  maxValue: number
  minValue: number
  bstSum: number
  bstSize: number
  totalSumBstNodes: number
}

// Solution 1, O(n) time complexity, O(h) space complexity,
// where n is the number of nodes in the tree and h is the height of the tree
export function sumBsts(tree: BinaryTree) {
  return sumBstsHelper(tree).totalSumBstNodes
}

function sumBstsHelper(tree: BinaryTree | null): TreeInfo {
  if (!tree)
    return {
      isBst: true,
      maxValue: -Infinity,
      minValue: Infinity,
      bstSum: 0,
      bstSize: 0,
      totalSumBstNodes: 0,
    }

  const leftSubtreeInfo = sumBstsHelper(tree.left)
  const rightSubtreeInfo = sumBstsHelper(tree.right)

  const satisfiesBstProperty =
    tree.value > leftSubtreeInfo.maxValue &&
    tree.value <= rightSubtreeInfo.minValue
  const isBst =
    satisfiesBstProperty && leftSubtreeInfo.isBst && rightSubtreeInfo.isBst

  const maxValue = Math.max(
    tree.value,
    Math.max(leftSubtreeInfo.maxValue, rightSubtreeInfo.maxValue)
  )
  const minValue = Math.min(
    tree.value,
    Math.min(leftSubtreeInfo.minValue, rightSubtreeInfo.minValue)
  )

  let bstSum = 0
  let bstSize = 0

  let totalSumBstNodes =
    leftSubtreeInfo.totalSumBstNodes + rightSubtreeInfo.totalSumBstNodes

  if (isBst) {
    bstSum = tree.value + leftSubtreeInfo.bstSum + rightSubtreeInfo.bstSum
    bstSize = 1 + leftSubtreeInfo.bstSize + rightSubtreeInfo.bstSize

    if (bstSize >= 3) totalSumBstNodes = bstSum
  }

  return {
    isBst,
    maxValue,
    minValue,
    bstSum,
    bstSize,
    totalSumBstNodes,
  }
}
