// Solution 1, O(2^n) time complexity, O(n) space complexity
export const getNthFib = (n: number): number =>
  n === 1 ? 0 : n <= 3 ? 1 : getNthFib(n - 1) + getNthFib(n - 2)
