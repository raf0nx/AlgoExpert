// Solution 1, O(n * m) time complexity, O(n) space complexity,
// where n is the length of the main string and m is the length of the substring
export function underscorifySubstring(string: string, substring: string) {
  const locations: [number, number][] = []

  for (let i = 0; i < string.length; i++) {
    if (string.slice(i, i + substring.length) === substring) {
      locations.push([i, i + substring.length])
    }
  }

  const mergedLocations: [number, number][] = []

  for (let i = 0; i < locations.length; i++) {
    const latestLocation = mergedLocations[mergedLocations.length - 1]

    if (!mergedLocations.length) mergedLocations.push(locations[i])
    else if (locations[i][0] <= latestLocation[1]) {
      const [latestStart] = mergedLocations.pop()!
      mergedLocations.push([latestStart, locations[i][1]])
    } else mergedLocations.push(locations[i])
  }

  const result: string[] = []
  const locationsForUnderscore = new Set(mergedLocations.flat())
  let betweenUnderscores = false

  for (let i = 0; i < string.length; i++) {
    if (locationsForUnderscore.has(i)) {
      result.push('_')
      result.push(string[i])
      betweenUnderscores = !betweenUnderscores
    } else result.push(string[i])
  }

  if (betweenUnderscores) result.push('_')

  return result.join('')
}

// Solution 2, Avg: O(n + m) time complexity, O(n) space complexity,
// where n is the length of the main string and m is the length of the substring
type UnderscoreLocations = [number, number][]

export function underscorifySubstring2(string: string, substring: string) {
  const underscoreLocations = mergeUnderscoreLocations(
    getUnderscoreLocations(string, substring)
  )
  const result: string[] = []
  let betweenUnderscores = false
  let currUnderscoreLocationIdx = 0

  for (let i = 0; i < string.length; i++) {
    const currUnderscoreLocation =
      underscoreLocations[currUnderscoreLocationIdx]

    if (i === currUnderscoreLocation?.[betweenUnderscores ? 1 : 0]) {
      result.push('_')
      betweenUnderscores = !betweenUnderscores
      if (!betweenUnderscores) currUnderscoreLocationIdx++
    }

    result.push(string[i])
  }

  if (betweenUnderscores) result.push('_')

  return result.join('')
}

function getUnderscoreLocations(string: string, substring: string) {
  const locations: UnderscoreLocations = []
  let startIdx = 0

  while (startIdx < string.length) {
    const nextSubstrOccurence = string.indexOf(substring, startIdx)

    if (nextSubstrOccurence !== -1) {
      locations.push([
        nextSubstrOccurence,
        nextSubstrOccurence + substring.length,
      ])
      startIdx = nextSubstrOccurence + 1
    } else {
      break
    }
  }

  return locations
}

function mergeUnderscoreLocations(locations: UnderscoreLocations) {
  const mergedLocations: [number, number][] = []

  for (let i = 0; i < locations.length; i++) {
    const latestLocation = mergedLocations[mergedLocations.length - 1]

    if (!mergedLocations.length) mergedLocations.push(locations[i])
    else if (locations[i][0] <= latestLocation[1]) {
      mergedLocations[mergedLocations.length - 1][1] = locations[i][1]
    } else mergedLocations.push(locations[i])
  }

  return mergedLocations
}
