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
    if (!node.prev) this.head = node.next
    if (!node.next) this.tail = node.prev

    if (node.prev) node.prev.next = node.next
    if (node.next) node.next.prev = node.prev

    node.next = null
    node.prev = null
  }

  containsNodeWithValue(value: number) {
    let currentNode = this.head

    while (currentNode) {
      if (currentNode.value === value) return true
      currentNode = currentNode.next
    }

    return false
  }
}
