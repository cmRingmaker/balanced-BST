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

	deleteItem(value) {
		// Find node containing (value) and its parent
		// If value is not found, return
		//
		// 1. If node is a leaf:
		// If root, set to null
		// Else set parents appropriate L or R to null
		//
		// 2. If node has only one child
		// Replace node with child
		// If root, set root to its child
		// Else set parents appropriate child to this nodes single child
		//
		// 3. If node has two children
		// Find smallest node in right subtree
		// Copy data to the node being deleted
		// Recursively delete node from its original position
		//
		// Note: if 3 happens, the deletion will eventually fall into case 1 or 2
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

	height(value) {}

	depth(value) {}

	isBalanced() {}

	rebalance() {}
}
