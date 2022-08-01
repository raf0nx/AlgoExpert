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

// Solution 1, Avg: O(log(n)) time complexity, O(1) space complexity || Worst: O(n) time complexity, O(1) space complexity
export function findClosestValueInBst(tree: BST, target: number) {
  let nextNode = tree
  let closestValue = nextNode.value

  while (nextNode.value) {
    if (Math.abs(nextNode.value - target) < Math.abs(closestValue - target)) {
      closestValue = nextNode.value
    }

    if (nextNode.value > target) {
      nextNode = nextNode.left || new BST(0)
    } else {
      nextNode = nextNode.right || new BST(0)
    }
  }

  return closestValue
}
