import React, {useEffect} from 'react'
import {Box} from "@mui/material";
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {f} from 'src/commons/f'

// 56009002;55000009_Activity_CompletarInformacionSenescytWF09
// 56009003;55000009_Activity_CompletarInformacionMaateWF09
// 56010004;55000010_Activity_ElaborarInformeTecnicoMaateWF09
// 56010008;55000010_Activity_ElaborarNegacionAutorizacionWF09
// 56010009;55000010_Activity_NegarAutorizacionWF09

import P09ElaborarSolicitud from "./P09ElaborarSolicitud";
import P01SolicitudAsignacionCaso from 'src/features/P01Solicitud/P01SolicitudAsignacionCaso'
import P09ValidarSolicitud from "./P09ValidarSolicitud";
import P09InformeTecnicoMAATE from "./P09InformeTecnicoMAATE";
import P09DictamenTecnico from "./P09DictamenTecnico";
import P09Elaboracion from "./P09Elaboracion";
import P09Autorizacion from "./P09Autorizacion";

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
      '55000009_Activity_ElaborarSolicitudWF09': () => <P09ElaborarSolicitud instanciaTarea={instanciaTarea}
                                                                             instanciaProceso={instanciaProceso}
                                                                             solicitud={solicitud}
                                                                             perfilUsuario={perfilUsuario}
                                                                             solicitudesAprobadas={solicitudesAprobadas} />,
      '55000010_Activity_AsignarCasoSenescytWF09': () => <P01SolicitudAsignacionCaso id='55000010_Activity_AsignarCasoSenescytWF09' />,
      '55000010_Activity_ValidarSolicitudWF09': () => <P09ValidarSolicitud id={'55000010_Activity_ValidarSolicitudWF09'}
                                                                           instanciaTarea={instanciaTarea}
                                                                           instanciaProceso={instanciaProceso}
                                                                           solicitud={solicitud}
                                                                           perfilUsuario={perfilUsuario}
                                                                           solicitudesAprobadas={solicitudesAprobadas}/>,
      '55000010_Activity_AsignarCasoMaateWF09':  () => <P01SolicitudAsignacionCaso id='55000010_Activity_AsignarCasoMaateWF09' />,
      '55000010_Activity_ElaborarInformeTecnicoMaateWF09': () => <P09InformeTecnicoMAATE id='55000010_Activity_ElaborarInformeTecnicoMaateWF09'
                                                                                         instanciaTarea={instanciaTarea}
                                                                                         instanciaProceso={instanciaProceso}
                                                                                         solicitud={solicitud}
                                                                                         perfilUsuario={perfilUsuario}
                                                                                         solicitudesAprobadas={solicitudesAprobadas}/>,
      '55000010_Activity_EmitirDictamenWF09': () => <P09DictamenTecnico id='55000010_Activity_ElaborarInformeTecnicoMaateWF09'
                                                                        instanciaTarea={instanciaTarea}
                                                                        instanciaProceso={instanciaProceso}
                                                                        solicitud={solicitud}
                                                                        perfilUsuario={perfilUsuario}
                                                                        solicitudesAprobadas={solicitudesAprobadas}/>,
      '55000010_Activity_ElaborarAprobacionAutorizacionWF09': () => <P09Elaboracion id={'55000010_Activity_ElaborarAprobacionAutorizacionWF09'}
                                                                                     instanciaTarea={instanciaTarea}
                                                                                     instanciaProceso={instanciaProceso}
                                                                                     solicitud={solicitud}
                                                                                     perfilUsuario={perfilUsuario}
                                                                                     solicitudesAprobadas={solicitudesAprobadas} />,
      '55000010_Activity_ElaborarNegacionAutorizacionWF09': () => <P09Elaboracion id={'55000010_Activity_ElaborarNegacionAutorizacionWF09'}
                                                                                  instanciaTarea={instanciaTarea}
                                                                                  instanciaProceso={instanciaProceso}
                                                                                  solicitud={solicitud}
                                                                                  perfilUsuario={perfilUsuario}
                                                                                  solicitudesAprobadas={solicitudesAprobadas} />,
      '55000010_Activity_AprobarAutorizacionWF09': () => <P09Autorizacion id={'55000010_Activity_AprobarAutorizacionWF09'}
                                                                          instanciaTarea={instanciaTarea}
                                                                          instanciaProceso={instanciaProceso}
                                                                          solicitud={solicitud}
                                                                          perfilUsuario={perfilUsuario}
                                                                          solicitudesAprobadas={solicitudesAprobadas} />,
      '55000010_Activity_NegarAutorizacionWF09': () => <P09Autorizacion id={'55000010_Activity_NegarAutorizacionWF09'}
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
