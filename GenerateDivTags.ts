// Solution 1, O(n * (n! * n^2)) time complexity, O(n! * n) space complexity,
// where n is the input number
export function generateDivTags(numberOfTags: number) {
  const divTags = divTagGenerator(numberOfTags, []).map(tags => tags.join(''))

  return Array.from(new Set(divTags))
}

function divTagGenerator(
  numberOfTags: number,
  divTags: string[][]
): string[][] {
  if (numberOfTags === 0) return divTags

  if (divTags.length === 0) {
    divTags.push(['<div>', '</div>'])
  } else {
    const prevDivTags = divTags
    divTags = []

    for (const divTagsCombination of prevDivTags) {
      for (let i = 0; i < divTagsCombination.length; i++) {
        divTags.push([
          ...divTagsCombination.slice(0, i),
          ...['<div>', '</div>'],
          ...divTagsCombination.slice(i),
        ])
      }
    }
  }

  return divTagGenerator(numberOfTags - 1, divTags)
}

// Solution 2, O((2 * n)!/((n! * ((n + 1)!)))) time complexity | O((2 * n)!/((n! * ((n + 1)!)))) space complexity,
// where n is the input number
export function generateDivTags2(numberOfTags: number) {
  return divTagGenerator2('', numberOfTags, numberOfTags)
}

function divTagGenerator2(
  partialString: string,
  openingTagsLeft: number,
  closingTagsLeft: number
) {
  if (closingTagsLeft === 0) return [partialString]

  const divTags: string[] = []

  if (openingTagsLeft > 0) {
    divTags.push(
      ...divTagGenerator2(
        partialString.concat('<div>'),
        openingTagsLeft - 1,
        closingTagsLeft
      )
    )
  }

  if (closingTagsLeft > openingTagsLeft) {
    divTags.push(
      ...divTagGenerator2(
        partialString.concat('</div>'),
        openingTagsLeft,
        closingTagsLeft - 1
      )
    )
  }

  return divTags
}
