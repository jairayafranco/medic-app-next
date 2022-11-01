import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material"

export default function Selector({ title = '', value = '', values = [], onChange, error, helperText }) {
    return (
        <FormControl fullWidth variant="standard">
            <InputLabel>{title}</InputLabel>
            <Select
                name={title}
                value={value}
                style={{ width: '90%' }}
                onChange={(e) => onChange(e.target.value)}
                error={error}
            >
                {values.map((value, index) => (
                    <MenuItem value={value} key={index}>{value}</MenuItem>
                ))}
            </Select>
            {helperText && <FormHelperText error>{helperText}</FormHelperText>}
        </FormControl>
    )
}