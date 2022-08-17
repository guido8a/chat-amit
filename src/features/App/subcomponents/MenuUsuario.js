import React, {useState} from 'react'
import Typography from '@mui/material/Typography'
import {Avatar, Divider, ListItem, ListItemIcon, ListItemText, Popover, Stack} from '@mui/material'
import {useDispatch, useSelector} from 'react-redux'
import Box from '@mui/material/Box'
import CropSquareIcon from '@mui/icons-material/CropSquare'
import LogoutIcon from '@mui/icons-material/Logout'
import {green} from '@mui/material/colors'
import HowToRegIcon from '@mui/icons-material/HowToReg'
import RobotoCondensedRegular from 'src/styles/MyFonts/Roboto_Condensed/RobotoCondensed-Regular.ttf'
import {handleCrearProceso, handleRefreshTareas, logout} from 'src/features/App/sliceApp'
import List from "@mui/material/List";
import {MyConfirm} from 'src/components/MyConfirm'

export const MenuUsuario = () => {
  const dispatch = useDispatch()
  const perfilUsuario = useSelector(state => state.app.perfilUsuario)
  const usuario = useSelector(state => state.app.usuario)
  const investigador = useSelector(state => state.app.investigador)

  const [anchorEl, setAnchorEl] = React.useState(null)
  const handleClick = (e) => setAnchorEl(e.currentTarget)
  const handleClose = () => {setAnchorEl(null)}
  const open = Boolean(anchorEl)
  const mid = open ? 'simple-popover-3' : undefined

  const user = usuario.nombreUsuario?usuario.nombreUsuario:''

  const [dialogData, setDialogData] = useState({
    title: 'ATENCIÓN',
    message: '[message]',
    openDialog: false,
    okAction: () => {
      // dispatch(handleCrearProceso(55000014, perfilUsuario?.id, perfilUsuario?.idPerfilUsuario))*/}
    },
    cancelAction: () => alert('[cancelAction]'),
    messsageAfterOk: 'Se ejecutó',
    mode:'OK_CANCEL_AFTEROK'
  })

  return (
    <>
      <Box aria-describedby={mid}
           onClick={handleClick}
           sx={{height:'100%', cursor:'pointer', flexShrink: 0}}>
        <Stack direction={'row'} spacing={2}>
          <Box sx={{height:'100%'}}>
            <Avatar sx={{ bgcolor: green[500], mt:'0.5rem'}}>
              <HowToRegIcon />
            </Avatar>
          </Box>
          <Stack direction={'column'}>
            <Box sx={{p:'0.5rem 0 0 0'}}>
              <Typography sx={{lineHeight:'1rem', color:'white', fontFamily:RobotoCondensedRegular, fontSize:'0.9rem'}}>
                {user}
              </Typography>
              <Typography sx={{color:'white', fontFamily:RobotoCondensedRegular, fontWeight:'lighter', fontSize:'0.9rem'}}>
                {perfilUsuario?.perfil?.descripcionPerfil}
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Box>
      <Popover id={mid}
               open={open}
               anchorEl={anchorEl}
               onClose={handleClose}
               transformOrigin={{
                 vertical: 'top',
                 horizontal: 'right',
               }}
               anchorOrigin={{
                 vertical: 'bottom',
                 horizontal: 'right',
               }} >
        <Box sx={{p:'0.8rem'}}>
          <>
            <List>
              { investigador ?
                  <>
                    <ListItem key={'WF01'}
                              onClick={() => {
                                setDialogData({
                                  ...dialogData,
                                  message: 'Va a crear una nueva solicitud de nuevo permiso de investigacion',
                                  messsageAfterOk: 'Se ha creado una nueva solicitud de permiso de investigación',
                                  openDialog: true,
                                  okAction: () => {
                                    dispatch(handleCrearProceso(55000014, perfilUsuario?.id, perfilUsuario?.idPerfilUsuario, {},'Permiso'))
                                    setTimeout(function(){
                                      dispatch(handleRefreshTareas(perfilUsuario.id))
                                    }, 1500)
                                  }
                                })
                              }}
                              button sx={{p:'0.2rem 0.5rem 0.2rem 0.5rem'}}>
                      <ListItemText>{'WF01 - Nuevo Permiso de Investigación'}</ListItemText>
                    </ListItem>
                    <ListItem key={'WF02'}
                              onClick={() => {
                                setDialogData({
                                  ...dialogData,
                                  message: 'Va a crear una nueva solicitud de nuevo contrato de acceso con potencial uso comercial',
                                  messsageAfterOk: 'Se ha una nueva solicitud de contrato de acceso con potencial uso comercial',
                                  openDialog: true,
                                  okAction: () => {
                                    dispatch(handleCrearProceso(55000014, perfilUsuario?.id, perfilUsuario?.idPerfilUsuario, {},'Contrato'))
                                    setTimeout(function(){
                                      dispatch(handleRefreshTareas(perfilUsuario.id))
                                    }, 1500)
                                  }
                                })
                              }}
                              button sx={{p:'0.2rem 0.5rem 0.2rem 0.5rem'}}>
                      <ListItemText>{'WF02 - Contrato de acceso con potencial uso comercial'}</ListItemText>
                    </ListItem>
                  </> : null
              }
              <Divider />
              {(perfilUsuario?.perfil?.id === 1139) ?
                <>
                  <ListItem key={'DICTAMEN'} sx={{p:0, cursor: 'pointer'}}
                            onClick={()=> {
                              dispatch(handleCrearProceso(55000019, perfilUsuario?.id, perfilUsuario?.idPerfilUsuario, {}))
                              setTimeout(function(){
                                dispatch(handleRefreshTareas(perfilUsuario.id))
                              }, 1500);
                              handleClose()
                            }} >
                    <ListItemIcon sx={{minWidth:'1rem', m:0}}>
                      <LogoutIcon edge="start"
                                  checked={false}
                                  icon={<CropSquareIcon fontSize="small"/>}
                                  tabIndex={-1} />
                    </ListItemIcon>
                    <ListItemText sx={{ml:'1rem'}}>{'Emitir Dictamen'}</ListItemText>
                  </ListItem>

                  <ListItem key={'SEGUIMIENTO'} sx={{p:0, cursor: 'pointer'}}
                            onClick={()=> {
                              dispatch(handleCrearProceso(55000023, perfilUsuario?.id, perfilUsuario?.idPerfilUsuario, {}))
                              setTimeout(function(){
                                dispatch(handleRefreshTareas(perfilUsuario.id))
                              }, 1500);
                              handleClose()
                            }} >
                    <ListItemIcon sx={{minWidth:'1rem', m:0}}>
                      <LogoutIcon edge="start"
                                  checked={false}
                                  icon={<CropSquareIcon fontSize="small"/>}
                                  tabIndex={-1} />
                    </ListItemIcon>
                    <ListItemText sx={{ml:'1rem'}}>{'Seguimiento'}</ListItemText>
                  </ListItem>

                  <ListItem key={'EVALUAR'} sx={{p:0, cursor: 'pointer'}}
                            onClick={()=> {
                              dispatch(handleCrearProceso(55000027, perfilUsuario?.id, perfilUsuario?.idPerfilUsuario, {}))
                              setTimeout(function(){
                                dispatch(handleRefreshTareas(perfilUsuario.id))
                              }, 1500);
                              handleClose()
                            }} >
                    <ListItemIcon sx={{minWidth:'1rem', m:0}}>
                      <LogoutIcon edge="start"
                                  checked={false}
                                  icon={<CropSquareIcon fontSize="small"/>}
                                  tabIndex={-1} />
                    </ListItemIcon>
                    <ListItemText sx={{ml:'1rem'}}>{'WF17 - EVALUAR CUMPLIMIENTO'}</ListItemText>
                  </ListItem>

                  <Divider />
                </> : null
              }
              <ListItem key={'EXIT'} sx={{p:0, cursor: 'pointer'}}
                        onClick={()=> {
                          handleClose()
                          dispatch(logout())
                        }} >
                <ListItemIcon sx={{minWidth:'1rem', m:0}}>
                  <LogoutIcon edge="start"
                              checked={false}
                              icon={<CropSquareIcon fontSize="small"/>}
                              tabIndex={-1} />
                </ListItemIcon>
                <ListItemText sx={{ml:'1rem'}}>{'Cerrar sesión'}</ListItemText>
              </ListItem>
            </List>
          </>
        </Box>
      </Popover>
      <MyConfirm dialogData={dialogData} setDialogData={setDialogData} />
    </>
  )
}
