// Solution 1, O(n^2 + m) time complexity, O(n + m) space complexity,
// where n is the length of the main string and m is the length of the pattern
export function patternMatcher(pattern: string, string: string) {
  const doesPatternStartWithX = pattern[0] === 'x'
  const newPattern = doesPatternStartWithX
    ? pattern.split('')
    : getNewPattern(pattern)
  const { x: xCount, y: yCount, firstYPos } = getCountsAndFirstYPos(newPattern)

  for (let i = 1; i < string.length; i++) {
    const lengthOfX = i
    const lengthOfY = (string.length - xCount * lengthOfX) / yCount
    const yIdx = firstYPos * lengthOfX
    const xString = string.slice(0, lengthOfX)
    const yString = string.slice(yIdx, yIdx + lengthOfY)
    const potentialString = newPattern.map(el =>
      el === 'x' ? xString : yString
    )

    if (potentialString.join('') === string) {
      return doesPatternStartWithX ? [xString, yString] : [yString, xString]
    }
  }

  return []
}

function getNewPattern(pattern: string) {
  return pattern.split('').map(el => (el === 'x' ? 'y' : 'x'))
}

function getCountsAndFirstYPos(pattern: string[]) {
  const countsAndFirstYPos: Record<string, number> = {}

  for (let i = 0; i < pattern.length; i++) {
    const char = pattern[i]

    if (char === 'y' && !countsAndFirstYPos['firstYPos'])
      countsAndFirstYPos.firstYPos = i

    countsAndFirstYPos[char] = (countsAndFirstYPos[char] || 0) + 1
  }

  return countsAndFirstYPos
}

// Solution 2, O(n^2 + m) time complexity, O(n + m) space complexity,
// where n is the length of the main string and m is the length of the pattern
export function patternMatcher2(pattern: string, string: string) {
  const doesPatternStartWithX = pattern[0] === 'x'
  const newPattern = doesPatternStartWithX
    ? pattern.split('')
    : getNewPattern2(pattern)
  const { x: xCount, y: yCount, firstYPos } = getCountsAndFirstYPos2(newPattern)

  if (yCount) {
    for (let i = 1; i < string.length; i++) {
      const lengthOfX = i
      const lengthOfY = (string.length - xCount * lengthOfX) / yCount

      if (lengthOfY <= 0 || lengthOfY % 1 !== 0) continue

      const yIdx = firstYPos * lengthOfX
      const xString = string.slice(0, lengthOfX)
      const yString = string.slice(yIdx, yIdx + lengthOfY)
      const potentialString = newPattern.map(el =>
        el === 'x' ? xString : yString
      )

      if (potentialString.join('') === string) {
        return doesPatternStartWithX ? [xString, yString] : [yString, xString]
      }
    }
  } else {
    const lengthOfX = string.length / xCount

    if (lengthOfX % 1 === 0) {
      const xString = string.slice(0, lengthOfX)
      const potentialString = newPattern.map(x => xString)

      if (potentialString.join('') === string) {
        return doesPatternStartWithX ? [xString, ''] : ['', xString]
      }
    }
  }

  return []
}

function getNewPattern2(pattern: string) {
  return pattern.split('').map(el => (el === 'x' ? 'y' : 'x'))
}

function getCountsAndFirstYPos2(pattern: string[]) {
  const countsAndFirstYPos: Record<string, number> = {}

  for (let i = 0; i < pattern.length; i++) {
    const char = pattern[i]

    if (char === 'y' && !countsAndFirstYPos['firstYPos'])
      countsAndFirstYPos.firstYPos = i

    countsAndFirstYPos[char] = (countsAndFirstYPos[char] || 0) + 1
  }

  return countsAndFirstYPos
}
