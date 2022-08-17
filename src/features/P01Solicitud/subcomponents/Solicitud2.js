import React from 'react'
import {Grid, TextField} from '@mui/material'
import {
  AccountCircle,
  Badge,
  Wc,
  CoPresent,
} from '@mui/icons-material'
import {MyReadOnlyTextField} from "src/components/MyReadOnlyTextField";
import {format} from 'date-fns'
import {es} from 'date-fns/locale'

export const Solicitud2 = (solicitud) => {
  const s = solicitud.solicitud
  const p = !!s?JSON.parse(s.payload):{}
  return (
    <Grid container spacing={1} sx={{margin:'0'}}>
      <Grid item xs={6} sx={{p:'1rem 0 1rem 0'}}>
        <MyReadOnlyTextField id='identificador'
                             label={'Identificador'}
                             value={!!s?s.numeroSolicitud:''}
                             icon={<AccountCircle sx={{fontSize: '14px', color:'silver', mr:'0.8rem'}}/>} />
      </Grid>
      <Grid item xs={6} sx={{p:'1rem 0 1rem 0'}}>
        <MyReadOnlyTextField id='fecha'
                             label={'Fecha'}
                             value={format(new Date(solicitud?.solicitud?.dateCreated),'dd-MMMM-yyyy',{locale:es})}
                             icon={<Badge sx={{fontSize: '14px', color:'silver', mr:'0.8rem'}}/>}/>
      </Grid>
      <Grid item xs={6} sx={{p:'1rem 0 1rem 0'}}>
        <MyReadOnlyTextField id='proyecto'
                             rows={4}
                             label={'Proyecto'}
                             value={p?.Propuesta?.nombre}
                             icon={<Wc sx={{fontSize: '14px', color:'silver', mr:'0.8rem'}}/>} />
      </Grid>
      <Grid item xs={6} sx={{p:'1rem 0 1rem 0'}}>
        <MyReadOnlyTextField id='plazo'
                             rows={4}
                             label={'Vigencia'}
                             value={p?.Propuesta?.plazo + ' meses'}
                             icon={<Wc sx={{fontSize: '14px', color:'silver', mr:'0.8rem'}}/>} />
      </Grid>
      <Grid item xs={6} sx={{p:'1rem 0 2rem 0'}}>
        <MyReadOnlyTextField id='patrocinador'
                             rows={4}
                             label={'Institución patrocinadora'}
                             value={p?.Propuesta?.patrocinador}
                             icon={<CoPresent sx={{fontSize: '14px', color:'silver', mr:'0.8rem'}}/>}
        />
      </Grid>
      <Grid item xs={6} sx={{p:'1rem 0 1rem 0'}}>
        <MyReadOnlyTextField id='apoyo'
                             label={'Institución nacional de apoyo'}
                             rows={4}
                             value={p?.Propuesta?.patrocinador}
                             icon={<CoPresent sx={{fontSize: '14px', color:'silver', mr:'0.8rem'}}/>}
        />
      </Grid>
    </Grid>
  )
}