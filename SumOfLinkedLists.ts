export class LinkedList {
  value: number
  next: LinkedList | null

  constructor(value: number) {
    this.value = value
    this.next = null
  }
}

// Solution 1, O(n + m) time complexity, O(n + m) space complexity, where n is the length of the first linked list and m is the length of the second linked list
export function sumOfLinkedLists(
  linkedListOne: LinkedList,
  linkedListTwo: LinkedList
) {
  const linkedList1Items = getLinkedListItems(linkedListOne)
  const linkedList2Items = getLinkedListItems(linkedListTwo)
  const linkedListsItemsSum = twoArrayReverseSum(
    linkedList1Items,
    linkedList2Items
  )

  return createLinkedListFromInteger(linkedListsItemsSum)
}

function createLinkedListFromInteger(num: number) {
  const arrFromInts = `${num}`.split('')
  let currNode = new LinkedList(+arrFromInts[0])

  for (let i = 1; i < arrFromInts.length; i++) {
    const currItem = arrFromInts[i]
    const nextNode = new LinkedList(+currItem)
    nextNode.next = currNode
    currNode = nextNode
  }

  return currNode
}

function getLinkedListItems(linkedList: LinkedList) {
  const linkedListItems: number[] = []
  let currNode: LinkedList | null = linkedList

  while (currNode) {
    linkedListItems.push(currNode.value)
    currNode = currNode.next
  }

  return linkedListItems
}

function twoArrayReverseSum(arr1: number[], arr2: number[]) {
  return +arr1.reverse().join('') + +arr2.reverse().join('')
}

// Solution 2, O(max(n, m)) time complexity, O(max(n, m)) space complexity, where n is the length of the first linked list and m is the length of the second linked list
export function sumOfLinkedLists2(
  linkedListOne: LinkedList,
  linkedListTwo: LinkedList
) {
  let newLinkedListHeadPointer = new LinkedList(0)
  let currentNode = newLinkedListHeadPointer
  let carry = 0

  let ll1Node: LinkedList | null = linkedListOne
  let ll2Node: LinkedList | null = linkedListTwo

  while (ll1Node || ll2Node || carry) {
    const ll1NodeValue = ll1Node ? ll1Node.value : 0
    const ll2NodeValue = ll2Node ? ll2Node.value : 0
    const nodesSum = ll1NodeValue + ll2NodeValue + carry

    const newNodeValue = nodesSum % 10
    const newNode = new LinkedList(newNodeValue)

    currentNode.next = newNode
    currentNode = newNode
    carry = Math.floor(nodesSum / 10)

    if (ll1Node) ll1Node = ll1Node.next
    if (ll2Node) ll2Node = ll2Node.next
  }

  return newLinkedListHeadPointer.next
}
