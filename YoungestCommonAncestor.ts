// This is an input class. Do not edit.
class AncestralTree {
  name: string
  ancestor: AncestralTree | null

  constructor(name: string) {
    this.name = name
    this.ancestor = null
  }
}

// Solution 1, O(n) time complexity, O(n) space complexity where n is the number of vertices in the graph
export function getYoungestCommonAncestor(
  topAncestor: AncestralTree,
  descendantOne: AncestralTree,
  descendantTwo: AncestralTree
) {
  const descendantOneAncestors = new Set([...getAllAncestors(descendantOne)])

  for (const ancestor of [...getAllAncestors(descendantTwo)]) {
    if (descendantOneAncestors.has(ancestor)) return ancestor
  }
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

// Solution 2, O(d) time complexity, O(1) space complexity, where d is the depth of the tree
export function getYoungestCommonAncestor2(
  topAncestor: AncestralTree,
  descendantOne: AncestralTree,
  descendantTwo: AncestralTree
) {
  const descendantOneDepth = getDescendantDepth(descendantOne)
  const descendantTwoDepth = getDescendantDepth(descendantTwo)

  const depthDifference = Math.abs(descendantOneDepth - descendantTwoDepth)

  return descendantOneDepth > descendantTwoDepth
    ? backtrackAncestralTree(descendantOne, descendantTwo, depthDifference)
    : backtrackAncestralTree(descendantTwo, descendantOne, depthDifference)
}

function getDescendantDepth(descendant: AncestralTree) {
  let depth = 0

  while (descendant.ancestor) {
    depth += 1
    descendant = descendant.ancestor
  }

  return depth
}

function backtrackAncestralTree(
  lowerDescendant: AncestralTree,
  upperDescendant: AncestralTree,
  diff: number
) {
  while (diff > 0) {
    lowerDescendant = lowerDescendant.ancestor!
    diff -= 1
  }

  while (lowerDescendant !== upperDescendant) {
    lowerDescendant = lowerDescendant.ancestor!
    upperDescendant = upperDescendant.ancestor!
  }

  return lowerDescendant
}
