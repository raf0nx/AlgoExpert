// Solution 1, O(n * log(n)) time complexity, O(n) space complexity,
// where n is the number of times
export function laptopRentals(times: number[][]) {
  times.sort(([a], [b]) => a - b)

  const endTimesHeap = new MinHeap([])
  let numOfLaptops = 0

  for (const [start, end] of times) {
    while (start >= endTimesHeap.peek()) {
      endTimesHeap.remove()
    }

    endTimesHeap.insert(end)
    numOfLaptops = Math.max(numOfLaptops, endTimesHeap.length)
  }

  return numOfLaptops
}

// Solution 2, O(n * log(n)) time complexity, O(n) space complexity,
// where n is the number of times
export function laptopRentals2(times: number[][]) {
  const startTimes = times.map(([start]) => start).sort((a, b) => a - b)
  const endTimes = times.map(([, end]) => end).sort((a, b) => a - b)
  let currentLaptopsInUse = 0
  let startsPointer = 0
  let endsPointer = 0
  let numOfLaptopsNeeded = 0

  while (startsPointer < times.length) {
    if (startTimes[startsPointer] < endTimes[endsPointer]) {
      startsPointer++
      currentLaptopsInUse += 1
      numOfLaptopsNeeded = Math.max(numOfLaptopsNeeded, currentLaptopsInUse)
    } else {
      while (startTimes[startsPointer] >= endTimes[endsPointer]) {
        endsPointer++
        currentLaptopsInUse -= 1
      }
    }
  }

  return numOfLaptopsNeeded
}

export class MinHeap {
  heap: number[]
  length: number

  constructor(array: number[]) {
    this.heap = this.buildHeap(array)
    this.length = this.heap.length
  }

  buildHeap(array: number[]) {
    const firstParentIdx = this.getParent(array.length - 1)
    for (let i = firstParentIdx; i >= 0; i--) {
      this.siftDown(array, i, this.getChild(i), this.getChild(i, true))
    }

    return array
  }

  siftDown(heap: number[], currIdx: number, child1: number, child2: number) {
    while (heap[child1] !== undefined || heap[child2] !== undefined) {
      const smallerChild =
        heap[child1] < (heap[child2] || Infinity) ? child1 : child2

      if (heap[currIdx] > heap[smallerChild])
        this.swapItemsInArray(heap, currIdx, smallerChild)

      currIdx = smallerChild
      child1 = this.getChild(currIdx)
      child2 = this.getChild(currIdx, true)
    }
  }

  siftUp(child: number, parent: number) {
    while (this.heap[parent] && this.heap[child] < this.heap[parent]) {
      this.swapItemsInArray(this.heap, parent, child)
      child = parent
      parent = this.getParent(child)
    }
  }

  isEmpty() {
    return this.heap.length === 0
  }

  peek() {
    return this.heap[0]
  }

  remove() {
    this.swapItemsInArray(this.heap, 0, this.heap.length - 1)
    const removedItem = this.heap.pop()
    this.length--
    this.siftDown(this.heap, 0, 1, 2)

    return removedItem
  }

  insert(value: number) {
    this.heap.push(value)
    this.length++

    const insertedValIdx = this.heap.length - 1
    this.siftUp(insertedValIdx, this.getParent(insertedValIdx))
  }

  swapItemsInArray(array: number[], idx1: number, idx2: number) {
    ;[array[idx1], array[idx2]] = [array[idx2], array[idx1]]
  }

  getParent(i: number) {
    return Math.floor((i - 1) / 2)
  }

  getChild(i: number, secondChild = false) {
    return i * 2 + (secondChild ? 2 : 1)
  }
}
