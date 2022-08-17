import React, {useEffect} from 'react'
import {Box} from "@mui/material";
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {f} from 'src/commons/f'

// 55000007_Activity_ElaborarSolicitud
// 55000008_Activity_AsignarCaso
// 55000008_Activity_VerificarRequisitos
// 55000008_Activity_AprobarImportacion
// 55000008_Activity_NegarImportacion

import P08ElaborarSolicitud from 'src/features/P08PermisoImportacion/P08ElaborarSolicitud'
import P01SolicitudAsignacionCaso from 'src/features/P01Solicitud/P01SolicitudAsignacionCaso'
// import P10ATMValidar from 'src/features/P10ATM/P10ATMValidar'

export const Widget = () => {
  const navigate = useNavigate()
  const perfilUsuario = useSelector(state => state.app.perfilUsuario)
  const instanciaTarea = useSelector(state => state.app.instanciaTarea)
  const instanciaProceso = useSelector(state => state.app.instanciaProceso)
  const solicitud = instanciaProceso?.solicitud
  const solicitudesAprobadas = useSelector(state => state.app.solicitudesAprobadas)

  useEffect(()=> {
    if(!f.isValid(instanciaTarea.id)) {navigate('/')}
  }, [instanciaTarea, navigate])

  useEffect(() => {window.scrollTo(0, 0)}, [])

  if(f.isValid(instanciaTarea.id) && f.isValid(instanciaProceso.id) ) {
    const formulario = {
      '55000007_Activity_ElaborarSolicitud':
        () => <P08ElaborarSolicitud instanciaTarea={instanciaTarea}
                                    instanciaProceso={instanciaProceso}
                                    solicitud={solicitud}
                                    perfilUsuario={perfilUsuario}
                                    solicitudesAprobadas={solicitudesAprobadas} />,
      '55000008_Activity_AsignarCaso':
        () => <P01SolicitudAsignacionCaso id='55000008_Activity_AsignarCaso' />,
      // '55000005_Activity_ElaborarRespuesta':
      //   () => <P10ATMValidar instanciaTarea={instanciaTarea}
      //                        instanciaProceso={instanciaProceso}
      //                        solicitud={solicitud}
      //                        perfilUsuario={perfilUsuario}
      //                        solicitudesAprobadas={solicitudesAprobadas} />,
      // '55000006_Activity_ValidarATM':
      //   () => <P10ATMValidar instanciaTarea={instanciaTarea}
      //                        instanciaProceso={instanciaProceso}
      //                        solicitud={solicitud}
      //                        perfilUsuario={perfilUsuario}
      //                        solicitudesAprobadas={solicitudesAprobadas} />,
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
