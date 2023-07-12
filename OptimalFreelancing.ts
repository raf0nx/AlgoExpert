// Solution 1, O(n * log(n)) time complexity, O(1) space complexity
// where n is the number of jobs
const LENGTH_OF_WEEK = 7

export function optimalFreelancing(jobs: Record<string, number>[]) {
  jobs.sort((a, b) => b.payment - a.payment)

  const daysProfit = Array(LENGTH_OF_WEEK).fill(0)

  for (const { deadline, payment } of jobs) {
    let workdayIdx = Math.min(LENGTH_OF_WEEK, deadline) - 1

    while (workdayIdx >= 0 && daysProfit[workdayIdx]) {
      workdayIdx -= 1
    }

    if (workdayIdx >= 0) daysProfit[workdayIdx] = payment
  }

  return daysProfit.reduce((a, b) => a + b, 0)
}
