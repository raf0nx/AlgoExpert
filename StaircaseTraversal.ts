// Solution 1, O(k * n) time complexity, O(n) space complexity, where k is the maxSteps and n is the height
type StaircaseTraversalMemo = { [height: number]: number }

export function staircaseTraversal(
  height: number,
  maxSteps: number,
  memo: StaircaseTraversalMemo = { 0: 1, 1: 1 }
): number {
  if (height in memo) return memo[height]

  let numberOfWays = 0

  for (let i = 1; i <= Math.min(maxSteps, height); i++) {
    numberOfWays += staircaseTraversal(height - i, maxSteps)
  }

  memo[height] = numberOfWays

  return numberOfWays
}
