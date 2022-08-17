import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {accordeonBox} from 'src/styles/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import {Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material"
import Paper from '@mui/material/Paper'
import {dialog} from 'src/styles/styles'
import {
  fetchInstanciaTareaInstanciaProceso,
  handleRefreshTareas,
  handleSetBandeja
} from 'src/features/App/sliceApp'
import {useNavigate} from 'react-router-dom'
import API from 'src/features/App/API'
import IconButton from '@mui/material/IconButton'
import RefreshIcon from '@mui/icons-material/Refresh'
import {f} from 'src/commons/f'
import {format} from 'date-fns'
import {es} from 'date-fns/locale'

export const Bandejas = () => {
  let navigate = useNavigate()
  const dispatch = useDispatch()
  const usuario = useSelector(state => state.app.usuario)
  const perfilesUsuario = useSelector(state => state.app.perfilesUsuario)
  const perfilUsuario = useSelector(state => state.app.perfilUsuario)
  const instanciasTarea = useSelector(state => state.app.instanciasTarea)
  const instanciaTarea = useSelector(state => state.app.instanciaTarea)
  const investigador = useSelector(state => state.app.investigador)

  React.useEffect(() => {
    if(f.isValid(instanciaTarea?.id)) {
      const route = API.getRoute(instanciaTarea)
      if(!!route) navigate(route)
    }
  }, [instanciaTarea])

  React.useEffect(() => {
    setTimeout(() => dispatch(handleRefreshTareas(perfilUsuario.id)), 500)
  }, [perfilUsuario])

  useEffect(() => {window.scrollTo(0, 0)}, [])

  if(f.isValid(usuario?.id) && f.isValid(perfilUsuario.id) && !investigador) {
    return (
      <>
        <Box sx={{...accordeonBox.container, pt:0}}>
          <Box sx={accordeonBox.titleBox}>
            <Grid container>
              <Grid item xs={11}>
                <Typography sx={accordeonBox.titleTypography}>Bandeja de entrada | Tareas Recibidas</Typography>
              </Grid>
              {(perfilesUsuario.length > 1)?
                <Grid item xs={11}>
                  usuario
                </Grid>:null
              }
              <Grid item xs={1} sx={{position:'relative'}}>
                <IconButton color="primary"
                            component="span"
                            sx={{padding:0, margin:0, position: 'absolute', top:'0px', right:'8px'}}
                            onClick={() => dispatch(handleRefreshTareas(perfilUsuario.id))}>
                  <RefreshIcon sx={{fontSize:'14px', p:0, m:0, color:'white'}}/>
                </IconButton>
              </Grid>
            </Grid>
          </Box>
          <Grid container spacing={1} sx={accordeonBox.container2}>
            <Grid item xs={12} sx={{mt:'1rem'}}>
              <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} size="small" aria-label="tareas-activas">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={dialog.tableCellH}>Emitido por</TableCell>
                      <TableCell sx={dialog.tableCellH}>Origen</TableCell>
                      <TableCell sx={dialog.tableCellH}>Rol</TableCell>
                      <TableCell sx={dialog.tableCellH} align="center">Tarea</TableCell>
                      <TableCell sx={dialog.tableCellH}>Fecha</TableCell>
                      <TableCell sx={dialog.tableCellH}>Identificador</TableCell>
                      <TableCell sx={dialog.tableCellH}>Nombre Proyecto</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {instanciasTarea?.filter((t)=> t.estadoInstanciaTarea === "Iniciada")?.map(
                      (tarea) => {
                        const metadato = f.isValid(tarea?.metadataOrigen)?JSON.parse(tarea?.metadataOrigen):{}
                        const fecha = format(new Date(tarea.fechaHoraInicia), 'dd-MMMM-yyyy', {locale: es})
                        return (
                          <TableRow key={tarea.id}>
                            <TableCell sx={dialog.tableCellD} scope="row">{metadato.nombreUsuario}</TableCell>
                            <TableCell sx={dialog.tableCellD} align="left">{metadato.nombreTarea}</TableCell>
                            <TableCell sx={dialog.tableCellD} align="left">{metadato.descripcionPerfil}</TableCell>
                            <TableCell sx={dialog.tableCellDD}
                                       align="left"
                                       onClick={() => {
                                         dispatch(fetchInstanciaTareaInstanciaProceso(tarea.id))
                                         dispatch(handleSetBandeja('entrada'))
                                       }}>
                              {tarea.nombreTarea}
                            </TableCell>
                            <TableCell sx={dialog.tableCellD} align="left">{fecha}</TableCell>
                            <TableCell sx={dialog.tableCellD} align="left">{tarea.instanciaProcesoSolicitudNumeroSolicitud}</TableCell>
                            <TableCell sx={dialog.tableCellD} align="left">{tarea.instanciaProcesoSolicitudNombreProyecto}</TableCell>
                          </TableRow>
                        )
                      })
                    }
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Box>
      </>
    )
  } else {
    return null
  }
}
