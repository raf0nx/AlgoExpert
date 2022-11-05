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
  const diameter: Diameter = { value: 0 }

  calculateDiameter(tree, diameter)

  return diameter.value
}

function calculateDiameter(
  tree: BinaryTree | null,
  diameter: Diameter
): number {
  if (!tree) return 0

  const leftSubtreeDiameter = calculateDiameter(tree.left, diameter)
  const rightSubtreeDiameter = calculateDiameter(tree.right, diameter)

  diameter.value = Math.max(
    diameter.value,
    leftSubtreeDiameter + rightSubtreeDiameter
  )

  return Math.max(leftSubtreeDiameter, rightSubtreeDiameter) + 1
}
