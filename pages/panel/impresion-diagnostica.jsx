import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from '@mui/material/Grid';
import { useEffect } from 'react'
import { useFormik } from 'formik';
// import { examenFisicoSchema } from '../../schemas/schemas';
import { AppContext } from '../../context/AppContext';
import { saveSessionStorageData, getSessionStorageData, updatePaciente, moduleCompleted } from '../../helpers/helpers';

export default function ImpresionDiagnostica() {
    return (
        <div>
            <h1>Impresion Diagnostica</h1>
        </div>
    );
}