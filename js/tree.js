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
		// Establish root for this iteration
		const root = new Node(arr[mid])
		// Recurse me!
		root.left = this.buildTree(arr, start, mid - 1)
		root.right = this.buildTree(arr, mid + 1, end)

		return root
	}

	insert(value) {
		// Init current node with root node
		let currentNode = this.root
		// Compare key with current node
		// Move left if key <= current
		// Move right if key >= current
		// Repeat until reaching a leaf node
		// Attach the new key as a left or right child
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
		// Find node containing (value) in a loop
		// 1. If value === current: return current
		//
		// 2. If value < current
		// Move L child to continue searching
		//
		// 3. If value > current
		// Move R child to continue searching
		//
		// If nothing found, return null
	}

	// levelOrder is a breadth-first traversal
	levelOrder(callback) {
		// Init current node with root node
		let currentNode = this.root
		// Init a queue
		const queue = []
		// If no callback, throw error
		// If root === null : return
		// Add root to queue
		// While queue has items:
		//    Dequeue first item
		//    Call callback on this node
		//    If node has L child, add to queue
		//    If node has R child, add to queue
	}

	/*
	 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	 * inOrder, preOrder, and postOrder are a recursive depth-first traversal
	 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	 */

	// <left> <root> <right>
	inOrder(callback, node = this.root) {
		if (!callback) throw new Error('No callback provided.')
		if (node === null) return
		this.inOrder(callback, node.left)
		callback(node)
		this.inOrder(callback, node.right)
	}

	// <root> <left> <right>
	preOrder(callback, node = this.root) {
		if (!callback) throw new Error('No callback provided.')
		if (node === null) return
		callback(node)
		this.preOrder(callback, node.left)
		this.preOrder(callback, node.right)
	}

	// <left> <right> <root>
	postOrder(callback, node = this.root) {
		if (!callback) throw new Error('No callback provided.')
		if (node === null) return
		this.postOrder(callback, node.left)
		this.postOrder(callback, node.right)
		callback(node)
	}

	height(value) {}

	depth(value) {}

	isBalanced() {}

	rebalance() {}
}
