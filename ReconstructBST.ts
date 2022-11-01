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

// Solution 1, O(n) time complexity, O(h) space complexity where h is the height of the tree
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
