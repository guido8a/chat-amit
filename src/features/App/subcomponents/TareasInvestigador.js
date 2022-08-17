import React, {useEffect} from 'react'
import {
  Card, CardActions,
  Grid, Paper,
  Stack,
} from '@mui/material'
import {useDispatch, useSelector} from 'react-redux'
import Box from '@mui/material/Box'
import {
  fetchInstanciaTareaInstanciaProceso,
  handleSetBandeja,
} from 'src/features/App/sliceApp'
import {f} from 'src/commons/f'
import API from 'src/features/App/API'
import {useNavigate} from 'react-router-dom'
import {blue, red} from '@mui/material/colors'
import {MySubtitle2} from 'src/components/MySubtitle'
import {format, parseISO} from 'date-fns'
import {es} from 'date-fns/locale'
import Button from "@mui/material/Button";
import {Aprobada} from 'src/features/App/subcomponents/Aprobada'
import {MyCardHeader} from "../../../components/MyCardHeader"
import {MyCardContent} from "../../../components/MyCardContent"

export const TareasInvestigador = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const aprobadas = useSelector(state => state.app.solicitudesAprobadas)
  const noAprobadas = useSelector(state => state.app.solicitudesNoAprobadas)
  const instanciasTarea = useSelector(state => state.app.instanciasTarea)
  // console.log(' . . . APROBADAS: ', aprobadas)
  // console.log(' .  NO APROBADAS: ', noAprobadas)
  // console.log(' . . . APROPBADAS: ', aprobadas.filter(it => it.idProceso ===55000005))
  // const solicitudIdCreated = useSelector(state => state.app.solicitudIdCreated)
  // console.log('. . . . solicitudIdCreated :: ', solicitudIdCreated)

  const instanciaTarea = useSelector(state => state.app.instanciaTarea)
  const iniciadas = instanciasTarea.filter(it => it.estadoInstanciaTarea === 'Iniciada' || (it.estadoInstanciaProceso ==="En Progreso" && it.estadoInstanciaTarea==="Finalizada"))
  const wf0102iniciadas = iniciadas
    .filter(it => ['Process_WF5_Usuario', 'Process_WF0102_Usuario','Process_WF0102_Usuario','Process_WF0405_Usuario'].includes(it.instanciaProcesoProcesoCodigoProceso))

  React.useEffect(() => {
    if(instanciaTarea?.id !== null) {
      const route = API.getRoute(instanciaTarea)
      if(f.isValid(route)) navigate(route)
    }
  }, [instanciaTarea])

  useEffect(() => {window.scrollTo(0, 0)}, [])

  return (
    <Box sx={{p:'0 1rem 1rem 1rem'}}>
      {wf0102iniciadas.length > 0 ?
        <MySubtitle2 subtitle={'Solicitudes Iniciadas y Proceso de Aprobación'} />:
        <MySubtitle2 subtitle={'NO HAY Solicitudes en proceso de Aprobación'}/>
      }
      <Grid container spacing={1}>
        {
          wf0102iniciadas.map((mtarea, midx) => {
            if(mtarea.instanciaProcesoSolicitudNumeroSolicitud === "SPI-2022-22493") {
              console.log('|||>> ', mtarea)
            }
            const noeditable = mtarea.estadoInstanciaProceso === "En Progreso" && mtarea.estadoInstanciaTarea === "Finalizada"
            const hcolor = noeditable?blue[500]:blue[800]
            let proceso = {
              'Permiso':  'Solicitud de Permiso de investigación',
              'Contrato': 'Solicitud de Contrato de acceso con potencial uso comercial',
            }[mtarea.tipoInstanciaProceso]

            if(!f.isValid(proceso)) {
              proceso = mtarea.instanciaProcesoNombreProceso
            }
            // const lcolor = noeditable?blue[300]:blue[600]
            return (
              <Grid item  key={`wf0101iniciadas-${midx}`} xs={2} sm={6} md={4} lg={3}>
                <Card variant="outlined" sx={{borderColor: hcolor}}>
                  <MyCardHeader bgColor={hcolor}
                                color={'white'}
                                cardTitle={proceso}
                                menu={[]}
                                state={{
                                  state:noeditable? 'noEditable' : 'editable',
                                  tip: noeditable ? 'En evaluación' : 'En elaboración',
                                }} />
                  <MyCardContent h1={mtarea.instanciaProcesoSolicitudNumeroSolicitud}
                                 h2={format(parseISO(mtarea.fechaHoraInicia),'dd MMMM yyyy hh:mm', {locale: es})}
                                 content={mtarea?.instanciaProcesoSolicitudNombreProyecto} />
                  <CardActions sx={{backgroundColor: 'white', borderTop:`1px solid ${hcolor}`}}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                          <Button size='small'
                                  onClick={() => {
                                    dispatch(fetchInstanciaTareaInstanciaProceso(mtarea.id))
                                    dispatch(handleSetBandeja('salida'))
                                  }}
                                  sx={{width:'40%', color:('white'), borderColor:hcolor}}
                                  variant='contained'>ver</Button>
                          {
                            !noeditable?
                              <Button size="small"
                                      sx={{width:'40%', color:(!noeditable?'white':hcolor), borderColor:hcolor}}
                                      onClick={() => {
                                        if(!noeditable) {
                                          dispatch(fetchInstanciaTareaInstanciaProceso(mtarea.id))
                                          dispatch(handleSetBandeja('entrada'))
                                        }
                                      }}
                                      variant={!noeditable?'contained':'text'}>
                                {'Editar'}
                              </Button>:null
                          }
                        </Stack>
                      </Grid>
                    </Grid>
                  </CardActions>
                </Card>
              </Grid>
            )
          })
        }
        <>
          {
            aprobadas?.filter(it => f.isValid(it.nombreProyectoSolicitud) && it.nombreProyectoSolicitud !== '' && it.idProceso === 55000014).length > 0?
              <Grid item xs={12} >
                <MySubtitle2 subtitle={'Solicitudes Aprobadas'} />
              </Grid>:null
          }
          {
            aprobadas?.filter(it => f.isValid(it.nombreProyectoSolicitud) && it.nombreProyectoSolicitud !== '' && it.idProceso === 55000014)
              .map((aprobada, midx) => {
                return (
                  <Paper key={midx} elevation={2} sx={{width:'100%', p:'0.5rem 0 0 0', m:'1rem 0 1rem 0'}}>
                    <Grid container key={`aprobada-${midx}`}>
                      <Aprobada aprobada={aprobada}
                                tareas={instanciasTarea.filter(it => [55000004, 55000005, 55000007, 55000011, 55000009, 55000025, 55000024, 55000026, 55000027].includes(it.instanciaProcesoIdProceso))}
                                WF0710Aprobadas={aprobadas?.filter(it => [55000004, 55000005,].includes(it.idProceso))} />
                    </Grid>
                  </Paper>
                )
              })
          }
        </>
        {
          noAprobadas?.filter(it => f.isValid(it.nombreProyectoSolicitud)).length > 0?
            <Grid item xs={12} >
              <MySubtitle2 subtitle={'Solicitudes no aprobadas'} />
            </Grid> :null
        }
        {
          noAprobadas?.filter(it => f.isValid(it.nombreProyectoSolicitud))
            .map((noAprobada, midx) => {
              const nombreProceso = {
                'Permiso':'Solicitud de Permiso de investigación',
                'Contrato':'Solicitud de Contrato de acceso con potencial uso comercial',
              }[noAprobada.tipoInstanciaProceso] ?? noAprobada.nombreProceso
              return (
                <Grid key={`aprobada-${midx}`} item xs={2} sm={6} md={4} lg={3} >
                  <Card variant='outlined' sx={{borderWidth: '1px', borderColor: red[800]}}>
                    <MyCardHeader bgColor={red[800]}
                                  color={'white'}
                                  cardTitle={nombreProceso}
                                  menu={[]}
                                  state={{ state:'noAprobabada', tip: 'No aprobada' }} />
                    <MyCardContent h1={noAprobada.solicitudNumeroSolicitud}
                                   h2={f.isValid(noAprobada?.fechaHoraInicia)?format(parseISO(noAprobada?.fechaHoraInicia),'dd MMMM yyyy hh:mm', {locale: es}):''}
                                   content={noAprobada.nombreProyectoSolicitud} />
                    {/*TODO: implementar "ver"*/}
                  </Card>
                </Grid>
              )
            })
        }
      </Grid>
    </Box>
  )
}
