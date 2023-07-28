const cards = Array.from({ length: 10 }, (_, i) => i + 1)

function checkIfBust(target: number, startingHand: number) {
  return startingHand > target
}

function checkIfStand(target: number, startingHand: number) {
  return startingHand >= target - 4 && startingHand <= target
}

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

// Solution 2, O(t - s) time complexity, O(t - s) space complexity
// where t is the target and s is the starting hand
export function blackjackProbability2(
  target: number,
  startingHand: number,
  memo: Record<number, number> = {}
) {
  if (memo[startingHand]) return memo[startingHand]
  if (checkIfBust(target, startingHand)) return 1
  if (checkIfStand(target, startingHand)) return 0

  let result = 0

  for (let drawn = 1; drawn <= 10; drawn++) {
    result += 0.1 * blackjackProbability(target, startingHand + drawn, memo)
  }

  memo[startingHand] = result

  return result
}
