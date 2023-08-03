// Solution 1, O(n^2) time complexity, O(1) space complexity
// where n is the length of the dishes array
export function sweetAndSavory(dishes: number[], target: number) {
  let res: [number, number] = [0, 0]
  let bestFlavorTargetDiff = Infinity
  let i = 0

  while (i < dishes.length) {
    if (dishes[i] > 0) {
      i++
      continue
    }

    let j = 0
    while (j < dishes.length) {
      if (dishes[j] < 0) {
        j++
        continue
      }

      const currentFlavorSum = dishes[i] + dishes[j]
      const currentFlavorTargetDiff = target - currentFlavorSum

      if (
        currentFlavorTargetDiff < bestFlavorTargetDiff &&
        currentFlavorSum <= target
      ) {
        bestFlavorTargetDiff = currentFlavorTargetDiff
        res = [dishes[i], dishes[j]]
      }

      j++
    }

    i++
    j = 0
  }

  return res
}

// Solution 2, O(n * log(n)) time complexity, O(1) space complexity
// where n is the length of the dishes array
export function sweetAndSavory2(dishes: number[], target: number) {
  dishes.sort((a, b) => a - b)

  let res: [number, number] = [0, 0]
  let bestFlavorTargetDiff = Infinity
  let left = 0
  let right = dishes.length - 1

  while (dishes[left] < 0 && dishes[right] > 0) {
    const currentFlavorSum = dishes[left] + dishes[right]
    const currentFlavorTargetDiff = target - currentFlavorSum

    if (
      currentFlavorTargetDiff < bestFlavorTargetDiff &&
      currentFlavorSum <= target
    ) {
      bestFlavorTargetDiff = currentFlavorTargetDiff
      res = [dishes[left], dishes[right]]
    }

    if (currentFlavorSum < target) {
      left++
    } else {
      right--
    }
  }

  return res
}
