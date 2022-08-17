import React from 'react'
import {Grid, TextField} from '@mui/material'
import {
  AccountCircle,
  Badge,
  Wc,
  CoPresent,
} from '@mui/icons-material'
import {MyReadOnlyTextField} from "src/components/MyReadOnlyTextField";

// eslint-disable-next-line import/no-anonymous-default-export
export default (solicitud) => {
  const s = solicitud.solicitud
  const p = !!s?JSON.parse(s.payload):{}
  return (
    <Grid container spacing={1} sx={{margin:'0 0 0 24px'}}>
      <Grid item xs={6} >
        <MyReadOnlyTextField id='nombres'
                             label={'Solicitante'}
                             value={!!p?p.Solicitante?.nombresCompletos:''}
                             icon={<AccountCircle sx={{fontSize: '14px', color:'silver', mr:'0.8rem'}}/>} />
      </Grid>
      <Grid item xs={6}>
        <MyReadOnlyTextField id='fecha'
                             label={'Fecha'}
                             value={solicitud?.solicitud?.dateCreated}
                             icon={<Badge sx={{fontSize: '14px', color:'silver', mr:'0.8rem'}}/>}/>
      </Grid>
      <Grid item xs={6}>
        <MyReadOnlyTextField id='identificador'
                             label={'Identificador'}
                             value={solicitud?.solicitud?.numeroSolicitud}
                             icon={<Wc sx={{fontSize: '14px', color:'silver', mr:'0.8rem'}}/>} />
      </Grid>
      <Grid item xs={6}>
        <MyReadOnlyTextField id='proyecto'
                             rows={4}
                             label={'Proyecto'}
                             value={solicitud?.solicitud?.nombreProyecto}
                             icon={<CoPresent sx={{fontSize: '14px', color:'silver', mr:'0.8rem'}}/>}
        />
      </Grid>
    </Grid>
  )
}
