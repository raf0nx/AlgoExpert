// Solution 1, O(n * m) time complexity, O(n * m) space complexity,
// where n is the number of strings and m is the length of the longest string
export function shortestUniquePrefixes(strings: string[]) {
  const trie = buildTrie(strings)
  let result: string[] = []

  for (const string of strings) {
    let currentNode = trie
    let uniquePrefixLength = 1

    for (const char of string) {
      currentNode = currentNode[char]

      if (currentNode.count === 1) break

      uniquePrefixLength++
    }

    result.push(string.slice(0, uniquePrefixLength))
  }

  return result
}

function buildTrie(strings: string[]) {
  const trie: Record<string, any> = {}

  for (const string of strings) {
    let currentNode = trie

    for (const char of string) {
      if (!(char in currentNode)) currentNode[char] = {}
      currentNode = currentNode[char]
      currentNode.count = (currentNode.count || 0) + 1
    }
  }

  return trie
}
