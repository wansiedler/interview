import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {MobileDatePicker} from "@mui/x-date-pickers";

import React, {Component} from "react";
import Button from '@mui/material/Button';
import {Grid} from "@mui/material";
import {generateRandomDateInTheFuture, randomizeInventory, useLocalStorage} from "../utils";
import {ingredients} from "./ingredients";
import {withSnackbar} from 'notistack';

class AddIngredient extends Component {
    state = {
        date: generateRandomDateInTheFuture(),
        cocktail: null
    };

    handleSubmit = e => {
        e.preventDefault();
        if (!this.state.cocktail.length) {
            this.props.enqueueSnackbar('Ingredient please!')
            return
        }
        this.props.addIngredient(this.state.cocktail, this.state.date);
        this.setState({
            date: generateRandomDateInTheFuture(),
            cocktail: null
        })
    };

    render() {
        return (
            <>
                <Grid xs={4} item>
                    <Autocomplete
                        // disablePortal
                        id="combo-box-demo"
                        options={this.props.options}
                        // sx={{width: 300}}
                        value={this.state.cocktail}

                        renderInput={(params) => <TextField {...params} label="Ingredient"/>}
                        onChange={(event, values) => {
                            this.setState({...this.state, cocktail: values.label})
                        }}
                    />
                </Grid>
                <Grid xs={4} item>
                    <MobileDatePicker
                        // label="Expire date"
                        inputFormat="dd/MM/yyyy"
                        views={['year', 'month', 'day']}
                        style={{width: "100%"}}

                        value={this.state.date}
                        onChange={date => this.setState({...this.state, date})}
                        renderInput={(params) => <TextField {...params} fullWidth/>}
                    />
                </Grid>

                <Grid xs={4} item>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={{height: "100%"}}
                        fullWidth
                        onClick={this.handleSubmit}
                    >
                        Add
                    </Button>
                </Grid>

            </>
        );
    }
}

export default withSnackbar(AddIngredient);

