// Solution 1, O(n) time complexity, O(n) space complexity,
// where n is the number of inserted numbers
export class ContinuousMedianHandler {
  median: number | null
  numbers: number[]

  constructor() {
    this.setMedian(null)
    this.setNumbers([])
  }

  insert(number: number) {
    const newNumberIdx = this.findNewNumberIdx(number)

    this.setNumbers([
      ...this.numbers.slice(0, newNumberIdx),
      number,
      ...this.numbers.slice(newNumberIdx),
    ])
    this.calculateMedian()
  }

  findNewNumberIdx(number: number) {
    if (number >= this.numbers[this.numbers.length - 1]) {
      return this.numbers.length
    }

    let newNumberIdx = 0

    for (let i = 0; i < this.numbers.length; i++) {
      if (number >= this.numbers[i] && number <= this.numbers[i + 1]) {
        newNumberIdx = i + 1
        break
      }
    }

    return newNumberIdx
  }

  calculateMedian() {
    const middleIdx = Math.floor(this.numbers.length / 2)

    if (this.numbers.length % 2) {
      this.setMedian(this.numbers[middleIdx])
    } else {
      const firstMiddleNumber = this.numbers[middleIdx - 1]
      const secondMiddleNumber = this.numbers[middleIdx]

      this.setMedian((firstMiddleNumber + secondMiddleNumber) / 2)
    }
  }

  setMedian(number: number | null) {
    this.median = number
  }

  setNumbers(numbers: number[]) {
    this.numbers = numbers
  }

  getMedian() {
    return this.median
  }
}
