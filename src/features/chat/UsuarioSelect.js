import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { useField, useFormikContext } from "formik";
import { retornaUsuarios } from '../../acciones/datos';
import { abrirModalResponde } from '../../acciones/chats';
import { Box, Button, Grid, Stack, TextField } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export const UsuarioSelect = ({ ...props }) => {

    const dispatch = useDispatch();

    const [age, setAge] = React.useState('');

    const [field, , { setValue }] = useField(props);

    const { setFieldValue } = useFormikContext();

    React.useEffect(() => {
        dispatch(retornaUsuarios());
        setAge(field.value || 1);
    }, [dispatch])

    const { usuarios } = useSelector(state => state.ui);

    const handleChange = (event) => {
        setAge(event.target.value);
        setFieldValue("responde", event.target.value)
    };

    const handleClick = () => {
        dispatch(abrirModalResponde());
    }

    return (
        <div>
            <FormControl >
                <Grid container spacing={1}>
                    <Grid item xs={12} md={7}>
                        {/* <InputLabel id="responde-label">Responde</InputLabel>
                        <Select
                            labelId="responde-label"
                            id="responde"
                            value={age}
                            onChange={handleChange}
                            autoWidth
                            label="Usuarios"
                        >
                            {
                                usuarios.map((usuario) => (
                                    <MenuItem key={usuario.id} value={usuario.id}>{usuario.nombre}</MenuItem>
                                ))
                            }
                        </Select> */}

                        <TextField
                            id="responde"
                            name="responde"
                            label="Responde"
                            autoComplete="off"
                            margin="dense"
                            variant="outlined"
                            fullWidth
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Button type="button" color='info' variant="contained"
                            sx={{ mt: 1 }} startIcon={<PersonAddIcon />} onClick={handleClick}
                        >
                            {'Seleccionar'}
                        </Button>
                    </Grid>
                </Grid>
            </FormControl>
        </div>
    );
}
