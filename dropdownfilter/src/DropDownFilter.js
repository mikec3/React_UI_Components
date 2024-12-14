import React, {useEffect, useState} from 'react'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import { Menu } from '@mui/material';


// https://mui.com/material-ui/react-select/ -- Multiple Select - Checkboxes
//https://codesandbox.io/p/sandbox/material-ui-multiple-select-with-select-all-option-givp5?file=%2Fsrc%2FApp.js

const DropDownFilter = (props) => {

        // Available filter solutions
        const names = [
            'King'
            , 'Snohomish'
            , 'Pierce'
        ]

    // store the current filter seleections - start off with everything selected
    const [filterItemName, setFilterItemName] = useState(names);
    // store boolean if the 'Select All' button - start off with all selected
    const [isAllSelected, setIsAllSelected] = useState(true);

    // everytime filterItemName changes, do something
    // this will also run on startup because it's useEffect
    useEffect(()=> {
        console.log(filterItemName);
    }, [filterItemName]);

    // handle when filter dropdown selection is changed
    const handleChange = (event) => {
        // log all selected values
        console.log(event.target.value);
        // extract the selection array into variable 'value'
        const {
            target: { value },
            } = event;

        // On autofill we get a stringified value.
        var processedValue = value;
        if (typeof value === 'string'){
            processedValue = value.split(',');
        }
        // check for All Selected
        if (processedValue.includes('Select All')){
            if(isAllSelected){  // if all selected is already true, then make everything empty
                setIsAllSelected(false);
                setFilterItemName([]);
            }else {             // all has been selected, make the filter selection all possible values
                setIsAllSelected(true);
                setFilterItemName(names);
            }
        } else if (isAllSelected) { // all selected WAS true, but now an item has been removed
            setIsAllSelected(false);
            setFilterItemName(processedValue);
        } else {                    // all selected isn't involved, just fill the selected value into the filters
            setFilterItemName(processedValue); 
        }
    };

    return (
        <div className='FilterItem'>
        <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-checkbox-label">County</InputLabel>
            <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={filterItemName}
            onChange={handleChange}
            input={<OutlinedInput label="County" />}
            renderValue={(selected) => selected.join(', ')}
            >
                <MenuItem value={"Select All"}>
                    <Checkbox checked={isAllSelected}/>
                    <ListItemText primary={"Select All"}/>
                </MenuItem>
            {names.map((name) => (
                <MenuItem key={name} value={name}>
                <Checkbox checked={filterItemName.includes(name)} />
                <ListItemText primary={name} />
                </MenuItem>
            ))}
            </Select>
        </FormControl>
        </div>
    )
}

export default DropDownFilter;