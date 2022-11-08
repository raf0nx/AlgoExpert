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
type TreeInfo = {
  isBalanced: boolean
}

export function heightBalancedBinaryTree(tree: BinaryTree) {
  const treeInfo: TreeInfo = { isBalanced: true }

  heightBalancedBinaryTreeHelper(tree, treeInfo)

  return treeInfo.isBalanced
}

export function heightBalancedBinaryTreeHelper(
  tree: BinaryTree | null,
  treeInfo: TreeInfo
): number {
  if (!tree) return 0

  const leftSubtreeHeight = heightBalancedBinaryTreeHelper(tree.left, treeInfo)
  const rightSubtreeHeight = heightBalancedBinaryTreeHelper(
    tree.right,
    treeInfo
  )

  if (Math.abs(leftSubtreeHeight - rightSubtreeHeight) > 1) {
    treeInfo.isBalanced = false
  }

  return Math.max(leftSubtreeHeight, rightSubtreeHeight) + 1
}
