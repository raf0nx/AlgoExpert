// This is an input class. Do not edit.
export class BST {
  value: number
  left: BST | null
  right: BST | null

  constructor(value: number) {
    this.value = value
    this.left = null
    this.right = null
  }
}

// Solution 1, O(n) time complexity, O(n) space complexity
export function findKthLargestValueInBst(
  tree: BST | null,
  k: number,
  traversed: number[] = []
) {
  if (!tree) return

  findKthLargestValueInBst(tree.right, k, traversed)
  traversed.push(tree.value)

  findKthLargestValueInBst(tree.left, k, traversed)

  return traversed[k - 1]
}
