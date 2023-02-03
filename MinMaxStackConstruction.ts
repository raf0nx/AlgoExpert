// Solution 1
export class MinMaxStack {
  stack: number[] = []
  biggest: number[] = []
  smallest: number[] = []
  currMin = Infinity
  currMax = -Infinity

  // O(1) time complexity, O(1) space complexity
  peek() {
    return this.stack[this.stack.length - 1]
  }

  // O(1) time complexity, O(1) space complexity
  pop() {
    const removed = this.stack.pop()

    if (removed === this.currMax) {
      this.biggest.pop()
      this.currMax = this.biggest[this.biggest.length - 1] ?? -Infinity
    }

    if (removed === this.currMin) {
      this.smallest.pop()
      this.currMin = this.smallest[this.smallest.length - 1] ?? Infinity
    }

    return removed
  }

  // O(1) time complexity, O(1) space complexity
  push(number: number) {
    if (number >= this.currMax) {
      this.biggest.push(number)
      this.currMax = number
    }

    if (number <= this.currMin) {
      this.smallest.push(number)
      this.currMin = number
    }

    this.stack.push(number)
  }

  // O(1) time complexity, O(1) space complexity
  getMin() {
    return this.currMin
  }

  // O(1) time complexity, O(1) space complexity
  getMax() {
    return this.currMax
  }
}
