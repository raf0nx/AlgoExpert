// Solution 1 (complexities inside class)
export class BST {
  value: number
  left: BST | null
  right: BST | null

  constructor(value: number) {
    this.value = value
    this.left = null
    this.right = null
  }

  getDirection(value: number): 'left' | 'right' {
    return value < this.value ? 'left' : 'right'
  }

  // Avg: O(log(n)) time complexity, O(log(n)) space complexity
  // Worst: O(n) time complexity, O(n) space complexity
  insert(value: number): BST {
    const direction = this.getDirection(value)

    if (!this[direction]) {
      this[direction] = new BST(value)
      return this
    }

    this[direction]!.insert(value)

    return this
  }

  // Avg: O(log(n)) time complexity, O(log(n)) space complexity
  // Worst: O(n) time complexity, O(n) space complexity
  contains(value: number): boolean {
    if (this.value === value) return true

    const direction = this.getDirection(value)

    if (!this[direction]) return false

    return this[direction]!.contains(value)
  }

  findSmallestValue(): number {
    if (!this.left) return this.value

    return this.left.findSmallestValue()
  }

  // Avg: O(log(n)) time complexity, O(log(n)) space complexity
  // Worst: O(n) time complexity, O(n) space complexity
  remove(value: number, parent: BST | null = null): BST {
    const direction = this.getDirection(value)

    if (this.value === value) {
      if (this.left && this.right) {
        this.value = this.right.findSmallestValue()
        this.right.remove(this.value, this)
      } else if (!parent) {
        if (this.left) {
          this.value = this.left.value
          this.right = this.left.right
          this.left = this.left.left
        } else if (this.right) {
          this.value = this.right.value
          this.left = this.right.left
          this.right = this.right.right
        }
      } else if (parent.left === this) {
        parent.left = this.left || this.right
      } else if (parent.right === this) {
        parent.right = this.left || this.right
      }
    } else {
      if (this[direction]) this[direction]!.remove(value, this)
    }

    return this
  }
}

// Solution 2 (complexities inside class)
export class BSTv2 {
  value: number
  left: BSTv2 | null
  right: BSTv2 | null

  constructor(value: number) {
    this.value = value
    this.left = null
    this.right = null
  }

  getDirection(value: number): 'left' | 'right' {
    return value < this.value ? 'left' : 'right'
  }

  // Avg: O(log(n)) time complexity, O(1) space complexity
  // Worst: O(n) time complexity, O(1) space complexity
  insert(value: number): BSTv2 {
    let currentNode: BSTv2 | null = this

    while (currentNode) {
      const direction = currentNode.getDirection(value)

      if (!currentNode[direction]) {
        currentNode[direction] = new BSTv2(value)
        break
      }

      currentNode = currentNode[direction]
    }

    return this
  }

  // Avg: O(log(n)) time complexity, O(1) space complexity
  // Worst: O(n) time complexity, O(1) space complexity
  contains(value: number) {
    let currentNode: BSTv2 | null = this

    while (currentNode) {
      if (currentNode.value === value) return true
      currentNode = currentNode[currentNode.getDirection(value)]
    }

    return false
  }

  // Avg: O(log(n)) time complexity, O(1) space complexity
  // Worst: O(n) time complexity, O(1) space complexity
  remove(value: number, parentNode: BSTv2 | null = null): BSTv2 {
    let currentNode: BSTv2 | null = this

    while (currentNode) {
      const direction = currentNode.getDirection(value)

      if (currentNode.value === value) {
        if (currentNode.left && currentNode.right) {
          currentNode.value = currentNode.right.findSmallestNum()
          currentNode.right.remove(currentNode.value, currentNode)
        } else if (!parentNode) {
          if (currentNode.left) {
            currentNode.value = currentNode.left.value
            currentNode.right = currentNode.left.right
            currentNode.left = currentNode.left.left
          } else if (currentNode.right) {
            currentNode.value = currentNode.right.value
            currentNode.left = currentNode.right.left
            currentNode.right = currentNode.right.right
          }
        } else if (currentNode === parentNode.left) {
          parentNode.left = currentNode.left || currentNode.right
        } else if (currentNode === parentNode.right) {
          parentNode.right = currentNode.left || currentNode.right
        }

        break
      } else {
        parentNode = currentNode
        currentNode = currentNode[direction]
      }
    }

    return this
  }

  findSmallestNum(): number {
    let currentNode: BSTv2 = this

    while (currentNode.left) {
      currentNode = currentNode.left
    }

    return currentNode.value
  }
}
