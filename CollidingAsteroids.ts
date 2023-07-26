// Solution 1, O(n) time complexity, O(n) space complexity
// where n is the number of asteroids
export function collidingAsteroids(asteroids: number[]) {
  const result: number[] = []
  const stack: number[] = []

  for (const asteroid of asteroids) {
    if (asteroid < 0) {
      while (
        stack.length &&
        Math.abs(asteroid) > Math.abs(stack[stack.length - 1])
      ) {
        stack.pop()
      }

      if (!stack.length) {
        result.push(asteroid)
      } else if (Math.abs(asteroid) === Math.abs(stack[stack.length - 1])) {
        stack.pop()
      }
    } else {
      stack.push(asteroid)
    }
  }

  return result.concat(stack)
}

// Solution 2, O(n) time complexity, O(n) space complexity
// where n is the number of asteroids
export function collidingAsteroids2(asteroids: number[]) {
  const stack: number[] = []

  for (const asteroid of asteroids) {
    if (asteroid < 0) {
      while (true) {
        const topOfStack = stack[stack.length - 1]

        if (!stack.length || topOfStack < 0) {
          stack.push(asteroid)
          break
        } else if (Math.abs(asteroid) > Math.abs(topOfStack)) {
          stack.pop()
        } else if (Math.abs(asteroid) === Math.abs(topOfStack)) {
          stack.pop()
          break
        } else break
      }
    } else {
      stack.push(asteroid)
    }
  }

  return stack
}
