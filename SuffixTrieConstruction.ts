// Solution 1, time and space complexities inside class methods
interface TrieNode {
  [key: string]: TrieNode | boolean
}

export class SuffixTrie {
  root: TrieNode
  endSymbol: string

  constructor(string: string) {
    this.root = {}
    this.endSymbol = '*'
    this.populateSuffixTrieFrom(string)
  }

  // O(n^2) time complexity, O(n^2) space complexity
  // where n is the length of the input string
  populateSuffixTrieFrom(string: string) {
    let currentNode = this.root

    for (let i = 0; i < string.length; i++) {
      for (let j = i; j < string.length; j++) {
        const currentChar = string[j]

        if (!currentNode[currentChar]) {
          currentNode[currentChar] = {}
        }

        currentNode = currentNode[currentChar] as TrieNode
      }

      currentNode[this.endSymbol] = true
      currentNode = this.root
    }
  }

  // O(m) time complexity, O(1) space complexity
  // where m is the length of the input string
  contains(string: string) {
    let currentNode = this.root

    for (const char of string) {
      if (!currentNode[char]) return false

      currentNode = currentNode[char] as TrieNode
    }

    return this.endSymbol in currentNode
  }
}
