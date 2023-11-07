// Solution 1, O(w * n * m * 8^s) time complexity, O(n * m + w * s) space complexity,
// where n is the width of the board, m is the height of the board, w is the number of words and
// s is the length of the longest word
export function boggleBoard(board: string[][], words: string[]): string[] {
  const result: string[] = []
  const visited = new Set<string>()
  let wordFound = false

  for (const word of words) {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
        if (board[i][j] !== word[0]) continue

        const isInBoggleBoard = dfs(board, word, 0, [i, j], visited)

        visited.clear()

        if (isInBoggleBoard) {
          result.push(word)
          wordFound = true
          break
        }
      }

      if (wordFound) {
        wordFound = false
        break
      }
    }
  }

  return result
}

function dfs(
  board: string[][],
  word: string,
  currCharPos: number,
  currPos: [number, number],
  visited: Set<string>
): boolean {
  if (currCharPos === word.length) return true

  const [row, col] = currPos
  const isVisited = visited.has(`${row},${col}`)

  if (isVisited || word[currCharPos] !== board[row][col]) return false

  let charFound = false
  visited.add(`${row},${col}`)

  for (const [nextRow, nextCol] of getNextPositions(board, row, col)) {
    charFound =
      charFound ||
      dfs(board, word, currCharPos + 1, [nextRow, nextCol], visited)
  }

  return charFound
}

function getNextPositions(board: string[][], row: number, col: number) {
  const directions = [
    [row - 1, col],
    [row - 1, col + 1],
    [row, col + 1],
    [row + 1, col + 1],
    [row + 1, col],
    [row + 1, col - 1],
    [row, col - 1],
    [row - 1, col - 1],
  ]

  return directions.filter(
    ([nextRow, nextCol]) => !isOutOfBounds(board, nextRow, nextCol)
  )
}

function isOutOfBounds(board: string[][], row: number, col: number) {
  return row < 0 || row >= board.length || col < 0 || col >= board[0].length
}
