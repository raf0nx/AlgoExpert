type Dependency = [number, number]

// Solution 1, O(j^2 * d) time complexity, O(1) space complexity,
// where j is the number of jobs and d is the number of dependencies
export function topologicalSort(jobs: number[], deps: Dependency[]) {
  let hasSorted = true
  let sortsLeft = jobs.length

  while (hasSorted) {
    if (!sortsLeft) return []

    hasSorted = false

    for (const [firstJob, secondJob] of deps) {
      const firstJobIdx = jobs.indexOf(firstJob)
      const secondJobIdx = jobs.indexOf(secondJob)

      if (firstJobIdx > secondJobIdx) {
        ;[jobs[firstJobIdx], jobs[secondJobIdx]] = [
          jobs[secondJobIdx],
          jobs[firstJobIdx],
        ]
        hasSorted = true
      }
    }

    sortsLeft -= 1
  }

  return jobs
}

// Solution 2, O(j * d) time complexity, O(j) space complexity,
// where j is the number of jobs and d is the number of dependencies
type JobsIdxsMap = Record<number, number>

export function topologicalSort2(jobs: number[], deps: Dependency[]) {
  const jobsIdxsMap: JobsIdxsMap = jobs.reduce(
    (map, job, i) => ({ ...map, [job]: i }),
    {}
  )
  let hasSorted = true
  let sortsLeft = jobs.length

  while (hasSorted) {
    if (!sortsLeft) return []

    hasSorted = false

    for (const [firstJob, secondJob] of deps) {
      const firstJobIdx = jobsIdxsMap[firstJob]
      const secondJobIdx = jobsIdxsMap[secondJob]

      if (firstJobIdx > secondJobIdx) {
        const temp = jobsIdxsMap[firstJob]
        jobsIdxsMap[firstJob] = jobsIdxsMap[secondJob]
        jobsIdxsMap[secondJob] = temp
        hasSorted = true
      }
    }

    sortsLeft -= 1
  }

  return createSortedJobsArray(jobsIdxsMap)
}

function createSortedJobsArray(jobsIdxsMap: JobsIdxsMap) {
  const sortedJobs = new Array(Object.keys(jobsIdxsMap).length)

  for (const [value, idx] of Object.entries(jobsIdxsMap)) {
    sortedJobs[idx] = +value
  }

  return sortedJobs
}
