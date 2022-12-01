// This is an input class. Do not edit.
class AncestralTree {
  name: string
  ancestor: AncestralTree | null

  constructor(name: string) {
    this.name = name
    this.ancestor = null
  }
}

// Solution 1, O(n^2) time complexity, O(n) space complexity where n is the number of vertices in the graph
export function getYoungestCommonAncestor(
  topAncestor: AncestralTree,
  descendantOne: AncestralTree,
  descendantTwo: AncestralTree
) {
  const descOneAncestors = getAllAncestors(descendantOne)
  const descTwoAncestors = getAllAncestors(descendantTwo)

  return [...descOneAncestors, ...descTwoAncestors].find(
    (el, _, arr) => arr.indexOf(el) !== arr.lastIndexOf(el)
  )
}

function getAllAncestors(descendant: AncestralTree) {
  const ancestors = [descendant]
  let currDescendant = descendant

  while (currDescendant.ancestor) {
    ancestors.push(currDescendant.ancestor)
    currDescendant = currDescendant.ancestor
  }

  return ancestors
}
