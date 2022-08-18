// Solution 1, O(n) time complexity, O(1) space complexity
export function removeDuplicatesFromLinkedList(linkedList: LinkedList) {
  let currentNode = linkedList

  while (currentNode.next !== null) {
    if (currentNode.value === currentNode.next.value)
      currentNode.next = currentNode.next.next
    else currentNode = currentNode.next
  }

  return linkedList
}

// This is an input class. Do not edit.
export class LinkedList {
  value: number
  next: LinkedList | null

  constructor(value: number) {
    this.value = value
    this.next = null
  }
}
