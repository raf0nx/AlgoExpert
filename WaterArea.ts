// Solution 1, O(h^2 * n) time complexity, O(h * n) space complexity,
// where h is the greatest number in the input array and n is the length of the input array
export function waterArea(heights: number[]) {
  const greatestHeight = Math.max(...heights)
  const pillars: string[][] = Array.from({ length: greatestHeight }, (_, i) =>
    Array.from({ length: heights.length }, (_, j) =>
      greatestHeight - i <= heights[j] ? 'p' : ''
    )
  )

  findTrappingPillars(pillars)

  return pillars.flat().reduce((a, b) => (b === 'w' ? a + 1 : a), 0)
}

function findTrappingPillars(pillars: string[][]) {
  for (let i = 0; i < pillars.length; i++) {
    const trappingPillars: number[] = []

    for (let j = 0; j < pillars[0].length; j++) {
      if (pillars[i][j] !== 'p' || pillars[i][j + 1] === 'w') continue

      trappingPillars.push(j)
    }

    if (trappingPillars.length <= 1) continue

    populateWaterNodes(
      pillars,
      i,
      trappingPillars[0],
      trappingPillars[trappingPillars.length - 1]
    )
  }
}

function populateWaterNodes(
  pillars: string[][],
  startRow: number,
  startCol: number,
  endCol: number
) {
  for (let i = startRow; i < pillars.length; i++) {
    for (let j = startCol + 1; j < endCol; j++) {
      if (!pillars[i][j]) pillars[i][j] = 'w'
    }
  }
}
