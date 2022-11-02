// This is an input class. Do not edit.
export class BST {
  value: number
  left: BST | null
  right: BST | null

  constructor(
    value: number,
    left: BST | null = null,
    right: BST | null = null
  ) {
    this.value = value
    this.left = left
    this.right = right
  }
}

type IndexInfo = { index: number }

// Solution 1, O(n) time complexity, O(n) space complexity
export function reconstructBst(preOrderTraversalValues: number[]): BST | null {
  const indexInfo: IndexInfo = { index: 0 }

  return reconstructBstHelper(
    preOrderTraversalValues,
    -Infinity,
    Infinity,
    indexInfo
  )
}

function reconstructBstHelper(
  preOrderTraversalValues: number[],
  min: number,
  max: number,
  indexInfo: IndexInfo
) {
  if (indexInfo.index >= preOrderTraversalValues.length) return null

  const currNodeValue = preOrderTraversalValues[indexInfo.index]

  if (currNodeValue < min || currNodeValue >= max) return null

  indexInfo.index += 1

  const node = new BST(currNodeValue)

  node.left = reconstructBstHelper(
    preOrderTraversalValues,
    min,
    node.value,
    indexInfo
  )

  node.right = reconstructBstHelper(
    preOrderTraversalValues,
    node.value,
    max,
    indexInfo
  )

  return node
}

// Solution 2, O(n^2) time complexity, O(n) space complexity
export function reconstructBst2(preOrderTraversalValues: number[]): BST | null {
  return reconstructBstHelper2(
    preOrderTraversalValues,
    0,
    preOrderTraversalValues.length
  )
}

function reconstructBstHelper2(
  nodesValues: number[],
  idx: number,
  limit: number
) {
  if (idx >= limit) return null

  const node = new BST(nodesValues[idx])

  const rightNode = nodesValues
    .slice(idx + 1, limit)
    .find(el => el >= node.value)
  const rightNodeIdx = rightNode
    ? nodesValues.findIndex((el, i) => el === rightNode && i > idx)
    : null

  node.left = reconstructBstHelper2(nodesValues, idx + 1, rightNodeIdx || limit)
  node.right = reconstructBstHelper2(
    nodesValues,
    rightNodeIdx || Infinity,
    limit
  )

  return node
}
