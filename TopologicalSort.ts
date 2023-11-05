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

// Solution 3, O(j + d) time complexity, O(j + d) space complexity,
// where j is the number of jobs and d is the number of dependencies
export function topologicalSort3(jobs: number[], deps: Dependency[]) {
  const jobGraph = createJobGraph(jobs, deps)
  return getOrderedJobs(jobGraph)
}

function createJobGraph(jobs: number[], deps: Dependency[]) {
  const jobGraph = new JobGraph(jobs)

  for (const [prereq, job] of deps) {
    jobGraph.addPrereq(job, prereq)
  }

  return jobGraph
}

function getOrderedJobs(jobGraph: JobGraph) {
  const orderedJobs: number[] = []
  const { nodes } = jobGraph

  while (nodes.length) {
    const node = nodes.pop()!
    const containsCycle = dfs(node, orderedJobs)

    if (containsCycle) return []
  }

  return orderedJobs
}

function dfs(currentNode: JobNode, orderedJobs: number[]): boolean | void {
  if (currentNode.visited) return false
  if (currentNode.visiting) return true

  currentNode.visiting = true

  for (const prereqNode of currentNode.prereqs) {
    const containsCycle = dfs(prereqNode, orderedJobs)

    if (containsCycle) return true
  }

  orderedJobs.push(currentNode.job)
  currentNode.visited = true
  currentNode.visiting = false

  return false
}

class JobGraph {
  nodes: JobNode[]
  graph: Record<number, JobNode>

  constructor(jobs: number[]) {
    this.nodes = []
    this.graph = {}

    for (const job of jobs) {
      this.addNode(job)
    }
  }

  addNode(job: number) {
    this.graph[job] = new JobNode(job)
    this.nodes.push(this.graph[job])
  }

  addPrereq(job: number, prereq: number) {
    const jobNode = this.getNode(job)
    const prereqNode = this.getNode(prereq)

    jobNode.prereqs.push(prereqNode)
  }

  getNode(job: number) {
    if (!(job in this.graph)) this.addNode(job)

    return this.graph[job]
  }
}

class JobNode {
  job: number
  prereqs: JobNode[]
  visited: boolean
  visiting: boolean

  constructor(job: number) {
    this.job = job
    this.prereqs = []
    this.visited = false
    this.visiting = false
  }
}

// Solution 4, O(j + d) time complexity, O(j + d) space complexity,
// where j is the number of jobs and d is the number of dependencies
export function topologicalSort4(jobs: number[], deps: Dependency[]) {
  const jobGraph = createJobGraph4(jobs, deps)
  return getOrderedJobs4(jobGraph)
}

function createJobGraph4(jobs: number[], deps: Dependency[]) {
  const jobGraph = new JobGraph4(jobs)

  for (const [job, dep] of deps) {
    jobGraph.addDep(job, dep)
  }

  return jobGraph
}

function getOrderedJobs4(jobGraph: JobGraph4) {
  const orderedJobs: number[] = []
  const noPrereqs = jobGraph.nodes.filter(node => !node.numOfPrereqs)

  while (noPrereqs.length) {
    const node = noPrereqs.pop()!

    orderedJobs.push(node.job)
    removeDeps(node, noPrereqs)
  }

  return jobGraph.nodes.some(node => node.numOfPrereqs) ? [] : orderedJobs
}

function removeDeps(node: JobNode4, noPrereqs: JobNode4[]) {
  while (node.deps.length) {
    const dep = node.deps.pop()!

    dep.numOfPrereqs -= 1

    if (!dep.numOfPrereqs) noPrereqs.push(dep)
  }
}

class JobGraph4 {
  nodes: JobNode4[]
  graph: Record<number, JobNode4>

  constructor(jobs: number[]) {
    this.nodes = []
    this.graph = {}

    for (const job of jobs) {
      this.addNode(job)
    }
  }

  addNode(job: number) {
    this.graph[job] = new JobNode4(job)
    this.nodes.push(this.graph[job])
  }

  addDep(job: number, dep: number) {
    const jobNode = this.getNode(job)
    const depNode = this.getNode(dep)

    jobNode.deps.push(depNode)
    depNode.numOfPrereqs += 1
  }

  getNode(job: number) {
    if (!(job in this.graph)) this.addNode(job)

    return this.graph[job]
  }
}

class JobNode4 {
  job: number
  deps: JobNode4[]
  numOfPrereqs: number

  constructor(job: number) {
    this.job = job
    this.deps = []
    this.numOfPrereqs = 0
  }
}