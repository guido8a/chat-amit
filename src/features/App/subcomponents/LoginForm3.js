import React, {useState} from 'react'
import {
  useSelector,
  useDispatch,
} from 'react-redux'
import {
  Grid,
  Modal,
  TextField,
  Typography,
  Box, InputAdornment, Stack, /* FormControl, InputLabel, Select, */
} from '@mui/material'
import {common, modal, gridStyles, dialog} from 'src/styles/styles'
import {loginFormMsgs} from 'src/features/App/consts'
import {
  testUsuario,
} from 'src/features/App/sliceApp'
import Paper from '@mui/material/Paper'
import MoserratRegular from 'src/styles/MyFonts/Montserrat/static/Montserrat-Regular.ttf'
import {ReactComponent as UserIcon} from 'src/styles/MySvgIcons/png_identificador-min.svg'
import {ReactComponent as ContraseniaIcon} from 'src/styles/MySvgIcons/png_contrasenia-min.svg'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import {MyButtonBacan} from 'src/components/MyButtonBacan'
import ForwardIcon from '@mui/icons-material/Forward'
import MenuItem from '@mui/material/MenuItem'

export function LoginForm3() {
  const dispatch = useDispatch()

  const [formValues, setFormValues] = useState({loginMail:'', loginPass:''})
  const showLoginForm=useSelector(state => state.app.showLoginForm)

  return (
    <Modal open={showLoginForm}
           aria-labelledby="modal-modal-title"
           aria-describedby="modal-modal-description">
      <Paper sx={{...modal.box, ...common.bg}} elevation={3}>
        <Box>
          <Typography sx={common.head}>
            Bienvenido
          </Typography>
          <Typography sx={common.head2}>
            Para mantenerse en contacto con nosotros, por favor ingrese con su correo y contraseña personales
          </Typography>
        </Box>
        <Box sx={common.body}>
          <Grid container sx={gridStyles.gridContainer}>
            <Grid item xs={12} sx={gridStyles.gridItem}>
              <TextField id={'loginMail'}
                         label={'Usuario *'}
                         value={formValues['loginMail']}
                         fullWidth
                         variant='standard'
                         sx={{...dialog.textTypography, height:'6rem'}}
                         onChange={
                           (e) => {
                             setFormValues({...formValues,loginMail:e.target.value})
                           }
                         }
                         InputProps={{
                           disableUnderline: true,
                           form: {autocomplete: 'off'},
                           startAdornment:(
                             <InputAdornment position="end">
                               <UserIcon style={{height: '1.2rem', margin:'0 0.4rem 0 0'}}/>
                             </InputAdornment>
                           ),
                           sx: {
                             fontSize: '1rem',
                             fontfamily: MoserratRegular,
                             color: '#878787',
                             backgroundColor: 'rgba(210, 210, 210, 0.2)',
                           }
                         }}
                         InputLabelProps={{ sx: {
                             fontSize: '1.2rem',
                             color: '#575756',
                             fontfamily: MoserratRegular,
                           }}}
                         FormHelperTextProps={{sx: {
                             fontSize: '0.7rem',
                             fontfamily: MoserratRegular,
                             color:'black',
                             fontWeight: 'normal',
                             pl:'1rem'}}}
                         helperText={''} />
            </Grid>

            <Grid item xs={12} sx={gridStyles.gridItem}>
              <TextField id={'loginPass'}
                         type={"password"}
                         label={'Contraseña *'}
                         value={formValues['loginPass']}
                         fullWidth
                         variant='standard'
                         aria-readonly={true}
                         sx={{...dialog.textTypography, height:'6rem'}}
                         onChange={(e) => {
                           setFormValues({...formValues,loginPass:e.target.value})
                         }}
                         InputProps={{
                           disableUnderline: true,
                           form: {autocomplete: 'off'},
                           startAdornment:(
                             <InputAdornment position="end">
                               <ContraseniaIcon style={{height: '1.2rem', margin:'0 0.4rem 0 0'}}/>
                             </InputAdornment>
                           ),
                           sx: {
                             fontSize: '1rem',
                             fontfamily: MoserratRegular,
                             color: '#878787',
                             backgroundColor: 'rgba(210, 210, 210, 0.2)',
                           }
                         }}
                         InputLabelProps={{ sx: {
                             fontSize: '1.2rem',
                             color: '#575756',
                             fontfamily: MoserratRegular,
                           }}}
                         FormHelperTextProps={{sx: {
                             fontSize: '0.7rem',
                             fontfamily: MoserratRegular,
                             color:'black',
                             fontWeight: 'normal',
                             pl:'1rem'}}}
                         helperText={''} >
                <MenuItem>

                </MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sx={{...gridStyles.gridContainer2, p:'0 2rem 0 2rem'}} >
              <Stack direction={'row'} spacing={0} justifyContent="space-between" alignItems="center">
                <MyButtonBacan icon={AddCircleOutlineIcon}
                               label={'CREAR CUENTA'}
                               onClick={() => console.log('... not implemented yet')} />
                <MyButtonBacan label={'Ingresar'}
                               icon={ForwardIcon}
                               bgColor0={'rgba(18, 219, 18, 1)'}
                               bgColor1={'rgba(14, 181, 14, 1)'}
                               onClick={() => {
                                 dispatch(testUsuario({loginMail:formValues['loginMail'], loginPass:formValues['loginPass']}))
                               }} >
                  {loginFormMsgs.ok}
                </MyButtonBacan>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Modal>
  )
}
