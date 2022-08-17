import React, {useEffect} from 'react'
import {Box} from "@mui/material";
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {f} from 'src/commons/f'
import P16CSSolicitud from "./P16CSSolicitud"
import P01SolicitudAsignacionCaso from 'src/features/P01Solicitud/P01SolicitudAsignacionCaso'
import P16CSVerificarRequisitos from "./P16CSVerificarRequisitos";
import P16ElaborarInformeMaate from "./P16ElaborarInformeMaate";
import P16ElaborarInformeSenadi from "./P16ElaborarInformeSenadi";
import P16InformeTecnicoMaate from "./P16InformeTecnicoMaate";
import P16InformeTecnicoSenadi from "./P16InformeTecnicoSenadi";
import P16ElaborarResolucion from "./P16ElaborarResolucion";
import P16ElaborarActoAdministrativo from "./P16ElaborarActoAdministrativo";
import P16ActualizarVigencia from "./P16ActualizarVigencia";

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
      '55000024_Activity_ElaborarSolicitud_WF16': () => <P16CSSolicitud id={'55000024_Activity_ElaborarSolicitud_WF16'}
                                                                        instanciaTarea={instanciaTarea}
                                                                        instanciaProceso={instanciaProceso}
                                                                        solicitud={solicitud}
                                                                        perfilUsuario={perfilUsuario}
                                                                        solicitudesAprobadas={solicitudesAprobadas} />,
      '55000025_Activity_AsignarCasoSenescyt_WF16': () => <P01SolicitudAsignacionCaso id='55000006_Activity_AsignarCaso' />,
      '55000025_Activity_VerificarRequisitos_WF16': () => <P16CSVerificarRequisitos id='55000025_Activity_VerificarRequisitos_WF16'
                                                                                    instanciaTarea={instanciaTarea}
                                                                                    instanciaProceso={instanciaProceso}
                                                                                    solicitud={solicitud}
                                                                                    perfilUsuario={perfilUsuario}
                                                                                    solicitudesAprobadas={solicitudesAprobadas}/>,
      '55000025_Activity_AsignarCasoMaate_WF16': () => <P01SolicitudAsignacionCaso id='55000025_Activity_AsignarCasoMaate_WF16' />,
      '55000025_Activity_AsignarCasoSenadi_WF16': () => <P01SolicitudAsignacionCaso id='55000025_Activity_AsignarCasoSenadi_WF16' />,
      '55000025_Activity_ElaborarInformeMaate_WF16': () => <P16ElaborarInformeMaate id={'55000025_Activity_ElaborarInformeMaate_WF16'}
                                                                                    instanciaTarea={instanciaTarea}
                                                                                    instanciaProceso={instanciaProceso}
                                                                                    solicitud={solicitud}
                                                                                    perfilUsuario={perfilUsuario}
                                                                                    solicitudesAprobadas={solicitudesAprobadas}/>,
      '55000025_Activity_ElaborarInformeSenadi_WF16': () => <P16ElaborarInformeSenadi id={'55000025_Activity_ElaborarInformeSenadi_WF16'}
                                                                                      instanciaTarea={instanciaTarea}
                                                                                      instanciaProceso={instanciaProceso}
                                                                                      solicitud={solicitud}
                                                                                      perfilUsuario={perfilUsuario}
                                                                                      solicitudesAprobadas={solicitudesAprobadas} />,
      '55000025_Activity_EmitirInformeMaate_WF16': () => <P16InformeTecnicoMaate id={'55000025_Activity_EmitirInformeMaate_WF16'}
                                                                                 instanciaTarea={instanciaTarea}
                                                                                 instanciaProceso={instanciaProceso}
                                                                                 solicitud={solicitud}
                                                                                 perfilUsuario={perfilUsuario}
                                                                                 solicitudesAprobadas={solicitudesAprobadas} />,
      '55000025_Activity_EmitirInformeSenadi_WF16': () => <P16InformeTecnicoSenadi id={'55000025_Activity_EmitirInformeSenadi_WF16'}
                                                                                   instanciaTarea={instanciaTarea}
                                                                                   instanciaProceso={instanciaProceso}
                                                                                   solicitud={solicitud}
                                                                                   perfilUsuario={perfilUsuario}
                                                                                   solicitudesAprobadas={solicitudesAprobadas} />,
      '55000025_Activity_ElaborarResolucion_WF16': () => <P16ElaborarResolucion id={'55000025_Activity_EmitirInformeSenadi_WF16'}
                                                                                instanciaTarea={instanciaTarea}
                                                                                instanciaProceso={instanciaProceso}
                                                                                solicitud={solicitud}
                                                                                perfilUsuario={perfilUsuario}
                                                                                solicitudesAprobadas={solicitudesAprobadas} />,
      '55000025_Activity_ElaborarActoAdministrativo_WF16': () => <P16ElaborarActoAdministrativo id={'55000025_Activity_ElaborarActoAdministrativo_WF16'}
                                                                                                instanciaTarea={instanciaTarea}
                                                                                                instanciaProceso={instanciaProceso}
                                                                                                solicitud={solicitud}
                                                                                                perfilUsuario={perfilUsuario}
                                                                                                solicitudesAprobadas={solicitudesAprobadas} />,
      '55000025_Activity_ActualizarVigencia_WF16': () => <P16ActualizarVigencia id={'55000025_Activity_ActualizarVigencia_WF16'}
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
