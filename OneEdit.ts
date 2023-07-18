// Solution 1, O(n) time complexity, O(n) space complexity
// where n is the length of the longer string
export function oneEdit(stringOne: string, stringTwo: string) {
  const longerString =
    stringOne.length > stringTwo.length ? stringOne : stringTwo
  const shorterString =
    stringOne.length > stringTwo.length ? stringTwo : stringOne

  let charsDifferenceCount = 0
  let longerStrPointer = 0
  let shorterStrPointer = 0

  while (longerStrPointer < longerString.length) {
    if (longerString[longerStrPointer] !== shorterString[shorterStrPointer]) {
      charsDifferenceCount += 1
      longerStrPointer += 1

      if (longerString.length === shorterString.length) shorterStrPointer += 1

      continue
    }

    longerStrPointer += 1
    shorterStrPointer += 1
  }

  return charsDifferenceCount <= 1
}
