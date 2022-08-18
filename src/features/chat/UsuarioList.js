import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import {Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useField, useFormikContext } from "formik";


export const UsuarioList = () => {
    const [checked, setChecked] = React.useState([1]);

    const { usuarios } = useSelector(state => state.ui);

    // const handleToggle = (value) => () => {
    //     const currentIndex = checked.indexOf(value);
    //     const newChecked = [...checked];

    //     if (currentIndex === -1) {
    //         newChecked.push(value);
    //     } else {
    //         newChecked.splice(currentIndex, 1);
    //     }

    //     setChecked(newChecked);
    // };

    const { setFieldValue } = useFormikContext();
   
    const handlePersona = (event, id) => {
        console.log("event", id)
        // setFieldValue("responde", event.target.value)
        setFieldValue("responde", id)
    }

    return (
        <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {usuarios.map((usuario) => {
                const labelId = `checkbox-list-secondary-label-${usuario.id}`;
                return (
                    <div>
                            <ListItem
                                key={usuario.id}
                                secondaryAction={
                                    // <Checkbox
                                    //     edge="end"
                                    //     onChange={handleToggle(value)}
                                    //     checked={checked.indexOf(value) !== -1}
                                    //     inputProps={{ 'aria-labelledby': labelId }}
                                    // />

                                    <Button type="submit" color='success' fullWidth variant="contained"
                                        sx={{ mt: 1, maxWidth: 200 }} 
                                        startIcon={<CheckCircleIcon />} onClick={(event) => handlePersona(event, usuario.id)}
                                    >
                                        {'Aceptar'}
                                    </Button>
                                }
                                disablePadding
                            >
                                <ListItemButton>
                                    <ListItemAvatar>
                                        <Avatar
                                            alt={`Avatar n°${usuario.id}`}
                                            src={`/static/images/avatar/${usuario.id}.jpg`}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText id={labelId} 
                                    primary={`${usuario.nombre}`} 
                                    
                                    secondary={
                                        <React.Fragment>
                                          <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                          >
                                            <strong>Investigador</strong>
                                          </Typography>
                                        </React.Fragment>
                                      }                                    
                                    />
                                </ListItemButton>
                            </ListItem>
                        {/* <Box
                            sx={{
                                marginTop: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Button type="submit" color='success' fullWidth variant="contained"
                                sx={{ mt: 1, maxWidth: 200 }} startIcon={<FontAwesomeIcon icon={faSave} />}
                            >
                                {'Crear'}
                            </Button>
                        </Box> */}

                    </div>

                );
            })}
        </List>
    );
}
