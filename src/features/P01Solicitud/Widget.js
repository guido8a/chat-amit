import React, {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import P01PermisoInvestigacion from 'src/features/P01Solicitud/P01PermisoInvestigacion'
import P01SolicitudAsignacionCaso from 'src/features/P01Solicitud/P01SolicitudAsignacionCaso'
import P01SolicitudVerificarCumplimiento from 'src/features/P01Solicitud/P01SolicitudVerificarCumplimiento'
import P01SolicitudInformeTecnico from 'src/features/P01Solicitud/P01SolicitudInformeTecnico';
import P01SolicitudInformeTecnicoMAATE from 'src/features/P01Solicitud/P01SolicitudInformeTecnicoMAATE';
import P01SolicitudDictamenTecnico from "src/features/P01Solicitud/P01SolicitudDictamenTecnico";
import P01SolicitudProyectoResolucion from "src/features/P01Solicitud/P01SolicitudProyectoResolucion";
import P01SolicitudResolucion from 'src/features/P01Solicitud/P01SolicitudResolucion'
import P01SolicitudElaborarPermiso from 'src/features/P01Solicitud/P01SolicitudElaborarPermiso'
import P02ElaborarContrato from "src/features/P01Solicitud/P02ElaborarContrato";
import P01SolicitudSuscribirPermiso from "./P01SolicitudSuscribirPermiso";
import P0405SolicitudInformeTecnicoSenescytMod from "./P0405SolicitudInformeTecnicoSenescytMod";
import P02RevisarContrato from "./P02RevisarContrato";
import P02RegistrarContrato from "./P02RegistrarContrato";
import P02RegistroInternacional from "./P02RegistroInternacional";
import {f} from 'src/commons/f'

const tarea_widget = {
  '55000014_Activity_ElaborarSolicitudWF0102':                () => <P01PermisoInvestigacion id="55000001_Activity_ElaborarSolicitudWF01" />,
  '55000015_Activity_AsignarCasoWF0102':                      () => <P01SolicitudAsignacionCaso id="55000002_Activity_AsignarCaso"/>,
  '55000015_Activity_VerificarCumplimientoRequisitosWF0102':  () => <P01SolicitudVerificarCumplimiento id="55000002_Activity_VerificarCumplimientoRequisitos" />,
  '55000015_Activity_ElaborarInformeTecnicoSenescytWF0102':   () => <P01SolicitudInformeTecnico id={'55000002_Activity_ElaborarInformeTecnicoSenescyt'} />,
  '55000015_Activity_AsignarCasoMaateWF0102':                 () => <P01SolicitudAsignacionCaso id="55000002_Activity_AsignarCasoMaate"/>,
  '55000015_Activity_AsignarCasoSenadiWF0102':                () => <P01SolicitudAsignacionCaso id="55000002_Activity_AsignarCasoSenadi"/>,
  '55000015_Activity_ElaborarInformeTecnicoMaateWF0102':      () => <P01SolicitudInformeTecnicoMAATE id={'55000002_Activity_ElaborarInformeTecnicoMaate'} />,
  '55000015_Activity_ElaborarInformeTecnicoSenadiWF0102':     () => <P01SolicitudInformeTecnico id={'55000002_Activity_ElaborarInformeTecnicoSenadi'} />,
  '55000015_Activity_EmitirDictamenTecnicoMaateWF0102':       () => <P01SolicitudDictamenTecnico id={"55000002_Activity_EmitirDictamenTecnicoMaate"} />,
  '55000015_Activity_EmitirDictamenTecnicoSenadiWF0102':      () => <P01SolicitudDictamenTecnico id={"55000002_Activity_EmitirDictamenTecnicoSenadi"} />,
  '55000015_Activity_ElaborarProyectoResolucionW0102':        () => <P01SolicitudProyectoResolucion id={"55000002_Activity_ElaborarProyectoResolucion"} />,
  '55000015_Activity_EmitirResolucionWF0102':                 () => <P01SolicitudResolucion id="55000002_Activity_EmitirResolucion" />,
  '55000015_Activity_ElaborarPermisoWF0102':                  () => <P01SolicitudElaborarPermiso id='55000002_Activity_ElaborarPermiso' />,
  '55000015_Activity_ElaborarContratoWF0102':                 () => <P02ElaborarContrato id="55000015_Activity_ElaborarContratoWF0102" />,
  '55000015_Activity_SuscribirPermisoWF0102':                 () => <P01SolicitudSuscribirPermiso id='55000002_Activity_SuscribirPermiso' />,
  '55000016_Activity_ElaborarSolicitudWF0405':                () => <P01PermisoInvestigacion id="55000016_Activity_ElaborarSolicitudWF0405" />,
  '55000017_Activity_AsignarCasoWF0405':                      () => <P01SolicitudAsignacionCaso id="55000017_Activity_AsignarCasoWF0405"/>,
  '55000017_Activity_VerificarCumplimientoRequisitosWF0405':  () => <P01SolicitudVerificarCumplimiento id="55000017_Activity_VerificarCumplimientoRequisitosWF0405" />,
  '55000017_Activity_ElaborarInformeTecnicoSenescytWF0405':   () => <P0405SolicitudInformeTecnicoSenescytMod id="55000017_Activity_ElaborarInformeTecnicoSenescytWF0405" />,
  '55000017_Activity_AsignarCasoMaateWF0405':                 () => <P01SolicitudAsignacionCaso id="55000017_Activity_AsignarCasoMaateWF0405"/>,
  '55000017_Activity_ElaborarInformeTecnicoMaateWF0405':      () => <P01SolicitudInformeTecnicoMAATE id={'55000017_Activity_ElaborarInformeTecnicoMaateWF0405'} />,
  '55000017_Activity_EmitirDictamenTecnicoMaateWF0405':       () => <P01SolicitudDictamenTecnico id={"55000017_Activity_EmitirDictamenTecnicoMaateWF0405"} />,
  '55000017_Activity_AsignarCasoSenadiWF0405':                () => <P01SolicitudAsignacionCaso id="55000017_Activity_AsignarCasoSenadiWF0405"/>,
  '55000017_Activity_ElaborarInformeTecnicoSenadiWF0405':     () => <P01SolicitudInformeTecnico id={'55000017_Activity_ElaborarInformeTecnicoSenadiWF0405'} />,
  '55000017_Activity_EmitirDictamenTecnicoSenadiWF0405':      () => <P01SolicitudDictamenTecnico id={"55000017_Activity_EmitirDictamenTecnicoSenadiWF0405"} />,
  '55000017_Activity_ElaborarProyectoResolucionW0102':        () => <P01SolicitudProyectoResolucion id={"55000017_Activity_ElaborarProyectoResolucionW0102"} />,
  '55000017_Activity_EmitirResolucionWF0405':                 () => <P01SolicitudResolucion id="55000017_Activity_EmitirResolucionWF0405" />,
  '55000017_Activity_ElaborarPermisoWF0405':                  () => <P01SolicitudElaborarPermiso id='55000017_Activity_ElaborarPermisoWF0405' />,
  '55000017_Activity_SuscribirPermisoWF0405':                 () => <P01SolicitudSuscribirPermiso id='55000017_Activity_SuscribirPermisoWF0405' />,
  '55000014_Activity_RevisarContratoWF0102':                  () => <P02RevisarContrato id={'55000014_Activity_RevisarContratoWF0102'} />,
  '55000015_Activity_RegistrarContratoWF0102':                () => <P02RegistrarContrato id={'55000015_Activity_RegistrarContratoWF0102'} />,
  '55000015_Activity_RegistrarCertificadoInternacionalWF0102':() => <P02RegistroInternacional id={'55000015_Activity_RegistrarCertificadoInternacionalWF0102'} />
}

export const Widget = () => {
  const navigate = useNavigate()
  const instanciaTarea = useSelector(state => state.app.instanciaTarea)
  const instanciaProceso = useSelector(state => state.app.instanciaProceso)

  useEffect(()=> {
    if(!f.isValid(instanciaTarea?.id)) {navigate('/')}
  }, [instanciaTarea, navigate])

  useEffect(() => {window.scrollTo(0, 0)}, [])

  if(f.isValid(instanciaTarea?.id) && f.isValid(instanciaProceso.id)) {
    const formulario = tarea_widget[instanciaTarea?.tareaCodigoTarea]
    if(f.isValid(formulario)) {
      return formulario()
    } else {
      return <div>{`ERROR, EN FORMULARIO PARA TAREA ${instanciaTarea?.nombreTarea} .- (${instanciaTarea?.tareaCodigoTarea})`}</div>
    }
  } return <div>{`loading`}</div>
}
