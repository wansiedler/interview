import React, {ReactElement, useState} from 'react';
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

type MenuItem = {
	title: string;
	subItems?: Array<string>;
};

type MenuConfig = Array<MenuItem>;

function Solution({menuConfig}: { menuConfig: MenuConfig }): ReactElement {
	const [active, setActive] = useState("");

	return <div className="menu-wrapper">
		{menuConfig.map(
			({title, subItems}, idx) =>
				<div data-test-id={"first-level-" + title.toLowerCase()}

				     key={idx}
				>
					{title}
					{
						subItems && <>
                            <button
                                data-test-id={"button-" + title.toLowerCase()}
                                onClick={() => {
									setActive(active === title ? "" : title)
								}}
                            >
								{active !== title ? "Expand" : "Hide"}
                            </button>
							{active === title ? <ul data-test-id={"ul-" + title.toLowerCase()}>
								{
									subItems.map((item, idx) => <li
										data-test-id={"li-" + title.toLowerCase() + "-" + item.toLowerCase()}
										key={idx}
									>{item}</li>)
								}
							</ul> : null}

                        </>
					}
				</div>,
		)}

	</div>;
}

function App() {
	// const a = checkNumber([1, 4, -6, 3, 7, -3, 10])
	return <>
		<Solution
			menuConfig={[
				{
					title: 'Home',
				},
				{
					title: 'Services',
					subItems: ['Cooking', 'Cleaning'],
				},
				{
					title: 'Contact',
					subItems: ['Phone', 'Mail'],
				},
			]}
		/>
	</>
}

export default App;
