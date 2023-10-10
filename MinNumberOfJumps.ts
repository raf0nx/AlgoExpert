// Solution 1, O(n) time complexity, O(1) space complexity,
// where n is the length of the input array
export function minNumberOfJumps(array: number[]) {
  let numOfJumps = 0
  let i = 0

  while (i < array.length - 1) {
    const currentMaxJump = array[i]

    if (array.length - 1 - i <= currentMaxJump) {
      numOfJumps++
      break
    }

    let nextJumpIdx = i + 1

    for (let j = i + 2; j <= i + currentMaxJump; j++) {
      if (j + array[j] < nextJumpIdx + array[nextJumpIdx]) continue

      nextJumpIdx = j
    }

    i = nextJumpIdx
    numOfJumps++
  }

  return numOfJumps
}

// Solution 2, O(n^2) time complexity, O(n) space complexity,
// where n is the length of the input array
export function minNumberOfJumps2(array: number[]) {
  const jumps: number[] = new Array(array.length).fill(Infinity)
  jumps[0] = 0

  for (let i = 1; i < array.length; i++) {
    for (let j = 0; j < i; j++) {
      if (array[j] + j >= i) {
        jumps[i] = Math.min(jumps[i], jumps[j] + 1)
      }
    }
  }

  return jumps[jumps.length - 1]
}

// Solution 3, O(n) time complexity, O(1) space complexity,
// where n is the length of the input array
export function minNumberOfJumps3(array: number[]) {
  let maxReach = array[0]
  let steps = array[0]
  let jumps = 0

  for (let i = 1; i < array.length; i++) {
    if (i === array.length - 1) return jumps + 1

    maxReach = Math.max(maxReach, array[i] + i)
    steps--

    if (steps === 0) {
      steps = maxReach - i
      jumps++
    }
  }

  return jumps
}
