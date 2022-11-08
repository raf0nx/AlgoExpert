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

// Solution 1, O(n) time complexity, O(h) space complexity
export function heightBalancedBinaryTree(tree: BinaryTree) {
  return heightBalancedBinaryTreeHelper(tree)[0]
}

export function heightBalancedBinaryTreeHelper(
  tree: BinaryTree | null
): [boolean, number] {
  if (!tree) return [true, 0]

  const [isLeftSubtreeBalanced, leftSubtreeHeight] =
    heightBalancedBinaryTreeHelper(tree.left)
  const [isRightSubtreeBalanced, rightSubtreeHeight] =
    heightBalancedBinaryTreeHelper(tree.right)

  const isBalanced =
    isLeftSubtreeBalanced &&
    isRightSubtreeBalanced &&
    Math.abs(leftSubtreeHeight - rightSubtreeHeight) <= 1

  return [isBalanced, Math.max(leftSubtreeHeight, rightSubtreeHeight) + 1]
}
