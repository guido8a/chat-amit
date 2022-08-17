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
  Box, InputAdornment, InputLabel, Select, Stack, /* FormControl, InputLabel, Select, */
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
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import {useNavigate} from 'react-router-dom'

export function LoginForm2() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // institucional
  // const users = [
  //   {
  //     key:       0,
  //     loginMail: 'lgcueva@senescyt.gob.ec',
  //     loginPass: 'scyt.2022.',
  //     rol:       'Coordinador de Casos - Senescyt',
  //     tipo:      'funcionario',
  //   },
  //   {
  //     key:       1,
  //     loginMail: 'ferguano1289@gmail.com',
  //     loginPass: 'scyt.2022.',
  //     rol:       'COORDSENES;Gestor Senescyt',
  //     tipo:      'funcionario',
  //   },
  //   {
  //     key:       2,
  //     loginMail: 'nestor.acosta@ambiente.gob.ec',
  //     loginPass: '2022.maate.',
  //     rol:       'Coordinador de Casos - Maate',
  //     tipo:      'funcionario',
  //   },
  //   {
  //     key:       3,
  //     loginMail: 'fbnogales@gmail.com',
  //     loginPass: 'vuv22.senadi.',
  //     rol:       'Coordinador de Casos - Senadi',
  //     tipo:      'funcionario',
  //   },
  //   {
  //     key:       4,
  //     loginMail: 'ricardo.andrade.c@gmail.com',
  //     loginPass: '2022.maate.',
  //     rol:       'Especialista de Informes Tecnicos - Maate',
  //     tipo:      'funcionario',
  //   },
  //   {
  //     key:       5,
  //     loginMail: 'yadiyacelga@gmail.com',
  //     loginPass: 'vuv22.senadi.',
  //     rol:       'Especialista de Informes Tecnicos - Senadi',
  //     tipo:      'funcionario',
  //   },
  //   {
  //     key:       8,
  //     loginMail: 'candresvalle86@gmail.com',
  //     loginPass: '2022.maate.',
  //     rol:       'Autorizador Sectorial - Maate',
  //     tipo:      'funcionario',
  //   },
  //   {
  //     key:       9,
  //     loginMail: 'paulymosquerah@yahoo.es',
  //     loginPass: 'vuv22.senadi.',
  //     rol:       'Autorizador Sectorial - Senadi',
  //     tipo:      'funcionario',
  //   },
  //   {
  //     key:       10,
  //     loginMail: 'mjramirez@senescyt.gob.ec',
  //     loginPass: 'scyt.2022.',
  //     rol:       'Autorizador Senescyt',
  //     tipo:      'funcionario',
  //   },
  //   {
  //     key:       555,
  //     loginMail: 'jcoronelb@yahoo.es',
  //     loginPass: '123.abc.',
  //     rol:       '[INVESTIGADOR] CORONEL BECERRA JORGE WILSON',
  //     tipo:      'investigador',
  //   },
  //   {
  //     key:       590,
  //     loginMail: 'ricardo.guaman@iniap.gob.ec',
  //     loginPass: '123.abc.',
  //     rol:       '[INVESTIGADOR] GUAMÁN JIMÉNEZ RICARDO WILFRIDO',
  //     tipo:      'investigador',
  //   },
  //   {
  //     key:       551,
  //     loginMail: 'jose.navarrete@iniap.gob.ec',
  //     loginPass: '123.abc.',
  //     rol:       'investigador',
  //     tipo:      'funcionario',
  //   },
  //   {
  //     key:       553,
  //     loginMail: 'oswaldovalarezo@hotmail.com',
  //     loginPass: '123.abc.',
  //     rol:       '[INVESTIGADOR] VALAREZO CELY GONZALO OSWALDO',
  //     tipo:      'investigador',
  //   },
  //   {
  //     key:       554,
  //     loginMail: 'vjcevallos75@yahoo.com',
  //     loginPass: '123.abc.',
  //     rol:       '[INVESTIGADOR] CEVALLOS SANDOVAL VICTOR JAVIER',
  //     tipo:      'investigador',
  //   },
  //   {
  //     key:       556,
  //     loginMail: 'ricardodelgado72@yahoo.com',
  //     loginPass: 'vuv.1147.',
  //     rol:       '[INVESTIGADOR] DELGADO ARCE RICARDO ANTONIO',
  //     tipo:      'investigador',
  //   },
  //   {
  //     key:       557,
  //     loginMail: 'miguel.peralta@iniap.gob.ec',
  //     loginPass: 'vuv.0427.',
  //     rol:       '[INVESTIGADOR] PERALTA IDROVO MIGUEL  EDUARDO',
  //     tipo:      'investigador',
  //   },
  //   {
  //     key:        558,
  //     loginMail: 'cbolanos@huskers.unl.edu',
  //     loginPass: 'vuv.4118.',
  //     rol:       '[INVESTIGADOR] BOLANOS CARRIEL CARLOS ANDRES',
  //     tipo:      'investigador',
  //   },
  // ]

  // vuv-team
  const users = [
    {
      key:       0,
      loginMail: 'lgcueva@senescyt.gob.ec',
      loginPass: '456.def.',
      rol:       'Coordinador de Casos - Senescyt',
      tipo:      'funcionario',
    },
    {
      key:       1,
      loginMail: 'ferguano1289@gmail.com',
      loginPass: '456.def.',
      rol:       'COORDSENES;Gestor Senescyt',
      tipo:      'funcionario',
    },
    {
      key:       2,
      loginMail: 'nestor.acosta@ambiente.gob.ec',
      loginPass: '456.def.',
      rol:       'Coordinador de Casos - Maate',
      tipo:      'funcionario',
    },
    {
      key:       3,
      loginMail: 'fbnogales@gmail.com',
      loginPass: '456.def.',
      rol:       'Coordinador de Casos - Senadi',
      tipo:      'funcionario',
    },
    {
      key:       4,
      loginMail: 'ricardo.andrade.c@gmail.com',
      loginPass: '456.def.',
      rol:       'Especialista de Informes Tecnicos - Maate',
      tipo:      'funcionario',
    },
    {
      key:       5,
      loginMail: 'yadiyacelga@gmail.com',
      loginPass: '456.def.',
      rol:       'Especialista de Informes Tecnicos - Senadi',
      tipo:      'funcionario',
    },
    {
      key:       8,
      loginMail: 'candresvalle86@gmail.com',
      loginPass: '456.def.',
      rol:       'Autorizador Sectorial - Maate',
      tipo:      'funcionario',
    },
    {
      key:       9,
      loginMail: 'paulymosquerah@yahoo.es',
      loginPass: '456.def.',
      rol:       'Autorizador Sectorial - Senadi',
      tipo:      'funcionario',
    },
    {
      key:       10,
      loginMail: 'mjramirez@senescyt.gob.ec',
      loginPass: '456.def.',
      rol:       'Autorizador Senescyt',
      tipo:      'funcionario',
    },
    {
      key:       555,
      loginMail: 'jcoronelb@yahoo.es',
      loginPass: '123.abc.',
      rol:       '[INVESTIGADOR] CORONEL BECERRA JORGE WILSON',
      tipo:      'investigador',
    },
    {
      key:       590,
      loginMail: 'ricardo.guaman@iniap.gob.ec',
      loginPass: '123.abc.',
      rol:       '[INVESTIGADOR] GUAMÁN JIMÉNEZ RICARDO WILFRIDO',
      tipo:      'investigador',
    },
    {
      key:       551,
      loginMail: 'jose.navarrete@iniap.gob.ec',
      loginPass: '123.abc.',
      rol:       'investigador',
      tipo:      'funcionario',
    },
    {
      key:       553,
      loginMail: 'oswaldovalarezo@hotmail.com',
      loginPass: '123.abc.',
      rol:       '[INVESTIGADOR] VALAREZO CELY GONZALO OSWALDO',
      tipo:      'investigador',
    },
    {
      key:       554,
      loginMail: 'vjcevallos75@yahoo.com',
      loginPass: '123.abc.',
      rol:       '[INVESTIGADOR] CEVALLOS SANDOVAL VICTOR JAVIER',
      tipo:      'investigador',
    },
    {
      key:       556,
      loginMail: 'ricardodelgado72@yahoo.com',
      loginPass: '123.abc.',
      rol:       '[INVESTIGADOR] DELGADO ARCE RICARDO ANTONIO',
      tipo:      'investigador',
    },
    {
      key:       557,
      loginMail: 'miguel.peralta@iniap.gob.ec',
      loginPass: '123.abc.',
      rol:       '[INVESTIGADOR] PERALTA IDROVO MIGUEL  EDUARDO',
      tipo:      'investigador',
    },
    {
      key:        558,
      loginMail: 'cbolanos@huskers.unl.edu',
      loginPass: '123.abc.',
      rol:       '[INVESTIGADOR] BOLANOS CARRIEL CARLOS ANDRES',
      tipo:      'investigador',
    },
  ]

  const [formValues, setFormValues] = useState({loginMail:users[0].loginMail, loginPass:'', testUser:users[0].loginMail})
  // const [showPassword, switchShowPassword] = useState(false)
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
              <FormControl variant="standard" sx={{ m: 0, width: '100%', height:'96px'}}>
                <InputLabel id="user-for-testing">(para pruebas)</InputLabel>
                <Select labelId="user-for-testing"
                        onChange={(e) =>{
                          setFormValues({...formValues,loginMail:e.target.value})
                        }}
                        id="user"
                        value={formValues['loginMail']}
                        fullWidth>
                  {
                    users.map(it => (
                      <MenuItem key={it.key} value={it.loginMail}>
                        <em>{it.rol}</em>
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sx={gridStyles.gridItem}>
              <TextField id={'loginMail'}
                         label={'Usuario *'}
                         value={formValues['loginMail']}
                         fullWidth
                         variant='standard'
                         aria-readonly={true}
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
                         // type={showPassword?"text":"password"}
                         type={"password"}
                         label={'Contraseña *'}
                         value={formValues['loginPass']}
                         fullWidth
                         variant='standard'
                         // aria-readonly={true}
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
                                 navigate('/')
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
