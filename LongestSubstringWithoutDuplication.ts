// Solution 1, O(n^2) time complexity, O(n^2) space complexity,
// where n is the length of the input string
type StringInfo = { longestSubstring: string[]; seenChars: Set<string> }

export function longestSubstringWithoutDuplication(string: string) {
  const stringInfo: StringInfo = { longestSubstring: [], seenChars: new Set() }

  getLongestUniqueSubstring(string, 0, [], stringInfo)

  return stringInfo.longestSubstring.join('')
}

function getLongestUniqueSubstring(
  string: string,
  i: number,
  currentSubstring: string[],
  stringInfo: StringInfo
) {
  if (i >= string.length) {
    if (currentSubstring.length > stringInfo.longestSubstring.length)
      stringInfo.longestSubstring = currentSubstring
    return
  }

  if (stringInfo.seenChars.has(string[i])) {
    if (currentSubstring.length > stringInfo.longestSubstring.length)
      stringInfo.longestSubstring = currentSubstring

    const currentDuplicatedChar = string[i]

    stringInfo.seenChars.delete(currentDuplicatedChar)
    currentSubstring = []
    i -= 1

    while (string[i] !== currentDuplicatedChar) {
      stringInfo.seenChars.delete(string[i])
      i -= 1
    }
  } else {
    stringInfo.seenChars.add(string[i])
    currentSubstring.push(string[i])
  }

  getLongestUniqueSubstring(string, i + 1, currentSubstring, stringInfo)
}

// Solution 2, O(n) time complexity, O(min(n, a)) space complexity,
// where n is the length of the input string and a is the length of the character alphabet represented in the input string
export function longestSubstringWithoutDuplication2(string: string) {
  const seen = new Set<string>()
  let left = 0
  let right = 0
  let longestSubstringLeftIdx = 0
  let longestSubstringRightIdx = 0

  while (left <= right && right < string.length) {
    while (left < right && seen.has(string[right])) {
      seen.delete(string[left])
      left++
    }

    if (right - left > longestSubstringRightIdx - longestSubstringLeftIdx) {
      longestSubstringLeftIdx = left
      longestSubstringRightIdx = right
    }

    seen.add(string[right])
    right++
  }

  return string.slice(longestSubstringLeftIdx, longestSubstringRightIdx + 1)
}

// Solution 3, O(n) time complexity, O(min(n, a)) space complexity,
// where n is the length of the input string and a is the length of the character alphabet represented in the input string
export function longestSubstringWithoutDuplication3(string: string) {
  const lastPositions: Record<string, number> = {}
  let left = 0
  let right = 0
  let longestSubstringLeftIdx = 0
  let longestSubstringRightIdx = 0

  while (right < string.length) {
    const char = string[right]

    if (char in lastPositions && lastPositions[char] >= left) {
      left = lastPositions[char] + 1
    }

    if (right - left > longestSubstringRightIdx - longestSubstringLeftIdx) {
      longestSubstringLeftIdx = left
      longestSubstringRightIdx = right
    }

    lastPositions[char] = right
    right++
  }

  return string.slice(longestSubstringLeftIdx, longestSubstringRightIdx + 1)
}
