// Solution 1, O(n * log(n)) time complexity, O(1) space complexity,
// where n is the length of the input array
export function heapSort(array: number[]) {
  buildMaxHeap(array)

  for (let end = array.length - 1; end > 0; end--) {
    swap(array, 0, end)
    siftDown(array, 0, end - 1)
  }

  return array
}

function buildMaxHeap(array: number[]) {
  const firstParentIdx = getParent(array.length - 1)

  for (let i = firstParentIdx; i >= 0; i--) {
    siftDown(array, i, array.length - 1)
  }
}

function siftDown(heap: number[], idx: number, end: number) {
  let child1 = getChild(idx)

  while (child1 <= end) {
    const child2 = getChild(idx, true) <= end ? getChild(idx, true) : -1

    const biggerChildIdx =
      child2 === -1 ? child1 : heap[child1] > heap[child2] ? child1 : child2

    if (heap[idx] < heap[biggerChildIdx]) {
      swap(heap, idx, biggerChildIdx)
      idx = biggerChildIdx
      child1 = getChild(idx)
    } else return
  }
}

function getParent(i: number) {
  return Math.floor((i - 1) / 2)
}

function getChild(i: number, secondChild = false) {
  return i * 2 + (secondChild ? 2 : 1)
}

function swap(array: number[], i: number, j: number) {
  ;[array[i], array[j]] = [array[j], array[i]]
}
