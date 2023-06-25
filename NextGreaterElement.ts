// Solution 1, O(n^2) time complexity, O(n) space complexity
// where n is the number of elements in the input array
export function nextGreaterElement(array: number[]) {
  if (array.length === 1) return [-1]

  return findNextGreaterElement(array)
}

function findNextGreaterElement(array: number[]) {
  const output: number[] = []
  let nextItemIdx = 0

  for (let i = 0; i < array.length; i++) {
    nextItemIdx = getNextCircularIndex(i, array.length)

    while (nextItemIdx !== i) {
      if (array[nextItemIdx] > array[i]) {
        output.push(array[nextItemIdx])
        break
      }

      nextItemIdx = getNextCircularIndex(nextItemIdx, array.length)

      if (nextItemIdx === i) {
        output.push(-1)
      }
    }
  }

  return output
}

function getNextCircularIndex(currIdx: number, arrayLength: number) {
  return (currIdx + 1) % arrayLength
}

// Solution 2, O(n) time complexity, O(n) space complexity
// where n is the number of elements in the input array
export function nextGreaterElement2(array: number[]) {
  const output = new Array(array.length).fill(-1)
  const stack: number[] = []

  for (let i = 0; i < 2 * array.length; i++) {
    const circularIndex = i % array.length

    while (
      stack.length &&
      array[circularIndex] > array[stack[stack.length - 1]]
    ) {
      const top = stack.pop()!
      output[top] = array[circularIndex]
    }

    stack.push(circularIndex)
  }

  return output
}

// Solution 3, O(n) time complexity, O(n) space complexity
// where n is the number of elements in the input array
export function nextGreaterElement3(array: number[]) {
  const output = new Array(array.length).fill(-1)
  const stack: number[] = []

  for (let i = 2 * array.length - 1; i >= 0; i--) {
    const circularIndex = i % array.length

    while (stack.length) {
      if (stack[stack.length - 1] > array[circularIndex]) {
        output[circularIndex] = stack[stack.length - 1]
        break
      }

      if (stack[stack.length - 1] <= array[circularIndex]) {
        stack.pop()
      }
    }

    stack.push(array[circularIndex])
  }

  return output
}
