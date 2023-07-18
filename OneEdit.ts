// Solution 1, O(n) time complexity, O(1) space complexity
// where n is the length of the longer string
export function oneEdit(stringOne: string, stringTwo: string) {
  const lengthOne = stringOne.length
  const lengthTwo = stringTwo.length

  if (Math.abs(lengthOne - lengthTwo) > 1) {
    return false
  }

  let charsDifferenceCount = 0
  let onePointer = 0
  let twoPointer = 0

  while (onePointer < lengthOne && twoPointer < lengthTwo) {
    if (stringOne[onePointer] !== stringTwo[twoPointer]) {
      charsDifferenceCount += 1

      if (charsDifferenceCount > 1) {
        return false
      }

      if (lengthOne === lengthTwo) {
        onePointer += 1
        twoPointer += 1
      } else if (lengthOne > lengthTwo) {
        onePointer += 1
      } else {
        twoPointer += 1
      }

      continue
    }

    onePointer += 1
    twoPointer += 1
  }

  if (onePointer < lengthOne || twoPointer < lengthTwo) {
    charsDifferenceCount += 1
  }

  return charsDifferenceCount <= 1
}
