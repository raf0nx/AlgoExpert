// Solution 1, O(n^2) time complexity, O(n) space complexity,
// where n is the number of points
export function countSquares(points: number[][]) {
  const pointsSet = new Set(points.map(([x, y]) => `${x},${y}`))
  let numOfSquares = 0

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const [xX, xY] = points[i]
      const [yX, yY] = points[j]
      const midX = (xX + yX) / 2
      const midY = (xY + yY) / 2
      const xDistance = xX - midX
      const yDistance = xY - midY
      const zX = midX + yDistance
      const zY = midY - xDistance
      const wX = midX - yDistance
      const wY = midY + xDistance

      if (pointsSet.has(`${zX},${zY}`) && pointsSet.has(`${wX},${wY}`))
        numOfSquares++
    }
  }

  return numOfSquares / 2
}
