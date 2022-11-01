import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import esLocale from 'date-fns/locale/es'

export default function DateSelector({ name, label, value, onChange, error, helperText, InputLabelProps }) {
    const onKeyDown = (e) => {
        e.preventDefault();
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={esLocale} >
            <DatePicker
                openTo="year"
                views={['year', 'month', 'day']}
                label={label}
                value={value || null}
                minDate={new Date(1900, 0, 1)}
                maxDate={new Date()}
                inputFormat="dd/MM/yyyy"
                onChange={(e) => onChange(e)}
                renderInput={(params) =>
                    <TextField
                        {...params}
                        variant='standard'
                        name={name}
                        style={{ width: '90%' }}
                        error={error}
                        helperText={helperText}
                        InputLabelProps={InputLabelProps}
                        onKeyDown={onKeyDown}
                    />
                }
            />
        </LocalizationProvider>
    );
}