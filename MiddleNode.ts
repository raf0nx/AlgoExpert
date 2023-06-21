export class LinkedList {
  value: number
  next: LinkedList | null

  constructor(value: number) {
    this.value = value
    this.next = null
  }
}

// Solution 1, O(n) time complexity, O(n) space complexity
// where n is the number of nodes in the linked list
export function middleNode(linkedList: LinkedList) {
  const linkedListLength = getLinkedListLength(linkedList)
  const middleNodeNumber = Math.floor(linkedListLength / 2)

  return retrieveMiddleNode(linkedList, middleNodeNumber)
}

function getLinkedListLength(linkedList: LinkedList): number {
  if (!linkedList.next) return 1

  return 1 + getLinkedListLength(linkedList.next)
}

function retrieveMiddleNode(
  linkedList: LinkedList,
  nodesToTravel: number
): LinkedList {
  if (nodesToTravel === 0) return linkedList

  return retrieveMiddleNode(linkedList.next!, nodesToTravel - 1)
}

// Solution 2, O(n) time complexity, O(1) space complexity
// where n is the number of nodes in the linked list
export function middleNode2(linkedList: LinkedList) {
  const linkedListLength = getLinkedListLength2(linkedList)
  const middleNodeNumber = Math.floor(linkedListLength / 2)

  return retrieveMiddleNode2(linkedList, middleNodeNumber)
}

function getLinkedListLength2(linkedList: LinkedList) {
  let numberOfNodes = 1
  let currentNode = linkedList

  while (currentNode.next) {
    numberOfNodes += 1
    currentNode = currentNode.next
  }

  return numberOfNodes
}

function retrieveMiddleNode2(linkedList: LinkedList, middleNodeNumber: number) {
  let middleNode = linkedList

  for (let i = 0; i < middleNodeNumber; i++) {
    middleNode = middleNode.next!
  }

  return middleNode
}
