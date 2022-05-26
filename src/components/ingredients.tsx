import {capitalizeFirstLetters} from "../utils";
import React from "react";

export type ingredientType = {
    expireDate: Date;
    "alcoholic": boolean, "name": string
}

export const ingredients = [{"alcoholic": true, "name": "Vodka"}, {
    "alcoholic": true,
    "name": "Cointreau",
}, {"alcoholic": false, "name": "Cranberry juice"}, {"alcoholic": false, "name": "Lime juice"}, {
    "alcoholic": true,
    "name": "White rum",
}, {"alcoholic": false, "name": "Soda"}, {"alcoholic": true, "name": "Dark rum"}, {
    "alcoholic": true,
    "name": "Orange Curacao",
}, {"alcoholic": true, "name": "Blue Curacao"}, {"alcoholic": false, "name": "Almond syrup"}, {
    "alcoholic": true,
    "name": "Cachaca",
}, {"alcoholic": true, "name": "Tequila"}, {"alcoholic": true, "name": "Triple sec"}, {
    "alcoholic": false,
    "name": "Pineapple juice",
}, {"alcoholic": false, "name": "Coconut cream"}, {"alcoholic": true, "name": "Gin"}, {
    "alcoholic": false,
    "name": "Lemon juice",
}, {"alcoholic": false, "name": "Cola"}, {"alcoholic": true, "name": "Prosecco"}, {
    "alcoholic": true,
    "name": "Aperol",
}, {"alcoholic": true, "name": "Ginger beer"}, {"alcoholic": true, "name": "Coffee liqueur"}]

export const Ingredients = (ingredients: ingredientType[]) => {
    return (<div style={{float: "left"}}>
        <h1>
            {capitalizeFirstLetters("all possible ingredients")}
        </h1>
        {
            ingredients && <table>
                <thead>
                <td>Name</td>
                {/*<td>Alcoholic</td>*/}
                </thead>
                <tbody>
                {ingredients.map(({name, alcoholic}, idx) =>
                    <tr key={idx}>
                        <td><h4>{name}</h4></td>
                        {/*<td>{alcoholic.toString()}</td>*/}
                    </tr>)}
                </tbody>
            </table>
        }
    </div>)
}