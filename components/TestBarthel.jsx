import { Fragment, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TextField } from '@mui/material';
import Questions from './BarthelQuestions';

export default function BarthelTable() {
    const questions = Questions();
    const [inputKey, setInputKey] = useState('');
    const [points, setPoints] = useState({});

    const handlePoints = (e, itemPoints) => {
        const { name, value } = e.target;

        if (!itemPoints.includes(Number(value))) {
            setInputKey(`${Math.floor((Math.random() * 1000))}-min`);
            return;
        }

        setPoints(({ ...points, [name]: value }));
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell align="center">TEST DE BARTHEL: ACTIVIDADES BÁSICAS DE LA VIDA DIARIA</TableCell>
                        <TableCell align="center">PUNTOS</TableCell>
                        <TableCell align="center">PUNTAJE</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {questions.map((item, index) => (
                        <Fragment key={index}>
                            <TableRow>
                                <TableCell style={{ width: '12%', textAlign: 'center' }} rowSpan={item.detail.length + 1}>
                                    {item.name}
                                </TableCell>
                            </TableRow>

                            {item.detail.map((detail, index) => (
                                <Fragment key={index}>
                                    <TableRow>
                                        <TableCell>{detail}</TableCell>
                                        <TableCell align="center">{item.points[index]}</TableCell>
                                        {
                                            index === 0 &&
                                            <TableCell rowSpan={item.detail.length} align="center">
                                                <TextField
                                                    name={item.name}
                                                    size='small'
                                                    variant="standard"
                                                    type="text"
                                                    defaultValue={points[item.name]}
                                                    onBlur={(e) => handlePoints(e, item.points)}
                                                    style={{ width: 50 }}
                                                    inputProps={{
                                                        style: { textAlign: 'center' }
                                                    }}
                                                    key={inputKey}
                                                    autoComplete='off'
                                                />
                                            </TableCell>
                                        }
                                    </TableRow>
                                </Fragment>
                            ))}
                        </Fragment>
                    ))}

                    <TableRow>
                        <TableCell style={{ textAlign: 'right' }} colSpan={3}>
                            SUMATORIA TOTAL
                        </TableCell>
                        <TableCell colSpan={3} align="center">{Object.values(points).reduce((a, b) => Number(a) + Number(b), 0)}</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell style={{ textAlign: 'right' }} colSpan={2}>
                            RESULTADO DE VALORACIÓN DE LA CAPACIDAD FUNCIONAL SEGÚN INDICE DE BARTHEL:
                        </TableCell>
                        <TableCell colSpan={2} align="center">DEPENDENCIA TOTAL</TableCell>
                    </TableRow>

                </TableBody>
            </Table>
        </TableContainer>
    );
}