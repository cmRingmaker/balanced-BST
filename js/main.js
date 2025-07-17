/*
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Imports
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 */

import { Tree } from './tree.js'
import { Node } from './node.js'

/*
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Event Listeners
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 */

document.addEventListener('DOMContentLoaded', initializeTree)

/*
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Dom Elements
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 */

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
	// Make this user-changable later
	// const defaultArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
	const defaultArray = [
		1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
		32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
		61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89,
		90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100,
	]
	const tree = new Tree(defaultArray)

	// Render tree in output
	const output = document.getElementById('tree-output')
	output.textContent = prettyPrint(tree.root)
}
