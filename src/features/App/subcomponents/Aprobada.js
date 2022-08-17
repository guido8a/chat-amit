import React, { useState} from 'react'
import {
  Card,
  CardActions,
  Grid,
  Stack,
  Button
} from '@mui/material'
import {
  fetchInstanciaProcesoRO,
  // fetchInstanciaTareaInstanciaProceso,
  handleCrearProceso,
  handleRefreshTareas,
  // handleSetBandeja,
} from 'src/features/App/sliceApp'
import {useDispatch, useSelector} from 'react-redux'
import {color02} from 'src/styles/styles'
import {useNavigate} from 'react-router-dom'
import {MyConfirm} from 'src/components/MyConfirm'
// import {format, parseISO} from 'date-fns'
// import {es} from 'date-fns/locale'
// import {blue} from '@mui/material/colors'
// import {handelSetAnyPayload} from 'src/features/App/sliceApp'
import {MyCardHeader} from "../../../components/MyCardHeader";
import {MyCardContent} from "../../../components/MyCardContent";
import {Tarea} from "./Tarea";
import {WF0710Aprobada} from "./WF0710Aprobada";

const WF0102 = ({aprobada, payload, dispatch, navigate, dialogData, setDialogData, perfilUsuario}) => {

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
            setTimeout(function () { dispatch(handleRefreshTareas(perfilUsuario.id)) }, 1500)
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
            const aprob = {
              Solicitante: payload.Solicitante,
              Propuesta:   payload.Propuesta,
              Personal:    payload.Personal,
              Recursos:    payload.Recursos,
              Resolucion:  payload.Resolucion,
            }
            dispatch(handleCrearProceso(
              55000024,
              perfilUsuario?.id,
              perfilUsuario?.codigoPerfilUsuario,
              {...aprobada, payloadSolicitud:JSON.stringify(aprob)},
              null,
              null
            ))
            setTimeout(function () {
              dispatch(handleRefreshTareas(perfilUsuario.id))
            }, 1500)
          }
        })
      }
    }
  ]

  return (
    <Card variant="outlined" sx={{borderWidth: '1px', borderColor: color02}}>
      <MyCardHeader bgColor={color02}
                    color={'white'}
                    cardTitle={(aprobada.tipoInstanciaProceso === 'Permiso') ?
                      'Solicitud de Permiso de investigación' :
                      'Solicitud de Contrato de acceso con potencial uso comercial'
                    }
                    menu={!aprobada.suspendidaSolicitud ? menu : null}
                    state={{
                      state: (!aprobada.suspendidaSolicitud ? 'aprobada' : 'suspendida'),
                      tip: !aprobada.suspendidaSolicitud ? 'Aprobada' : 'Suspendida'
                    }}/>
      <MyCardContent h1={aprobada.solicitudNumeroSolicitud}
                     h2={payload.Resolucion?.fecha}
                     content={aprobada.nombreProyectoSolicitud}/>
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
  )
}

export const Aprobada =({aprobada, tareas, WF0710Aprobadas}) => {
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

  const payload = JSON.parse(aprobada.payloadSolicitud)

  return (
    <>
      <Grid item xs={3} sx={{p:'0 0.5rem 0.5rem 0.5rem'}}>
        <WF0102 aprobada={aprobada}
                payload={payload}
                dispatch={dispatch}
                navigate={navigate}
                dialogData={dialogData}
                setDialogData={setDialogData}
                perfilUsuario={perfilUsuario} />
      </Grid>
      {
        tareas?.filter(it => it.instanciaProcesoSolicitudEstadoSolicitud !== 'Aprobada' && it.instanciaProcesoNumeroSolicitudPadre === aprobada.solicitudNumeroSolicitud)?.map((it, idx) => <Tarea key={idx} tarea={it} />)
      }
      {
        WF0710Aprobadas.filter(it => it.numeroSolicitudPadre === aprobada.solicitudNumeroSolicitud).map((it, i) => {
          return (
            <WF0710Aprobada key={i} aprobada={it} payload={payload} tareas={tareas} />
            // <Grid key={i} item xs={3} sx={{p:'0 0.5rem 0.5rem 0.5rem'}}>
            //   <WF0710Aprobada key={i} aprobada={it} payload={payload} tareas={tareas}/>
            // </Grid>
          )
        })
      }
      <MyConfirm dialogData={dialogData} setDialogData={setDialogData} />
    </>
  )
}
