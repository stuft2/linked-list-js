import { Node } from './node'

export class LinkedList<T = unknown> {
  head: Node<T> | null = null
  last: Node<T> | null = null
  length = 0

  on (value: T | Node<T>, top = false): number {
    const node = value instanceof Node ? value : new Node(value)
    if ((this.head == null) || (this.last == null)) {
      this.head = node
      this.last = node
      this.length = 1
      return this.length
    }
    if (top) {
      node.next(this.head)
      this.head = node
    } else {
      this.last.next(node)
      this.last = node
    }
    this.length++
    return this.length
  }

  off (value: T, replace?: T | null, cursor: Node<T> | null = this.head): T | undefined {
    if (cursor == null) {
      return undefined
    }
    if (cursor.value !== value) {
      return this.off(value, replace, cursor.next())
    }
    const nodes = [cursor.parent, cursor.child]
    if (replace != null) nodes.splice(1, 0, new Node(replace))
    Node.link(...nodes)
    return value
  }

  *[Symbol.iterator] (): Iterator<T> {
    let cursor = this.head
    while (cursor !== null) {
      yield cursor.value
      cursor = cursor.next()
    }
  }
}
