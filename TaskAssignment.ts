// Solution 1, O(n * log(n)) time complexity, O(n) space complexity where n is the number of tasks
export function taskAssignment(k: number, tasks: number[]) {
  const sortedTasksIdxs = tasks
    .map((_, i) => i)
    .sort((a, b) => tasks[a] - tasks[b])

  const assignedTasks: number[][] = []

  for (let i = 0; i < k; i++) {
    assignedTasks.push([
      sortedTasksIdxs[i],
      sortedTasksIdxs[sortedTasksIdxs.length - 1 - i],
    ])
  }

  return assignedTasks
}
