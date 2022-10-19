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
