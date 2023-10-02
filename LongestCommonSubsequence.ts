// Solution 1, O(n * m * min(n, m)) time complexity, O(n * m * min(n, m)) space complexity
// where n and m are the lengths of the two input strings
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

// Solution 2, O(n * m * min(n, m)) time complexity, O(min(n, m)^2) space complexity
// where n and m are the lengths of the two input strings
export function longestCommonSubsequence2(str1: string, str2: string) {
  const small = str1.length < str2.length ? str1 : str2
  const big = str1.length >= str2.length ? str1 : str2

  let oddRow = new Array(small.length + 1).fill('')
  let evenRow = new Array(small.length + 1).fill('')

  for (let i = 1; i < big.length + 1; i++) {
    let currRow: string[], prevRow: string[]

    if (i % 2) {
      currRow = oddRow
      prevRow = evenRow
    } else {
      currRow = evenRow
      prevRow = oddRow
    }

    for (let j = 1; j < small.length + 1; j++) {
      if (big[i - 1] === small[j - 1]) {
        currRow[j] = prevRow[j - 1] + big[i - 1]
      } else {
        currRow[j] =
          prevRow[j].length > currRow[j - 1].length
            ? prevRow[j]
            : currRow[j - 1]
      }
    }
  }

  return big.length % 2 === 0
    ? evenRow[small.length].split('')
    : oddRow[small.length].split('')
}
