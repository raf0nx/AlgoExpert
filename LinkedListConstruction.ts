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
    if (!this.head) {
      this.head = node
      this.tail = node
    } else {
      this.insertBefore(this.head, node)
    }
  }

  setTail(node: Node) {
    if (!this.tail) {
      this.setHead(node)
    } else {
      this.insertAfter(this.tail, node)
    }
  }

  insertBefore(node: Node, nodeToInsert: Node) {
    this.remove(nodeToInsert)

    if (this.shouldNotUpdateLinkedList(node, nodeToInsert)) return

    if (node === this.head) {
      this.head = nodeToInsert
      nodeToInsert.next = node
      node.prev = nodeToInsert
    } else {
      this.swapNodeBindings(node, nodeToInsert)
    }
  }

  insertAfter(node: Node, nodeToInsert: Node) {
    this.remove(nodeToInsert)

    if (this.shouldNotUpdateLinkedList(node, nodeToInsert)) return

    if (node === this.tail) {
      this.tail = nodeToInsert
      nodeToInsert.prev = node
      node.next = nodeToInsert
    } else {
      this.swapNodeBindings(node, nodeToInsert)
    }
  }

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

  removeNodesWithValue(value: number) {
    let currentNode = this.head

    while (currentNode) {
      const nextNode = currentNode.next

      if (currentNode.value === value) this.remove(currentNode)
      currentNode = nextNode
    }
  }

  remove(node: Node) {
    if (node === this.head) this.head = this.head.next
    if (node === this.tail) this.tail = this.tail.prev

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

  swapNodeBindings(node: Node, nodeToInsert: Node) {
    nodeToInsert.next = node
    nodeToInsert.prev = node.prev
    node.prev!.next = nodeToInsert
    node.prev = nodeToInsert
  }

  shouldNotUpdateLinkedList(node: Node, nodeToInsert: Node) {
    return (
      nodeToInsert.value === node.value &&
      node === this.head &&
      node === this.tail
    )
  }
}
