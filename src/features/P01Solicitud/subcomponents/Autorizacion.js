import React from 'react'
import {Grid, Stack} from '@mui/material'
import {Badge,} from '@mui/icons-material'
import {MyReadOnlyTextField} from "src/components/MyReadOnlyTextField";
import {dialog} from "../../../styles/styles";
import {MySubtitle} from "../../../components/MySubtitle";
import BookmarkAddedOutlinedIcon from '@mui/icons-material/BookmarkAddedOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import AssuredWorkloadOutlinedIcon from '@mui/icons-material/AssuredWorkloadOutlined';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import {f} from "../../../commons";

// eslint-disable-next-line import/no-anonymous-default-export
export default (solicitud) => {
  const s = solicitud.solicitud
  const p = f.isValid(s)?(typeof solicitud.solicitud !== 'object')?JSON.parse(s.payload):s.payload:{}

  return (
    <Grid container spacing={1} sx={{margin:'0 0 0 0.5rem'}}>
      <Grid item xs={12} sx={dialog.titleContainer}>
        <MySubtitle subtitle={'Autorizacion'} />
      </Grid>
      <Grid item xs={12} sx={{p:'1rem 0 1rem 0'}}>
        <MyReadOnlyTextField id='nombre'
                             label={'Proyecto'}
                             value={p?.Propuesta?.nombre}
                             rows={4}
                             icon={<BookmarkAddedOutlinedIcon sx={{fontSize: '14px', color:'silver', mr:'0.8rem'}}/>} />
      </Grid>
      <Grid item xs={6} sx={{p:'1rem 0 1rem 0'}}>
        <MyReadOnlyTextField id='identificador'
                             label={'Identificador'}
                             value={solicitud?.solicitud?.numeroSolicitud ?? p?.Resolucion?.identificador }
                             icon={<Badge sx={{fontSize: '14px', color:'silver', mr:'0.8rem'}}/>} />
      </Grid>
      <Grid item xs={6} sx={{p:'1rem 0 1rem 0'}}>
        <Stack direction={'row'} justifyContent="space-between" alignItems="center" spacing={2}>
          <MyReadOnlyTextField id='fecha'
                               label={'Fecha'}
                               value={p?.Resolucion?.fecha}
                               icon={<CalendarMonthOutlinedIcon sx={{fontSize: '14px', color:'silver', mr:'0.8rem'}}/>} />
          <MyReadOnlyTextField id='plazo'
                               label={'Vigencia'}
                               value={`${p?.Propuesta?.plazo} meses`}
                               icon={<AccessTimeOutlinedIcon sx={{fontSize: '14px', color:'silver', mr:'0.8rem'}}/>} />
        </Stack>
      </Grid>
      <Grid item xs={12} sx={{p:'1rem 0 1rem 0'}}>
        <MyReadOnlyTextField id='patrocinador'
                             label={'Institución Patrocinadora'}
                             value={p?.Propuesta?.patrocinador}
                             rowas={4}
                             icon={<AssuredWorkloadOutlinedIcon sx={{fontSize: '14px', color:'silver', mr:'0.8rem'}}/>}/>
      </Grid>
      <Grid item xs={12} sx={{p:'1rem 0 1rem 0'}}>
        <MyReadOnlyTextField id='apoyo'
                             label={'Institución Nacional de Apoyo'}
                             value={p?.Propuesta?.apoyo}
                             rows={4}
                             icon={<AssuredWorkloadIcon sx={{fontSize: '14px', color:'silver', mr:'0.8rem'}}/>}/>
      </Grid>
    </Grid>
  )
}
