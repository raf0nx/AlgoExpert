// This is an input class. Do not edit.
export class BinaryTree {
  value: number
  left: BinaryTree | null
  right: BinaryTree | null
  parent: BinaryTree | null

  constructor(value: number) {
    this.value = value
    this.left = null
    this.right = null
    this.parent = null
  }
}

// Solution 1, O(n) time complexity, O(n) space complexity
export function findSuccessor(tree: BinaryTree, node: BinaryTree) {
  const inOrderTraversalNodes = performInOrderTraverse(tree, [])
  return inOrderTraversalNodes[findNodesIndex(inOrderTraversalNodes, node) + 1]
}

function findNodesIndex(nodes: BinaryTree[], nodeToFind: BinaryTree) {
  return nodes.findIndex(node => Object.is(node, nodeToFind))
}

function performInOrderTraverse(tree: BinaryTree | null, nodes: BinaryTree[]) {
  if (!tree) return nodes

  performInOrderTraverse(tree.left, nodes)
  nodes.push(tree)
  performInOrderTraverse(tree.right, nodes)

  return nodes
}
