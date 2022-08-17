import React, {useEffect} from 'react'
import {Box} from "@mui/material";
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {f} from 'src/commons/f'
import P01SolicitudAsignacionCaso from 'src/features/P01Solicitud/P01SolicitudAsignacionCaso'
import P15DisponerSeguimiento from "./P15DisponerSeguimiento"
import P15MonitoreoCumplimiento from "./P15MonitoreoCumplimiento"
import P01SolicitudInformeTecnico from 'src/features/P01Solicitud/P01SolicitudInformeTecnico'
import P01SolicitudInformeTecnicoMAATE from 'src/features/P01Solicitud/P01SolicitudInformeTecnicoMAATE'
import P01SolicitudDictamenTecnico from "../P01Solicitud/P01SolicitudDictamenTecnico"
import P15InformeCumplimiento from "./P15InformeCumplimiento"
import P15VerificacionInforme from "./P15VerificacionInforme"
import P15Novedades from "./P15Novedades"
// 55000023
// 55000023_Activity_DisponerSeguimientoWF15
// 55000023_Activity_AsignarCasoSenescytWF15
// 55000023_Activity_RealizarMonitoreoWF15
// 55000023_Activity_EmitirInformeMaateWF15
// 55000023_Activity_ElaborarInformeMaateWF15
// 55000023_Activity_AsignarCasoSenadiWF15
// 55000023_Activity_EmitirInformeSenadiWF15
// 55000023_Activity_RegistrarNovedadesWF15
// 55000023_Activity_ElaborarInformeSenadiWF15
// 55000023_Activity_AsignarCasoMaateWF15
// 55000023_Activity_VerificarReporteWF15
// 55000022_Activity_ElaborarReporteCumplimientoWF15


export const Widget = () => {
  const navigate = useNavigate()
  // const perfilUsuario = useSelector(state => state.app.perfilUsuario)
  const instanciaTarea = useSelector(state => state.app.instanciaTarea)
  const instanciaProceso = useSelector(state => state.app.instanciaProceso)
  // const solicitud = instanciaProceso?.solicitud
  // const solicitudesAprobadas = useSelector(state => state.app.solicitudesAprobadas)

  useEffect(()=> {
    if(!f.isValid(instanciaTarea.id)) {navigate('/')}
  }, [instanciaTarea, navigate])

  useEffect(() => {window.scrollTo(0, 0)}, [])

  if(f.isValid(instanciaTarea.id) && f.isValid(instanciaProceso.id) ) {
    const formulario = {
      '55000023_Activity_DisponerSeguimientoWF15':         () => <P15DisponerSeguimiento id='55000023_Activity_DisponerSeguimientoWF15' />,
      '55000023_Activity_AsignarCasoSenescytWF15':         () => <P01SolicitudAsignacionCaso id='55000023_Activity_AsignarCasoSenescytWF15' />,
      '55000023_Activity_RealizarMonitoreoWF15':           () => <P15MonitoreoCumplimiento id='55000023_Activity_RealizarMonitoreoWF15' />,
      '55000023_Activity_AsignarCasoMaateWF15':            () => <P01SolicitudAsignacionCaso id='55000023_Activity_AsignarCasoMaateWF15' />,
      '55000023_Activity_AsignarCasoSenadiWF15':           () => <P01SolicitudAsignacionCaso id='55000023_Activity_AsignarCasoSenadiWF15' />,
      '55000023_Activity_ElaborarInformeMaateWF15':        () => <P01SolicitudInformeTecnicoMAATE id='55000023_Activity_ElaborarInformeMaateWF15' />,
      '55000023_Activity_ElaborarInformeSenadiWF15':       () => <P01SolicitudInformeTecnico id={'55000023_Activity_ElaborarInformeSenadiWF15'} />,
      '55000023_Activity_EmitirInformeSenadiWF15':         () => <P01SolicitudDictamenTecnico id={'55000023_Activity_EmitirInformeSenadiWF15'} />,
      '55000023_Activity_EmitirInformeMaateWF15':          () => <P01SolicitudDictamenTecnico id={'55000023_Activity_EmitirInformeSenadiWF15'} />,
      '55000022_Activity_ElaborarReporteCumplimientoWF15': () => <P15InformeCumplimiento id={'55000022_Activity_ElaborarReporteCumplimientoWF15'} />,
      '55000023_Activity_VerificarReporteWF15':            () => <P15VerificacionInforme id={'55000023_Activity_VerificarReporteWF15'} />,
      '55000023_Activity_RegistrarNovedadesWF15':          () => <P15Novedades id={'55000023_Activity_RegistrarNovedadesWF15'} />,
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
