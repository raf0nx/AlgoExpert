// This is an input class. Do not edit.
export class LinkedList {
  value: number
  next: LinkedList | null

  constructor(value: number) {
    this.value = value
    this.next = null
  }
}

// Solution 1, O(n^2) time complexity, O(1) space complexity,
// where n is the number of nodes in the LinkedList
export function findLoop(head: LinkedList) {
  let slowNode = head
  let fastNode = head.next!.next!

  while (slowNode !== fastNode) {
    slowNode = slowNode.next!
    fastNode = fastNode.next!.next!
  }

  let loopLength = 1
  slowNode = slowNode.next!

  while (slowNode !== fastNode) {
    slowNode = slowNode.next!
    loopLength++
  }

  let currentNode = head
  let nextNode = head.next!

  while (true) {
    for (let i = 1; i <= loopLength; i++) {
      if (currentNode === nextNode) break
      nextNode = nextNode.next!
    }

    if (currentNode === nextNode) break

    currentNode = currentNode.next!
  }

  return currentNode
}
