// Solution 1 (complexities below)
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

// O(n) time complexity, O(n) space complexity
export function inOrderTraverse(tree: BST | null, array: number[]) {
  if (!tree) return

  inOrderTraverse(tree.left, array)
  array.push(tree.value)
  inOrderTraverse(tree.right, array)

  return array
}

// O(n) time complexity, O(n) space complexity
export function preOrderTraverse(tree: BST | null, array: number[]) {
  if (!tree) return

  array.push(tree.value)
  preOrderTraverse(tree.left, array)
  preOrderTraverse(tree.right, array)

  return array
}

// O(n) time complexity, O(n) space complexity
export function postOrderTraverse(tree: BST | null, array: number[]) {
  if (!tree) return

  postOrderTraverse(tree.left, array)
  postOrderTraverse(tree.right, array)
  array.push(tree.value)

  return array
}
