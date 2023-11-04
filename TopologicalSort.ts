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
