import React, {useEffect} from 'react'
import {Box} from "@mui/material";
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {f} from 'src/commons/f'

import P10ATMElaborarSolicitud from 'src/features/P10ATM/P10ATMElaborarSolicitud'
import P10ATMValidar from 'src/features/P10ATM/P10ATMValidar'
import P01SolicitudAsignacionCaso from 'src/features/P01Solicitud/P01SolicitudAsignacionCaso'
import {handleSetAtms} from "../App/sliceApp";

export const Widget = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const perfilUsuario = useSelector(state => state.app.perfilUsuario)
  const instanciaTarea = useSelector(state => state.app.instanciaTarea)
  const instanciaProceso = useSelector(state => state.app.instanciaProceso)
  const solicitud = instanciaProceso?.solicitud
  const solicitudesAprobadas = useSelector(state => state.app.solicitudesAprobadas)
  const atms = useSelector(state => state.app.atms)

  useEffect(() => {
    dispatch(handleSetAtms(perfilUsuario.id,55000005))
  },[perfilUsuario])

  useEffect(()=> {
    if(!f.isValid(instanciaTarea.id)) {navigate('/')}
  }, [instanciaTarea, navigate])

  useEffect(() => {window.scrollTo(0, 0)}, [])

  if(f.isValid(instanciaTarea.id) && f.isValid(instanciaProceso.id) ) {
    const formulario = {
      '55000005_Activity_ElaborarSolicitudWF10': () => <P10ATMElaborarSolicitud instanciaTarea={instanciaTarea}
                                                                                instanciaProceso={instanciaProceso}
                                                                                solicitud={solicitud}
                                                                                perfilUsuario={perfilUsuario}
                                                                                solicitudesAprobadas={solicitudesAprobadas} />,
      '55000006_Activity_AsignarCaso': () => <P01SolicitudAsignacionCaso id='55000006_Activity_AsignarCaso' />,
      '55000005_Activity_ElaborarRespuesta': () => <P10ATMValidar instanciaTarea={instanciaTarea}
                                                                  instanciaProceso={instanciaProceso}
                                                                  solicitud={solicitud}
                                                                  perfilUsuario={perfilUsuario}
                                                                  solicitudesAprobadas={solicitudesAprobadas} />,
      '55000006_Activity_ValidarATM': () => <P10ATMValidar instanciaTarea={instanciaTarea}
                                                           instanciaProceso={instanciaProceso}
                                                           solicitud={solicitud}
                                                           perfilUsuario={perfilUsuario}
                                                           solicitudesAprobadas={solicitudesAprobadas} />,
    }[instanciaTarea?.tareaCodigoTarea]
    if(f.isValid(formulario)) {
      return formulario()
    } else {
      return <Box sx={{m:'80px 0 0 0'}}>{`ERROR, EN FORMULARIO PARA TAREA ${instanciaTarea?.nombreTarea} .- (${instanciaTarea?.tareaCodigoTarea})`}</Box>
    }
  }
  else return (
    <Box sx={{m:'80px 0 0 0', height:'80px'}}>
      {'loading'}
    </Box>
  )
}
