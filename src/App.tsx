import React from 'react';
import './App.css';

const apps = [
	{name: "app2", RAM: 128, CPUCore: 3, diskSpace: 200},
	{name: "app2", RAM: 128, CPUCore: 4, diskSpace: 200},
	{name: "app2", RAM: 128, CPUCore: 2, diskSpace: 200},
	{
		name: "app3",
		RAM: 128,
		CPUCore: 1, diskSpace: 200,
	}]

// const totalRam = apps.reduce((previousValue, currentValue) => previousValue + currentValue.RAM, 0)

const server = {name: "Server1", RAM: 128, CPUCore: 7, diskSpace: 200}

export function getTotalServers(apps, {CPUCores = 2, RAM = 2, diskSpace = 2}) {
	let totalServers = 0;

	let tempCPURCores = 0
	let tempRAM = 0
	let tempDiskSpace = 0

	apps.forEach((app) => {
		tempCPURCores -= app.CPUCore
		tempRAM -= app.RAM
		tempDiskSpace -= app.diskSpace

		if (tempCPURCores <= 0 || tempRAM <= 0 || tempDiskSpace <= 0) {
			totalServers += 1
			tempCPURCores = CPUCores
			tempRAM = RAM
			tempDiskSpace = diskSpace
		}
	})

	return totalServers
}

// getTotalServers(apps.map(({CPUCore}) => CPUCore), 8)

function App() {
	return <>
		hello
	</>
}

export default App;
