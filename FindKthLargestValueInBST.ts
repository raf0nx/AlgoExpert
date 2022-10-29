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
  if (!tree || traversed.length >= k) return

  findKthLargestValueInBst(tree.right, k, traversed)
  traversed.push(tree.value)

  findKthLargestValueInBst(tree.left, k, traversed)

  return traversed[k - 1]
}

// Solution 2, O(h + k) time complexity, O(h) space complexity where h is the height of the tree and k is the function parameter
type NodesInfo = {
  nodesVisited: number
  lastVisitedNodeValue: number
}

export function findKthLargestValueInBst2(tree: BST | null, k: number) {
  const initNodesInfo: NodesInfo = {
    nodesVisited: 0,
    lastVisitedNodeValue: -Infinity,
  }

  return findKthLargestValueInBst2Helper(tree, k, initNodesInfo)
}

function findKthLargestValueInBst2Helper(
  node: BST | null,
  k: number,
  nodesInfo: NodesInfo
) {
  if (!node || nodesInfo.nodesVisited >= k) return

  findKthLargestValueInBst2Helper(node.right, k, nodesInfo)

  if (nodesInfo.nodesVisited < k) {
    nodesInfo.nodesVisited += 1
    nodesInfo.lastVisitedNodeValue = node.value
    findKthLargestValueInBst2Helper(node.left, k, nodesInfo)
  }

  return nodesInfo.lastVisitedNodeValue
}
