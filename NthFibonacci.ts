// Solution 1, O(2^n) time complexity, O(n) space complexity
export const getNthFib = (n: number): number =>
  n === 1 ? 0 : n <= 3 ? 1 : getNthFib(n - 1) + getNthFib(n - 2)

// Solution 2, O(n) time complexity, O(n) space complexity
export const getNthFib2 = (n: number) => {
  const fibNums = [0, 1]

  for (let i = 2; i < n; i++) {
    fibNums.push(fibNums[i - 1] + fibNums[i - 2])
  }

  return fibNums[n - 1]
}

// Solution 3, O(n) time complexity, O(1) space complexity
const cacheLastFibNum = () => {
  let previousLastNum = 0

  return (lastNum: number) => {
    const currentLastNum = previousLastNum + lastNum
    previousLastNum = lastNum

    return currentLastNum
  }
}

export const getNthFib3 = (n: number) => {
  let nthFibonacci = n === 1 ? 0 : 1
  let i = 2

  const getLastFibNum = cacheLastFibNum()

  while (i < n) {
    nthFibonacci = getLastFibNum(nthFibonacci)
    i++
  }

  return nthFibonacci
}
