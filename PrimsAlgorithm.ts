// Solution 1, O(e * log(v)) time complexity, O(e + v) space complexity,
// where e is the number of edges in the input edges and v is the number of vertices
type Path = [number, number, number]

export function primsAlgorithm(edges: number[][][]) {
  const minHeap = new MinHeap(edges[0].map(edge => [0, ...edge] as Path))
  const mst: number[][][] = Array.from({ length: edges.length }, () => [])

  while (!minHeap.isEmpty()) {
    const [source, destination, distance] = minHeap.remove()

    if (mst[destination].length !== 0) continue

    mst[source].push([destination, distance])
    mst[destination].push([source, distance])

    for (const [neighbor, neighborDistance] of edges[destination]) {
      if (mst[neighbor].length > 0) continue

      minHeap.insert([destination, neighbor, neighborDistance])
    }
  }

  return mst
}

class MinHeap {
  heap: Path[]

  constructor(array: Path[]) {
    this.heap = this.buildHeap(array)
  }

  buildHeap(array: Path[]) {
    const firstParentIdx = this.getParent(array.length - 1)

    for (let i = firstParentIdx; i >= 0; i--) {
      this.siftDown(array, i, this.getChild(i), this.getChild(i, true))
    }

    return array
  }

  siftDown(heap: Path[], currIdx: number, child1: number, child2: number) {
    while (heap[child1] || heap[child2]) {
      const smallerChild =
        heap[child1][2] < (heap[child2]?.[2] || Infinity) ? child1 : child2

      if (heap[currIdx][2] > heap[smallerChild][2]) {
        this.swapItemsInHeap(heap, currIdx, smallerChild)
      }

      currIdx = smallerChild
      child1 = this.getChild(currIdx)
      child2 = this.getChild(currIdx, true)
    }
  }

  siftUp(child: number, parent: number) {
    while (this.heap[parent]?.[2] > this.heap[child][2]) {
      this.swapItemsInHeap(this.heap, parent, child)
      child = parent
      parent = this.getParent(child)
    }
  }

  insert(path: Path) {
    this.heap.push(path)

    const insertedValIdx = this.heap.length - 1
    this.siftUp(insertedValIdx, this.getParent(insertedValIdx))
  }

  remove() {
    this.swapItemsInHeap(this.heap, 0, this.heap.length - 1)
    const removedItem = this.heap.pop()!
    this.siftDown(this.heap, 0, 1, 2)

    return removedItem
  }

  isEmpty() {
    return this.heap.length === 0
  }

  swapItemsInHeap(heap: Path[], idx1: number, idx2: number) {
    ;[heap[idx1], heap[idx2]] = [heap[idx2], heap[idx1]]
  }

  getParent(i: number) {
    return Math.floor((i - 1) / 2)
  }

  getChild(i: number, secondChild = false) {
    return i * 2 + (secondChild ? 2 : 1)
  }
}
