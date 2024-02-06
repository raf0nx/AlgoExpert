// Solution 1, O(n^2) time complexity, O(n) space complexity,
// where n is the number of points
export function countSquares(points: number[][]) {
  const pointsSet = new Set(points.map(point => point.join(',')))
  let numOfSquares = 0

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const [pointAX, pointAY] = points[i]
      const [pointBX, pointBY] = points[j]

      const midX = (pointAX + pointBX) / 2
      const midY = (pointAY + pointBY) / 2

      const xDistanceFromMid = pointAX - midX
      const yDistanceFromMid = pointAY - midY

      const pointC = [midX + yDistanceFromMid, midY - xDistanceFromMid]
      const pointD = [midX - yDistanceFromMid, midY + xDistanceFromMid]

      if (pointsSet.has(pointC.join(',')) && pointsSet.has(pointD.join(',')))
        numOfSquares++
    }
  }

  return numOfSquares / 2
}
