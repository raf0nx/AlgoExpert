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
    else if (locations[i][0] - latestLocation[1] <= 0) {
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
