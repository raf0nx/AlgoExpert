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

type MathOperator = -1 | -2 | -3 | -4

// Solution 1, O(n) time complexity, O(h) space complexity
// where n is the number of nodes in the Binary Tree and h is the height of the Binary Tree
export function evaluateExpressionTree(tree: BinaryTree): number {
  if (tree.value >= 0) return tree.value

  const leftSubtreeValue = evaluateExpressionTree(tree.left!)
  const rightSubtreeValue = evaluateExpressionTree(tree.right!)

  return evaluateNodesValues(
    leftSubtreeValue,
    rightSubtreeValue,
    tree.value as MathOperator
  )
}

function evaluateNodesValues(
  value1: number,
  value2: number,
  mathOperator: MathOperator
) {
  switch (mathOperator) {
    case -1:
      return value1 + value2
    case -2:
      return value1 - value2
    case -3:
      return Math.trunc(value1 / value2)
    case -4:
      return value1 * value2
  }
}
