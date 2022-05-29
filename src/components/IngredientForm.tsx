import React from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {useFormik} from "formik";
import {date, object, string} from 'yup';
import {isDate, parse} from "date-fns";
import Button from "@mui/material/Button";
import {MobileDatePicker} from "@mui/x-date-pickers";
import {Grid} from "@mui/material";

export default function IngredientForm({
	                                       options,
	                                       addIngredient,
	                                       expireDate = new Date(),
                                       }: { options: string[], addIngredient: any, expireDate?: Date }) {
	const today = new Date();

	function parseDateString(value, originalValue) {
		return isDate(originalValue) ? originalValue : parse(originalValue, "yyyy-MM-dd", new Date());
	}

	const validationSchema = object({
		date: date()
			.nullable(false)
			.transform(parseDateString)
			.min(today, 'Date must be later than today')
			.required('Date is required'),

		ingredient: string()
			.nullable(false)
			.oneOf(options)
			.required('Ingredient is required'),
	});

	const formik = useFormik({
		initialValues: {
			ingredient: options[0], date: expireDate,
		},
		validationSchema: validationSchema,
		onSubmit: (values, {resetForm, setFieldValue}) => {
			addIngredient(values.ingredient, values.date)
			setFieldValue("ingredient", "")
			resetForm()
		},
		validateOnBlur: true,
		validateOnChange: true,
		enableReinitialize: true,
	});

	return (
		<form onSubmit={formik.handleSubmit} style={{width: "100%"}}>
			<Grid
				container
				spacing={1}
				padding={4}
			>
				<Grid item xs={4}>
					<Autocomplete
						fullWidth
						options={options}
						value={options.includes(formik.values.ingredient) ? formik.values.ingredient : null}
						onChange={(event, value) => {
							formik.setFieldValue("ingredient", value)
						}}
						renderInput={(params) => (<TextField
							{...params}
							variant="outlined"
							label="Ingredient"
							error={formik.touched.ingredient && Boolean(formik.errors.ingredient)}
							helperText={formik.touched.ingredient && formik.errors.ingredient}
						/>)}
					/>
				</Grid>
				<Grid item xs={3}>
					<MobileDatePicker
						label="Expire date"
						inputFormat="dd/MM/yyyy"
						views={['year', 'month', 'day']}
						value={formik.values.date}
						onChange={value => formik.setFieldValue("date", value)}
						renderInput={(params) => <TextField {...params} fullWidth
						                                    error={formik.touched.date && Boolean(formik.errors.date)}
						                                    helperText={formik.touched.date && formik.errors.date}
						/>}
					/>
				</Grid>
				<Grid item xs={1}>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						fullWidth
						style={{minHeight: 55}}
					>
						Add
					</Button>
				</Grid>
			</Grid>
		</form>
	)
}
