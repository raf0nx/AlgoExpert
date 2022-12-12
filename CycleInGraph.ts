// Solution 1, O((v + e) * e) time complexity, O(v) space complexity where v is the number of vertices and e is the number of edges
type OriginalVertex = { val: number }

export function cycleInGraph(edges: number[][]) {
  for (let i = 0; i < edges.length; i++) {
    if (checkForCycle(edges, i, edges.length, { val: i })) return true
  }

  return false
}

function checkForCycle(
  edges: number[][],
  vertex: number,
  maxLoops: number,
  target: OriginalVertex
): boolean {
  if (!maxLoops) return false

  for (const vertice of edges[vertex]) {
    if (
      vertice === target.val ||
      checkForCycle(edges, vertice, maxLoops - 1, target)
    )
      return true
  }

  return false
}

// Solution 2, O(v * e) time complexity, O(v) space complexity where v is the number of vertices and e is the number of edges
export function cycleInGraph2(edges: number[][]) {
  const visited = new Set<number>()

  for (let vertex = 0; vertex < edges.length; vertex++) {
    if (visited.has(vertex)) continue
    if (findCycle(edges, vertex, visited)) return true
  }

  return false
}

function findCycle(
  edges: number[][],
  vertex: number,
  visited: Set<number>,
  currVisited = new Set<number>()
): boolean {
  visited.add(vertex)
  currVisited.add(vertex)

  for (const vertice of edges[vertex]) {
    if (currVisited.has(vertice)) return true
    if (
      !visited.has(vertice) &&
      findCycle(edges, vertice, visited, currVisited)
    )
      return true
  }

  currVisited.delete(vertex)

  return false
}
