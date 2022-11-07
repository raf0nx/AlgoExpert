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
  return nodes.findIndex(node => node.value === nodeToFind.value)
}

function performInOrderTraverse(tree: BinaryTree | null, nodes: BinaryTree[]) {
  if (!tree) return nodes

  performInOrderTraverse(tree.left, nodes)
  nodes.push(tree)
  performInOrderTraverse(tree.right, nodes)

  return nodes
}

// Solution 2, O(n) time complexity, O(1) space complexity
type SuccessorInfo = {
  precessorFound: boolean
  node: BinaryTree | null
}

export function findSuccessor2(tree: BinaryTree, node: BinaryTree) {
  const successorInfo: SuccessorInfo = { precessorFound: false, node: null }

  findSuccessorHelper(tree, node, successorInfo)

  return successorInfo.node
}

function findSuccessorHelper(
  tree: BinaryTree | null,
  node: BinaryTree,
  successorInfo: SuccessorInfo
) {
  if (!tree || successorInfo.node) return

  findSuccessorHelper(tree.left, node, successorInfo)

  if (!successorInfo.node) {
    if (successorInfo.precessorFound) successorInfo.node = tree
    if (tree.value === node.value) successorInfo.precessorFound = true

    findSuccessorHelper(tree.right, node, successorInfo)
  }
}

// Solution 3, O(h) time complexity, O(1) space complexity where h is the height of the tree
export function findSuccessor3(tree: BinaryTree, node: BinaryTree) {
  if (node.right) return findLeftMostNode(node.right)

  return getNextInOrderTraverseAncestor(node)
}

function findLeftMostNode(node: BinaryTree) {
  let currentNode = node

  while (currentNode.left) {
    currentNode = currentNode.left
  }

  return currentNode
}

function getNextInOrderTraverseAncestor(node: BinaryTree) {
  let nodesParent = node.parent

  return nodesParent && nodesParent.right === node
    ? nodesParent.parent
    : nodesParent
}
