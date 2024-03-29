// Solution 1, O(w^2 * n) time complexity, O(w * n) space complexity
// where w is the number of words and n is the length of the longest word
export function groupAnagrams(words: string[]) {
  const wordsChecked = new Array(words.length).fill(0)
  const anagramsGroup: string[][] = []

  for (let i = 0; i < words.length; i++) {
    if (wordsChecked[i]) continue

    const currentAnagrams: string[] = []
    const currentWord = words[i]

    currentAnagrams.push(currentWord)
    wordsChecked[i] = 1

    for (let j = i + 1; j < words.length; j++) {
      const nextWord = words[j]

      if (currentWord.length !== nextWord.length) continue

      if (areStringsAnagrams(currentWord, nextWord)) {
        currentAnagrams.push(nextWord)
        wordsChecked[j] = 1
      }
    }

    anagramsGroup.push(currentAnagrams)
  }

  return anagramsGroup
}

function areStringsAnagrams(string1: string, string2: string) {
  const charMap1 = getCharFrequencyMap(string1)
  const charMap2 = getCharFrequencyMap(string2)

  for (const char in charMap1) {
    if (charMap1[char] !== charMap2[char]) return false
  }

  return true
}

function getCharFrequencyMap(string: string) {
  const charMap: Record<string, number> = {}

  for (const char of string) {
    charMap[char] = charMap[char] + 1 || 1
  }

  return charMap
}

// Solution 2, O(w * n * log(n)) time complexity, O(w * n) space complexity
// where w is the number of words and n is the length of the longest word
export function groupAnagrams2(words: string[]) {
  const anagramsGroup: string[][] = []
  const anagramsGroupPlacement: Record<string, number> = {}

  for (let i = 0; i < words.length; i++) {
    const sortedWord = words[i].split('').sort().join('')

    if (sortedWord in anagramsGroupPlacement) {
      anagramsGroup[anagramsGroupPlacement[sortedWord]].push(words[i])
      continue
    }

    anagramsGroupPlacement[sortedWord] = i
    anagramsGroup.push([words[i]])
  }

  return anagramsGroup
}

// Solution 3, O(w * n * log(n)) time complexity, O(w * n) space complexity
// where w is the number of words and n is the length of the longest word
export function groupAnagrams3(words: string[]) {
  const anagramsGroups: Record<string, string[]> = {}

  for (const word of words) {
    const sortedWord = word.split('').sort().join('')

    if (sortedWord in anagramsGroups) {
      anagramsGroups[sortedWord].push(word)
    } else {
      anagramsGroups[sortedWord] = [word]
    }
  }

  return Object.values(anagramsGroups)
}
