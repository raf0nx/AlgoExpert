// Solution 1, O(n) time complexity, O(n) space complexity
export function caesarCipherEncryptor(string: string, key: number) {
  return [...string]
    .map(letter =>
      String.fromCharCode(((letter.charCodeAt(0) - 97 + key) % 26) + 97)
    )
    .join('')
}
