export class LinkedList {
  value: number
  next: LinkedList | null

  constructor(value: number) {
    this.value = value
    this.next = null
  }
}

// Solution 1, O(n * m) time complexity, O(1) space complexity, where n is the length of the first linked list and m is the length of the second linked list
export function mergingLinkedLists(
  linkedListOne: LinkedList,
  linkedListTwo: LinkedList
) {
  let ll1Node: LinkedList | null = linkedListOne
  let ll2Node: LinkedList | null = linkedListTwo

  while (ll1Node) {
    const firstNodeValue = ll1Node.value

    while (ll2Node) {
      const secondNodeValue = ll2Node.value

      if (firstNodeValue === secondNodeValue) return ll1Node

      ll2Node = ll2Node.next
    }

    ll1Node = ll1Node.next
    ll2Node = linkedListTwo
  }

  return null
}

// Solution 2, O(n + m) time complexity, O(1) space complexity, where n is the length of the first linked list and m is the length of the second linked list
export function mergingLinkedLists2(
  linkedListOne: LinkedList,
  linkedListTwo: LinkedList
) {
  let ll1Length = getLinkedListLength(linkedListOne)
  let ll2Length = getLinkedListLength(linkedListTwo)

  let ll1Node: LinkedList | null = linkedListOne
  let ll2Node: LinkedList | null = linkedListTwo

  while (ll1Length !== ll2Length) {
    if (ll1Length > ll2Length) {
      ll1Node = ll1Node.next!
      ll1Length--
    } else {
      ll2Node = ll2Node.next!
      ll2Length--
    }
  }

  while (ll1Node && ll2Node) {
    if (ll1Node === ll2Node) return ll1Node

    ll1Node = ll1Node.next
    ll2Node = ll2Node.next
  }

  return null
}

function getLinkedListLength(linkedList: LinkedList) {
  let currNode: LinkedList | null = linkedList
  let length = 0

  while (currNode) {
    length++
    currNode = currNode.next
  }

  return length
}

// Solution 3, O(n + m) time complexity, O(1) space complexity, where n is the length of the first linked list and m is the length of the second linked list
export function mergingLinkedLists3(
  linkedListOne: LinkedList,
  linkedListTwo: LinkedList
) {
  let ll1Node: LinkedList | null = linkedListOne
  let ll2Node: LinkedList | null = linkedListTwo

  while (ll1Node !== ll2Node) {
    ll1Node = ll1Node ? ll1Node.next : linkedListTwo
    ll2Node = ll2Node ? ll2Node.next : linkedListOne
  }

  return ll1Node
}
