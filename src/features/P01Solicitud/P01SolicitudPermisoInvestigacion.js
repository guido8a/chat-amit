import React, {useEffect} from 'react'
import {Box, Grid} from '@mui/material'

import Typography from '@mui/material/Typography'
import {accordeonBox, dialog} from 'src/styles/styles'
import {useDispatch, useSelector} from 'react-redux'
import Solicitud from 'src/features/P01Solicitud/subcomponents/Solicitud'

export default () => {
  const dispatch = useDispatch()
  const instanciaTarea = useSelector(state => state.app.instanciaTarea)
  const instanciaProceso = useSelector(state => state.app.instanciaProceso)
  const solicitud = {...instanciaProceso.permiso}
  const payloadSolicitud = !!solicitud.payload?JSON.parse(solicitud.payload):{}
  const permiso = {...instanciaProceso.permiso}
  const payload = !!permiso.payload?JSON.parse(permiso.payload):{}

  if(!!instanciaProceso.id && !!instanciaTarea.id) {
    return <>
      <Box sx={accordeonBox.container}>
        <Box sx={accordeonBox.titleBox}>
          <Typography sx={accordeonBox.titleTypography}>{'Permiso de Investigación'}</Typography>
        </Box>
        <Grid container spacing={1}>
          <Grid item xs={12} sx={dialog.titleContainer2}>
            <Typography variant='subtitle1' component='h2' sx={dialog.titleTypography}>
              {'Solicitud'}
            </Typography>
          </Grid>
          <Solicitud solicitud={solicitud}/>
          <Grid item xs={12} sx={dialog.titleContainer2}>
            <Typography variant='subtitle1' component='h2' sx={dialog.titleTypography}>
              {'Solicitud'}
            </Typography>
          </Grid>
          <Grid item xs={12} sx={dialog.titleContainer2}>
            <Typography variant='subtitle1' component='h2' sx={dialog.titleTypography}>
              {'Recursos'}
            </Typography>
          </Grid>
          <Grid item xs={12} sx={dialog.titleContainer2}>
            <Typography variant='subtitle1' component='h2' sx={dialog.titleTypography}>
              {'Resolución'}
            </Typography>
          </Grid>
          <Grid item xs={12} sx={dialog.titleContainer2}>
            <Typography variant='subtitle1' component='h2' sx={dialog.titleTypography}>
              {'Permiso de Investigación'}
            </Typography>
          </Grid>

        </Grid>
      </Box>
    </>
  }
  else {
    return null
  }
}
