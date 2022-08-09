// Solution 1, O(v + e) time complexity, O(v) space complexity where v is the number of vertices and e is the number of edges in the graph
export class Node {
  name: string
  children: Node[]

  constructor(name: string) {
    this.name = name
    this.children = []
  }

  addChild(name: string) {
    this.children.push(new Node(name))
    return this
  }

  depthFirstSearch(array: string[]) {
    array.push(this.name)

    for (const child of this.children) {
      child.depthFirstSearch(array)
    }

    return array
  }
}
