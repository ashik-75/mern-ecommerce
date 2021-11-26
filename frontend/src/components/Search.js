import { ClassNames } from '@emotion/react';
import { FormControl, InputLabel, MenuItem, NativeSelect, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react';
import {makeStyles} from "@mui/styles"

const useStyle = makeStyles(theme=> ({
    root: {
        display: "flex"
    }
}))

const Search = ({search,category,setSearch,setCategory}) => {
    const classes = useStyle()

    return (
        <div className={classes.root}>
            <TextField variant="standard"  onChange={(e)=>setSearch(e.target.value)} value={search} label="searching..." placeholder="Enter search" id="fullWidth" />

            <FormControl sx={{ ml: 3,  minWidth: 100 }} variant="standard" >
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    label=""
                    onChange={(e)=>setCategory(e.target.value)}
                >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="vegetabless">Vegetabless</MenuItem>
                    <MenuItem value="meat">Meat</MenuItem>
                   
                </Select>
            </FormControl>
        </div>
    )
}

export default Search
// 01706-636000s