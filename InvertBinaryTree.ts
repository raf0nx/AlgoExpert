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

// Solution 1, O(n) time complexity, O(d) space complexity where d is the depth of the tree
export function invertBinaryTree(tree: BinaryTree | null) {
  if (!tree) return null

  const rightSubtree = tree.right
  const leftSubtree = tree.left

  tree.left = invertBinaryTree(rightSubtree)
  tree.right = invertBinaryTree(leftSubtree)

  return tree
}
