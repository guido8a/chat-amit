import React, {useEffect} from 'react'
import {Box} from "@mui/material";
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {f} from 'src/commons/f'
import P13EmitirDictamen from "./P13EmitirDictamen";
import P01SolicitudAsignacionCaso from 'src/features/P01Solicitud/P01SolicitudAsignacionCaso'
import P13ActualizarVigencia from "./P13ActualizarVigencia";

// 55000019
// 55000019_Activity_EmitirDictamenWF13
// 55000019_Activity_ActualizarVigenciaAutorizacionWF13
// 55000019_Activity_AsignarCasoWF13

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
      '55000019_Activity_EmitirDictamenWF13': () => <P13EmitirDictamen id={'55000019_Activity_EmitirDictamenWF13'} />,
      '55000019_Activity_AsignarCasoWF13': () => <P01SolicitudAsignacionCaso id='55000019_Activity_AsignarCasoWF13' />,
      '55000019_Activity_ActualizarVigenciaAutorizacionWF13': () => <P13ActualizarVigencia id={'55000019_Activity_ActualizarVigenciaAutorizacionWF13'}/>,
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
