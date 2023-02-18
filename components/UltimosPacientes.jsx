import { Fragment, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import TableRow from '@mui/material/TableRow';
import { getUltimosPacientes } from '../api/axiosApi';

export default function UltimosPacientes() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        getUltimosPacientes().then(res => setRows(res.pacientes || []));
    }, []);

    return (
        <Fragment>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Ultimos Pacientes
            </Typography>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Fecha</TableCell>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Tipo de Consulta</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((data) => (
                        <TableRow key={data._id}>
                            <TableCell>{new Date(data.datosBasicos.fechaConsulta).toLocaleDateString('es-ES', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                            </TableCell>
                            <TableCell>{data.datosBasicos.nombreUsuario}</TableCell>
                            <TableCell>{data.datosBasicos.tipoConsulta}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Fragment>
    );
}