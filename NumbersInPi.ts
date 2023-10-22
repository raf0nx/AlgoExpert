type NumbersTable = Record<string, boolean>

// Solution 1, O(n^2 * m) time complexity, O(n + m) space complexity
// where n is the length of the `pi` string and m is the length of the `numbers` array
type ObjWithMinSpaces = { min: number | null }

export function numbersInPi(pi: string, numbers: string[]) {
  const numbersTable: NumbersTable = numbers.reduce(
    (a, b) => ({ ...a, [b]: true }),
    {}
  )
  const objWithMinSpaces: ObjWithMinSpaces = { min: null }

  getMinSpaces(pi, numbersTable, 0, 0, objWithMinSpaces)

  return objWithMinSpaces.min ?? -1
}

function getMinSpaces(
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
      getMinSpaces(pi, numbersTable, minNumOfSpaces + 1, i + 1, objWithMinSpaces)
    }
  }
}

// Solution 2, O(n^3 + m) time complexity, O(n + m) space complexity
// where n is the length of the `pi` string and m is the length of the `numbers` array
type Cache = Record<string, number>

export function numbersInPi2(pi: string, numbers: string[]) {
  const numbersTable: NumbersTable = numbers.reduce(
    (a, b) => ({ ...a, [b]: true }),
    {}
  )
  const cache: Cache = {}

  const minSpaces = getMinSpaces2(pi, numbersTable, 0, cache)

  return minSpaces === Infinity ? -1 : minSpaces
}

function getMinSpaces2(
  pi: string,
  numbersTable: NumbersTable,
  idx: number,
  cache: Cache
) {
  if (cache[idx]) return cache[idx]
  if (idx >= pi.length) return -1

  for (let i = idx; i < pi.length; i++) {
    const pfx = pi.substring(idx, i + 1)

    if (pfx in numbersTable) {
      cache[idx] = Math.min(
        getMinSpaces2(pi, numbersTable, i + 1, cache) + 1,
        cache[idx] || Infinity
      )
    }
  }

  return cache[idx] ?? Infinity
}
