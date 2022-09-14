// Solution 1, O(n) time complexity, O(n) space complexity
export function caesarCipherEncryptor(string: string, key: number) {
  return [...string]
    .map(letter =>
      String.fromCharCode(((letter.charCodeAt(0) - 97 + key) % 26) + 97)
    )
    .join('')
}

// Solution 2, O(n) time complexity, O(n) space complexity
export function caesarCipherEncryptor2(string: string, key: number) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  return [...string]
    .map(letter => alphabet.charAt((alphabet.indexOf(letter) + key) % 26))
    .join('')
}
