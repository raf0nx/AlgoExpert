export class MinHeap {
  heap: number[]

  constructor(array: number[]) {
    this.heap = this.buildHeap(array)
  }

  buildHeap(array: number[]) {
    for (let i = array.length - 1; i >= 0; i--) {
      this.siftDown(array, i)
    }

    return array
  }

  siftDown(heap: number[], i: number) {
    while (i < heap.length) {
      const child1 = i * 2 + 1
      const child2 = i * 2 + 2

      if (!heap[child1] && !heap[child2]) return

      const smallerChild =
        heap[child1] < (heap[child2] || Infinity) ? child1 : child2

      if (heap[i] > heap[smallerChild])
        this.swapItemsInArray(heap, i, smallerChild)
      i = smallerChild
    }
  }

  siftUp() {
    // Write your code here.
  }

  peek() {
    return this.heap[0]
  }

  remove() {
    // Write your code here.
    return -1
  }

  insert(value: number) {
    // Write your code here.
  }

  swapItemsInArray(array: number[], idx1: number, idx2: number) {
    [array[idx1], array[idx2]] = [array[idx2], array[idx1]]
  }
}
