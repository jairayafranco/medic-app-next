import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Image from 'next/image';
import Logo from '../../public/logo.png';
import UltimosPacientes from '../../components/UltimosPacientes';

export default function Home() {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>

        <Grid item xs={12} md={6} lg={7}>
          <Paper
            elevation={6}
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <Typography align='center' component="h1" variant="h4 bold" color="primary">
              DR. J. SAMUEL AYA
            </Typography>
            <Typography align='center' component="h1" variant="h6" color="primary" gutterBottom>
              NIT: 72193409-8
            </Typography>
            <Typography align='center' component="div">
              <Image
                src={Logo}
                alt="Logo"
                priority
              />
            </Typography>
            <Typography align='center' component="h1" variant="h6" color="primary" gutterBottom>
              Calle 08 #10-65 Barrio Pueblo Nuevo<br />
              samuelaya@live.com<br />
              Teléfono 3118609660
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={5} sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1
        }}>
          <Grid item >
            <Paper
              elevation={6}
              sx={{ p: 2 }}
            >
              <Typography align='center' component="h1" variant="h6" color="primary">
                MISIÓN
              </Typography>
              <Typography align='justify' component="p" variant='overline'>
                Satisfacer eficaz y eficientemente las necesidades de cuidado de salud de la comunidad del municipio,
                brindando la mejor atención médica basada en la ética y en la evidencia científica, acompañando al paciente
                y a su familia durante el proceso de recuperación de la enfermedad.
              </Typography>
            </Paper>
          </Grid>

          <Grid item >
            <Paper
              elevation={6}
              sx={{ p: 2 }}
            >
              <Typography align='center' component="h1" variant="h6" color="primary">
                VISIÓN
              </Typography>
              <Typography align='justify' component="p" variant='overline'>
                Implementar, impulsar y mejorar un modelo asistencial privado basado en la calidad para el paciente,
                convirtiéndonos en referente de la consulta particular del municipio, aportando confianza y seguridad
                en el servicio de salud que reciban todos los pacientes.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={6} sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <UltimosPacientes />
          </Paper>
        </Grid>

      </Grid>
    </Container>
  );
}