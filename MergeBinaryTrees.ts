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

// Solution 1, O(n) time complexity, O(h) space complexity, where n is the number of nodes in the bigger tree and h is the height of the bigger tree
export function mergeBinaryTrees(tree1: BinaryTree, tree2: BinaryTree) {
  const root = new BinaryTree(tree1.value + tree2.value)

  if (tree1.left || tree2.left) {
    root.left = mergeBinaryTrees(
      tree1.left || new BinaryTree(0),
      tree2.left || new BinaryTree(0)
    )
  } else root.left = null

  if (tree1.right || tree2.right) {
    root.right = mergeBinaryTrees(
      tree1.right || new BinaryTree(0),
      tree2.right || new BinaryTree(0)
    )
  } else root.right = null

  return root
}
