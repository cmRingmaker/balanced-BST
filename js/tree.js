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
		// Base case: Return -1 since we add +1 on recursive calls to keep track of edges or null if value doesn't exist
		if (!node) {
			return value === null ? -1 : null
		}

		// Calculate height: find longest path down from current node
		if (value === null) {
			let left = this.height(null, node.left)
			let right = this.height(null, node.right)
			return Math.max(left, right) + 1 // +1 for edge count
		}

		// Find the value if it exists
		if (value === node.data) {
			return this.height(null, node)
		} else if (value < node.data) {
			return this.height(value, node.left)
		} else {
			return this.height(value, node.right)
		}
	}

	/*
	 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	 * Depth measures from value to the root
	 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	 */
	depth(value) {}

	isBalanced() {}

	rebalance() {}
}
