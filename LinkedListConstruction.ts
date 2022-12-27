export class Node {
  value: number
  prev: Node | null
  next: Node | null

  constructor(value: number) {
    this.value = value
    this.prev = null
    this.next = null
  }
}

export class DoublyLinkedList {
  head: Node | null
  tail: Node | null

  constructor() {
    this.head = null
    this.tail = null
  }

  setHead(node: Node) {
    // Write your code here.
  }

  setTail(node: Node) {
    // Write your code here.
  }

  insertBefore(node: Node, nodeToInsert: Node) {
    // Write your code here.
  }

  insertAfter(node: Node, nodeToInsert: Node) {
    // Write your code here.
  }

  insertAtPosition(position: number, nodeToInsert: Node) {
    // Write your code here.
  }

  removeNodesWithValue(value: number) {
    // Write your code here.
  }

  remove(node: Node) {
    // Write your code here.
  }

  containsNodeWithValue(value: number) {
    // Write your code here.
    return false
  }
}
