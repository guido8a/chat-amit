import React from 'react'
import {Grid} from '@mui/material'
import {
  Badge,
  Wc,
} from '@mui/icons-material'
import {MyReadOnlyTextField} from "src/components/MyReadOnlyTextField";

// eslint-disable-next-line import/no-anonymous-default-export
export default (solicitud) => {
  const s = solicitud.solicitud
  const p = !!s?JSON.parse(s.payload):{}
  return (
    <Grid container spacing={1} sx={{margin:'24px'}}>
      <Grid item xs={6}>
        <MyReadOnlyTextField id='identificador'
                             label={'Identificador'}
                             value={solicitud?.solicitud?.numeroSolicitud}
                             icon={<Wc sx={{fontSize: '14px', color:'silver', mr:'0.8rem'}}/>} />
      </Grid>
      <Grid item xs={6}>
        <MyReadOnlyTextField id='fecha'
                             label={'Fecha'}
                             value={solicitud?.solicitud?.dateCreated}
                             icon={<Badge sx={{fontSize: '14px', color:'silver', mr:'0.8rem'}}/>}/>
      </Grid>
    </Grid>
  )
}
