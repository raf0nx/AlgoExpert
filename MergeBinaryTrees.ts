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

// Solution 1, O(n) time complexity, O(h) space complexity, where n is the number of nodes in the smaller tree and h is the height of the smaller tree
export function mergeBinaryTrees(
  tree1: BinaryTree | null,
  tree2: BinaryTree | null
) {
  if (!tree1) return tree2
  if (!tree2) return tree1

  const root = new BinaryTree(tree1.value + tree2.value)

  root.left = mergeBinaryTrees(tree1.left, tree2.left)
  root.right = mergeBinaryTrees(tree1.right, tree2.right)

  return root
}
