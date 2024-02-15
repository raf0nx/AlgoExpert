// Solution 1, O(n) time complexity, O(h) space complexity,
// where n is the number of nodes in the tree and h is the height of the tree
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

type TreeInfo = {
  nodeOne: BST
  nodeTwo: BST
  prevNode: BST
}

export function repairBst(tree: BST) {
  const treeInfo: TreeInfo = {
    nodeOne: { value: Infinity, left: null, right: null },
    nodeTwo: { value: Infinity, left: null, right: null },
    prevNode: { value: -Infinity, left: null, right: null },
  }

  repairBstHelper(tree, treeInfo)
  swapNodes(treeInfo)

  return tree
}

function repairBstHelper(tree: BST | null, treeInfo: TreeInfo) {
  if (!tree) return tree

  repairBstHelper(tree.left, treeInfo)

  if (tree.value < treeInfo.prevNode.value) {
    if (treeInfo.nodeOne.value === Infinity)
      treeInfo.nodeOne = treeInfo.prevNode
    treeInfo.nodeTwo = tree
  }

  treeInfo.prevNode = tree

  repairBstHelper(tree.right, treeInfo)

  return tree
}

function swapNodes(treeInfo: TreeInfo) {
  const temp = treeInfo.nodeOne.value
  treeInfo.nodeOne.value = treeInfo.nodeTwo.value
  treeInfo.nodeTwo.value = temp
}

// Solution 2, O(n) time complexity, O(h) space complexity,
// where n is the number of nodes in the tree and h is the height of the tree
export function repairBst2(tree: BST) {
  const stack: BST[] = []
  let nodeOne: BST = { value: Infinity, left: null, right: null }
  let nodeTwo: BST = { value: Infinity, left: null, right: null }
  let prevNode: BST = { value: -Infinity, left: null, right: null }
  let currentNode: BST | null = tree

  while (currentNode || stack.length) {
    while (currentNode) {
      stack.push(currentNode)
      currentNode = currentNode.left
    }

    currentNode = stack.pop()!

    if (currentNode.value < prevNode.value) {
      if (nodeOne.value === Infinity) nodeOne = prevNode
      nodeTwo = currentNode
    }

    prevNode = currentNode
    currentNode = currentNode.right
  }

  swapNodes2(nodeOne, nodeTwo)

  return tree
}

function swapNodes2(nodeOne: BST, nodeTwo: BST) {
  const temp = nodeOne.value
  nodeOne.value = nodeTwo.value
  nodeTwo.value = temp
}
