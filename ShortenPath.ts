// Solution 1, O(n) time complexity, O(n) space complexity,
// where n is the length of the pathname
export function shortenPath(path: string) {
  const tokens = path.split('/').filter(token => token !== '' && token !== '.')
  const stack: string[] = []
  const isAbsolutePath = path[0] === '/'
  let numDirsEncountered = 0

  for (const token of tokens) {
    if (token === '..') {
      if (isAbsolutePath) stack.pop()
      else if (numDirsEncountered === 0) stack.push(`${token}/`)
      else {
        numDirsEncountered--
        stack.pop()
      }
    } else {
      if (isAbsolutePath) stack.push(`/${token}`)
      else {
        stack.push(numDirsEncountered === 0 ? token : `/${token}`)
        numDirsEncountered++
      }
    }
  }

  const shortenedPath = stack.join('')

  if (shortenedPath.length === 0 && isAbsolutePath) return '/'

  return shortenedPath[shortenedPath.length - 1] === '/'
    ? shortenedPath.slice(0, -1)
    : shortenedPath
}

// Solution 2, O(n) time complexity, O(n) space complexity,
// where n is the length of the pathname
export function shortenPath2(path: string) {
  const tokens = path.split('/').filter(token => token !== '' && token !== '.')
  const stack: string[] = []
  const isAbsolutePath = path[0] === '/'

  if (isAbsolutePath) stack.push('')

  for (const token of tokens) {
    if (token === '..') {
      if (stack.length === 0 || stack[stack.length - 1] === '..')
        stack.push(token)
      else if (stack[stack.length - 1] !== '') stack.pop()

      continue
    }

    stack.push(token)
  }

  if (stack.length === 1 && stack[0] === '') return '/'

  return stack.join('/')
}

// Solution 3, O(n) time complexity, O(n) space complexity,
// where n is the length of the pathname
export function shortenPath3(path: string) {
  const tokens = path.split('/').filter(token => token !== '' && token !== '.')
  const stack: string[] = []
  const isAbsolutePath = path[0] === '/'

  for (const token of tokens) {
    if (token === '..') {
      if (isAbsolutePath || (stack.length && stack[stack.length - 1] !== '..'))
        stack.pop()
      else stack.push(token)

      continue
    }

    stack.push(token)
  }

  const shortenedPath = stack.join('/')

  if (isAbsolutePath) return '/'.concat(shortenedPath)

  return shortenedPath
}
