import React, {useEffect} from "react";
import {ingredients, ingredientType} from "./components/ingredients";

export const capitalizeFirstLetters = (mySentence: string): string => {
    const words = mySentence.split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    return words.join(" ");
};

export function generateRandomDateInTheFuture(): Date {
    return new Date(Number(new Date()) + Math.floor(Math.random() * 10000000000));
}

export const randomizeInventory = (ingredients: any[]) => {
    const result: ingredientType[] = [...ingredients]
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
        // result[i].quantity = getRandomInt()
        result[i].expireDate = generateRandomDateInTheFuture()
    }
    return result.slice(0, 10);
}

export const randomElement = <T, >(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)];
};

export const useLocalStorage = (storageKey: string, initialState: ingredientType[]): [ingredientType[], React.Dispatch<React.SetStateAction<ingredientType[]>>] => {
    const item = localStorage.getItem(storageKey)
    const [value, setValue] = React.useState<ingredientType[]>(
        item ? JSON.parse(item) : initialState
    );

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(value));
    }, [storageKey, value]);

    return [value, setValue];
};

export const getRandomInt = (max = 10, min = 1) => {
    return Math.floor(Math.random() * (max - min) + min);
};
