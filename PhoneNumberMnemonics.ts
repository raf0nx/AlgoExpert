// Solution 1, O(4^n * n) time complexity, O(4^n * n) space complexity
export function phoneNumberMnemonics(phoneNumber: string) {
  const digitToLetters: Record<number, string[]> = {
    0: ['0'],
    1: ['1'],
    2: ['a', 'b', 'c'],
    3: ['d', 'e', 'f'],
    4: ['g', 'h', 'i'],
    5: ['j', 'k', 'l'],
    6: ['m', 'n', 'o'],
    7: ['p', 'q', 'r', 's'],
    8: ['t', 'u', 'v'],
    9: ['w', 'x', 'y', 'z'],
  }

  return generateMnemonics(phoneNumber, digitToLetters, 0, [])
}

function generateMnemonics(
  phoneNumber: string,
  digitToLetters: Record<number, string[]>,
  idx: number,
  mnemons: string[]
): string[] {
  if (idx === phoneNumber.length) return mnemons
  else {
    const currNum = +phoneNumber[idx]
    const newMnemons: string[] = []

    for (let i = 0; i < digitToLetters[currNum].length; i++) {
      const mnemon = digitToLetters[currNum][i]

      if (!mnemons.length) newMnemons.push(mnemon)

      for (let j = 0; j < mnemons.length; j++) {
        newMnemons.push(mnemons[j].concat(mnemon))
      }
    }

    return generateMnemonics(phoneNumber, digitToLetters, idx + 1, newMnemons)
  }
}
