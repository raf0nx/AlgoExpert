// Solution 1, O(k^n) time complexity, O(n) space complexity, where k is the maxSteps and n is the height
export function staircaseTraversal(height: number, maxSteps: number): number {
  if (height <= 1) return 1

  let numberOfWays = 0

  for (let i = 1; i <= Math.min(maxSteps, height); i++) {
    numberOfWays += staircaseTraversal(height - i, maxSteps)
  }

  return numberOfWays
}
