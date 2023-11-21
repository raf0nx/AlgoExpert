export class LinkedList {
  value: number
  next: LinkedList | null

  constructor(value: number) {
    this.value = value
    this.next = null
  }
}

// Solution 1, O(n + m) time complexity, O(1) space complexity,
// where n is the number of nodes in the first Linked List and m is the number of nodes in the second Linked List
export function mergeLinkedLists(headOne: LinkedList, headTwo: LinkedList) {
  if (headOne.value > headTwo.value) {
    const temp = headOne

    headOne = headTwo
    headTwo = temp
  }

  const head = headOne

  let p1Prev: LinkedList = headOne
  let p1: LinkedList | null = headOne.next
  let p2: LinkedList | null = headTwo

  while (p1 && p2) {
    if (p1.value < p2.value) {
      p1Prev = p1
      p1 = p1.next
      continue
    }

    const temp: LinkedList | null = p2.next

    p1Prev.next = p2
    p2.next = p1
    p1Prev = p2
    p2 = temp
  }

  if (p2) p1Prev.next = p2

  return head
}
