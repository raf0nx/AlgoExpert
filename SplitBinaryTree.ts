// This is an input class. Do not edit.
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

type SplitSubtreeSum = { value: number }

// Solution 1, O(n) time complexity, O(h) space complexity
// where n is the number of nodes in the tree and h is the height of the tree
export function splitBinaryTree(tree: BinaryTree): number {
  const binaryTreeSum = calculateBinaryTreeSum(tree)
  const isBinaryTreeSumOdd = binaryTreeSum % 2 !== 0

  if (isBinaryTreeSumOdd) return 0

  const splitSubtreeSum = { value: 0 }
  splitBinaryTreeHelper(tree, binaryTreeSum / 2, splitSubtreeSum)

  return splitSubtreeSum.value
}

function calculateBinaryTreeSum(tree: BinaryTree | null): number {
  if (!tree) return 0

  const leftSubtree = calculateBinaryTreeSum(tree.left)
  const rightSubtree = calculateBinaryTreeSum(tree.right)

  return leftSubtree + tree.value + rightSubtree
}

function splitBinaryTreeHelper(
  tree: BinaryTree | null,
  desiredSum: number,
  splitSubtreeSum: SplitSubtreeSum
): number {
  if (!tree) return 0

  const leftSubtree = splitBinaryTreeHelper(
    tree.left,
    desiredSum,
    splitSubtreeSum
  )
  const rightSubtree = splitBinaryTreeHelper(
    tree.right,
    desiredSum,
    splitSubtreeSum
  )
  const currentSubtreeSum = leftSubtree + tree.value + rightSubtree

  if (currentSubtreeSum === desiredSum)
    splitSubtreeSum.value = currentSubtreeSum

  return currentSubtreeSum
}
