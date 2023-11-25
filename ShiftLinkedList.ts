// This is the class of the input linked list.
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
export function shiftLinkedList(head: LinkedList, k: number) {
  const llLength = getLinkedListLength(head)
  const shiftAmount = Math.abs(k) % llLength

  if (shiftAmount === 0) return head

  const newTailPos = k >= 0 ? llLength - shiftAmount : shiftAmount

  let currentNode = head
  let newHead = head
  let currPos = 1

  while (currentNode.next) {
    if (currPos === newTailPos) {
      const nextNode = currentNode.next

      newHead = nextNode
      currentNode.next = null
      currentNode = nextNode
    } else {
      currentNode = currentNode.next
    }

    currPos++
  }

  currentNode.next = head

  return newHead
}

function getLinkedListLength(head: LinkedList) {
  let length = 0
  let currentNode: LinkedList | null = head

  while (currentNode) {
    length++
    currentNode = currentNode.next
  }

  return length
}
