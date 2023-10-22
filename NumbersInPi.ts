// Solution 1, O(n^2 * m) time complexity, O(n + m) space complexity
// where n is the length of the `pi` string and m is the length of the `numbers` array
type NumbersTable = Record<string, boolean>
type ObjWithMinSpaces = { min: number | null }

export function numbersInPi(pi: string, numbers: string[]) {
  const numbersTable: NumbersTable = numbers.reduce(
    (a, b) => ({ ...a, [b]: true }),
    {}
  )
  const objWithMinSpaces: ObjWithMinSpaces = { min: null }

  helper(pi, numbersTable, 0, 0, objWithMinSpaces)

  return objWithMinSpaces.min ?? -1
}

function helper(
  pi: string,
  numbersTable: NumbersTable,
  minNumOfSpaces: number,
  start: number,
  objWithMinSpaces: ObjWithMinSpaces
) {
  if (start >= pi.length) {
    objWithMinSpaces.min = Math.min(
      minNumOfSpaces - 1,
      objWithMinSpaces.min || Infinity
    )
  }

  for (let i = start; i < pi.length; i++) {
    const pfx = pi.substring(start, i + 1)

    if (pfx in numbersTable) {
      helper(pi, numbersTable, minNumOfSpaces + 1, i + 1, objWithMinSpaces)
    }
  }
}
