import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
// import IconButton from '@mui/material/IconButton'
import {
  fetchOrgs,
  fetchUsuarioSenescyt,
  handleCreatePerfilInvestigador,
  handleFetchInstanciasTarea,
  hadleFetchBosquesProtectores,
  handleFetchLaboratoriosAcreditados,
  handleFetchSolicitudesAprobadas,
  handleFetchSolicitudesNoAprobadas,
  clearAprobadas,
  clearNoAprobadas,
} from 'src/features/App/sliceApp'
import {Stack, AppBar} from '@mui/material'
import {LoginForm2} from 'src/features/App/subcomponents/LoginForm2'
import {LoginForm3} from 'src/features/App/subcomponents/LoginForm3'
import {appBarStyles} from 'src/styles/styles'
import {AppSnackbar} from 'src/features/App/subcomponents/AppSnackBar'
import {f} from 'src/commons/f'
import {MenuUsuario} from './subcomponents/MenuUsuario'
import {ENV} from 'src/features/App/globals'
import {Chat} from "src/features/chat";

export const Widget = () => {
  const dispatch = useDispatch()
  const showLoginForm = useSelector(state => state.app.showLoginForm)
  const usuario = useSelector(state => state.app.usuario)
  const investigador = useSelector(state => state.app.investigador)
  const perfilUsuario = useSelector(state => state.app.perfilUsuario)
  const crearPerfilInvestigador = useSelector(state => state.app.crearPerfilInvestigador)
  // const instanciaProceso = useSelector(state => state.app.instanciaProceso)

  useEffect(() => {
    dispatch(fetchOrgs())
    dispatch(hadleFetchBosquesProtectores())
    dispatch(handleFetchLaboratoriosAcreditados())
  }, [dispatch])

  useEffect(() => {
    if(investigador) {
      dispatch(handleFetchSolicitudesAprobadas(perfilUsuario.id))
      dispatch(handleFetchSolicitudesNoAprobadas(perfilUsuario.id))
    } else {
      dispatch(clearAprobadas())
      dispatch(clearNoAprobadas())
    }
  }, [perfilUsuario])

  useEffect(() => {
    dispatch(fetchUsuarioSenescyt(usuario))
  }, [dispatch, usuario])

  useEffect(() => {
    if(crearPerfilInvestigador && !!usuario.id) {
      dispatch(handleCreatePerfilInvestigador(usuario.id))
    }
  }, [dispatch, usuario.id, crearPerfilInvestigador])

  useEffect(() => {
    if(!!perfilUsuario?.id) {
      dispatch(handleFetchInstanciasTarea(perfilUsuario))
    }
  }, [dispatch, perfilUsuario])

  const user = usuario.nombreUsuario?usuario.nombreUsuario:''

  const instanciaTarea = useSelector(state => state.app.instanciaTarea)
  const instanciaProceso = useSelector(state => state.app.instanciaProceso)

  return (
    <Box sx={{height: '100%', mt:'64px'}}>
      <AppBar position="fixed" sx={{...appBarStyles.appBar, padding:0}} elevation={0}>
        <Toolbar style={{...appBarStyles.toolBar}}>
          <Box sx={{width: '90%', height: '100%', flexGrow:1,}} />
          {/*{investigador?<MenuInvestigador />:(f.isValid(instanciaProceso.solicitud))?<ReadOnlySolicitud />:null}*/}
          {/*{investigador?<TareasInvestigador />:null}*/}
          <Stack direction={'row'} spacing={2}>
            {
              investigador && f.isValid(instanciaTarea.id) && f.isValid(instanciaProceso.id) &&
                <Stack direction={'row'} spacing={0}>
                  <Chat />
                </Stack>
            }
            {
              f.isValid(user)?
                <>
                  <MenuUsuario />
                </>:null
            }
          </Stack>
          <Box sx={{width: '2rem', height: '100%', flexShrink:0}} />
        </Toolbar>
      </AppBar>
      {showLoginForm?(ENV==='PRUEBAS')?<LoginForm2 />:<LoginForm3 />:null}
      <AppSnackbar />
    </Box>
  )
}
