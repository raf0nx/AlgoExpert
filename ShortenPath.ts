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
