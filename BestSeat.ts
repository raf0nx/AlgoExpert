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
