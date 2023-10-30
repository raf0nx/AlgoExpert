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
