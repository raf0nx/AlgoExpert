// Solution 1, O(2^(n + m)) time complexity, O(n + m) space complexity
// where n is the length of the first string and m is the length of the second string
export function interweavingStrings(
  one: string,
  two: string,
  three: string,
  i = 0,
  j = 0,
  k = 0
): boolean {
  if (one.length + two.length !== three.length) return false

  if (k === three.length) return true

  if (i < one.length && one[i] === three[k]) {
    if (interweavingStrings(one, two, three, i + 1, j, k + 1)) return true
  }

  if (j < two.length && two[j] === three[k]) {
    return interweavingStrings(one, two, three, i, j + 1, k + 1)
  }

  return false
}
