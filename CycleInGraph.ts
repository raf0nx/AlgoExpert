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
