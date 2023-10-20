// Solution 1, O(n^2) time complexity, O(n) space complexity
// where n is the number of disks
type Disk = [number, number, number]
type PrevDiskIndex = number | null

export function diskStacking(disks: Disk[]) {
  disks.sort(([widthA], [widthB]) => widthA - widthB)

  const heights = disks.map(disk => disk[2])
  const indexes: PrevDiskIndex[] = new Array(disks.length).fill(null)
  let maxHeightIdx = 0

  for (let i = 1; i < disks.length; i++) {
    const [width, depth, height] = disks[i]

    for (let j = 0; j < i; j++) {
      const [currWidth, currDepth, currHeight] = disks[j]

      if (currWidth >= width || currDepth >= depth || currHeight >= height)
        continue

      if (height + heights[j] > heights[i]) {
        heights[i] = height + heights[j]
        indexes[i] = j
      }
    }

    if (heights[i] > heights[maxHeightIdx]) maxHeightIdx = i
  }

  return buildDiskStack(disks, indexes, maxHeightIdx)
}

function buildDiskStack(
  disks: Disk[],
  indexes: PrevDiskIndex[],
  maxHeightIdx: number
) {
  const diskStack: Disk[] = []
  let i: PrevDiskIndex = maxHeightIdx

  while (i !== null) {
    diskStack.push(disks[i])
    i = indexes[i]
  }

  return diskStack.reverse()
}
