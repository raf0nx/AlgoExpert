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

// Solution 2, O(log(n)) time complexity, O(n) space complexity,
// where n is the number of inserted numbers
export class ContinuousMedianHandler2 {
  lowers: Heap
  greaters: Heap
  median: number | null

  constructor() {
    this.lowers = new Heap(MAX_HEAP_FUNC, [])
    this.greaters = new Heap(MIN_HEAP_FUNC, [])
    this.median = null
  }

  insert(number: number) {
    if (number < this.lowers.peek()) {
      this.lowers.insert(number)
    } else {
      this.greaters.insert(number)
    }

    this.rebalanceHeaps()
    this.calculateMedian()
  }

  rebalanceHeaps() {
    if (Math.abs(this.lowers.length - this.greaters.length) <= 1) return

    if (this.lowers.length > this.greaters.length) {
      const removedValue = this.lowers.remove()!
      this.greaters.insert(removedValue)
    } else {
      const removedValue = this.greaters.remove()!
      this.lowers.insert(removedValue)
    }
  }

  calculateMedian() {
    if (this.lowers.length === this.greaters.length) {
      this.median = (this.lowers.peek() + this.greaters.peek()) / 2
    } else {
      this.median =
        this.lowers.length > this.greaters.length
          ? this.lowers.peek()
          : this.greaters.peek()
    }
  }

  getMedian() {
    return this.median
  }
}

class Heap {
  heap: number[]
  comparisonFunc: (a: number, b: number) => boolean
  length: number

  constructor(
    comparisonFunc: (a: number, b: number) => boolean,
    array: number[]
  ) {
    this.comparisonFunc = comparisonFunc
    this.heap = this.buildHeap(array)
    this.length = this.heap.length
  }

  insert(value: number) {
    this.heap.push(value)
    this.length++
    this.siftUp(this.length - 1, this.heap)
  }

  peek() {
    return this.heap[0]
  }

  remove() {
    this.swap(0, this.length - 1, this.heap)

    const valueToRemove = this.heap.pop()

    this.length--
    this.siftDown(0, this.length - 1, this.heap)

    return valueToRemove
  }

  buildHeap(array: number[]) {
    const firstParentIdx = Math.floor((array.length - 2) / 2)

    for (let currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
      this.siftDown(currentIdx, array.length - 1, array)
    }

    return array
  }

  siftUp(currentIdx: number, heap: number[]) {
    let parentIdx = Math.floor((currentIdx - 1) / 2)

    while (currentIdx > 0) {
      if (!this.comparisonFunc(heap[currentIdx], heap[parentIdx])) return

      this.swap(currentIdx, parentIdx, heap)
      currentIdx = parentIdx
      parentIdx = Math.floor((currentIdx - 1) / 2)
    }
  }

  siftDown(currentIdx: number, endIdx: number, heap: number[]) {
    let childOneIdx = currentIdx * 2 + 1

    while (childOneIdx <= endIdx) {
      const childTwoIdx = currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1
      let idxToSwap: number

      if (childTwoIdx !== -1) {
        idxToSwap = this.comparisonFunc(heap[childTwoIdx], heap[childOneIdx])
          ? childTwoIdx
          : childOneIdx
      } else idxToSwap = childOneIdx

      if (this.comparisonFunc(heap[idxToSwap], heap[currentIdx])) {
        this.swap(currentIdx, idxToSwap, heap)
        currentIdx = idxToSwap
        childOneIdx = currentIdx * 2 + 1
      } else return
    }
  }

  swap(i: number, j: number, heap: number[]) {
    const temp = heap[i]
    heap[i] = heap[j]
    heap[j] = temp
  }
}

function MAX_HEAP_FUNC(a: number, b: number) {
  return a > b
}

function MIN_HEAP_FUNC(a: number, b: number) {
  return a < b
}
