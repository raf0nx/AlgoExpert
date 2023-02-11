export enum Direction {
  East = 'EAST',
  West = 'WEST',
}

// Solution 1, O(n) time complexity, O(n) space complexity
export function sunsetViews(buildings: number[], direction: Direction) {
  const result: number[] = []
  const startIdx = isEast(direction) ? buildings.length - 1 : 0
  const step = isEast(direction) ? -1 : 1

  let idx = startIdx
  let currMaxHeight = -Infinity

  while (idx >= 0 && idx < buildings.length) {
    const currBuildingHeight = buildings[idx]

    if (currBuildingHeight > currMaxHeight) {
      result.push(idx)
      currMaxHeight = currBuildingHeight
    }

    idx += step
  }

  return isEast(direction) ? result.reverse() : result
}

function isEast(direction: Direction) {
  return direction === Direction.East
}
