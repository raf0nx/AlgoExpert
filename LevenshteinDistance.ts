// Solution 1, O(n * m) time complexity, O(n * m) space complexity where n is the length of the first string and m is the length of the second string
export function levenshteinDistance(str1: string, str2: string) {
  const minNumsOfEdits: number[][] = []

  for (let i = 0; i < str2.length + 1; i++) {
    const row: number[] = []

    for (let j = 0; j < str1.length + 1; j++) {
      row.push(j)
    }

    row[0] = i
    minNumsOfEdits.push(row)
  }

  for (let col = 1; col < str2.length + 1; col++) {
    for (let row = 1; row < str1.length + 1; row++) {
      if (str2[col - 1] === str1[row - 1]) {
        minNumsOfEdits[col][row] = minNumsOfEdits[col - 1][row - 1]
        continue
      }

      minNumsOfEdits[col][row] =
        1 +
        Math.min(
          minNumsOfEdits[col - 1][row],
          minNumsOfEdits[col][row - 1],
          minNumsOfEdits[col - 1][row - 1]
        )
    }
  }

  return minNumsOfEdits[str2.length][str1.length]
}
