import { Node } from './node.js'

export class Tree {
	constructor(arr = []) {
		this.arr = [...new Set(arr)].sort((a, b) => a - b) // Sort and remove dupes
		this.root = this.buildTree(this.arr)
	}

	buildTree(arr, start = 0, end = arr.length - 1) {
		if (start > end) return null
		// Get the middle of the array
		const mid = Math.floor((start + end) / 2)
		// Establish root for the subtrees
		const root = new Node(arr[mid])
		// Build subtrees
		root.left = this.buildTree(arr, start, mid - 1)
		root.right = this.buildTree(arr, mid + 1, end)

		return root
	}

	insert(value, node = this.root) {
		// Base case, if we reach a null node, create and return a new one
		if (!node) return new Node(value)
		if (value === node.data) return node // Avoid duplicates
		// Check & Set Left or Right trees recursively
		if (value < node.data) {
			node.left = this.insert(value, node.left)
		} else {
			node.right = this.insert(value, node.right)
		}

		return node
	}

	deleteItem(value, node = this.root) {
		// Base case
		if (!node) return null

		// Found the node to delete
		if (value === node.data) {
			// Deletion cases
			// 1. Leaf node (no children)
			if (node.left === null && node.right === null) {
				return null
			}

			// 2. One child
			if (node.left === null) {
				return node.right // Promote right child to parent
			} else if (node.right === null) {
				return node.left // Promote left child to parent
			}

			// 3. Two children
			// Step 1: Find smallest node in right subtree
			const successor = this.findMinHelper(node.right)
			// Step 2: Copy successor value to this node
			node.data = successor.data
			// Step 3: Delete successor from the right subtree
			node.right = this.deleteItem(successor.data, node.right)

			return node

			// Recursively search until we find our value!
		} else if (value < node.data) {
			node.left = this.deleteItem(value, node.left)
		} else {
			node.right = this.deleteItem(value, node.right)
		}

		return node
	}

	findMinHelper(node) {
		// Find smallest possible value
		if (node.left !== null) {
			return this.findMinHelper(node.left)
		}

		return node
	}

	find(value, node = this.root) {
		// Base case
		if (node === null || value === node.data) return node

		// Check Left and then Right trees recursively
		if (value < node.data) {
			return this.find(value, node.left)
		} else {
			return this.find(value, node.right)
		}
	}

	/*
	 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	 * levelOrder is a breadth-first traversal
	 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	 */

	levelOrder(callback, node = this.root) {
		if (!callback) throw new Error('No callback provided.')
		if (!node) return
		// Add root to queue
		const queue = [node]

		while (queue.length > 0) {
			// Dequeue first item
			const currentNode = queue.shift()

			// Callback on this node
			callback(currentNode)
			// If node has L child, add to queue
			if (currentNode.left) {
				queue.push(currentNode.left)
			}
			// If node has R child, add to queue
			if (currentNode.right) {
				queue.push(currentNode.right)
			}
		}
	}

	/*
	 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	 * inOrder, preOrder, and postOrder are a depth-first traversal
	 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	 */

	// <left> <root> <right>
	inOrder(callback, node = this.root) {
		if (!callback) throw new Error('No callback provided.')
		if (!node) return
		this.inOrder(callback, node.left)
		callback(node)
		this.inOrder(callback, node.right)
	}

	// <root> <left> <right>
	preOrder(callback, node = this.root) {
		if (!callback) throw new Error('No callback provided.')
		if (!node) return
		callback(node)
		this.preOrder(callback, node.left)
		this.preOrder(callback, node.right)
	}

	// <left> <right> <root>
	postOrder(callback, node = this.root) {
		if (!callback) throw new Error('No callback provided.')
		if (!node) return
		this.postOrder(callback, node.left)
		this.postOrder(callback, node.right)
		callback(node)
	}

	/*
	 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	 * Height measures from value to the farthest leaf
	 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	 */

	height(value, node = this.root) {
		// Calculate height from current node
		if (value === null) {
			return this.calculateHeight(node)
		}

		// Find node with given value
		const targetNode = this.find(value, node)
		if (!targetNode) return null

		// Calculate height from the found node
		return this.calculateHeight(targetNode)
	}

	calculateHeight(node) {
		// Return -1 since we add +1 on recursive calls to keep track of edges
		if (!node) return -1

		const left = this.calculateHeight(node.left)
		const right = this.calculateHeight(node.right)
		return Math.max(left, right) + 1
	}

	/*
	 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	 * Depth measures from value to the root
	 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	 */
	depth(value, node = this.root, currentDepth = 0) {
		// Base case
		if (!node) return null

		// Value found
		if (value === node.data) return currentDepth

		// Find the value if it exists, add +1 for edge count
		if (value < node.data) {
			return this.depth(value, node.left, currentDepth + 1)
		} else {
			return this.depth(value, node.right, currentDepth + 1)
		}
	}

	isBalanced(node = this.root) {
		if (!node) return true // Empty tree or a leaf are balanced

		// Calculate heights of subtrees from current node
		const lh = this.calculateHeight(node.left)
		const rh = this.calculateHeight(node.right)

		// Recursively check if subtrees are balanced
		const left = this.isBalanced(node.left)
		const right = this.isBalanced(node.right)

		// Check within balanced range < 2
		// Check L and R
		if (Math.abs(lh - rh) < 2 && left && right) {
			return true
		} else {
			return false
		}
	}

	rebalance() {
		// Use inOrder to rebalance the tree
		const sorted = []
		this.inOrder((node) => sorted.push(node.data))

		// Rebuild root with the rebalanced array
		this.root = this.buildTree(sorted)
		return this.root
	}

	saveToStorage() {
		const treeData = []
		this.inOrder((node) => treeData.push(node.data))
		localStorage.setItem('bst-tree', JSON.stringify(treeData))
	}

	loadFromStorage() {
		const saved = localStorage.getItem('bst-tree')
		if (saved) {
			const savedArr = JSON.parse(saved)
			this.arr = savedArr
			this.root = this.buildTree(savedArr)
			return true
		}
		return false
	}

	clearStorage() {
		localStorage.removeItem('bst-tree')
	}
}
