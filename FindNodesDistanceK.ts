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

// Solution 1, O(n) time complexity, O(n) space complexity
// where n is the number of nodes in the tree
export function findNodesDistanceK(
  tree: BinaryTree,
  target: number,
  k: number
) {
  const output: number[] = []

  findDistanceFromNodeToTarget(tree, target, k, output)

  return output
}

function findDistanceFromNodeToTarget(
  tree: BinaryTree | null,
  target: number,
  k: number,
  output: number[]
): number {
  if (!tree) return -1

  if (tree.value === target) {
    addSubtreeNodeAtDistanceK(tree, 0, k, output)
    return 1
  }

  const leftDistance = findDistanceFromNodeToTarget(
    tree.left,
    target,
    k,
    output
  )
  const rightDistance = findDistanceFromNodeToTarget(
    tree.right,
    target,
    k,
    output
  )

  if (leftDistance === k || rightDistance === k) output.push(tree.value)

  if (leftDistance !== -1) {
    addSubtreeNodeAtDistanceK(tree.right, leftDistance + 1, k, output)

    return leftDistance + 1
  }

  if (rightDistance !== -1) {
    addSubtreeNodeAtDistanceK(tree.left, rightDistance + 1, k, output)

    return rightDistance + 1
  }

  return -1
}

function addSubtreeNodeAtDistanceK(
  node: BinaryTree | null,
  distance: number,
  k: number,
  output: number[]
) {
  if (!node) return

  if (k === distance) output.push(node.value)
  else {
    addSubtreeNodeAtDistanceK(node.left, distance + 1, k, output)
    addSubtreeNodeAtDistanceK(node.right, distance + 1, k, output)
  }
}
