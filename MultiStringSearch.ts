// Solution 1, O(n + s * k * m) time complexity, O(s + k) space complexity,
// where n is the length of the big string, s is the number of small strings,
// k is the sum of occurrences of all characters in the big string
// and m is the length of the longest small string
type CharsPositions = Record<string, number[]>

export function multiStringSearch(bigString: string, smallStrings: string[]) {
  const charsPositions: CharsPositions = getCharsPositions(bigString)
  const result = new Array(smallStrings.length).fill(false)

  for (let i = 0; i < smallStrings.length; i++) {
    const firstSmallStringChar = smallStrings[i][0]

    if (!charsPositions[firstSmallStringChar]) continue

    for (const position of charsPositions[firstSmallStringChar]) {
      if (
        bigString.slice(position, position + smallStrings[i].length) ===
        smallStrings[i]
      ) {
        result[i] = true
        break
      }
    }
  }

  return result
}

function getCharsPositions(string: string) {
  const charsPositions: CharsPositions = {}

  for (let i = 0; i < string.length; i++) {
    if (!(string[i] in charsPositions)) charsPositions[string[i]] = []
    charsPositions[string[i]].push(i)
  }

  return charsPositions
}

// Solution 2, O(b^2 + ns) time complexity, O(b^2 + n) space complexity,
// where b is the length of the big string, n is the number of small strings
// and s is the length of the longest small string
export function multiStringSearch2(bigString: string, smallStrings: string[]) {
  const modifiedSuffixTrie = new ModifiedSuffixTrie(bigString)

  return smallStrings.map(string => modifiedSuffixTrie.checkIfContains(string))
}

interface TrieNode {
  [key: string]: TrieNode
}

class ModifiedSuffixTrie {
  root: TrieNode

  constructor(string: string) {
    this.root = {}
    this.buildModifiedSuffixTrie(string)
  }

  buildModifiedSuffixTrie(string: string) {
    for (let i = 0; i < string.length; i++) {
      let currentNode = this.root

      for (let j = i; j < string.length; j++) {
        if (!currentNode[string[j]]) currentNode[string[j]] = {}
        currentNode = currentNode[string[j]]
      }
    }
  }

  checkIfContains(string: string) {
    let currentNode = this.root

    for (const char of string) {
      if (!(char in currentNode)) return false
      currentNode = currentNode[char]
    }

    return true
  }
}

// Solution 3, O(ns + bs) time complexity, O(ns) space complexity,
// where b is the length of the big string, n is the number of small strings
// and s is the length of the longest small string
export function multiStringSearch3(bigString: string, smallStrings: string[]) {
  const { root, endSymbol } = new Trie(smallStrings)
  const containedStrings: Record<string, boolean> = {}

  for (let i = 0; i < bigString.length; i++) {
    if (!(bigString[i] in root)) continue

    let currentNode = root
    let currIdx = i

    while (bigString[currIdx] in currentNode) {
      currentNode = currentNode[bigString[currIdx]] as TrieNode2
      currIdx++

      if (endSymbol in currentNode) {
        containedStrings[currentNode[endSymbol] as string] = true
      }
    }
  }

  return smallStrings.map(string => string in containedStrings)
}

interface TrieNode2 {
  [key: string]: TrieNode2 | string
}

class Trie {
  root: TrieNode2
  endSymbol: string

  constructor(strings: string[]) {
    this.root = {}
    this.endSymbol = '*'
    this.buildTrie(strings)
  }

  buildTrie(strings: string[]) {
    for (const string of strings) {
      let currentNode = this.root

      for (const char of string) {
        if (!(char in currentNode)) currentNode[char] = {}
        currentNode = currentNode[char] as TrieNode2
      }

      currentNode[this.endSymbol] = string
    }
  }
}
