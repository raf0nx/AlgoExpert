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
