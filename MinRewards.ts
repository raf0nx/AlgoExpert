// Solution 1, O(n^2) time complexity, O(n) space complexity
// where n is the length of the input array
export function minRewards(scores: number[]) {
  const rewards = Array(scores.length).fill(0)
  const visited: Set<number> = new Set()
  let jumpsLeft = scores.length

  while (jumpsLeft) {
    const nextMinNumIdx = findNextMinNumIdx(scores, visited)
    const prevReward = rewards[nextMinNumIdx - 1]
    const nextReward = rewards[nextMinNumIdx + 1]

    if (!prevReward && !nextReward) {
      rewards[nextMinNumIdx] = 1
    } else {
      const currScore = scores[nextMinNumIdx]

      if (
        currScore > scores[nextMinNumIdx - 1] &&
        currScore > scores[nextMinNumIdx + 1]
      ) {
        rewards[nextMinNumIdx] = Math.max(prevReward, nextReward) + 1
      } else {
        rewards[nextMinNumIdx] =
          Math.min(prevReward || Infinity, nextReward || Infinity) + 1
      }
    }

    jumpsLeft--
  }

  return rewards.reduce((a, b) => a + b, 0)
}

function findNextMinNumIdx(array: number[], visited: Set<number>) {
  let minValue = Infinity
  let minValueIdx = 0

  for (let i = 0; i < array.length; i++) {
    if (visited.has(array[i])) continue

    if (array[i] < minValue) {
      minValue = array[i]
      minValueIdx = i
    }
  }

  visited.add(minValue)

  return minValueIdx
}
