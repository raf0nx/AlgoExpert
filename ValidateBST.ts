// Solution 1, O(n) time complexity, O(d) space complexity, where d is the depth of the BST
class BST {
  value: number
  left: BST | null
  right: BST | null

  constructor(value: number) {
    this.value = value
    this.left = null
    this.right = null
  }
}

export function validateBst(
  tree: BST | null,
  min = -Infinity,
  max = Infinity
): boolean {
  if (!tree) return true
  if (tree.value < min || tree.value >= max) return false

  return (
    validateBst(tree.left, min, tree.value) &&
    validateBst(tree.right, tree.value, max)
  )
}
