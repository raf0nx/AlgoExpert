// This is the class of the input root.
// Do not edit it.
class BinaryTree {
  value: number
  left: BinaryTree | null
  right: BinaryTree | null

  constructor(value: number) {
    this.value = value
    this.left = null
    this.right = null
  }
}

// O(n) time complexity, O(n) space complexity
function generateBranchSums(
  tree: BinaryTree,
  branchSumsArr: number[],
  currentBranchSum = 0
): void {
  currentBranchSum += tree.value

  if (!tree.left && !tree.right) {
    branchSumsArr.push(currentBranchSum)
  }

  if (tree.left) {
    generateBranchSums(tree.left, branchSumsArr, currentBranchSum)
  }

  if (tree.right) {
    generateBranchSums(tree.right, branchSumsArr, currentBranchSum)
  }
}

export function branchSums(root: BinaryTree): number[] {
  const branchSumsArr: number[] = []

  generateBranchSums(root, branchSumsArr)

  return branchSumsArr
}
