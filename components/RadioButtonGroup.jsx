import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { lodash as _ } from '../lib/lodash';

export default function RadioButtonGroup({ title, options, onChange }) {
    return (
        <FormControl>
            <FormLabel>{title}</FormLabel>
            <RadioGroup row defaultValue="procedimientos" onChange={onChange}>
                {
                    options.map((option, index) => {
                        return (
                            <FormControlLabel key={index} value={option} control={<Radio />} label={_.capitalize(option)} />
                        );
                    })
                }
            </RadioGroup>
        </FormControl>
    );
}