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

// Solution 2, O(low * high * n) time complexity, O(low * high) space complexity,
// where n is the number of measuring cups
export function ambiguousMeasurements2(
  measuringCups: number[][],
  low: number,
  high: number
) {
  return canMeasureInRange2(measuringCups, low, high, {})
}

function canMeasureInRange2(
  measuringCups: number[][],
  low: number,
  high: number,
  cache: Record<string, boolean>
): boolean {
  if (`${low}-${high}` in cache) return cache[`${low}-${high}`]

  if (low <= 0 && high <= 0) return false

  let canMeasure = false

  for (const [cupLow, cupHigh] of measuringCups) {
    if (low <= cupLow && cupHigh <= high) {
      canMeasure = true
      break
    }

    const newLow = Math.max(0, low - cupLow)
    const newHigh = Math.max(0, high - cupHigh)
    canMeasure = canMeasureInRange2(measuringCups, newLow, newHigh, cache)

    if (canMeasure) break
  }

  cache[`${low}-${high}`] = canMeasure

  return canMeasure
}
