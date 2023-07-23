// Solution 1, O(n) time complexity, O(n) space complexity
// where n is the number of tokens
type Operators = '+' | '-' | '*' | '/'

const operators = ['+', '-', '*', '/']

export function reversePolishNotation(tokens: string[]) {
  const stack: number[] = []

  for (const token of tokens) {
    if (operators.includes(token)) {
      const num2 = stack.pop()!
      const num1 = stack.pop()!
      stack.push(evaluate(num1, num2, token as Operators))
    } else {
      stack.push(+token)
    }
  }

  return stack[0]
}

function evaluate(num1: number, num2: number, operator: Operators) {
  switch (operator) {
    case '+':
      return num1 + num2
    case '-':
      return num1 - num2
    case '*':
      return num1 * num2
    case '/':
      return Math.trunc(num1 / num2)
  }
}
