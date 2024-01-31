// Solution 1, O(n * m) time complexity, O(n * m) space complexity,
// where n is the horizontal distance between the knights and m is the vertical distance between the knights
export function knightConnection(knightA: number[], knightB: number[]) {
  const queue: [number, number, number][] = [[knightA[0], knightA[1], 0]]
  const visited: Record<string, boolean> = {}

  while (queue.length) {
    const currAPos = queue.shift()!
    const [xA, yA, turns] = currAPos
    const [xB, yB] = knightB

    if (`${xA},${yA}` in visited) continue

    if (xA === xB && yA === yB) return Math.round(turns / 2)

    visited[`${xA},${yA}`] = true

    queue.push(...getNextPositions(currAPos))
  }
}

function getNextPositions(
  position: [number, number, number]
): [number, number, number][] {
  const [x, y, turns] = position

  return [
    [x - 2, y + 1, turns + 1],
    [x - 1, y + 2, turns + 1],
    [x + 1, y + 2, turns + 1],
    [x + 2, y + 1, turns + 1],
    [x + 2, y - 1, turns + 1],
    [x + 1, y - 2, turns + 1],
    [x - 1, y - 2, turns + 1],
    [x - 2, y - 1, turns + 1],
  ]
}
