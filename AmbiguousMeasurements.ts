// Solution 1, O(low * high * n) time complexity, O(low * high) space complexity,
// where n is the number of measuring cups
export function ambiguousMeasurements(
  measuringCups: number[][],
  low: number,
  high: number
) {
  return canMeasureInRange(measuringCups, 0, 0, low, high, {})
}

function canMeasureInRange(
  measuringCups: number[][],
  curLow: number,
  curHigh: number,
  low: number,
  high: number,
  cache: Record<string, boolean>
) {
  if (`${curLow}-${curHigh}` in cache) return cache[`${curLow},${curHigh}`]

  if (curHigh > high) return false

  if (curLow >= low && curHigh <= high) return true

  for (const [cupLow, cupHigh] of measuringCups) {
    if (
      canMeasureInRange(
        measuringCups,
        curLow + cupLow,
        curHigh + cupHigh,
        low,
        high,
        cache
      )
    )
      return true
  }

  cache[`${curLow}-${curHigh}`] = false

  return false
}
