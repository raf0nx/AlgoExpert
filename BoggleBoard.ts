// Solution 1, O(w * n * m * 8^s) time complexity, O(w * s) space complexity,
// where n is the width of the board, m is the height of the board, w is the number of words and
// s is the length of the longest word
export function boggleBoard(board: string[][], words: string[]): string[] {
  const result: string[] = []
  let wordFound = false

  for (const word of words) {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
        if (board[i][j] !== word[0]) continue

        if (dfs(board, word, 0, [i, j])) {
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
  currPos: [number, number]
): boolean {
  const [row, col] = currPos

  if (word[currCharPos] !== board[row][col]) return false

  if (currCharPos === word.length - 1) return true

  const temp = board[row][col]
  board[row][col] = '*'

  let charFound = false

  for (const [nextRow, nextCol] of getNextPositions(board, row, col)) {
    charFound ||= dfs(board, word, currCharPos + 1, [nextRow, nextCol])
  }

  board[row][col] = temp

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
