import { Node } from './node.js'

export class Tree {
	constructor(arr = []) {
		this.arr = arr
		this.root = this.buildTree(this.arr)
	}

	buildTree(arr) {
		// Take in array of data, turn into BBST
		// Sort and remove dupes
		// Return level-0 root node
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

	find(value) {
		// Init current node with root node
		let currentNode = this.root
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

	// inOrder, preOrder, and postOrder are depth-first traversal

	// <left> <root> <right>
	inOrder(callback) {
		// Init current node with root node
		let currentNode = this.root
	}

	// <root> <left> <right>
	preOrder(callback) {
		// Init current node with root node
		let currentNode = this.root
	}

	// <left> <right> <root>
	postOrder(callback) {
		// Init current node with root node
		let currentNode = this.root
	}

	height(value) {}

	depth(value) {}

	isBalanced() {}

	rebalance() {}
}
