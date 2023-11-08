// Solution 1, O(w * n * m * 8^s + w * s) time complexity, O(w * s) space complexity,
// where n is the width of the board, m is the height of the board, w is the number of words and
// s is the length of the longest word
export function boggleBoard(board: string[][], words: string[]): string[] {
  const result = new Set<string>()

  for (const word of words) {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
        if (result.has(word) || board[i][j] !== word[0]) continue

        if (dfs(board, word, 0, [i, j])) result.add(word)
      }
    }
  }

  return Array.from(result)
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

// ----------------------------------------------------------------
// Solution 2, O(n * m * 8^s + w * s) time complexity, O(w * s) space complexity,
// where n is the width of the board, m is the height of the board, w is the number of words and
// s is the length of the longest word
interface TrieNode {
  [key: string]: TrieNode | string
}

class Trie {
  root: TrieNode
  endSymbol: string

  constructor() {
    this.root = {}
    this.endSymbol = '*'
  }

  add(word: string) {
    let current = this.root

    for (const letter of word) {
      if (!(letter in current)) current[letter] = {}

      current = current[letter] as TrieNode
    }

    current[this.endSymbol] = word
  }
}

export function boggleBoard2(board: string[][], words: string[]): string[] {
  const result = new Set<string>()
  const trie = new Trie()

  for (const word of words) {
    trie.add(word)
  }

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      dfs2(board, [i, j], result, trie.root)
    }
  }

  return Array.from(result)
}

function dfs2(
  board: string[][],
  currPos: [number, number],
  result: Set<string>,
  trieNode: TrieNode
) {
  const [row, col] = currPos
  const currentChar = board[row][col]

  if (!(currentChar in trieNode) || currentChar === '*') return

  const nextTrieNode = trieNode[currentChar] as TrieNode

  if ('*' in nextTrieNode) result.add(nextTrieNode['*'] as string)

  board[row][col] = '*'

  for (const [nextRow, nextCol] of getNextPositions(board, row, col)) {
    dfs2(board, [nextRow, nextCol], result, nextTrieNode)
  }

  board[row][col] = currentChar
}
