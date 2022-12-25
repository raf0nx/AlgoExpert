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

      if (!child1 && !child2) return

      if (child1 && !child2) {
        if (heap[i] > heap[child1]) this.swapItemsInArray(heap, i, child1)

        i = child1
        continue
      }

      if (!child1 && child2) {
        if (heap[i] > heap[child2]) this.swapItemsInArray(heap, i, child2)

        i = child2
        continue
      }

      const smallerChild = heap[child1] < heap[child2] ? child1 : child2

      if (heap[i] > heap[smallerChild])
        this.swapItemsInArray(heap, i, smallerChild)

      i = smallerChild
    }
  }

  siftUp() {
    // Write your code here.
  }

  peek() {
    // Write your code here.
    return -1
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
