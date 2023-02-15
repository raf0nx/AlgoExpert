export enum Direction {
  East = 'EAST',
  West = 'WEST',
}

function isEast(direction: Direction) {
  return direction === Direction.East
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

// Solution 2, O(n) time complexity, O(n) space complexity
export function sunsetViews2(buildings: number[], direction: Direction) {
  const stack: number[] = []
  const startIdx = isEast(direction) ? 0 : buildings.length - 1
  const step = isEast(direction) ? 1 : -1

  let idx = startIdx

  while (idx >= 0 && idx < buildings.length) {
    const currBuilding = buildings[idx]

    while (stack.length && buildings[stack[stack.length - 1]] <= currBuilding) {
      stack.pop()
    }

    stack.push(idx)
    idx += step
  }

  return isEast(direction) ? stack : stack.reverse()
}
