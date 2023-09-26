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

// Solution 2, O(n) time complexity, O(n) space complexity
// where n is the number of nodes in the tree
type NodeWithParent = { node: BinaryTree | null; parent: BinaryTree | null }
type NodeValueToParent = Record<number, BinaryTree | null>

export function findNodesDistanceK2(
  tree: BinaryTree,
  target: number,
  k: number
) {
  const nodesWithParents = findNodesParents(tree)
  const targetNode = findTargetNode(tree, target)

  return findNodesAtKFromTarget(targetNode, nodesWithParents, k)
}

function findNodesAtKFromTarget(
  targetNode: BinaryTree,
  nodesWithParents: NodeValueToParent,
  k: number
) {
  const queue: Array<[BinaryTree, number]> = [[targetNode, 0]]
  const seen = new Set([targetNode.value])
  const nodesDistanceK: number[] = []

  while (queue.length) {
    const [currentNode, distanceFromTarget] = queue.shift()!

    if (distanceFromTarget === k) {
      nodesDistanceK.push(currentNode.value)
    }

    for (const node of [
      currentNode.left,
      currentNode.right,
      nodesWithParents[currentNode.value],
    ]) {
      if (!node || seen.has(node.value)) continue

      queue.push([node, distanceFromTarget + 1])
    }

    seen.add(currentNode.value)
  }

  return nodesDistanceK
}

function findNodesParents(tree: BinaryTree) {
  const stack: NodeWithParent[] = [{ node: tree, parent: null }]
  const parents: NodeValueToParent = {}

  while (stack.length) {
    const { node, parent } = stack.pop()!

    if (!node) continue

    parents[node.value] = parent
    stack.push({ node: node.left, parent: node })
    stack.push({ node: node.right, parent: node })
  }

  return parents
}

function findTargetNode(tree: BinaryTree, target: number) {
  const stack = [tree]

  while (stack.length) {
    const currentNode = stack.pop()!

    if (currentNode.value === target) {
      return currentNode
    }

    currentNode.left && stack.push(currentNode.left)
    currentNode.right && stack.push(currentNode.right)
  }

  return tree
}
