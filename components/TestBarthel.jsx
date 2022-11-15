import { Fragment, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TextField } from '@mui/material';
import Questions from './BarthelQuestions';
import { useFormik } from 'formik';
import { AppContext } from '../context/AppContext';

export default function BarthelTable() {
    const { setBarthelResults } = AppContext();
    const questions = Questions();
    const [points, setPoints] = useState({});
    const [resultados, setResultados] = useState({});

    const formik = useFormik({
        initialValues: {
            ...questions.reduce((acc, curr) => ({ ...acc, [curr.name]: '' }), {}),
        },
    });

    const handlePoints = (e, itemPoints) => {
        const { name, value } = e.target;

        if (!itemPoints.includes(Number(value))) {
            formik.setFieldValue(name, '');
            return;
        }

        setPoints(({ ...points, [name]: Number(value) }));
    }

    useEffect(() => {
        const sumatoria = Object.values(points).reduce((a, b) => Number(a) + Number(b), 0);

        if (sumatoria < 20) {
            setResultados({ barthel: "DEPENDENCIA TOTAL", puntuacion: sumatoria });
        }
        if (sumatoria >= 20 && sumatoria < 36) {
            setResultados({ barthel: "DEPENDENCIA GRAVE", puntuacion: sumatoria });
        }
        if (sumatoria >= 40 && sumatoria <= 55) {
            setResultados({ barthel: "DEPENDENCIA MODERADA", puntuacion: sumatoria });
        }
        if (sumatoria >= 60 && sumatoria <= 95) {
            setResultados({ barthel: "DEPENDENCIA LEVE", puntuacion: sumatoria });
        }
        if (sumatoria === 100) {
            setResultados({ barthel: "INDEPENDENCIA", puntuacion: sumatoria });
        }
    }, [points]);

    useEffect(() => {
        setBarthelResults({ ...resultados, points });
    }, [resultados]);

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
                                                    type="number"
                                                    value={formik.values[item.name]}
                                                    onChange={formik.handleChange}
                                                    onBlur={(e) => handlePoints(e, item.points)}
                                                    style={{ width: 50 }}
                                                    inputProps={{
                                                        style: { textAlign: 'center' }
                                                    }}
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
                        <TableCell colSpan={3} align="center">{resultados.puntuacion}</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell style={{ textAlign: 'right' }} colSpan={2}>
                            RESULTADO DE VALORACIÓN DE LA CAPACIDAD FUNCIONAL SEGÚN INDICE DE BARTHEL:
                        </TableCell>
                        <TableCell colSpan={2} align="center">{resultados.barthel}</TableCell>
                    </TableRow>

                </TableBody>
            </Table>
        </TableContainer>
    );
}