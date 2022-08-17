import React, {useEffect} from 'react'
import {Box} from "@mui/material";
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {f} from 'src/commons/f'
import P17DisponerEvaluacion from "./P17DisponerEvaluacion";
import P01SolicitudAsignacionCaso from 'src/features/P01Solicitud/P01SolicitudAsignacionCaso'
import P17EvaluarAutorizacion from "./P17EvaluarAutorizacion";
import P17ElaborarInformeMaate from "./P17ElaborarInformeMaate";
import P17ElaborarInformeSenadi from "./P17ElaborarInformeSenadi";
import P17EmitirInformeMaate from "./P17EmitirInformeMaate";
import P17EmitirInformeSenadi from "./P17EmitirInformeSenadi";
import P17AprobarInforme from "./P17AprobarInforme";
import P17ActualizarVigencia from "./P17ActualizarVigencia";

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
      '55000027_Activity_DisponerEvaluacion_WF17': () => <P17DisponerEvaluacion id={'55000024_Activity_ElaborarSolicitud_WF16'}
                                                                                instanciaTarea={instanciaTarea}
                                                                                instanciaProceso={instanciaProceso}
                                                                                solicitud={solicitud}
                                                                                perfilUsuario={perfilUsuario}
                                                                                solicitudesAprobadas={solicitudesAprobadas} />,
      '55000027_Activity_AsignarCasoSenescyt_WF17': () => <P01SolicitudAsignacionCaso id={'55000027_Activity_AsignarCasoSenescyt_WF17'} />,
      '55000027_Activity_EvaluarAutorizacion_WF17': () => <P17EvaluarAutorizacion id={'55000024_Activity_ElaborarSolicitud_WF16'}
                                                                                  instanciaTarea={instanciaTarea}
                                                                                  instanciaProceso={instanciaProceso}
                                                                                  solicitud={solicitud}
                                                                                  perfilUsuario={perfilUsuario}
                                                                                  solicitudesAprobadas={solicitudesAprobadas} />,
      '55000027_Activity_AsignarCasoMaate_WF17': () => <P01SolicitudAsignacionCaso id={'55000027_Activity_AsignarCasoMaate_WF17'} />,
      '55000027_Activity_ElaborarInformeMaate_WF17': () => <P17ElaborarInformeMaate id={'55000024_Activity_ElaborarSolicitud_WF16'}
                                                                                    instanciaTarea={instanciaTarea}
                                                                                    instanciaProceso={instanciaProceso}
                                                                                    solicitud={solicitud}
                                                                                    perfilUsuario={perfilUsuario}
                                                                                    solicitudesAprobadas={solicitudesAprobadas} />,
      '55000027_Activity_EmitirInformeMaate_WF17': () => <P17EmitirInformeMaate id={'55000024_Activity_ElaborarSolicitud_WF16'}
                                                                                instanciaTarea={instanciaTarea}
                                                                                instanciaProceso={instanciaProceso}
                                                                                solicitud={solicitud}
                                                                                perfilUsuario={perfilUsuario}
                                                                                solicitudesAprobadas={solicitudesAprobadas} />,
      '55000027_Activity_AsignarCasoSenadi_WF17': () => <P01SolicitudAsignacionCaso id={'55000027_Activity_AsignarCasoSenadi_WF17'} />,
      '55000027_Activity_ElaborarInformeSenadi_WF17': () => <P17ElaborarInformeSenadi id={'55000027_Activity_ElaborarInformeSenadi_WF17'}
                                                                                      instanciaTarea={instanciaTarea}
                                                                                      instanciaProceso={instanciaProceso}
                                                                                      solicitud={solicitud}
                                                                                      perfilUsuario={perfilUsuario}
                                                                                      solicitudesAprobadas={solicitudesAprobadas} />,
      '55000027_Activity_EmitirInformeSenadi_WF17': () => <P17EmitirInformeSenadi id={'55000027_Activity_ElaborarInformeSenadi_WF17'}
                                                                                  instanciaTarea={instanciaTarea}
                                                                                  instanciaProceso={instanciaProceso}
                                                                                  solicitud={solicitud}
                                                                                  perfilUsuario={perfilUsuario}
                                                                                  solicitudesAprobadas={solicitudesAprobadas} />,
      '55000027_Activity_AprobarInforme_WF17': () => <P17AprobarInforme id={'55000027_Activity_ElaborarInformeSenadi_WF17'}
                                                                        instanciaTarea={instanciaTarea}
                                                                        instanciaProceso={instanciaProceso}
                                                                        solicitud={solicitud}
                                                                        perfilUsuario={perfilUsuario}
                                                                        solicitudesAprobadas={solicitudesAprobadas} />,
      '55000027_Activity_ActualizarVigencia_WF17': () => <P17ActualizarVigencia id={'55000027_Activity_ElaborarInformeSenadi_WF17'}
                                                                                instanciaTarea={instanciaTarea}
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
