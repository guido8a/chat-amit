import React from 'react'
import {Checkbox, ListItem, ListItemIcon, ListItemText, Popover, Typography} from '@mui/material'
import {useDispatch, useSelector} from 'react-redux'
import List from '@mui/material/List'
import Box from '@mui/material/Box'
import CropSquareIcon from '@mui/icons-material/CropSquare'
import SquareIcon from '@mui/icons-material/Square'
import {
  handleCrearProceso,
  handleRefreshTareas,
} from 'src/features/App/sliceApp'
import {f} from 'src/commons/f'
import API from 'src/features/App/API'
import {useNavigate} from 'react-router-dom'

export const MenuInvestigador = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const perfilUsuario = useSelector(state => state.app.perfilUsuario)
  const investigador = useSelector(state => state.app.investigador)
  const instanciaTarea = useSelector(state => state.app.instanciaTarea)
  const solicitudAprobada = useSelector(state => state.app.solicitudAprobada)
  const [anchorEl2, setAnchorEl2] = React.useState(null)
  const handleClick = (e) => setAnchorEl2(e.currentTarget)
  const handleClose = () => {setAnchorEl2(null)}
  const open = Boolean(anchorEl2)
  const mid = open ? 'simple-popover' : undefined

  React.useEffect(() => {
    if(instanciaTarea?.id !== null) {
      const route = API.getRoute(instanciaTarea)
      if(f.isValid(route)) navigate(route)
    }
  }, [instanciaTarea])

  return (
    <>
      <Box aria-describedby={mid}
           onClick={handleClick}
           sx={{height:'64px', flexGrow:1, alignItems: "justify-end", cursor: 'pointer', p:'0 2rem 0 2rem'}}>
        <Typography sx={{mt:'2rem', fontSize:'24px', color:'white'}}>Solicitudes</Typography>
      </Box>
      <Popover id={mid}
               open={open}
               anchorEl={anchorEl2}
               onClose={handleClose}
               anchorOrigin={{
                 vertical: 'bottom',
                 horizontal: 'left',
               }} >
        <Box sx={{p:'0.8rem'}}>
          {
            investigador ?
              <>
                <List dense={true}>
                  <ListItem key={'WF01'} button sx={{p:'0.2rem 0.5rem 0.2rem 0.5rem'}}>
                    <ListItemIcon sx={{minWidth:'1rem', m:0}}>
                      <Checkbox edge="start"
                                checked={false}
                                icon={<CropSquareIcon fontSize="small"/>}
                                checkedIcon={<SquareIcon fontSize="small"/>}
                                tabIndex={-1}
                                onClick={() => {
                                  dispatch(handleCrearProceso(55000001, perfilUsuario?.id, perfilUsuario?.idPerfilUsuario))
                                  setTimeout(function(){
                                    dispatch(handleRefreshTareas(perfilUsuario.id))
                                  }, 1500);
                                  handleClose()
                                }} />
                    </ListItemIcon>
                    <ListItemText>{'WF01 - Nuevo Permiso de Investigación'}</ListItemText>
                  </ListItem>
                  {
                    (investigador && f.isValid(solicitudAprobada.id))?
                      <>
                        <ListItem key={'WF10'} button sx={{p:'0.2rem 0.5rem 0.2rem 0.5rem'}}>
                          <ListItemIcon sx={{minWidth:'1rem', m:0}}>
                            <Checkbox edge="start"
                                      checked={false}
                                      icon={<CropSquareIcon fontSize="small"/>}
                                      checkedIcon={<SquareIcon fontSize="small"/>}
                                      tabIndex={-1}
                                      onClick={() => {
                                        dispatch(handleCrearProceso(55000005, perfilUsuario?.id, perfilUsuario?.idPerfilUsuario, solicitudAprobada))
                                        setTimeout(function(){
                                          dispatch(handleRefreshTareas(perfilUsuario.id))
                                        }, 1500);
                                        handleClose()
                                      }} />
                          </ListItemIcon>
                          <ListItemText>{'WF10 - Nuevo Acuerdo de Transferencia'}</ListItemText>
                        </ListItem>

                        <ListItem key={'WF07'} button sx={{p:'0.2rem 0.5rem 0.2rem 0.5rem'}}>
                          <ListItemIcon sx={{minWidth:'1rem', m:0}}>
                            <Checkbox edge="start"
                                      checked={false}
                                      icon={<CropSquareIcon fontSize="small"/>}
                                      checkedIcon={<SquareIcon fontSize="small"/>}
                                      tabIndex={-1}
                                      onClick={() => {
                                        dispatch(handleCrearProceso(55000004, perfilUsuario?.id, perfilUsuario?.idPerfilUsuario, solicitudAprobada))
                                        setTimeout(function(){
                                          dispatch(handleRefreshTareas(perfilUsuario.id))
                                        }, 1500)
                                        handleClose()
                                      }} />
                          </ListItemIcon>
                          <ListItemText>{'WF07 - Nuevo Declaración de Movilización de Recursos'}</ListItemText>
                        </ListItem>

                        <ListItem key={'WF08'} button sx={{p:'0.2rem 0.5rem 0.2rem 0.5rem'}}>
                          <ListItemIcon sx={{minWidth:'1rem', m:0}}>
                            <Checkbox edge="start"
                                      checked={false}
                                      icon={<CropSquareIcon fontSize="small"/>}
                                      checkedIcon={<SquareIcon fontSize="small"/>}
                                      tabIndex={-1}
                                      onClick={() => {
                                        dispatch(handleCrearProceso(55000007, perfilUsuario?.id, perfilUsuario?.idPerfilUsuario, solicitudAprobada))
                                        setTimeout(function(){
                                          dispatch(handleRefreshTareas(perfilUsuario.id))
                                        }, 1500);
                                        handleClose()
                                      }} />
                          </ListItemIcon>
                          <ListItemText>{'WF08 - Nuevo Permiso de Importación'}</ListItemText>
                        </ListItem>
                      </> : null
                  }
                </List>
              </> : null
          }
        </Box>
      </Popover>
    </>
  )
}
