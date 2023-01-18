// Solution 1, O(v + e) time complexity, O(v) space complexity where v is the number of vertices and e is the number of edges in the graph
export function twoColorable(edges: number[][]) {
  return checkIfTwoColorable(edges, 0, {}, 0)
}

function checkIfTwoColorable(
  edges: number[][],
  vertex: number,
  verticesColors: Record<number, number>,
  color: 0 | 1
) {
  verticesColors[vertex] = color

  for (const sibling of edges[vertex]) {
    if (verticesColors[sibling] === color) return false
    if (sibling in verticesColors) continue

    if (!checkIfTwoColorable(edges, sibling, verticesColors, color ? 0 : 1))
      return false
  }

  return true
}
