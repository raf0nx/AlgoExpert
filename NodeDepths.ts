// Solution 1, O(n) time complexity, O(h) space complexity where n is the number of nodes in the tree and h is the height of the tree
const calculateDepth = (
  node: BinaryTree | null,
  currentDepth: number
): number => {
  if (!node) return 0

  return (
    currentDepth +
    calculateDepth(node.left, currentDepth + 1) +
    calculateDepth(node.right, currentDepth + 1)
  )
}

export const nodeDepths = (root: BinaryTree) => {
  return calculateDepth(root, 0)
}

// This is the class of the input binary tree.
class BinaryTree {
  value: number
  left: BinaryTree | null
  right: BinaryTree | null

  constructor(value: number) {
    this.value = value
    this.left = null
    this.right = null
  }
}
