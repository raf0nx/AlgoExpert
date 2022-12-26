export class MinHeap {
  heap: number[]

  constructor(array: number[]) {
    this.heap = this.buildHeap(array)
  }

  buildHeap(array: number[]) {
    const firstParentIdx = this.getParent(array.length - 1)
    for (let i = firstParentIdx; i >= 0; i--) {
      this.siftDown(array, i, this.getChild(i), this.getChild(i, true))
    }

    return array
  }

  siftDown(heap: number[], currIdx: number, child1: number, child2: number) {
    while (heap[child1] || heap[child2]) {
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

  peek() {
    return this.heap[0]
  }

  remove() {
    this.swapItemsInArray(this.heap, 0, this.heap.length - 1)
    const removedItem = this.heap.pop()
    this.siftDown(this.heap, 0, 1, 2)

    return removedItem
  }

  insert(value: number) {
    this.heap.push(value)

    const insertedValIdx = this.heap.length - 1
    this.siftUp(insertedValIdx, this.getParent(insertedValIdx))
  }

  swapItemsInArray(array: number[], idx1: number, idx2: number) {
    [array[idx1], array[idx2]] = [array[idx2], array[idx1]]
  }

  getParent(i: number) {
    return Math.floor((i - 1) / 2)
  }

  getChild(i: number, secondChild = false) {
    return i * 2 + (secondChild ? 2 : 1)
  }
}
