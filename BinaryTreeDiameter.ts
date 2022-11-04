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

type Diameter = { value: number }

// Solution 1, Avg: O(n) time complexity, O(h) space complexity where h is the height of the tree, Worst: O(n) space complexity
export function binaryTreeDiameter(tree: BinaryTree) {
  const diameterInfo: Diameter = { value: 0 }

  calculateDiameter(tree, diameterInfo)

  return diameterInfo.value
}

function calculateDiameter(tree: BinaryTree | null, diameterInfo: Diameter) {
  // Reset potential edge when null node encountered
  if (!tree) return -1

  let leftSubtreeDiameter = 1
  let rightSubtreeDiameter = 1

  leftSubtreeDiameter += calculateDiameter(tree.left, diameterInfo)
  rightSubtreeDiameter += calculateDiameter(tree.right, diameterInfo)

  diameterInfo.value = Math.max(
    diameterInfo.value,
    leftSubtreeDiameter + rightSubtreeDiameter
  )

  return Math.max(leftSubtreeDiameter, rightSubtreeDiameter)
}
