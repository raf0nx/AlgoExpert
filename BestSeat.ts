// Solution 1, O(n) time complexity, O(1) space complexity
// where n is the number of seats
export function bestSeat(seats: number[]) {
  let currIdx = 0
  let bestSeatIdx = -1
  let bestConsecutiveEmptySeats = 0

  while (currIdx < seats.length) {
    let consecutiveEmptySeats = 0
    let startingSeatIdx = currIdx

    while (seats[currIdx] === 0) {
      consecutiveEmptySeats += 1

      if (consecutiveEmptySeats > bestConsecutiveEmptySeats) {
        bestConsecutiveEmptySeats = consecutiveEmptySeats
        bestSeatIdx = Math.floor((startingSeatIdx + currIdx) / 2)
      }

      currIdx++
    }

    currIdx++
  }

  return bestSeatIdx
}

// Solution 2, O(n) time complexity, O(1) space complexity
// where n is the number of seats
export function bestSeat2(seats: number[]) {
  let bestSeat = -1
  let maxSpace = 0
  let left = 0
  let right = 1

  while (right < seats.length) {
    if (seats[right] === 0) {
      right++
      continue
    }

    const availableSpace = right - left - 1

    if (availableSpace > maxSpace) {
      maxSpace = availableSpace
      bestSeat = Math.floor((left + right) / 2)
    }

    left = right
    right++
  }

  return bestSeat
}
