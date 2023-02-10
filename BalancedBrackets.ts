// Solution 1, O(n) time complexity, O(n) space complexity
const BracketMap = {
  '(': ')',
  '[': ']',
  '{': '}',
}

type BracketMapKeys = keyof typeof BracketMap

export function balancedBrackets(string: string) {
  const bracketStack: BracketMapKeys[] = []
  const closingBrackets = Object.values(BracketMap)

  for (const char of string) {
    if (closingBrackets.includes(char)) {
      const latestBracket = bracketStack.pop()

      if (!latestBracket || BracketMap[latestBracket] !== char) return false
    }

    if (!(char in BracketMap)) continue

    bracketStack.push(char as BracketMapKeys)
  }

  return bracketStack.length === 0
}
