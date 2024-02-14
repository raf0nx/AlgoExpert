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
