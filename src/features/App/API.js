import GLOBALS from './globals'
import {f} from "../../commons";
import {Packer} from "docx";

const API = { sliceName: 'app' }

const api = API

API.perfilInvestigadorId = 163

API.esInvestigador = (usuario) => !!usuario && !!usuario.id && usuario.idOrganizacion === 510001

API.fetchOrgs = async() => {
  const url    = `${GLOBALS.mainUrl}/api/v1/usuarios/getorgs`
  const res    = await fetch(url)
  return res.json()
}

API.fetchProvincias = async() => {
  const url    = `${GLOBALS.mainUrl}/api/v1/provincia/all`
  const res    = await fetch(url)
  return res.json()
}

API.fetchFuncionarios = async() => {
  const url    = `${GLOBALS.mainUrl}/v1/api/perfilusuario/funcionarios`
  const res    = await fetch(url)
  return res.json()
}

API.fetchBosques = async(provincias) => {
  const provs = provincias.join(',').split(' ').join('+')
  const url    = `${GLOBALS.mainUrl}/api/v1/bosqueprotector/provincias?provincias=${provs}`
  const res    = await fetch(url,{method:'GET'})
  return res.json()
}

API.fetchCentrosDocumentacion = async() => {
  const url    = `${GLOBALS.mainUrl}/api/v1/catalogo/centros_documentacion`
  const res    = await fetch(url,{method:'GET'})
  return res.json()
}

API.fetchAreasProtegidas = async(provincias) => {
  const provs = provincias.join(',').split(' ').join('+')
  const url    = `${GLOBALS.mainUrl}/api/v1/areaprotegida/provincias?provincias=${provs}`
  const res    = await fetch(url)
  return res.json()
}

API.fetchUsers = async(idOrg) => {
  const url    = `${GLOBALS.mainUrl}/api/v1/usuarios/getemps?idOrganizacion=${idOrg}`
  const res    = await fetch(url)
  return res.json()
}

API.testUsuario = async(cedulaOcorreo) => {
  const url    = `${GLOBALS.mainUrl}/api/v1/usuarios/getemp?cedulaOcorreo=${cedulaOcorreo}`
  const res    = await fetch(url)
  return res.json()
}

API.testPass = async(empId, passwd) => {
  const url    = `${GLOBALS.mainUrl}/api/v1/usuarios/tstpsw?empId=${empId}&passwd=${passwd}`
  const res    = await fetch(url)
  return res.json()
}

API.perfilesUsuario = async(empId) => {
  const url    = `${GLOBALS.mainUrl}/v1/api/perfilusuario/usuarioperfiles?idusuario=${empId}`
  const res    = await fetch(url)
  return res.json()
}

API.createPerfilUsuario = async(usuarioId, idPerfil) => {
  const url    = `${GLOBALS.mainUrl}/v1/api/perfilusuario/set?idusuario=${usuarioId}&idperfil=${idPerfil}`
  const res    = await fetch(url, {method: 'POST'})
  return res.json()
}

API.fetchUsuarioSenescyt = async(usuarioCorreo) => {
  const url    = `${GLOBALS.investigadoresWS}/email/${usuarioCorreo}`
  const res    = await fetch(url)
  return res.json()
}

API.crearInstanciaProceso = async(idProceso, idPerfilUsuario, codigoPerfilUsuario, tipoInstanciaProceso=null, numeroSolicitudPadre=null, solicitudId=null) => {
  let url    = f.isValid(tipoInstanciaProceso)?
    `${GLOBALS.mainUrl}/api/procesos/iniciar?idProceso=${idProceso}&idPerfilUsuario=${idPerfilUsuario}&tipoInstanciaProceso=${tipoInstanciaProceso}`:
    `${GLOBALS.mainUrl}/api/procesos/iniciar?idProceso=${idProceso}&idPerfilUsuario=${idPerfilUsuario}&tipoInstanciaProceso`
  url = f.isValid(solicitudId)?`${url}&idSolicitud=${solicitudId}`:`${url}&idSolicitud=0`
  if(f.isValid(numeroSolicitudPadre)) {
    url = `${url}&numeroSolicitudPadre=${numeroSolicitudPadre}`
  } else {
    url = `${url}&numeroSolicitudPadre`
  }
  const res    = await fetch(url,{method: 'POST'})
  return res.json()
}

API.fetchInstanciasProceso = async(idPerfilUsuario) => {
  const url    = `${GLOBALS.mainUrl}/api/procesos/instancias?idPerfilUsuario=${idPerfilUsuario}`
  const res    = await fetch(url,{method: 'GET'})
  return res.json()
}

API.fetchInstanciaProceso = async(idProceso) => {
  const url    = `${GLOBALS.mainUrl}/api/procesos/instancia/${idProceso}`
  const res    = await fetch(url,{method: 'GET'})
  return res.json()
}

API.saveSolicitud = async(idInstanciaProceso, payload) => { // TODO:
  const url    = `${GLOBALS.mainUrl}/v1/api/solicitud/set?idinsproceso=${idInstanciaProceso}`
  const res    = await fetch(url,{method: 'POST', body: payload})
  return res.json()
}

API.fetchTareasPerfilUsuario = async(idPerfilUsuario) => {
  const url    = `${GLOBALS.mainUrl}/api/procesos/tareas?idPerfilUsuario=${idPerfilUsuario}`
  const res    = await fetch(url,{method: 'GET'})
  return res.json()
}

API.fetchTareasPerfilAdministrador = async(idPerfilUsuario) => {
  const url    = `${GLOBALS.mainUrl}/api/procesos/bandeja?idPerfilUsuario=${idPerfilUsuario}`
  const res    = await fetch(url,{method: 'GET'})
  return res.json()
}

API.fetchInstanciaTarea = async(idInstanciaTarea) => {
  const url    = `${GLOBALS.mainUrl}/api/procesos/tarea/${idInstanciaTarea}`
  const res    = await fetch(url,{method: 'GET'})
  return res.json()
}

API.asignarTareaPerfilUsuario = async(idInstanciaTarea,idPerfilUsuario) => {
  const url    = `${GLOBALS.mainUrl}/api/procesos/asignar?idInstanciaTarea=${idInstanciaTarea}&idPerfilUsuario=${idPerfilUsuario}`
  const res    = await fetch(url,{method: 'POST'})
  return res.json()
}

API.completarTarea = async(idInstanciaProceso, idTarea, idPerfilUsuario, metadataTarea) => {
  const url    = `${GLOBALS.mainUrl}/api/procesos/completar?idInstanciaProceso=${idInstanciaProceso}&idTarea=${idTarea}&idPerfilUsuario=${idPerfilUsuario}`
  const res    = await fetch(url,{method: 'POST', body: metadataTarea})
  return res.json()
}

API.fetchPerfilUsuarioXPerfil = async(idPerfil) => {
  const url    = `${GLOBALS.mainUrl}/v1/api/perfilusuario/byperfil?idPerfil=${idPerfil}`
  const res    = await fetch(url,{method: 'GET'})
  return res.json()
}

API.fetchPermisoRelacionado = async(numeroPermiso) => {
  const url    = `${GLOBALS.mainUrl}/v1/api/solicitud/getpermiso/${numeroPermiso}`
  const res    = await fetch(url,{method: 'GET'})
  return res.json()
}

API.getRoute = (tarea) => {
  const route = {
    'Process_WF0102_Usuario' : '/solicitud',
    'Process_WF0102_VUV'     : '/solicitud',
    'Process_WF0405_Usuario' : '/solicitud',
    'Process_WF0405_VUV'     : '/solicitud',
    'Process_WF07'           : '/pedidoMovilizacion',
    'Process_WF10_Usuario'   : '/validarATM',
    'Process_WF10_VUV'       : '/validarATM',
    'Process_WF08_Usuario'   : '/permisoImportacion',
    'Process_WF08_VUV'       : '/permisoImportacion',
    'Process_WF11_Usuario'   : '/permisoExportacion',
    'Process_WF11_VUV'       : '/permisoExportacion',
    'Process_WF13_VUV'       : '/dictamen',
    'Process_WF15_VUV'       : '/seguimiento',
    'Process_WF5_Usuario'    : '/seguimiento',
    'Process_WF09_Usuario'   : '/holotipos',
    'Process_WF09_VUV'       : '/holotipos',
    'Process_WF16_Usuario'   : '/cerrarsolicitud',
    'Process_WF16_VUV'       : '/cerrarsolicitud',
    'Process_WF17_VUV'       : '/evaluar'
  }[tarea?.instanciaProcesoProcesoCodigoProceso]

  console.log('Route: ',tarea?.instanciaProcesoProcesoCodigoProceso, route)

  return route
}

API.handleChange = (e, bandeja, setFormValues, formValues) => {
  if(bandeja === 'entrada') {
    const name = e.target.id
    const value = (e.target.type === 'checkbox') ? e.target.checked : e.target.value
    setFormValues({...formValues, [name]: value})
  }
}

API.handleChange2 = (e, canEdit, setFormValues, formValues) => {
  if(canEdit) {
    const name = e.target.id
    const value = (e.target.type === 'checkbox') ? e.target.checked : e.target.value
    setFormValues({...formValues, [name]: value})
  }
}

API.handleChange2numeric = (e, canEdit, setFormValues, formValues) => {
  if(canEdit && !isNaN(e.target.value)) {
    const name = e.target.id
    const value = e.target.value
    setFormValues({...formValues, [name]: value})
  }
}

API.fetchPerfilesUsuariosByPerfil = async(perfil_id) => {
  const url    = `${GLOBALS.mainUrl}/v1/api/perfilusuario/byperfil?idPerfil=${perfil_id}`
  const res    = await fetch(url,{method: 'GET'})
  return res.json()
}

API.fetchLaboratoriosAcreaditados = async() => {
  const url    = `${GLOBALS.mainUrl}/api/v1/catalogo/laboratorio_acreditado`
  const res    = await fetch(url)
  return res.json()
}

API.fetchBosquesProtectores = async() => {
  const url    = `${GLOBALS.mainUrl}/api/v1/catalogo/bosque_protector`
  const res    = await fetch(url,{method: 'GET'})
  return res.json()
}

API.fetchTaxonomia = async(scientificname='gallina', kingdom='Animal', taxonRankBusqueda='Clase') => {
  const payload = JSON.stringify({scientificname,kingdom,taxonRankBusqueda})
  const url     = `${GLOBALS.mainUrl}/v1/api/taxonomia/get`
  const res     = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body:payload
    })
  return res.json()
}

API.fetchEspecies = async(props) => {
  const {scientificname, kingdom, taxonRankBusqueda} = props
  const payload = JSON.stringify({scientificname,kingdom,taxonRankBusqueda})
  const url     = `${GLOBALS.mainUrl}/v1/api/taxonomia/getespecies`
  const res     = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json;charset=UTF-8'
    },
    body:payload
  })
  return res.json()
}

API.fetchPlantila = async(plantilla) => {
  const url     = `${GLOBALS.mainUrl}/plantilla/${plantilla}`
  const res     = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json;charset=UTF-8'
    },
  })
  return res.json()
}

API.fetchGenerarPDF = async(idSolicitud, subfolder,nombreArchivo,contenido) => {
  const url     = `${GLOBALS.mainUrl}/v1/api/solicitud/pdf?idSolicitud=${idSolicitud}&subfolder=${subfolder}&nombreArchivo=${nombreArchivo}`
  const res     = await fetch(url, {
    method: 'POST',
    body: contenido
  })
  return res.json()
}

API.fetchGenerarDocx = async(idSolicitud, subfolder,nombreArchivo,blob) => {
  const url     = `${GLOBALS.mainUrl}/v1/api/solicitud/docx?idSolicitud=${idSolicitud}&subfolder=${subfolder}&nombreArchivo=${nombreArchivo}`
  const res     = await fetch(url, {
    method: 'POST',
    body: blob
  })
  return res.json()
}

API.fetchDocx2PDF = async(idSolicitud, subfolder,nombreArchivo) => {
  const url     = `${GLOBALS.mainUrl}/v1/api/solicitud/docx2pdf?idSolicitud=${idSolicitud}&subfolder=${subfolder}&nombreArchivo=${nombreArchivo}`
  const res     = await fetch(url, {method: 'GET',})
  return res.json()
}

API.genDocxAnPdf = ({solicitudId, document, formValues, setFormValues, subfolder, filename}) => {
  Packer.toBlob(document).then(blob => {
      setFormValues({...formValues, docx: '', pdf: '',})
      const reader = new FileReader();
      let base64data;
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        base64data = reader.result
        api.fetchGenerarDocx(solicitudId, subfolder, filename, base64data).then(result => {
          if(f.isValid(result.rutaDocumento)) {
            const arr = result.rutaDocumento.split('/')
            setFormValues({...formValues, docxGenerado: true, docx: arr[arr.length-1]})
            api.fetchDocx2PDF(solicitudId, subfolder, filename).then(result2 => {
              if(f.isValid(result2.rutaDocumento)) {
                const arr2 = result2.rutaDocumento.split('/')
                setFormValues({...formValues, pdf: arr2[arr2.length-1], docx: arr[arr.length-1]})
              } else {
                setFormValues({...formValues, pdf: ''})
              }
            })
          } else {
            setFormValues({...formValues, docxGenerado: false, docx: ''})
          }
        })
      }
      // saveAs(blob, "informe-tecnico.docx");
    }
  )
}

API.fetchDownloadPDF = ({solicitudId, subfolder, filename}) => {
  if(filename !== '') {
    const url = `${GLOBALS.mainUrl}/documentos/descargar?filename=vuv-${solicitudId}/${subfolder}/${filename}`
    fetch(url)
      .then((res) => { return res.blob(); })
      .then((data) => {
        const dataPdf = new Blob([data], { type: 'application/pdf' })
        const a = document.createElement("a")
        a.href = window.URL.createObjectURL(dataPdf)
        a.download = filename
        a.target="_blank"
        a.click()
      })
  } else {
    alert('no se ha generado el PDF')
  }
}

API.fetchDownloadDOCX = ({solicitudId, subfolder, filename}) => {
  if(filename !== '') {
    const url = `${GLOBALS.mainUrl}/documentos/descargar?filename=vuv-${solicitudId}/${subfolder}/${filename}`
    fetch(url)
      .then((res) => { return res.blob(); })
      .then((data) => {
        const dataDOCX = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' })
        const a = document.createElement("a")
        a.href = window.URL.createObjectURL(dataDOCX)
        a.download = filename
        a.target="_blank"
        a.click()
      })
  } else {
    alert('no se ha generado el PDF')
  }
}

API.fetchPdf = async(idSolicitud, subfolder,nombreArchivo) => {
  const url = `${GLOBALS.mainUrl}/documentos/descargar?filename=vuv-${idSolicitud}/${subfolder}/${nombreArchivo}`
  const res = await fetch(url, {method: 'GET',})
  return res.json()
}

API.fetchSolicitudesAprobadas = async(idPerfilusuario) => {
  const url = `${GLOBALS.mainUrl}/api/procesos/solicitudes?estadoSolicitud=Aprobada&idPerfilusuario=${idPerfilusuario}`
  const res = await fetch(url, {method: 'GET',})
  return res.json()
}

// https://testvuv.tech/ws/api/procesos/solicitudes?estadoSolicitud=Rechazada&idPerfilusuario=4423

API.fetchSolicitudesDenegadas = async(idPerfilusuario) => {
  const url = `${GLOBALS.mainUrl}/api/procesos/solicitudes?estadoSolicitud=Denegada&idPerfilusuario=${idPerfilusuario}`
  const res = await fetch(url, {method: 'GET',})
  return res.json()
}

API.fetchSolicitudesRechazadas = async(idPerfilusuario) => {
  const url = `${GLOBALS.mainUrl}/api/procesos/solicitudes?estadoSolicitud=Rechazada&idPerfilusuario=${idPerfilusuario}`
  const res = await fetch(url, {method: 'GET',})
  return res.json()
}

API.fetchSolicitudByNumero = async(numero) => {
  const url = `${GLOBALS.mainUrl}/v1/api/solicitud/pornumero?numeroSolicitud=${numero}`
  const res = await fetch(url, {method: 'GET',})
  return res.json()
}

API.setPayload = async(idProceso, body) => {
  const url = `${GLOBALS.mainUrl}/v1/api/solicitud/set?idinsproceso=${idProceso}`
  const res = await fetch(url, {method: 'POST',body:body})
  return res.json()
}

API.fetchRecursos = async(idPerfilusuario, idProceso) => {
  const url = `${GLOBALS.mainUrl}/api/procesos/recursos?estadoSolicitud=Aprobada&idPerfilusuario=${idPerfilusuario}&idProceso=${idProceso}`
  const res = await fetch(url, {method: 'GET'})
  return res.json()
}

API.fetchPatrocinadoresAll = async() => {
  const url = `${GLOBALS.mainUrl}/api/v1/patrocinador/all`
  const res = await fetch(url, {method: 'GET'})
  return res.json()
}

API.fetchTaxonomiaR1 = async(scientificname, taxonrank) => {
  const url = `${GLOBALS.mainUrl}/api/taxonomy/get?scientificname=${scientificname}&taxonrank=${taxonrank}`
  const res = await fetch(url, {method: 'GET'})
  return res.json()
}

API.fetchTaxonomiaR2 = async(scientificname, order) => {
  const url = `${GLOBALS.mainUrl}/api/taxonomy/orden?nombre=${scientificname}&orden=${order}`
  const res = await fetch(url, {method: 'GET'})
  return res.json()
}


API.fetchIes = async() => {
  const url = `${GLOBALS.mainUrl}/api/v1/ies/all`
  const res = await fetch(url, {method: 'GET'})
  return res.json()
}

API.fetchIpi = async() => {
  const url = `${GLOBALS.mainUrl}/api/v1/ipi/all`
  const res = await fetch(url, {method: 'GET'})
  return res.json()
}

API.fetchIts = async() => {
  const url = `${GLOBALS.mainUrl}/api/v1/its/all`
  const res = await fetch(url, {method: 'GET'})
  return res.json()
}

API.fetchCCLPI = async(tipo) => {
  const url = `${GLOBALS.mainUrl}/v1/api/registro/list?tipo=${tipo}`
  const res = await fetch(url, {method: 'GET'})
  return res.json()
}

API.fetchSolitudById = async (solicitudId) => {
  const url = `${GLOBALS.mainUrl}/v1/api/solicitud/get?idSolicitud=${solicitudId}`
  const res = await fetch(url, {method: 'GET'})
  return res.json()
}

API.fetchSetPayload = async(solicitudId, payload) => {
  const url = `${GLOBALS.mainUrl}/v1/api/solicitud/actualiza?idSolicitud=${solicitudId}`
  const res    = await fetch(url,{method: 'POST', body: (typeof payload === 'string')?payload:JSON.stringify(payload)})
  return res.json()
}

API.fetchSolicitudByNumero = async(numero) => {
  const url = `${GLOBALS.mainUrl}/v1/api/solicitud/pornumero?numeroSolicitud=${numero}`
  const res = await fetch(url, {method: 'GET'})
  return res.json()
}

API.fetchSuspenderSolicitud = async(idsolicitud, bvalue) => {
  const url = `${GLOBALS.mainUrl}/v1/api/solicitud/suspendida?idSolicitud=${idsolicitud}&valor=${bvalue}`
  const res = await fetch(url, {method: 'GET'})
  return res.json()
}

export default API
