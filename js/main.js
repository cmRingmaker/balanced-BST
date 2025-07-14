/*
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Imports
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 */
import { Tree } from './tree.js'
import { Node } from './node.js'

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])

/*
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Event Listeners
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 */

/*
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Dom Elements
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 */

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Driver Functions
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 */

console.log('Original Array', tree.arr)

const prettyPrint = (node, prefix = '', isLeft = true) => {
	if (!node) return
	if (node.right !== null) {
		prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false)
	}
	console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`)
	if (node.left !== null) {
		prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true)
	}
}

console.log('\nTree structure:')
prettyPrint(tree.root)
