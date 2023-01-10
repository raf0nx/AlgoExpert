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

// Solution 1, O(n) time complexity, O(h) space complexity where h is the height of the tree
export function symmetricalTree(tree: BinaryTree) {
  const leftSubtreeStack = [tree.left]
  const rightSubtreeStack = [tree.right]

  while (leftSubtreeStack.length || rightSubtreeStack.length) {
    const leftSubtreeNode = leftSubtreeStack.pop()
    const rightSubtreeNode = rightSubtreeStack.pop()

    if (!leftSubtreeNode && !rightSubtreeNode) continue

    if (
      !leftSubtreeNode ||
      !rightSubtreeNode ||
      leftSubtreeNode.value !== rightSubtreeNode.value
    )
      return false

    leftSubtreeStack.push(leftSubtreeNode.right, leftSubtreeNode.left)
    rightSubtreeStack.push(rightSubtreeNode.left, rightSubtreeNode.right)
  }

  return true
}

// Solution 2, O(n) time complexity, O(h) space complexity where h is the height of the tree
export function symmetricalTree2(tree: BinaryTree) {
  return checkSubtreesSymmetry(tree.left, tree.right)
}

function checkSubtreesSymmetry(
  treeLeft: BinaryTree | null,
  treeRight: BinaryTree | null
): boolean {
  if (!treeLeft && !treeRight) return true
  if (!treeLeft || !treeRight || treeLeft.value !== treeRight.value)
    return false

  return (
    checkSubtreesSymmetry(treeLeft.left, treeRight.right) &&
    checkSubtreesSymmetry(treeLeft.right, treeRight.left)
  )
}
