// Solution 1, O(n + s * k * m) time complexity, O(s + k) space complexity,
// where n is the length of the big string, s is the number of small strings,
// k is the sum of occurrences of all characters in the big string
// and m is the length of the longest small string
type CharsPositions = Record<string, number[]>

export function multiStringSearch(bigString: string, smallStrings: string[]) {
  const charsPositions: CharsPositions = getCharsPositions(bigString)
  const result = new Array(smallStrings.length).fill(false)

  for (let i = 0; i < smallStrings.length; i++) {
    const firstSmallStringChar = smallStrings[i][0]

    if (!charsPositions[firstSmallStringChar]) continue

    for (const position of charsPositions[firstSmallStringChar]) {
      if (
        bigString.slice(position, position + smallStrings[i].length) ===
        smallStrings[i]
      ) {
        result[i] = true
        break
      }
    }
  }

  return result
}

function getCharsPositions(string: string) {
  const charsPositions: CharsPositions = {}

  for (let i = 0; i < string.length; i++) {
    if (!(string[i] in charsPositions)) charsPositions[string[i]] = []
    charsPositions[string[i]].push(i)
  }

  return charsPositions
}
