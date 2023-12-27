type Range = [number, number]

// Solution 1, O(log(n)) time complexity, O(1) space complexity,
// where n is the length of the input array
export function searchForRange(array: number[], target: number): Range {
  const finalRange: Range = [-1, -1]

  findExternity(array, target, finalRange, 0, array.length - 1, true)
  findExternity(array, target, finalRange, 0, array.length - 1, false)

  return finalRange
}

function findExternity(
  array: number[],
  target: number,
  finalRange: Range,
  left: number,
  right: number,
  leftDirection: boolean
) {
  while (left <= right) {
    const mid = Math.floor((left + right) / 2)

    if (array[mid] !== target) {
      if (array[mid] > target) right = mid - 1
      else left = mid + 1
    } else {
      if (leftDirection) {
        if (array[mid - 1] === target) {
          right = mid - 1
        } else {
          finalRange[0] = mid
          break
        }
      } else {
        if (array[mid + 1] === target) {
          left = mid + 1
        } else {
          finalRange[1] = mid
          break
        }
      }
    }
  }
}
