import React, {useState} from 'react'
import {
  Card, CardActions, CardContent, CardHeader,
  // CardContent,
  // CardHeader,
  Grid, Paper,
  Stack, Typography,
  // Tooltip,
  // Typography
} from '@mui/material'
import {useDispatch, useSelector} from 'react-redux'
import Box from '@mui/material/Box'
import {
  fetchInstanciaTareaInstanciaProceso,
  handleSetBandeja,
} from 'src/features/App/sliceApp'
// import {f} from 'src/commons/f'
// import API from 'src/features/App/API'
import {useNavigate} from 'react-router-dom'
import {blue, red} from '@mui/material/colors'
// import {MySubtitle2} from 'src/components/MySubtitle'
import {format, parseISO} from 'date-fns'
import {es} from 'date-fns/locale'
import Button from "@mui/material/Button";
// import {Aprobada} from 'src/features/App/subcomponents/Aprobada'
// import {MyCardHeader} from "../../../components/MyCardHeader"
import {MyCardContent} from "../../../components/MyCardContent"
import RobotoCondensedRegular from 'src/styles/MyFonts/Roboto_Condensed/RobotoCondensed-Regular.ttf'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import GradingIcon from '@mui/icons-material/Grading'
// import {color02} from 'src/styles/styles'

export const Tarea =({tarea}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const perfilUsuario = useSelector(state => state.app.perfilUsuario)

  const noeditable = (tarea.estadoInstanciaProceso === "En Progreso" || tarea.estadoInstanciaProceso === "Completado") && tarea.estadoInstanciaTarea === "Finalizada"
  const hcolor = noeditable ? blue[500] : blue[800]
  const lcolor = noeditable ? blue[300] : blue[600]
  return (
    <Grid item xs={3} sx={{p:'0 0.5rem 0.5rem 0.5rem'}}>
    <Card variant="outlined" sx={{borderColor: hcolor}}>
      <CardHeader sx={{backgroundColor: hcolor, color: 'white', p: '0.5rem', height: '2.4rem'}}
                  title={
                    <Stack direction={'row'}
                           justifyContent='space-between'
                           alignItems='center' sx={{p: '0 0.4rem 0 0.4rem'}}>
                      <Typography
                        sx={{m: '0.2rem 0 0.2rem 0', fontSize: '0.8rem', fontFamily: RobotoCondensedRegular}}>
                        {tarea.instanciaProcesoNombreProceso}
                      </Typography>
                      {
                        !noeditable ?
                          <BorderColorIcon sx={{color: 'white', fontSize: '1rem'}}/> :
                          <GradingIcon sx={{color: 'white', fontSize: '1rem'}}/>
                      }
                    </Stack>
                  }/>
      <MyCardContent h1={tarea.instanciaProcesoSolicitudNumeroSolicitud}
                     h2={format(parseISO(tarea.fechaHoraInicia), 'dd MMMM yyyy hh:mm', {locale: es})}
                     content={tarea.instanciaProcesoSolicitudNombreProyecto} />
      <CardActions sx={{backgroundColor: 'white', borderTop: `1px solid ${hcolor}`}}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
              <Button size="small"
                      sx={{
                        width: '40%',
                        color: `${!noeditable ? 'white': hcolor }`,
                        backgroundColor: `${!noeditable ? hcolor : 'white'}`
                      }}
                      onClick={() => {
                        if (!noeditable) {
                          dispatch(fetchInstanciaTareaInstanciaProceso(tarea.id))
                          dispatch(handleSetBandeja('entrada'))
                        }
                      }}
                      variant={!noeditable ? 'contained' : 'text'}>
                {!noeditable ? 'Editar' : 'En evaluación'}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
    </Grid>
  )
}
