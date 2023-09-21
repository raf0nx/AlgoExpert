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

// Solution 1, O(h) time complexity, O(h) space complexity
// where h is the height of the tree
export function validateThreeNodes(nodeOne: BST, nodeTwo: BST, nodeThree: BST) {
  return (
    (checkNodeDescendant(nodeOne, nodeTwo) &&
      checkNodeDescendant(nodeTwo, nodeThree)) ||
    (checkNodeDescendant(nodeThree, nodeTwo) &&
      checkNodeDescendant(nodeTwo, nodeOne))
  )
}

function checkNodeDescendant(ancestor: BST | null, descendant: BST): boolean {
  if (!ancestor) return false

  if (ancestor.value === descendant.value) return true

  return descendant.value < ancestor.value
    ? checkNodeDescendant(ancestor.left, descendant)
    : checkNodeDescendant(ancestor.right, descendant)
}

// Solution 2, O(h) time complexity, O(1) space complexity
// where h is the height of the tree
export function validateThreeNodes2(
  nodeOne: BST,
  nodeTwo: BST,
  nodeThree: BST
) {
  return (
    (checkNodeDescendant2(nodeOne, nodeTwo) &&
      checkNodeDescendant2(nodeTwo, nodeThree)) ||
    (checkNodeDescendant2(nodeThree, nodeTwo) &&
      checkNodeDescendant2(nodeTwo, nodeOne))
  )
}

function checkNodeDescendant2(ancestor: BST | null, descendant: BST): boolean {
  let currentNode = ancestor

  while (currentNode) {
    if (currentNode.value === descendant.value) return true

    currentNode =
      descendant.value < currentNode.value
        ? currentNode.left
        : currentNode.right
  }

  return false
}

// Solution 3, O(d) time complexity, O(1) space complexity
// where d is the distance between nodeOne and nodeThree
export function validateThreeNodes3(
  nodeOne: BST,
  nodeTwo: BST,
  nodeThree: BST
) {
  let searchOne: BST | null = nodeOne
  let searchTwo: BST | null = nodeThree

  while (true) {
    const foundThreeFromOne = searchOne === nodeThree
    const foundOneFromThree = searchTwo === nodeOne
    const foundNodeTwo = searchOne === nodeTwo || searchTwo === nodeTwo
    const finishedSearching = searchOne === null && searchTwo === null

    if (
      foundThreeFromOne ||
      foundOneFromThree ||
      foundNodeTwo ||
      finishedSearching
    ) {
      break
    }

    if (searchOne) {
      searchOne =
        nodeTwo.value < searchOne.value ? searchOne.left : searchOne.right
    }

    if (searchTwo) {
      searchTwo =
        nodeTwo.value < searchTwo.value ? searchTwo.left : searchTwo.right
    }
  }

  const foundNodeFromOther = searchOne === nodeThree || searchTwo === nodeOne
  const foundNodeTwo = searchOne === nodeTwo || searchTwo === nodeTwo

  if (!foundNodeTwo || foundNodeFromOther) return false

  return searchForTarget(nodeTwo, searchOne === nodeTwo ? nodeThree : nodeOne)
}

function searchForTarget(node: BST, target: BST): boolean {
  let currentNode: BST | null = node

  while (currentNode && currentNode !== target) {
    currentNode =
      target.value < currentNode.value ? currentNode.left : currentNode.right
  }

  return currentNode === target
}
