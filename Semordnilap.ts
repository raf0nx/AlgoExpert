// Solution 1, O(n * m) time complexity, O(n * m) space complexity where n is the number of words and m is the length of the longest word
export function semordnilap(words: string[]) {
  const palindromes: { [key: string]: string } = {}
  const result: string[][] = []

  for (const word of words) {
    if (palindromes[word]) result.push([palindromes[word], word])
    else palindromes[word.split('').reverse().join('')] = word
  }

  return result
}
