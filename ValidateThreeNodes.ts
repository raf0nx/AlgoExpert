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

// Solution 1, O(h) time complexity, O(h) space complexity
// where h is the height of the tree
export function validateThreeNodes(nodeOne: BST, nodeTwo: BST, nodeThree: BST) {
  return (
    (checkNodeDescendant(nodeOne, nodeTwo) &&
      checkNodeDescendant(nodeTwo, nodeThree)) ||
    (checkNodeDescendant(nodeThree, nodeTwo) &&
      checkNodeDescendant(nodeTwo, nodeOne))
  )
}

function checkNodeDescendant(ancestor: BST | null, descendant: BST): boolean {
  if (!ancestor) return false

  if (ancestor.value === descendant.value) return true

  return descendant.value < ancestor.value
    ? checkNodeDescendant(ancestor.left, descendant)
    : checkNodeDescendant(ancestor.right, descendant)
}
