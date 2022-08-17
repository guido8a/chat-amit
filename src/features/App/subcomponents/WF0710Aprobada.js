import React, {useState} from "react";
import {Button, Card, CardActions, Grid, Stack} from "@mui/material";
import {MyCardHeader} from "../../../components/MyCardHeader";
import {MyCardContent} from "../../../components/MyCardContent";
import {fetchInstanciaProcesoRO, handleCrearProceso, handleRefreshTareas} from "../sliceApp";
import {useDispatch, useSelector} from 'react-redux'
import {color02} from 'src/styles/styles'
import {useNavigate} from 'react-router-dom'
import {MyConfirm} from "../../../components/MyConfirm";
import {blue} from "@mui/material/colors";
import {format, parseISO} from 'date-fns'
import {es} from 'date-fns/locale'
import {
  fetchInstanciaTareaInstanciaProceso,
  handleSetBandeja
} from "../sliceApp";


export const WF0710Aprobada = ({aprobada, payload, tareas}) => {

  console.log('========> > > > > ', tareas.filter(it => it.instanciaProcesoNumeroSolicitudPadre === aprobada.solicitudNumeroSolicitud))

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const perfilUsuario = useSelector(state => state.app.perfilUsuario)
  const [dialogData, setDialogData] = useState({
    title: 'ATENCIÓN',
    message: '[message]',
    openDialog: false,
    okAction: () => {
      alert('NO IMPLEMENTADO . . .')
    },
    cancelAction: () => alert('[cancelAction]'),
    messsageAfterOk: 'Se ejecutó',
    mode: 'OK_CANCEL_AFTEROK',
  })

  const menu = [
    {
      key: 'WF08',
      description: 'Emitir Permiso Importacion Recursos (WF08)',
      action: () => {
        setDialogData({
          ...dialogData,
          message: 'Va a crear una nueva Emisión de Permiso Importacion Recursos (WF08)',
          messsageAfterOk: 'Se ha creado una nueva Emisión de Permiso Importacion Recursos (WF08)',
          openDialog: true,
          okAction: () => {
            const p = JSON.parse(aprobada.payloadSolicitud)
            const solicitudAprobada = p.Solicitud
            const solicitudPermiso = JSON.parse(solicitudAprobada.solicitudAprobada)
            const muestras2 = [...solicitudAprobada.muestras].map(it => ({
              ...it,
              cantidadAutorizada: it.saldoHolotipos,
              cantidadSolicitada: 0,
            }))
            let sp = {
              solicitudNumeroSolicitud: aprobada.solicitudNumeroSolicitud,
              payloadSolicitud: JSON.stringify({
                Solicitante: solicitudPermiso.Solicitante,
                Propuesta: solicitudPermiso.Propuesta,
                Personal: solicitudPermiso.Personal,
                Resolucion: solicitudPermiso.Resolucion,
                father: aprobada,
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
            dispatch(handleCrearProceso(55000007, perfilUsuario?.id, perfilUsuario?.idPerfilUsuario, sp))
            setTimeout(() => { dispatch(handleRefreshTareas(perfilUsuario.id)) }, 1500)
          }
        })
      }
    },
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
            const p = JSON.parse(aprobada.payloadSolicitud)
            const solicitudAprobada = p.Solicitud
            const solicitudPermiso = JSON.parse(solicitudAprobada.solicitudAprobada)
            const muestras2 = [...solicitudAprobada.muestras].map(it => ({
              ...it,
              cantidadAutorizada: it.saldoHolotipos,
              cantidadSolicitada: 0,
            }))
            let sp = {
              solicitudNumeroSolicitud: aprobada.solicitudNumeroSolicitud,
              payloadSolicitud: JSON.stringify({
                Solicitante: solicitudPermiso.Solicitante,
                Propuesta: solicitudPermiso.Propuesta,
                Personal: solicitudPermiso.Personal,
                Resolucion: solicitudPermiso.Resolucion,
                father: aprobada,
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
            const p = JSON.parse(aprobada.payloadSolicitud)
            const solicitudAprobada = p.Solicitud
            const solicitudPermiso = JSON.parse(solicitudAprobada.solicitudAprobada)
            const muestras2 = [...solicitudAprobada.muestras].map(it => ({
              ...it,
              cantidadAutorizada: it.saldoExportaciones,
              cantidadSolicitada: 0,
            }))
            let sp = {
              solicitudNumeroSolicitud: aprobada.solicitudNumeroSolicitud,
              payloadSolicitud: JSON.stringify({
                Solicitante: solicitudPermiso.Solicitante,
                Propuesta: solicitudPermiso.Propuesta,
                Personal: solicitudPermiso.Personal,
                Resolucion: solicitudPermiso.Resolucion,
                father: aprobada,
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
                        cardTitle={aprobada.nombreProceso}
                        menu={menu}
                        state={{
                          state: (!aprobada.suspendidaSolicitud ? 'aprobada' : 'suspendida'),
                          tip: !aprobada.suspendidaSolicitud ? 'Aprobada' : 'Suspendida'
                        }}/>
          <MyCardContent h1={aprobada.solicitudNumeroSolicitud}
                         h2={payload.Resolucion?.fecha}
                         content={`${aprobada.nombreProyectoSolicitud}`}/>
          <CardActions sx={{backgroundColor: 'white', borderTop: `1px solid ${color02}`}}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                  <Button size='small'
                          onClick={() => {
                            dispatch(fetchInstanciaProcesoRO(aprobada.id))
                            setTimeout(() => navigate('/solicitudro'), 500)
                          }}
                          sx={{width: '40%', color: 'white', backgroundColor: color02}}
                          variant='outlined'>VER</Button>
                </Stack>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Grid>

      {
        tareas.filter(it => it.instanciaProcesoNumeroSolicitudPadre === aprobada.solicitudNumeroSolicitud).map(tarea => {
          const noeditable = (tarea.estadoInstanciaProceso === "En Progreso" || tarea.estadoInstanciaProceso === "Completado") && tarea.estadoInstanciaTarea === "Finalizada"
          const aprobada = tarea.instanciaProcesoSolicitudEstadoSolicitud === "Aprobada"
          let hcolor = noeditable ? blue[500] : blue[800]
          let lcolor = noeditable ? blue[300] : blue[600]
          if(tarea.estadoInstanciaProceso === "Completado" && tarea.estadoInstanciaTarea === "Finalizada" && aprobada) {
            hcolor = color02
            lcolor = 'color02'
          }

          return (
            <Grid item xs={3} sx={{p:'0 0.5rem 0.5rem 0.5rem'}}>
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

      <MyConfirm dialogData={dialogData} setDialogData={setDialogData} />
    </>
  )
}

