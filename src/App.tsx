import React from 'react';
import './App.css';

function checkNumber(input) {
	console.log(input)
	let a = Number.NEGATIVE_INFINITY
	for (let i = 0; i < input.length; i++) {
		let currentSum = input[i]
		console.log(`=====`)
		console.log(currentSum)
		for (let j = i + 1; j < input.length; j++) {
			console.log(`  ${input[j]}`)
			currentSum += input[j]
			if (currentSum > a) {
				console.log(`>>> ${currentSum}`)
				a = currentSum
			} else {
				console.log(` >>> ${currentSum} < ${a}`)
			}
		}
	}
	return a
}

function App() {
	const a = checkNumber([1, 4, -6, 3, 7, -3, 10])
	return <>{a}</>
}

export default App;
