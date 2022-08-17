import React, { useState} from 'react'
import {
  Card,
  CardActions,
  Grid,
  Stack,
  Button
} from '@mui/material'
import {
  fetchInstanciaProcesoRO, fetchInstanciaTareaInstanciaProceso, handleCrearProceso, handleRefreshTareas,
  handleSetBandeja,
} from 'src/features/App/sliceApp'
import {useDispatch, useSelector} from 'react-redux'
import {color02} from 'src/styles/styles'
import {useNavigate} from 'react-router-dom'
import {MyConfirm} from 'src/components/MyConfirm'
import {format, parseISO} from 'date-fns'
import {es} from 'date-fns/locale'
import {blue} from '@mui/material/colors'
import {handelSetAnyPayload} from 'src/features/App/sliceApp'
import {MyCardHeader} from "../../../components/MyCardHeader";
import {MyCardContent} from "../../../components/MyCardContent";

export const Aprobada =({aprobada, tareas, WF0710Aprobadas}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const perfilUsuario = useSelector(state => state.app.perfilUsuario)

  console.log('. . . . > > > > :: ', tareas)

  const [dialogData, setDialogData] = useState({
    title: 'ATENCIÓN',
    message: '[message]',
    openDialog: false,
    okAction: () => {
      alert('NO IMPLEMENTADO . . .')
    },
    cancelAction: () => alert('[cancelAction]'),
    messsageAfterOk: 'Se ejecutó',
    mode: 'OK_CANCEL_AFTEROK'
  })

  const payload = JSON.parse(aprobada.payloadSolicitud)

  const menu = [
    {
      key:'ATM',
      description:'Acuerdo de Transferencia de Material',
      action:()=> {
        setDialogData({
          ...dialogData,
          message: 'Va a crear una nueva solicitud de Acuerdo de Transferencia de Material',
          messsageAfterOk: 'Se ha creado una nueva solicitud de Acuerdo de Transferencia de Material',
          openDialog: true,
          okAction: () => {
            const payload = JSON.parse(aprobada.payloadSolicitud)
            let muestras = [...payload.InformeTecnicoMaate.muestras]
            muestras.forEach(it => {
              it.cantidadAutorizada = it.saldorATM
              it.cantidadSolicitada = 0
            })
            const aprob = {
              Solicitante: payload.Solicitante,
              Propuesta: payload.Propuesta,
              Personal:payload.Personal,
              Recursos: {...payload.Recursos, muestras},
              Resolucion: payload.Resolucion,
            }
            dispatch(handleCrearProceso(
              55000005,
              perfilUsuario?.id,
              perfilUsuario?.codigoPerfilUsuario,
              {...aprobada, payloadSolicitud:JSON.stringify(aprob)}
            ))
            setTimeout(function () {
              dispatch(handleRefreshTareas(perfilUsuario.id))
            }, 1500);
          }
        })
      }
    },
    {
      key:'DMR',
      description:'Declaración de Movilización de Recursos',
      action:()=> {
        setDialogData({
          ...dialogData,
          message: 'Va a crear una nueva Declaración de Movilización de Recursos',
          messsageAfterOk: 'Se ha creado una nueva Declaración de Movilización de Recursos',
          openDialog: true,
          okAction: () => {
            const payload = JSON.parse(aprobada.payloadSolicitud)
            let muestras = [...payload.InformeTecnicoMaate.muestras]
            muestras.forEach(it => {
              it.cantidadAutorizada = it.saldoDRM
              it.cantidadSolicitada = 0
            })
            const aprob = {
              Solicitante: payload.Solicitante,
              Propuesta: payload.Propuesta,
              Personal:payload.Personal,
              Recursos: {...payload.Recursos, muestras},
              Resolucion: payload.Resolucion,
            }
            dispatch(handleCrearProceso(
              55000004,
              perfilUsuario?.id,
              perfilUsuario?.codigoPerfilUsuario,
              {...aprobada, payloadSolicitud:JSON.stringify(aprob)}
            ))
            setTimeout(function () {
              dispatch(handleRefreshTareas(perfilUsuario.id))
            }, 1500);
          }
        })
      }
    },
    {
      key: 'MPI',
      description: 'Modificación al Permiso de Investigación',
      action: () => {
        setDialogData({
          ...dialogData,
          message: '¿Desea crear una Solicitud de Modificación al Permiso de Investigación?',
          messsageAfterOk: 'Se ha creado una Solicitud de Modificación al Permiso de Investigación',
          openDialog: true,
          okAction: () => {
            const payload = JSON.parse(aprobada.payloadSolicitud)
            dispatch(handleCrearProceso(
              55000016,
              perfilUsuario?.id,
              perfilUsuario?.codigoPerfilUsuario,
              {},
              null,
              payload.solicitudId
            ))
            setTimeout(function () {
              dispatch(handleRefreshTareas(perfilUsuario.id))
            }, 1500);
          }
        })
      }
    },
    {
      key: 'CERRAR',
      description: 'Cerrar autorización',
      action: () => {
        setDialogData({
          ...dialogData,
          message: '¿Desea crear una Solicitud para cerrar una autorización?',
          messsageAfterOk: 'Se ha creado una Solicitud para cerrar una autorización',
          openDialog: true,
          okAction: () => {
            const payload = JSON.parse(aprobada.payloadSolicitud)
            dispatch(handleCrearProceso(
              55000024,
              perfilUsuario?.id,
              perfilUsuario?.codigoPerfilUsuario,
              {},
              null,
              payload.solicitudId
            ))
            setTimeout(function () {
              dispatch(handleRefreshTareas(perfilUsuario.id))
            }, 1500);
          }
        })
      }
    }
  ]

  return (
    <>
      <Grid item xs={3} sx={{p:'0 0.5rem 0.5rem 0.5rem'}}>
        <Card variant="outlined" sx={{borderWidth: '1px', borderColor: color02}}>
          <MyCardHeader bgColor={color02}
                        color={'white'}
                        cardTitle={(aprobada.tipoInstanciaProceso === 'Permiso') ?
                          'Solicitud de Permiso de investigación' :
                          'Solicitud de Contrato de acceso con potencial uso comercial'
                        }
                        menu={!aprobada.suspendidaSolicitud?menu:null}
                        state={{state:(!aprobada.suspendidaSolicitud?'aprobada':'suspendida'), tip: !aprobada.suspendidaSolicitud?'Aprobada':'Suspendida'}} />
          <MyCardContent h1={aprobada.solicitudNumeroSolicitud}
                         h2={payload.Resolucion?.fecha}
                         content={aprobada.nombreProyectoSolicitud} />
          <CardActions sx={{backgroundColor: 'white', borderTop:`1px solid ${color02}`}}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                  <Button size='small'
                          onClick={() => {
                            dispatch(fetchInstanciaProcesoRO(aprobada.id))
                            setTimeout(() => navigate('/solicitudro'), 500)
                          }}
                          sx={{width: '40%', color: 'white', backgroundColor: color02}}
                          variant='outlined'>
                    VER
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Grid>
      {tareas?.filter(tarea => /*tarea.estadoInstanciaProceso !== "Completado" &&*/ tarea.instanciaProcesoNumeroSolicitudPadre === aprobada.solicitudNumeroSolicitud)?.map(tarea => {
        const noeditable = (tarea.estadoInstanciaProceso === "En Progreso" || tarea.estadoInstanciaProceso === "Completado") && tarea.estadoInstanciaTarea === "Finalizada"
        const hcolor = noeditable ? blue[500] : blue[800]
        return (
          <Grid item key={'tarea'+Math.random()} xs={3} sx={{p:'0 0.5rem 0.5rem 0.5rem'}}>
            <Card variant="outlined" sx={{borderColor: hcolor}}>
              <MyCardHeader bgColor={hcolor}
                            color={'white'}
                            cardTitle={tarea.instanciaProcesoNombreProceso}
                            menu={[]} state={{
                state:!noeditable?'editable':'noEditable',
                tip:!noeditable?'En elaboración':'En evaluación'
              }} />
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
                                color: `${!noeditable ? 'white' : hcolor}`,
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
      })}
      {WF0710Aprobadas.filter(it => it.payloadSolicitud !== '{}' && it.numeroSolicitudPadre === aprobada.solicitudNumeroSolicitud).map((wf10) => {
        const payload10 = JSON.parse(wf10.payloadSolicitud)
        const menu = [
          {
            key: 'WF09',
            description: 'Permiso de salida de holotipos',
            action: () => {
              setDialogData({
                ...dialogData,
                message: 'Va a crear una nueva Solicitud de salida de holotipos (WF09)',
                messsageAfterOk: 'Se ha creado una nueva Solicitud de salida de holotipos (WF09)',
                openDialog: true,
                okAction: () => {
                  const p = JSON.parse(wf10.payloadSolicitud)
                  const solicitudAprobada = p.Solicitud
                  const solicitudPermiso = JSON.parse(solicitudAprobada.solicitudAprobada)
                  const muestras2 = [...solicitudAprobada.muestras].map(it => ({
                    ...it,
                    cantidadAutorizada: it.saldoHolotipos,
                    cantidadSolicitada: 0,
                  }))
                  let sp = {
                    solicitudNumeroSolicitud: wf10.solicitudNumeroSolicitud,
                    payloadSolicitud: JSON.stringify({
                      Solicitante: solicitudPermiso.Solicitante,
                      Propuesta: solicitudPermiso.Propuesta,
                      Personal: solicitudPermiso.Personal,
                      Resolucion: solicitudPermiso.Resolucion,
                      father: wf10,
                      Recursos:{
                        muestras:muestras2,
                        recursos: solicitudAprobada.recursos,
                        areasProtegidas: solicitudPermiso.Recursos.areasProtegidas,
                        provincias: solicitudPermiso.Recursos.provincias,
                        laboratorios: solicitudPermiso.Recursos.laboratorios,
                        bosquesProtectores: solicitudPermiso.Recursos.bosquesProtectores,
                      }
                    })
                  }
                  dispatch(handleCrearProceso(55000009, perfilUsuario?.id, perfilUsuario?.idPerfilUsuario, sp))
                  setTimeout(function(){
                    dispatch(handleRefreshTareas(perfilUsuario.id))
                  }, 1500);
                }
              })
            }
          },
          {
            key: 'WF11',
            description: 'Permiso de exportación de recursos',
            action: () => {
              setDialogData({
                ...dialogData,
                message: 'Va a crear una nueva Solicitud de permiso de exportación de recursos (WF11)',
                messsageAfterOk: 'Se ha creado una nueva Solicitud de permiso de importación de recursos (WF11)',
                openDialog: true,
                okAction: () => {
                  const p = JSON.parse(wf10.payloadSolicitud)
                  const solicitudAprobada = p.Solicitud
                  const solicitudPermiso = JSON.parse(solicitudAprobada.solicitudAprobada)
                  const muestras2 = [...solicitudAprobada.muestras].map(it => ({
                    ...it,
                    cantidadAutorizada: it.saldoExportaciones,
                    cantidadSolicitada: 0,
                  }))
                  let sp = {
                    solicitudNumeroSolicitud: wf10.solicitudNumeroSolicitud,
                    payloadSolicitud: JSON.stringify({
                      Solicitante: solicitudPermiso.Solicitante,
                      Propuesta: solicitudPermiso.Propuesta,
                      Personal: solicitudPermiso.Personal,
                      Resolucion: solicitudPermiso.Resolucion,
                      father: wf10,
                      Recursos:{
                        muestras:muestras2,
                        recursos: solicitudAprobada.recursos,
                        areasProtegidas: solicitudPermiso.Recursos.areasProtegidas,
                        provincias: solicitudPermiso.Recursos.provincias,
                        laboratorios: solicitudPermiso.Recursos.laboratorios,
                        bosquesProtectores: solicitudPermiso.Recursos.bosquesProtectores,
                      }
                    })
                  }
                  dispatch(handleCrearProceso(55000011, perfilUsuario?.id, perfilUsuario?.idPerfilUsuario, sp))
                  setTimeout(function(){
                    dispatch(handleRefreshTareas(perfilUsuario.id))
                  }, 1500);
                }
              })
            }
          }
        ]
        return (
          <>
            <Grid item xs={3} sx={{p:'0 0.5rem 0.5rem 0.5rem'}}>
              <Card variant="outlined" sx={{borderWidth: '1px', borderColor: color02}}>
                <MyCardHeader bgColor={color02}
                              color={'white'}
                              cardTitle={wf10.nombreProceso}
                              menu={menu}
                              state={{
                                state:'aprobada',
                                tip:'Aprobada',
                              }} />
                <MyCardContent h1={wf10.solicitudNumeroSolicitud}
                  // h2={format(parseISO(tarea.fechaHoraInicia), 'dd MMMM yyyy hh:mm', {locale: es})}
                               content={wf10.nombreProyectoSolicitud} />
                <CardActions sx={{backgroundColor: 'white', borderTop:`1px solid ${color02}`}}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                        <Button size="small"
                                sx={{ width: '40%', color: 'white', backgroundColor: color02,}}
                                onClick={() => {
                                  dispatch(handelSetAnyPayload(payload10))
                                  setTimeout(function(){
                                    navigate('/atmro')
                                  }, 500)
                                }}
                                variant={'contained'}>
                          {'VER ATM'}
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </CardActions>
              </Card>
            </Grid>
            {
              tareas.filter(it => it.instanciaProcesoNumeroSolicitudPadre === wf10.solicitudNumeroSolicitud && it.instanciaProcesoSolicitudEstadoSolicitud !== "Denegada").map(tarea => {
                const noeditable = (tarea.estadoInstanciaProceso === "En Progreso" || tarea.estadoInstanciaProceso === "Completado") && tarea.estadoInstanciaTarea === "Finalizada"
                const aprobada = tarea.instanciaProcesoSolicitudEstadoSolicitud === "Aprobada"
                let hcolor = noeditable ? blue[500] : blue[800]
                if(tarea.estadoInstanciaProceso === "Completado" && tarea.estadoInstanciaTarea === "Finalizada" && aprobada) {
                  hcolor = color02
                }
                return (
                  <Grid item xs={3} sx={{p:'0 0.5rem 0.5rem 0.5rem'}} >
                    <Card variant="outlined" sx={{borderColor: hcolor}} key={tarea.instanciaProcesoSolicitudNumeroSolicitud}>
                      <MyCardHeader bgColor={hcolor}
                                    color={'white'}
                                    cardTitle={tarea.instanciaProcesoNombreProceso}
                                    menu={[]}
                                    state={{
                                      state:!noeditable ?'editable':'aprobada',
                                      tip:!noeditable ? 'Editable' : aprobada?'Aprobada':'En evaluación'
                                    }} />
                      <MyCardContent h1={tarea.instanciaProcesoSolicitudNumeroSolicitud}
                                     h2={format(parseISO(tarea.fechaHoraInicia), 'dd MMMM yyyy hh:mm', {locale: es})}
                                     content={tarea.instanciaProcesoSolicitudNombreProyecto} />
                      <CardActions sx={{backgroundColor: 'white', borderTop: `1px solid ${hcolor}`}}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                              <Button size="small"
                                      sx={{ width: '40%', color: 'white', backgroundColor: `${hcolor}`}}
                                      onClick={() => {
                                        if (!noeditable) {
                                          dispatch(fetchInstanciaTareaInstanciaProceso(tarea.id))
                                          dispatch(handleSetBandeja('entrada'))
                                        }
                                      }}
                                      variant={!noeditable ? 'contained' : 'text'}>
                                {!noeditable ? 'Editar' : 'Ver'}
                              </Button>
                            </Stack>
                          </Grid>
                        </Grid>
                      </CardActions>
                    </Card>
                  </Grid>
                )
              })
            }
          </>
        )
      })}
      <MyConfirm dialogData={dialogData} setDialogData={setDialogData} />
    </>
  )
}

// cons
