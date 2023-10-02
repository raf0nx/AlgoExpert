// Solution 1, O(n * m * min(n, m)) time complexity, O(n * m * min(n, m)) space complexity
// where n and m are the length of the two input strings
export function longestCommonSubsequence(str1: string, str2: string) {
  const lcs: string[][] = Array.from({ length: str2.length + 1 }, () =>
    new Array(str1.length + 1).fill('')
  )

  for (let i = 0; i < str2.length; i++) {
    for (let j = 0; j < str1.length; j++) {
      if (str2[i] === str1[j]) {
        lcs[i + 1][j + 1] = lcs[i][j] + str2[i]
      } else {
        lcs[i + 1][j + 1] =
          lcs[i][j + 1].length > lcs[i + 1][j].length
            ? lcs[i][j + 1]
            : lcs[i + 1][j]
      }
    }
  }

  return lcs[str2.length][str1.length].split('')
}
