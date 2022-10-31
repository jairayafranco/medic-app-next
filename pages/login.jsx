import Avatar from '@mui/material/Avatar';
import LoadingButton from '@mui/lab/LoadingButton';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Spinner from '../components/Spinner';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { loginSchema } from '../schemas/schemas';
import Notify from '../components/Snackbar';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Login() {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [call, setCall] = useState({ open: false, type: '', message: '' });
    const router = useRouter();

    useEffect(() => {
        axios.get('https://source.unsplash.com/1920x1080/?hospital')
            .then(res => {
                setUrl(res.request.responseURL);
                setLoading(false);
            })
    }, [])

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit: values => {
            axios.post('/api/auth/login', values).then(({ data: { auth } }) => {
                if (auth) {
                    router.push('/panel');
                }
            }).catch(({ response: { data: { error, status, message } } }) => {
                if (!status) {
                    setCall({ open: true, type: 'warning', message });
                    formik.setSubmitting(false);
                }

                if (error) {
                    setCall({ open: true, type: 'error', message });
                    formik.setSubmitting(false);
                }
            });
        }
    })

    return (
        <>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />

                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Ingresar
                        </Typography>
                        <Box component="form" noValidate autoComplete='off' onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                fullWidth
                                id="username"
                                label="Usuario"
                                name="username"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                error={formik.touched.username && Boolean(formik.errors.username)}
                                helperText={formik.touched.username && formik.errors.username}
                                disabled={formik.isSubmitting}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                name="password"
                                label="Contraseña"
                                type="password"
                                id="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                                disabled={formik.isSubmitting}
                            />
                            <LoadingButton
                                type="submit"
                                fullWidth
                                loading={formik.isSubmitting}
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Iniciar Sesion
                            </LoadingButton>
                            {/* <Grid container>
                                    <Grid item xs>
                                        <Link href="#" variant="body2">
                                            Restablecer Contraseña
                                        </Link>
                                    </Grid>
                                </Grid> */}
                            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
                                {'Copyright © '}
                                MedicApp {''}
                                {new Date().getFullYear()}
                                {'.'}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>

                {
                    loading
                        ? <Grid item xs={false} sm={4} md={7} >
                            <Spinner />
                        </Grid>
                        : <Grid
                            item
                            xs={false}
                            sm={4}
                            md={7}
                            sx={{
                                backgroundImage: `url(${url})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundColor: (t) =>
                                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        />
                }
            </Grid>
            <Notify call={call} />;
        </>
    );
}