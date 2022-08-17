import React, {useEffect} from 'react'
import {Box} from "@mui/material";
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {f} from 'src/commons/f'
import P11ElaborarSolicitud from 'src/features/P11PermisoExportacion/P11ElaborarSolicitud'
import P01SolicitudAsignacionCaso from 'src/features/P01Solicitud/P01SolicitudAsignacionCaso'
import P11Verificacion1 from "./P11Verificacion"
import P11Aprobacion from "./P11Aprobacion";

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
      '55000011_Activity_ElaborarSolicitudWF11':
        () => <P11ElaborarSolicitud instanciaTarea={instanciaTarea}
                                    instanciaProceso={instanciaProceso}
                                    solicitud={solicitud}
                                    perfilUsuario={perfilUsuario}
                                    solicitudesAprobadas={solicitudesAprobadas} />,
      '55000012_Activity_AsignarCasoWF11': () => <P01SolicitudAsignacionCaso id='55000012_Activity_AsignarCasoWF11' />,
      '55000012_Activity_VerificarRequisitosWF11': () => <P11Verificacion1 instanciaTarea={instanciaTarea}
                                                                           instanciaProceso={instanciaProceso}
                                                                           solicitud={solicitud}
                                                                           perfilUsuario={perfilUsuario} />,
      '55000012_Activity_AprobarExportacionWF11': () => <P11Aprobacion instanciaTarea={instanciaTarea}
                                                                       instanciaProceso={instanciaProceso}
                                                                       solicitud={solicitud}
                                                                       perfilUsuario={perfilUsuario} />,
      '55000012_Activity_NegarExportacionWF11': () => <P11Aprobacion instanciaTarea={instanciaTarea}
                                                                     instanciaProceso={instanciaProceso}
                                                                     solicitud={solicitud}
                                                                     perfilUsuario={perfilUsuario} />
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
