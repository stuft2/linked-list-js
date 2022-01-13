export class Node<T = unknown> {
  readonly value: T
  parent: Node<T> | null
  child: Node<T> | null

  constructor (value: T, child?: Node<T>, parent?: Node<T>) {
    this.value = value
    this.child = child ?? null
    this.parent = parent ?? null
  }

  static link<T = unknown>(...nodes: Array<Node<T> | null>): Node<T> | undefined {
    for (let i = 0; i < nodes.length; i++) {
      const parent = nodes[i]
      const child = nodes[i + 1]
      parent?.next(child)
      child?.prev(parent)
    }
    for (const node of nodes) {
      if (node != null) return node
    }
    return undefined
  }

  get end (): boolean {
    return this.child === null
  }

  get start (): boolean {
    return this.parent === null
  }

  next (child?: Node<T> | null): Node<T> | null {
    if (child === undefined) {
      return this.child
    }
    this.child = child
    return this.child
  }

  prev (parent?: Node<T> | null): Node<T> | null {
    if (parent === undefined) {
      return this.parent
    }
    this.parent = parent
    return this.parent
  }

  prune (): this {
    this.next(null)
    this.prev(null)
    return this
  }
}
