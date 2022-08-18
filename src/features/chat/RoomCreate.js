
import { withFormik } from "formik";
import React from 'react';
import moment from 'moment';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { connect } from 'react-redux'
import { validacionOrganizacion } from "./validacionOrganizacion";
import { UsuarioSelect } from "./UsuarioSelect";
import { abrirModalResponde, guardarRooms } from "../../acciones/chats";
import { ModalResponde } from "./ModalResponde";
import SaveIcon from '@mui/icons-material/Save';


const form = props => {

  const theme = createTheme();

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props;


  return (
    <div >
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 0 }}>
              <Grid container spacing={1}>

                <Grid item xs={12}>
                  <TextField
                    id="nombre"
                    name="nombre"
                    label="Nombre"
                    value={values.nombre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.nombre ? errors.nombre : ""}
                    error={touched.nombre && Boolean(errors.nombre)}
                    inputProps={{ style: { textTransform: 'capitalize' } }}
                    autoComplete="off"
                    margin="dense"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <UsuarioSelect name="responde" />
                </Grid>
         
              </Grid>

              <Box
                sx={{
                  marginTop: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Button type="submit" color='success' fullWidth variant="contained"
                  sx={{ mt: 1, maxWidth: 200 }} startIcon={ <SaveIcon />}
                >
                  {'Crear'}
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      <ModalResponde />
    </div >
  );
};

const Chat = withFormik({

  enableReinitialize: true,

  mapPropsToValues: (props) => ({
    id: null,
    pregunta: 1,
    responde: 30,
    fecha: moment().minutes(0).seconds(0).toDate(),
    estado: "1",
    nombre: ""
  }),

  validationSchema: validacionOrganizacion,

  handleSubmit: (values, { props, setSubmitting }) => {
    // console.log("values-> ", values)
    props.registroDeChat(values);
    setSubmitting(false);
  },

})(form);

//función para enviar un state del selector a las props
const mapStateToProps = (
  state
) => ({
  //   initialValues: state.fincas.finca,
})

//función para usar un dispatch mediante props
const mapDispatchToProps = (dispatch) => ({
  registroDeChat: (values) => {
    dispatch(guardarRooms(values))
  }
})

export const RoomCreate = connect(mapStateToProps, mapDispatchToProps)(Chat)