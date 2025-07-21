/*
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Imports
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 */

import { Tree } from './tree.js'
import { Node } from './node.js'

/*
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Globals
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 */

const defaultArray = [
	1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
	33, 34, 35,
]

let tree = new Tree(defaultArray)

/*
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Event Listeners
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 */

document.addEventListener('DOMContentLoaded', () => {
	initializeTree()
	initializeInfo()
})

// Randomize
document.getElementById('random-btn').addEventListener('click', generateRandomTree)

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Driver Functions
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 */

function prettyPrint(node, prefix = '', isLeft = true) {
	if (!node) return ''
	let result = ''

	// Right subtree first
	if (node.right) {
		const rightPrefix = prefix + (isLeft ? '│   ' : '    ')
		result += prettyPrint(node.right, rightPrefix, false)
	}

	// Current node
	const connector = isLeft ? '└── ' : '┌── '
	result += `${prefix}${connector}${node.data}\n`

	// Left subtree last
	if (node.left) {
		const leftPrefix = prefix + (isLeft ? '    ' : '│   ')
		result += prettyPrint(node.left, leftPrefix, true)
	}

	return result
}

function initializeTree() {
	// Render tree in output
	const output = document.getElementById('tree-output')
	output.textContent = prettyPrint(tree.root)
}

function initializeInfo() {
	// Render information in Info

	// Target the id to insert into, and use the corresponding method from the tree
	const traverse = [
		{ id: 'level-order', method: 'levelOrder' },
		{ id: 'in-order', method: 'inOrder' },
		{ id: 'pre-order', method: 'preOrder' },
		{ id: 'post-order', method: 'postOrder' },
	]

	traverse.forEach(({ id, method }) => {
		const res = []
		tree[method]((node) => res.push(node.data))
		document.getElementById(id).querySelector('span').textContent = `${res.join(', ')}`
	})
}

function generateRandomTree() {
	const randomNumbers = Array.from({ length: 30 }, () => Math.floor(Math.random() * 150) + 1)

	// Rebuild tree
	tree = new Tree(randomNumbers)

	initializeTree()
	initializeInfo()
}
