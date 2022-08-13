// Solution 1, O(n * log(n)) time complexity, O(n) space complexity
function getAllQueriesWaitingTime(queries: number[]) {
  return queries.reduce<number[]>(
    (acc, _, i, arr) => acc.concat(!i ? 0 : arr[i - 1] + acc[i - 1]),
    []
  )
}

export function minimumWaitingTime(queries: number[]) {
  const sortedQueries = [...queries].sort((a, b) => a - b)
  const allQueriesWaitingTime = getAllQueriesWaitingTime(sortedQueries)

  return allQueriesWaitingTime.reduce((a, b) => a + b)
}

// Solution 2, O(n * log(n)) time complexity, O(1) space complexity
export function minimumWaitingTime2(queries: number[]) {
  queries.sort((a, b) => a - b)

  let totalMinWaitTime = 0
  let queriesLeft: number

  for (let i = 0; i < queries.length; i++) {
    queriesLeft = queries.length - 1 - i
    totalMinWaitTime += queries[i] * queriesLeft
  }

  return totalMinWaitTime
}
