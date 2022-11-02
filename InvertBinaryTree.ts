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

  swapLeftAndRightSubtree(tree)
  invertBinaryTree(tree.left)
  invertBinaryTree(tree.right)
}

function swapLeftAndRightSubtree(tree: BinaryTree) {
  return ([tree.left, tree.right] = [tree.right, tree.left])
}

// Solution 2, O(n) time complexity, O(d) space complexity where d is the depth of the tree
export function invertBinaryTree2(tree: BinaryTree | null) {
  if (!tree) return null
  ;[tree.left, tree.right] = [
    invertBinaryTree2(tree.right),
    invertBinaryTree2(tree.left),
  ]

  return tree
}
