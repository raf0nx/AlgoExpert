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

// Solution 2, Avg: O(log(n)) time complexity, O(log(n)) space complexity || Worst: O(n) time complexity, O(n) space complexity
export function findClosestValueInBst2(tree: BST, target: number): number {
  if (!tree.value) return Infinity
  if (tree.value === target) return tree.value
  const nextNode = tree.value > target ? tree.left : tree.right

  const currentClosestValue = findClosestValueInBst(
    nextNode || new BST(0),
    target
  )

  if (Math.abs(tree.value - target) < Math.abs(currentClosestValue - target)) {
    return tree.value
  }

  return currentClosestValue
}
