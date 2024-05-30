class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    const newNode = new Node(val)
    if (!this.root) {
      this.root = new Node(val)
    } else {
      let currentNode = this.root
      while (true) {
        if (val > currentNode.val) {
          if (currentNode.right) {
            currentNode = currentNode.right
          } else {
            currentNode.right = newNode;
            break;
          }
        } else if (val < currentNode.val) {
          if (currentNode.left) {
            currentNode = currentNode.left
          } else {
            currentNode.left = newNode;
            break;
          }
        }
      }
    }

    return this;
  }



  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, current = this.root) {
    if (!this.root) {
      this.root = new Node(val)
      return this
    } else {
      if (val < current.val) {
        if (current.left) {
          this.insertRecursively(val, current.left)
        } else {
          current.left = new Node(val)
          return this
        }
      } else {
        if (current.right) {
          this.insertRecursively(val, current.right)
        } else {
          current.right = new Node(val)
          return this
        }
      }
    }
  }



  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let current = this.root
    while (current) {
      if (val === current.val) return current;

      if (val < current.val) {
        if (current.left) {
          current = current.left;
        } else { return undefined }
      } else {
        if (current.right) {
          current = current.right
        } else { return undefined }
      }
    }
  }



  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, current = this.root) {
    if (!current) return undefined;
    if (val === current.val) return current;

    if (val < current.val) {
      return this.findRecursively(val, current.left);
    } else {
      return this.findRecursively(val, current.right);
    }
  }





  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder(node = this.root, visited = []) {
    if (node) {
      visited.push(node.val)
      if (node.left) this.dfsPreOrder(node.left, visited)
      if (node.right) this.dfsPreOrder(node.right, visited)
    }

    return visited
  }



  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder(node = this.root, visited = []) {
    if (node) {
      if (node.left) this.dfsInOrder(node.left, visited)
      visited.push(node.val)
      if (node.right) this.dfsInOrder(node.right, visited)
    }
    return visited
  }



  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder(node = this.root, visited = []) {
    if (node) {
      if (node.left) this.dfsPostOrder(node.left, visited)
      if (node.right) this.dfsPostOrder(node.right, visited)
      visited.push(node.val)
    }

    return visited
  }



  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    const visited = [];
    const queue = [];

    if (this.root) queue.push(this.root);

    while (queue.length) {
      const node = queue.shift();
      visited.push(node.val)

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    return visited;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  /**
   * 1- find the node that needs to be removed
   * 2- adjust the parent node
   * 3- adjust the child node(s) if they exist. 
   */
  remove(val, node = this.root, parent = null) {
    if (!node) return undefined;

    if (val < node.val) {
      return this.remove(val, node.left, node)
    } else if (val > node.val) {
      return this.remove(val, node.right, node)
    } else {
      if (!node.left) {
        if (parent) {
          if (parent.left === node) {
            parent.left = node.right
          } else {
            parent.right = node.right
          }
        } else {
          this.root = node.right
        }
      } else if (!node.right) {
        if (parent) {
          if (parent.left === node) {
            parent.left = node.left;
          } else {
            parent.right - node.left
          }
        } else {
          this.root = node.left;
        }
      } else {
        let successor = this.getMin(node.right)
        let successorVal = successor.val;
        this.remove(successorVal, this.root)
        node.val = successorVal
      }
    }
    return node
  }

  getMin(node) {
    while (node.left) {
      node = node.left;
    }
    return node;
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  height(node) {
    if (!node) return 0;
    return 1 + Math.max(this.height(node.left), this.height(node.right))
  }

  isBalanced(node = this.root) {
    if (!node) return true;

    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);

    if (Math.abs(leftHeight - rightHeight) > 1) return false;

    return this.isBalanced(node.left) && this.isBalanced(node.right);

  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    const values = this.dfsInOrder().sort((a, b) => a - b)
    return values[values.length - 2]
  }

}


module.exports = BinarySearchTree;
