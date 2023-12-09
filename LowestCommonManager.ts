class OrgChart {
  name: string
  directReports: OrgChart[]

  constructor(name: string) {
    this.name = name
    this.directReports = []
  }
}

// Solution 1, O(n) time complexity, O(n) space complexity,
// where n is the number of people in the org
export function getLowestCommonManager(
  topManager: OrgChart,
  reportOne: OrgChart,
  reportTwo: OrgChart
): OrgChart {
  const queue: OrgChart[] = [topManager]
  const directManagers: Record<string, OrgChart> = {}

  while (queue.length) {
    const currentManager = queue.shift()!

    for (const report of currentManager.directReports) {
      queue.push(report)
      directManagers[report.name] = currentManager
    }
  }

  const visitedManagers: Record<string, boolean> = {}
  let currentR1Node = reportOne
  let currentR2Node = reportTwo

  while (true) {
    if (visitedManagers[currentR1Node.name] && currentR1Node !== topManager)
      break

    if (visitedManagers[currentR2Node.name] && currentR2Node !== topManager)
      break

    if (currentR1Node.name === currentR2Node.name) break

    visitedManagers[currentR1Node.name] = true
    visitedManagers[currentR2Node.name] = true

    if (directManagers[currentR1Node.name])
      currentR1Node = directManagers[currentR1Node.name]
    if (directManagers[currentR2Node.name])
      currentR2Node = directManagers[currentR2Node.name]
  }

  return visitedManagers[currentR1Node.name] ? currentR1Node : currentR2Node
}

// Solution 2, O(n) time complexity, O(d) space complexity,
// where n is the number of people in the org and d is the depth of the org chart
export function getLowestCommonManager2(
  topManager: OrgChart,
  reportOne: OrgChart,
  reportTwo: OrgChart
) {
  return getLowestCommonManagerHelper(topManager, reportOne, reportTwo)[1]
}

function getLowestCommonManagerHelper(
  manager: OrgChart,
  reportOne: OrgChart,
  reportTwo: OrgChart
): [number, OrgChart | null] {
  let numImportantReports = 0

  for (const report of manager.directReports) {
    const [importantReportsInSubtree, lowestCommonManager] =
      getLowestCommonManagerHelper(report, reportOne, reportTwo)

    if (lowestCommonManager)
      return [importantReportsInSubtree, lowestCommonManager]

    numImportantReports += importantReportsInSubtree
  }

  if (manager === reportOne || manager === reportTwo) numImportantReports += 1

  return [numImportantReports, numImportantReports === 2 ? manager : null]
}
