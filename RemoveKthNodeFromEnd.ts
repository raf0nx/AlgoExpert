export class LinkedList {
  value: number
  next: LinkedList | null

  constructor(value: number) {
    this.value = value
    this.next = null
  }
}

// Solution 1, O(n) time complexity, O(1) space complexity
export function removeKthNodeFromEnd(head: LinkedList, k: number) {
  const numOfNodes = countNumOfNodes(head)
  const nodeToRemovePos = numOfNodes - k + 1

  let currentNode: LinkedList | null = head
  let currPos = 1

  while (currentNode && currPos < nodeToRemovePos) {
    currPos += 1

    if (currPos === nodeToRemovePos && numOfNodes === nodeToRemovePos)
      currentNode.next = null

    currentNode = currentNode.next
  }

  removeNode(currentNode)
}

function countNumOfNodes(head: LinkedList) {
  let currentNode: LinkedList | null = head
  let count = 0

  while (currentNode) {
    count += 1
    currentNode = currentNode.next
  }

  return count
}

function removeNode(node: LinkedList | null) {
  if (!node || !node.next) return

  node.value = node.next.value
  node.next = node.next.next
}
