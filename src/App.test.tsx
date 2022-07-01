import React from 'react';
import {getTotalServers} from './App';

test('3', () => {
	expect(getTotalServers([
		{RAM: 1, CPUCore: 1, diskSpace: 1},
		{RAM: 1, CPUCore: 1, diskSpace: 1},
		{RAM: 1, CPUCore: 1, diskSpace: 1},
	], {RAM: 2, CPUCores: 2, diskSpace: 2})).toEqual(2);
});
test('4', () => {
	expect(getTotalServers([
		{RAM: 1, CPUCore: 1, diskSpace: 1},
		{RAM: 1, CPUCore: 1, diskSpace: 1},
		{RAM: 1, CPUCore: 1, diskSpace: 1},
		{RAM: 1, CPUCore: 1, diskSpace: 1},
	], {RAM: 2, CPUCores: 2, diskSpace: 2})).toEqual(2);
});
test('5', () => {
	expect(getTotalServers([
		{RAM: 1, CPUCore: 1, diskSpace: 1},
		{RAM: 1, CPUCore: 1, diskSpace: 1},
		{RAM: 1, CPUCore: 1, diskSpace: 1},
		{RAM: 1, CPUCore: 1, diskSpace: 1},
		{RAM: 1, CPUCore: 1, diskSpace: 1},
	], {RAM: 2, CPUCores: 2, diskSpace: 2})).toEqual(3);
});
test('full field consumption', () => {
	expect(getTotalServers([
		{RAM: 2, CPUCore: 1, diskSpace: 1},
		{RAM: 1, CPUCore: 1, diskSpace: 2},
	], {RAM: 2, CPUCores: 2, diskSpace: 2})).toEqual(2);
});
test('empty', () => {
	expect(getTotalServers([], {RAM: 2, CPUCores: 2, diskSpace: 2})).toEqual(0);
});

test('three apps', () => {
	expect(getTotalServers([
		{RAM: 1, CPUCore: 1, diskSpace: 1},
		{RAM: 2, CPUCore: 1, diskSpace: 1},
		{RAM: 1, CPUCore: 1, diskSpace: 1},
	], {RAM: 2, CPUCores: 20, diskSpace: 20})).toEqual(2);
});
