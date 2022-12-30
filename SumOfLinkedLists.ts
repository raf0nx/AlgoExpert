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
