// Solution 1, O(n * log(k)) time complexity, O(k) space complexity,
// where n is the number of elements in the array and k is how far away elements are from their sorted position
export function sortKSortedArray(array: number[], k: number) {
  const minHeap = new MinHeap(array.slice(0, Math.min(k + 1, array.length)))
  let elementToSwap = 0

  while (!minHeap.isEmpty()) {
    const nextMinElement = minHeap.remove()!
    const nextElementToInsert = k + 1 + elementToSwap

    array[elementToSwap] = nextMinElement
    elementToSwap++

    nextElementToInsert < array.length &&
      minHeap.insert(array[nextElementToInsert])
  }

  return array
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
