// Solution 1, O(n^2) time complexity, O(n) space complexity
export function sortStack(stack: number[]) {
  let i = 0

  while (i < stack.length) {
    stack = sortStackHelper(stack)
    i++
  }

  return stack
}

function sortStackHelper(stack: number[]) {
  if (stack.length <= 1) return stack

  const currValue = stack.pop()!
  const lastValue = sortStackHelper(stack)[stack.length - 1]

  if (currValue >= lastValue) stack.push(currValue)
  else {
    stack.pop()
    stack.push(...[currValue, lastValue])
  }

  return stack
}
