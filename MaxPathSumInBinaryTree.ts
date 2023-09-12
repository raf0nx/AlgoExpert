// Solution 1, O(n) time complexity, O(log(n)) space complexity
// where n is the number of nodes in the Binary Tree
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

export function maxPathSum(tree: BinaryTree) {
  const [maxPath] = maxPathSumHelper(tree)

  return Math.max(maxPath)
}

function maxPathSumHelper(tree: BinaryTree | null): [number, number] {
  if (!tree) return [-Infinity, 0]

  const [maxLeftPathSum, maxLeftBranchSum] = maxPathSumHelper(tree.left)
  const [maxRightPathSum, maxRightBranchSum] = maxPathSumHelper(tree.right)

  const maxChildBranchSum = Math.max(maxLeftBranchSum, maxRightBranchSum)
  const maxBranchSum = Math.max(maxChildBranchSum + tree.value, tree.value)
  const maxPathSum = Math.max(
    maxLeftPathSum,
    maxRightPathSum,
    maxLeftBranchSum + maxRightBranchSum + tree.value,
    maxBranchSum
  )

  return [maxPathSum, maxBranchSum]
}
