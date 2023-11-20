export class LinkedList {
  value: number
  next: LinkedList | null

  constructor(value: number) {
    this.value = value
    this.next = null
  }
}

// Solution 1, O(n) time complexity, O(1) space complexity,
// where n is the number of nodes in the Linked List
export function reverseLinkedList(head: LinkedList) {
  let currentNode: LinkedList | null = head
  let prevNode: LinkedList | null = null

  while (currentNode !== null) {
    const nextNode: LinkedList | null = currentNode.next

    currentNode.next = prevNode
    prevNode = currentNode
    currentNode = nextNode
  }

  return prevNode
}
