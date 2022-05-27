import React, {useMemo, useState} from 'react';
import './App.css';
import {ingredients} from "./components/ingredients";
import {cocktails} from "./components/cocktails";
import {capitalizeFirstLetters, randomizeInventory, useLocalStorage} from "./utils";

import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {Grid, IconButton, TextField, Stack, Button} from "@mui/material";
import {MobileDatePicker} from "@mui/x-date-pickers";

import DeleteIcon from '@mui/icons-material/Delete';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import AddIngredient from "./components/AddIngredient";
import {SnackbarProvider, useSnackbar} from 'notistack';

const Item = styled(Paper)(({theme}) => ({
	backgroundColor: "#fff",
	opacity: 0.9,
	...theme.typography.body2,
	padding: theme.spacing(1),
	margin: 5,
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

function App() {
	// get the inventory from the persistently stored or set the first randomized version
	const [ingredientsInStock, setIngredientsInStock] = useLocalStorage("ingredientsInStock", randomizeInventory(ingredients));

	// recalculate, flatten and memoize unexpired in-stock ingredients but only on ingredientsInStock update
	const validIngredientsInStock = useMemo(() => {
		const now = new Date()
		return ingredientsInStock.filter(({expireDate}) => {
			return new Date(expireDate) > now
		}).map(({name}) => name)
	}, [ingredientsInStock]);

	const {enqueueSnackbar, closeSnackbar} = useSnackbar();

	// recalculate, flatten and memoize cocktails on validIngredientsInStock update
	const validCocktails = useMemo(() => {
		const newCocktails = cocktails.filter(({ingredients}) => ingredients.every(ingredient => validIngredientsInStock.includes(ingredient)))
		if (newCocktails.length) {
			enqueueSnackbar(`New cocktail${newCocktails.length > 1 ? "s" : ""}!`);
		} else {
			enqueueSnackbar('No cocktails yet! Add more ingredients!');
		}
		return newCocktails
	}, [validIngredientsInStock]);

	// date update, but can be customized to any necessary field
	const updateInventory = ({name, currentDate}: { name: string, currentDate: Date | null }) => {
		if (!currentDate) return
		const index = ingredientsInStock.findIndex((newIngredientInStock) => newIngredientInStock.name === name);
		ingredientsInStock[index].expireDate = currentDate;
		setIngredientsInStock([...ingredientsInStock])
	}

	const addIngredient = (name, expireDate) => {
		setIngredientsInStock([...ingredientsInStock, {name, expireDate, alcoholic: true}])
	};

	const deleteIngredient = (item) => {
		setIngredientsInStock(ingredientsInStock.filter(({name}) => name !== item))
	};

	const ingredientsToAdd = ingredients.filter(({name}) => !validIngredientsInStock.includes(name)).map(({name}, idx) => ({
		id: idx, label: name,
	}))

	return (
		<>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<Grid container spacing={1}>
					{ingredientsToAdd.length && <Grid container spacing={1} margin={4}>
                        <AddIngredient
                            options={ingredientsToAdd}
                            addIngredient={addIngredient}
                        />
                    </Grid>}
					<Grid item xs={8}>
						<Item>
							<Box margin={1}>
								<h2>
									{capitalizeFirstLetters("ingredients in stock")}
								</h2>
							</Box>
							<Grid
								container
								spacing={1}
								alignItems="center"
							>
								<Grid item xs={5}>
									<Box margin={1}>
										<h3>Name</h3>
									</Box>
								</Grid>
								<Grid item xs={5}>
									<Box margin={1}>
										<h3>Expiry Date</h3>
									</Box>
								</Grid>
								{
									ingredientsInStock && <>
										{
											ingredientsInStock.map(({
												                        name, alcoholic,
												                        // quantity,
												                        expireDate,
											                        }, idx) =>

												<Grid container spacing={1} key={idx} marginTop={1}>
													<Grid item xs={5}>
														<h4>{name}</h4>
													</Grid>
													<Grid item xs={5}>
														<MobileDatePicker
															// label="Expire date"
															inputFormat="dd/MM/yyyy"
															views={['year', 'month', 'day']}
															value={new Date(expireDate)}
															// onChange={handleChange}
															onChange={date => updateInventory({
																name,
																currentDate: date,
															})}
															renderInput={(params) => <TextField {...params} />}
														/>
													</Grid>
													<Grid item xs={2}>
														<Button startIcon={<DeleteIcon/>}
														        onClick={() => deleteIngredient(name)}
														>
															Delete
														</Button>
													</Grid>
												</Grid>,
											)
										}
                                    </>
								}
							</Grid>
						</Item>
					</Grid>
					<Grid item xs={3}>
						<Item>
							<Box margin={1}>
								<h2>{capitalizeFirstLetters("cocktails")}</h2>
							</Box>
							{
								validCocktails && <div>
									{validCocktails.map(({
										                     name,
										                     ingredients,
									                     }, idx) => {
										return <Item key={idx}>
											< h4> {name} </h4>
											{ingredients && <>
												{
													ingredients.map((ingredient, idx) => <Item
														key={idx}>{ingredient}</Item>)
												}
                                            </>}
										</Item>
									})
									}
                                </div>
							}
						</Item>
					</Grid>
				</Grid>
			</LocalizationProvider>
		</>
	);
}

export default App;
