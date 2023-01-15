// Soltuion 1
export class UnionFind {
  parents: { [key: number]: number }

  constructor() {
    this.parents = {}
  }

  // O(1) time complexity, O(1) space complexity
  createSet(value: number) {
    this.parents[value] = value
  }

  // O(n) time complexity, O(1) space complexity, where n is the total number of values
  find(value: number) {
    if (!(value in this.parents)) return null

    while (value !== this.parents[value]) {
      value = this.parents[value]
    }

    return value
  }

  // O(n) time complexity, O(1) space complexity, where n is the total number of values
  union(valueOne: number, valueTwo: number) {
    const val1Parent = this.find(valueOne)
    const val2Parent = this.find(valueTwo)

    if (val1Parent === null || val2Parent === null || val1Parent === val2Parent)
      return

    this.parents[val2Parent] = val1Parent
  }
}
