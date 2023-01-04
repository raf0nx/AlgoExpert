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
