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

  // O(1) time complexity, O(1) space compleity
  setHead(node: Node) {
    if (!this.head) {
      this.head = node
      this.tail = node
    } else {
      this.insertBefore(this.head, node)
    }
  }

  // O(1) time complexity, O(1) space compleity
  setTail(node: Node) {
    if (!this.tail) {
      this.setHead(node)
    } else {
      this.insertAfter(this.tail, node)
    }
  }

  // O(1) time complexity, O(1) space compleity
  insertBefore(node: Node, nodeToInsert: Node) {
    this.remove(nodeToInsert)

    if (node === this.head) {
      this.head = nodeToInsert
      nodeToInsert.next = node
      node.prev = nodeToInsert
    } else {
      nodeToInsert.next = node
      nodeToInsert.prev = node.prev
      node.prev!.next = nodeToInsert
      node.prev = nodeToInsert
    }
  }

  // O(1) time complexity, O(1) space compleity
  insertAfter(node: Node, nodeToInsert: Node) {
    this.remove(nodeToInsert)

    if (node === this.tail) {
      this.tail = nodeToInsert
      nodeToInsert.prev = node
      node.next = nodeToInsert
    } else {
      nodeToInsert.prev = node
      nodeToInsert.next = node.next
      node.next!.prev = nodeToInsert
      node.next = nodeToInsert
    }
  }

  // O(p) time complexity, O(1) space complexity, where p is the position
  insertAtPosition(position: number, nodeToInsert: Node) {
    let currentNode = this.head
    let currPos = 1

    while (currentNode) {
      if (currPos === position) {
        position === 1
          ? this.setHead(nodeToInsert)
          : this.insertBefore(currentNode, nodeToInsert)
        return
      }

      currentNode = currentNode.next
      currPos += 1
    }

    this.setTail(nodeToInsert)
  }

  // O(n) time complexity, O(1) space complexity
  removeNodesWithValue(value: number) {
    let currentNode = this.head

    while (currentNode) {
      const nextNode = currentNode.next

      if (currentNode.value === value) this.remove(currentNode)
      currentNode = nextNode
    }
  }

  // O(1) time complexity, O(1) space compleity
  remove(node: Node) {
    if (node === this.head) this.head = this.head.next
    if (node === this.tail) this.tail = this.tail.prev

    if (node.prev) node.prev.next = node.next
    if (node.next) node.next.prev = node.prev

    node.next = null
    node.prev = null
  }

  // O(n) time complexity, O(1) space complexity
  containsNodeWithValue(value: number) {
    let currentNode = this.head

    while (currentNode) {
      if (currentNode.value === value) return true
      currentNode = currentNode.next
    }

    return false
  }
}
