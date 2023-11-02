// Solution 1, O(v^2 + e) time complexity, O(v) space complexity,
// where v is the number of vertices and e is the number of edges in the input graph
export function dijkstrasAlgorithm(start: number, edges: number[][][]) {
  const shortestPaths: number[] = new Array(edges.length).fill(Infinity)
  const visitedVertices = new Set<number>()

  shortestPaths[start] = 0

  while (visitedVertices.size < edges.length) {
    const currentVertexIdx = findShortestDistanceVertex(
      shortestPaths,
      visitedVertices
    )
    const currentVertex = edges[currentVertexIdx]

    if (currentVertexIdx === -1) break

    visitedVertices.add(currentVertexIdx)

    for (const [vertice, edge] of currentVertex) {
      if (visitedVertices.has(vertice)) continue

      const newPath = edge + shortestPaths[currentVertexIdx]
      const currentPath = shortestPaths[vertice]

      if (newPath < currentPath) {
        shortestPaths[vertice] = newPath
      }
    }
  }

  return shortestPaths.map(path => (path === Infinity ? -1 : path))
}

function findShortestDistanceVertex(
  shortestPaths: number[],
  visitedVertices: Set<number>
) {
  let currentMinDistance = Infinity
  let minDistanceNodeIdx = -1

  for (let i = 0; i < shortestPaths.length; i++) {
    if (visitedVertices.has(i)) continue

    if (shortestPaths[i] < currentMinDistance) {
      currentMinDistance = shortestPaths[i]
      minDistanceNodeIdx = i
    }
  }

  return minDistanceNodeIdx
}

// Solution 2, O((v + e) * log(v)) time complexity, O(v) space complexity,
// where v is the number of vertices and e is the number of edges in the input graph
export function dijkstrasAlgorithm2(start: number, edges: number[][][]) {
  const shortestPaths: number[] = new Array(edges.length).fill(Infinity)
  const initialDistances: [number, number][] = Array.from(
    { length: edges.length },
    (_, i) => [i, Infinity]
  )
  const minDistancesHeap = new MinHeap(initialDistances)

  shortestPaths[start] = 0
  minDistancesHeap.update(start, 0)

  while (!minDistancesHeap.isEmpty()) {
    const [vertex, currentMinDistance] = minDistancesHeap.remove()!

    if (currentMinDistance === Infinity) break

    for (const [destination, distanceToDestination] of edges[vertex]) {
      const newPath = distanceToDestination + currentMinDistance
      const currentPath = shortestPaths[destination]

      if (newPath < currentPath) {
        shortestPaths[destination] = newPath
        minDistancesHeap.update(destination, newPath)
      }
    }
  }

  return shortestPaths.map(path => (path === Infinity ? -1 : path))
}

class MinHeap {
  vertexMap: { [vertex: number]: number }
  heap: [number, number][]

  constructor(array: [number, number][]) {
    this.vertexMap = array.reduce((obj, _, i) => {
      obj[i] = i
      return obj
    }, {} as { [vertex: number]: number })
    this.heap = this.buildHeap(array)
  }

  isEmpty() {
    return this.heap.length === 0
  }

  buildHeap(array: [number, number][]) {
    const firstParentIdx = Math.floor((array.length - 2) / 2)

    for (let currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
      this.siftDown(currentIdx, array.length - 1, array)
    }

    return array
  }

  siftDown(currentIdx: number, endIdx: number, heap: [number, number][]) {
    let childOneIdx = currentIdx * 2 + 1

    while (childOneIdx <= endIdx) {
      const childTwoIdx = currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1
      let idxToSwap

      if (childTwoIdx !== -1 && heap[childTwoIdx][1] < heap[childOneIdx][1]) {
        idxToSwap = childTwoIdx
      } else {
        idxToSwap = childOneIdx
      }

      if (heap[idxToSwap][1] < heap[currentIdx][1]) {
        this.swap(currentIdx, idxToSwap, heap)
        currentIdx = idxToSwap
        childOneIdx = currentIdx * 2 + 1
      } else {
        return
      }
    }
  }

  siftUp(currentIdx: number, heap: [number, number][]) {
    let parentIdx = Math.floor((currentIdx - 1) / 2)

    while (currentIdx > 0 && heap[currentIdx][1] < heap[parentIdx][1]) {
      this.swap(currentIdx, parentIdx, heap)
      currentIdx = parentIdx
      parentIdx = Math.floor((currentIdx - 1) / 2)
    }
  }

  remove() {
    if (this.isEmpty()) return

    this.swap(0, this.heap.length - 1, this.heap)
    const [vertex, distance] = this.heap.pop()!
    delete this.vertexMap[vertex]
    this.siftDown(0, this.heap.length - 1, this.heap)

    return [vertex, distance]
  }

  swap(i: number, j: number, heap: [number, number][]) {
    this.vertexMap[heap[i][0]] = j
    this.vertexMap[heap[j][0]] = i

    const temp = heap[j]
    heap[j] = heap[i]
    heap[i] = temp
  }

  update(vertex: number, value: number) {
    this.heap[this.vertexMap[vertex]] = [vertex, value]
    this.siftUp(this.vertexMap[vertex], this.heap)
  }
}
