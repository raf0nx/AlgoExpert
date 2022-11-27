// Solution 1, O(v + e) time complexity, O(v) space complexity, where v is the number of vertices and e is the number of edges of the graph
export class Node {
  name: string
  children: Node[]

  constructor(name: string) {
    this.name = name
    this.children = []
  }

  addChild(name: string): Node {
    this.children.push(new Node(name))
    return this
  }

  breadthFirstSearch(array: string[]) {
    const queue: Node[] = [this]

    while (queue.length) {
      const currNode = queue.shift()!
      queue.push(...currNode.children)
      array.push(currNode.name)
    }

    return array
  }
}
