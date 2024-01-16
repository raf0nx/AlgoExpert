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
