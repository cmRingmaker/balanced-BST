import { Tree } from './tree.js'

/*
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Helper Functions
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 */

function generateRandomArray(size = 15) {
	const arr = []
	for (let i = 0; i < size; i++) {
		arr.push(Math.floor(Math.random() * 100))
	}
	return arr
}

function printTraversal(traversalName, tree, traversalMethod) {
	const elements = []
	traversalMethod.call(tree, (node) => elements.push(node.data))
	console.log(`${traversalName}: [${elements.join(', ')}]`)
}

function printSeparator(title) {
	console.log('\n' + '='.repeat(50))
	console.log(title)
	console.log('='.repeat(50))
}

/*
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Driver Script - TOP Requirements
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 */

function driverScript() {
	printSeparator('BINARY SEARCH TREE DRIVER SCRIPT')

	// 1. Create a binary search tree from an array of random numbers < 100
	console.log('\n1. Creating BST from random numbers < 100...')
	const randomArray = generateRandomArray(15)
	console.log(`Random array: [${randomArray.join(', ')}]`)

	const tree = new Tree(randomArray)
	console.log(`Sorted & deduplicated: [${tree.arr.join(', ')}]`)

	// 2. Confirm that the tree is balanced
	console.log('\n2. Checking if tree is balanced...')
	console.log(`Tree is balanced: ${tree.isBalanced()}`)

	// 3. Print out all elements in level, pre, post, and in order
	console.log('\n3. Printing all traversal orders:')
	printTraversal('Level Order', tree, tree.levelOrder)
	printTraversal('Pre Order  ', tree, tree.preOrder)
	printTraversal('In Order   ', tree, tree.inOrder)
	printTraversal('Post Order ', tree, tree.postOrder)

	// 4. Unbalance the tree by adding several numbers > 100
	console.log('\n4. Unbalancing tree by adding numbers > 100...')
	const unbalancingNumbers = [101, 102, 103, 104, 105, 106, 107]
	unbalancingNumbers.forEach((num) => {
		tree.insert(num)
		console.log(`Inserted: ${num}`)
	})

	// 5. Confirm that the tree is unbalanced
	console.log('\n5. Checking if tree is now unbalanced...')
	console.log(`Tree is balanced: ${tree.isBalanced()}`)

	// 6. Balance the tree by calling rebalance
	console.log('\n6. Rebalancing the tree...')
	tree.rebalance()
	console.log('Tree rebalanced!')

	// 7. Confirm that the tree is balanced
	console.log('\n7. Checking if tree is balanced after rebalancing...')
	console.log(`Tree is balanced: ${tree.isBalanced()}`)

	// 8. Print out all elements in level, pre, post, and in order
	console.log('\n8. Printing all traversal orders after rebalancing:')
	printTraversal('Level Order', tree, tree.levelOrder)
	printTraversal('Pre Order  ', tree, tree.preOrder)
	printTraversal('In Order   ', tree, tree.inOrder)
	printTraversal('Post Order ', tree, tree.postOrder)

	printSeparator('DRIVER SCRIPT COMPLETE')
}

/*
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Comprehensive Tests
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 */

function comprehensiveTests() {
	printSeparator('COMPREHENSIVE BST TESTS')

	const testTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])

	console.log('\nFIND TESTS:')
	console.log(`Find 23: ${testTree.find(23) ? 'Found' : 'Not found'}`)
	console.log(`Find 999: ${testTree.find(999) ? 'Found' : 'Not found'}`)

	console.log('\nHEIGHT TESTS:')
	console.log(`Height of root: ${testTree.height(null)}`)
	console.log(`Height of node 23: ${testTree.height(23)}`)
	console.log(`Height of node 6345: ${testTree.height(6345)}`)

	console.log('\nDEPTH TESTS:')
	console.log(`Depth of root (${testTree.root.data}): ${testTree.depth(testTree.root.data)}`)
	console.log(`Depth of node 23: ${testTree.depth(23)}`)
	console.log(`Depth of node 6345: ${testTree.depth(6345)}`)

	console.log('\nINSERT TESTS:')
	console.log('Inserting 10, 2, 99...')
	testTree.insert(10)
	testTree.insert(2)
	testTree.insert(99)

	const afterInsert = []
	testTree.inOrder((node) => afterInsert.push(node.data))
	console.log(`After insertions: [${afterInsert.join(', ')}]`)

	console.log('\nDELETE TESTS:')
	console.log('Deleting 23 (node with two children)...')
	testTree.deleteItem(23)

	console.log('Deleting 2 (leaf node)...')
	testTree.deleteItem(2)

	const afterDelete = []
	testTree.inOrder((node) => afterDelete.push(node.data))
	console.log(`After deletions: [${afterDelete.join(', ')}]`)

	console.log('\nBALANCE TESTS:')
	console.log(`Tree is balanced: ${testTree.isBalanced()}`)

	printSeparator('COMPREHENSIVE TESTS COMPLETE')
}

/*
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Run Tests
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 */

console.log('Running Binary Search Tree Tests...\n')

driverScript()
comprehensiveTests()

console.log('\nAll tests completed!')
