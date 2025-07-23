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
let tree

/*
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Event Listeners
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 */

document.addEventListener('DOMContentLoaded', () => {
	// Try to load from localStorage first
	tree = new Tree()

	if (!tree.loadFromStorage()) {
		// If no saved data, use default array
		tree = new Tree(defaultArray)
		tree.saveToStorage() //Save the default
	}
	renderTree()
})

// Input/button pairs with their handlers (Supporting Click + Enter key)
const inputActions = [
	{ input: 'insert', button: 'insert-btn', handler: handleInsert },
	{ input: 'delete', button: 'delete-btn', handler: handleDelete },
	{ input: 'find', button: 'find-btn', handler: handleFind },
]

// Button-only actions
const buttonActions = [
	{ button: 'balance-btn', handler: rebalanceTree },
	{ button: 'random-btn', handler: generateRandomTree },
]

// Set up click and enter handlers for each input/button pairs
inputActions.forEach(({ input, button, handler }) => {
	// Button click
	document.getElementById(button).addEventListener('click', handler)

	// Enter key on input
	document.getElementById(input).addEventListener('keydown', (e) => {
		if (e.key === 'Enter') {
			e.preventDefault()
			handler()
		}
	})
})

// Set up click handlers for button-only actions
buttonActions.forEach(({ button, handler }) => {
	document.getElementById(button).addEventListener('click', handler)
})

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Driver Functions
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 */

function renderTree() {
	// Update visual tree representation
	const output = document.getElementById('tree-output')
	output.textContent = prettyPrint(tree.root)

	// Update traversal information
	updateTraversalInfo()
	updateBalanceButton()
}

function updateTraversalInfo() {
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

	// Handle isBalanced seperately
	const balanced = tree.isBalanced()
	const balancedSpan = document.getElementById('balanced').querySelector('span')
	balancedSpan.textContent = balanced
	balancedSpan.setAttribute('data-value', balanced)
}

function handleInsert() {
	const inputData = getInput('insert')
	if (!inputData) return
	const { input, value } = inputData

	tree.insert(value)
	tree.saveToStorage()
	clearInputAndRefresh(input)
}

function handleDelete() {
	const inputData = getInput('delete')
	if (!inputData) return
	const { input, value } = inputData

	// Check if value exists before deleting
	if (!tree.find(value)) {
		alert(`Value ${value} not found in tree`)
		clearInputAndRefresh(input, false) // Don't re-render tree since nothing has changed
		return
	}

	tree.deleteItem(value)
	tree.saveToStorage()
	clearInputAndRefresh(input)
}

function handleFind() {
	const inputData = getInput('find')
	if (!inputData) return
	const { input, value } = inputData

	// Search for value and show result
	const found = tree.find(value)
	if (found) {
		alert(`Value ${value} found in tree!`)
	} else {
		alert(`Value ${value} not found in tree`)
	}

	clearInputAndRefresh(input, false) // Don't re-render since nothing has changed
}

function rebalanceTree() {
	tree.rebalance()
	tree.saveToStorage()
	renderTree()
}

function generateRandomTree() {
	const randomNumbers = Array.from({ length: 30 }, () => Math.floor(Math.random() * 150) + 1)

	// Rebuild tree
	tree = new Tree(randomNumbers)
	tree.saveToStorage()
	renderTree()
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Helper Functions
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

function getInput(inputId) {
	// Asign related id input to value
	const input = document.getElementById(inputId)
	const value = parseInt(input.value)

	// Allow only numbers
	if (isNaN(value)) {
		alert('Please enter a valid number')
		return null
	}

	// Input and Value returns for driver functions
	return { input, value }
}

function clearInputAndRefresh(input, shouldRender = true) {
	// Clear input
	input.value = ''

	// Refresh tree
	if (shouldRender) {
		renderTree()
	}
}

function updateBalanceButton() {
	// Handle button visibility only
	const balanceBtn = document.getElementById('balance-btn')
	const isBalanced = tree.isBalanced()

	balanceBtn.style.display = isBalanced ? 'none' : 'block'
}
