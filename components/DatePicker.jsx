import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import esLocale from 'date-fns/locale/es'

export default function DateSelector({ name, label, value, onChange, error, helperText }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={esLocale} >
            <MobileDatePicker
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
                    />
                }
                InputProps={{
                    endAdornment: (
                        <InsertInvitationIcon />
                    ),
                }}
            />
        </LocalizationProvider>
    );
}