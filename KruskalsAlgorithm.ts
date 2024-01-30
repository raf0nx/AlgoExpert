// Solution 1, O(e * log(e)) time complexity, O(e + v) space complexity,
// where e is the number of edges and v is the number of vertices
export function kruskalsAlgorithm(edges: [number, number][][]) {
  const mappedEdges = mapEdges(edges)

  mappedEdges.sort(([, , a], [, , b]) => a - b)

  const parents = edges.map((_, i) => i)
  const ranks = edges.map(() => 0)
  const minSpanningTree: [number, number][][] = edges.map(_ => [])

  for (const [source, destination, weight] of mappedEdges) {
    const v1Parent = find(source, parents)
    const v2Parent = find(destination, parents)

    if (v1Parent === v2Parent) continue

    minSpanningTree[source].push([destination, weight])
    minSpanningTree[destination].push([source, weight])

    union(v1Parent, v2Parent, parents, ranks)
  }

  return minSpanningTree
}

function mapEdges(edges: [number, number][][]) {
  const mappedEdges: [number, number, number][] = []

  for (let v = 0; v < edges.length; v++) {
    for (const sibling of edges[v]) {
      mappedEdges.push([v, ...sibling])
    }
  }

  return mappedEdges
}

function find(vertex: number, parents: number[]) {
  if (vertex !== parents[vertex]) {
    parents[vertex] = find(parents[vertex], parents)
  }

  return parents[vertex]
}

function union(
  v1Parent: number,
  v2Parent: number,
  parents: number[],
  ranks: number[]
) {
  if (ranks[v1Parent] === ranks[v2Parent]) {
    parents[v2Parent] = v1Parent
    ranks[v1Parent] += 1
  } else if (ranks[v1Parent] > ranks[v2Parent]) {
    parents[v2Parent] = v1Parent
  } else {
    parents[v1Parent] = v2Parent
  }
}
