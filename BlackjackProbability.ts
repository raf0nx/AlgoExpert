const cards = Array.from({ length: 10 }, (_, i) => i + 1)

// Solution 1, O(t - s) time complexity, O(t - s) space complexity
// where t is the target and s is the starting hand
export function blackjackProbability(
  target: number,
  startingHand: number,
  probabilities: Record<number, number> = {}
) {
  let result = 0

  if (checkIfStand(target, startingHand)) return result

  for (const card of cards) {
    if (probabilities[startingHand + card]) {
      result += probabilities[startingHand + card]
      continue
    }

    if (checkIfBust(target, startingHand + card)) {
      result += 0.1
    } else if (checkIfStand(target, startingHand + card)) {
      continue
    } else {
      result +=
        0.1 * blackjackProbability(target, startingHand + card, probabilities)
      probabilities[startingHand + card] = result
    }
  }

  return +result.toFixed(3)
}

function checkIfBust(target: number, startingHand: number) {
  return startingHand > target
}

function checkIfStand(target: number, startingHand: number) {
  return startingHand >= target - 4 && startingHand <= target
}
