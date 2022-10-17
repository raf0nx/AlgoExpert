// Do not edit the class below except for
// the insert, contains, and remove methods.
// Feel free to add new properties and methods
// to the class.
export class BST {
  value: number
  left: BST | null
  right: BST | null

  constructor(value: number) {
    this.value = value
    this.left = null
    this.right = null
  }

  getDirection(value: number) {
    return value < this.value ? 'left' : 'right'
  }

  insert(value: number): BST {
    const direction = this.getDirection(value)

    if (!this[direction]) {
      this[direction] = new BST(value)
      return this
    }

    this[direction]!.insert(value)

    return this
  }

  contains(value: number): boolean {
    if (this.value === value) return true

    const direction = this.getDirection(value)

    if (!this[direction]) return false

    return this[direction]!.contains(value)
  }

  removeHelper(value: number): void {
    const direction = this.getDirection(value)

    if (!this[direction]) return

    if (this[direction]!.value === value) {
      if (this[direction]!.right) this.right = this[direction]!.right
      else if (this[direction]!.left) this.left = this[direction]!.left
      else this[direction] = null

      return
    }

    this[direction]!.removeHelper(value)
  }

  remove(value: number): BST {
    if (!this.left && !this.right) return this

    this.removeHelper(value)

    return this
  }
}
