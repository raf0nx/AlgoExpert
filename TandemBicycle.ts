// Solution 1, O(n * log(n)) time complexity, O(1) space complexity
export function tandemBicycle(
  redShirtSpeeds: number[],
  blueShirtSpeeds: number[],
  fastest: boolean
) {
  redShirtSpeeds.sort((a, b) => a - b)
  blueShirtSpeeds.sort((a, b) => (fastest ? b - a : a - b))

  let speedSum = 0

  for (let i = 0; i < redShirtSpeeds.length; i++) {
    speedSum += Math.max(redShirtSpeeds[i], blueShirtSpeeds[i])
  }

  return speedSum
}
