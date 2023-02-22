import { Fragment, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { questions } from '../data/barthelQuestions';
import { useFormik } from 'formik';
import { AppContext } from '../context/AppContext';
import { lodash as _ } from '../lib/lodash';

export default function BarthelTable() {
    const { barthelResults, setBarthelResults } = AppContext();

    const formik = useFormik({
        initialValues: {
            ...questions.reduce((acc, curr) => ({ ...acc, [curr.name]: '' }), {}),
        },
    });

    useEffect(() => {
        const points = barthelResults.points;
        if (!_.isEmpty(points)) {
            _.forEach(points, (value, key) => {
                formik.setFieldValue(key, value);
            });
        }
    }, []);

    const handlePoints = (e, itemPoints) => {
        const { name, value } = e.target;
        const points = { ...barthelResults.points, [name]: Number(value) };
        const sumatoria = _.sum(_.values(points));

        if (!itemPoints.includes(Number(value))) {
            formik.setFieldValue(name, '');
            return;
        }

        const barthel = {
            0: 'DEPENDENCIA TOTAL',
            20: 'DEPENDENCIA GRAVE',
            40: 'DEPENDENCIA MODERADA',
            60: 'DEPENDENCIA LEVE',
            100: 'INDEPENDENCIA',
        }

        const barthelIndex = _.findKey(barthel, (value, key) => sumatoria <= key);
        const barthelResult = barthel[barthelIndex];

        setBarthelResults({ points, barthel: barthelResult, puntuacion: sumatoria });
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
                        <TableCell colSpan={3} align="center">{barthelResults.puntuacion}</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell style={{ textAlign: 'right' }} colSpan={2}>
                            RESULTADO DE VALORACIÓN DE LA CAPACIDAD FUNCIONAL SEGÚN INDICE DE BARTHEL:
                        </TableCell>
                        <TableCell colSpan={2} align="center">{barthelResults.barthel}</TableCell>
                    </TableRow>

                </TableBody>
            </Table>
        </TableContainer>
    );
}