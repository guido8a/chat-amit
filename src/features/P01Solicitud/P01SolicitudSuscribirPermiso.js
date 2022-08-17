import React, {useEffect, useRef, useState} from 'react'
import {AppBar, Box, Button, CssBaseline, Grid, Stack,} from '@mui/material'
import {format} from 'date-fns'
import {es} from 'date-fns/locale'

import {accordeonBox, dialog} from 'src/styles/styles'
import {useDispatch, useSelector} from 'react-redux'
import Solicitud from "src/features/P01Solicitud/subcomponents/Solicitud";
import API from "src/features/App/API";
import {MyTextField} from "src/components/MyTextField";
import {MyAreaTextField} from "src/components/MyAreaTextField";
import {
  handCompletarTareaAndSalir,
  handleClear,
  handleSaveSolicitud
} from "src/features/App/sliceApp";
import {MySendButton} from 'src/components/MySendButton'
import {MyReabOnlyTableRecursos} from 'src/components/MyReadOnlyTableRecursos'
import {MySubtitle} from 'src/components/MySubtitle'
import {Solicitante} from 'src/features/P01Solicitud/subcomponents/Solicitante'
import {Solicitud2} from 'src/features/P01Solicitud/subcomponents/Solicitud2'
import {f} from 'src/commons/f'
import {Resolucion} from 'src/features/P01Solicitud/subcomponents/Resolucion'
import GLOBALS from 'src/features/App/globals'
import {SectionTitle} from "../../components/SectionTitle";
import Toolbar from "@mui/material/Toolbar";
import {MyButtonBacan} from "../../components/MyButtonBacan";
import {MyGobackButton, MySaveButton} from "../../components/MyCommonButtons";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {MyTableMuestras} from "../../components/MyTableMuestras";
import {Badge} from "@mui/icons-material";
import {MyReadOnlyTextField} from "../../components/MyReadOnlyTextField";
import UploadIcon from "@mui/icons-material/Upload"
import RobotoCondensedRegular from 'src/styles/MyFonts/Roboto_Condensed/RobotoCondensed-Regular.ttf'

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const section = 'ElaborarPermiso'
  const dispatch = useDispatch()
  const instanciaTarea = useSelector(state => state.app.instanciaTarea)
  const dirName = instanciaTarea.tareaCodigoTarea==='55000015_Activity_SuscribirPermisoWF0102'?'permiso':'elaborar-permiso'
  const titulo = instanciaTarea.tareaCodigoTarea==='55000015_Activity_SuscribirPermisoWF0102'?'Suscribir Permiso':'Elaborar Permiso'
  // const tareas =  useSelector(state => state.wf01.tareas)
  // const nombre_tarea = tareas.filter(it => it.codigo_tarea === instanciaTarea.tareaCodigoTarea)[0].nombre_tarea
  const perfilUsuario = useSelector(state => state.app.perfilUsuario)
  const bandeja = useSelector(state => state.app.bandeja)
  const instanciaProceso = useSelector(state => state.app.instanciaProceso)
  const solicitud = {...instanciaProceso.solicitud}
  const payload = !!solicitud.payload?JSON.parse(solicitud.payload):{}
  const funcionarios = useSelector(state => state.app.funcionarios)
  // const autorizador = funcionarios.filter(it => it.idPerfil === 1139)[0]
  const inputRef = useRef()

  const today = format(new Date(), 'dd-MMMM-yyyy', {locale: es})
  const emptyPayload = {
    fecha:     today,
    tiempoVigencia: '' + payload.Propuesta.plazo + ' meses',
    contenido: '',
    pdfGenerado: false,
    pdf: '',
    asunto:      '',
    detalle:     '',
  }

  // const ubicacion =
  //   '\nProvincias ' + payload.Recursos.provincias.join(', ') +
  //   '\nBosques Protectores: ' + payload.Recursos.bosquesProtectores.join(', ') +
  //   '\nAreas Protegidas: ' + payload.Recursos.areasProtegidas.join(', ')

  // const recursos = payload.Recursos.recursos.map(it => it.scientificname).join(', ')

  const [formValues, setFormValues] = useState({...emptyPayload, ...payload[section]})

  const handleChange = (e) => API.handleChange(e, bandeja, setFormValues, formValues)

  // const canEdit = bandeja === 'entrada' && instanciaTarea.estadoInstanciaProceso === "En Progreso" && instanciaTarea.estadoInstanciaTarea === "Iniciada"

  const [recursoSelected, setRecursoSelected] = useState({})

  const plantillaId = '56000023-1'

  // const nombreOrganizacion = perfilUsuario?.perfil?.organizacion?.nombreOrganizacion

  const [counter, setCounter] = useState(-1)  // updating counter

  useEffect(() => {
    setCounter(counter + 1)
  }, [formValues])

  if(!!instanciaProceso.id && !!instanciaTarea.id) {
    return <>
      <Box sx={{...accordeonBox.container, pt:'2rem', height: '100%'}}>
        <AppBar position='fixed'
                color='primary'
                elevation={0}
                sx={{top:'64px', bottom:'auto', margin: 0, padding:0, backgroundColor:'rgba(148, 193, 32, 0.8)'}} >
          <SectionTitle title={titulo} />
        </AppBar>
        <Grid container spacing={1} sx={accordeonBox.container2}>
          <Solicitante solicitud={{solicitud: solicitud}} />

          <Grid item xs={12} sx={dialog.titleContainer}>
            <MySubtitle subtitle={'Solicitud'} />
          </Grid>
          <Solicitud2 solicitud={solicitud} />

          <Grid item xs={12} sx={dialog.titleContainer}>
            <MySubtitle subtitle={'Recursos'} />
          </Grid>
          <MyReabOnlyTableRecursos rows={payload.Recursos.recursos} setRecursoSelected={setRecursoSelected}/>
          {
            f.isValid(recursoSelected.scientificname) ?
              <>
                <Grid item xs={12}>
                  {recursoSelected.scientificname}
                </Grid>
                <MyTableMuestras id={'muestras'}
                                 muestras={payload.InformeTecnicoMaate.muestras}
                                 formValues={payload.InformeTecnicoMaate}
                                 mode={'permiso'}
                                 canEdit={false}
                                 selected={recursoSelected} />
              </> : null
          }

          <Grid item xs={12} sx={dialog.titleContainer}>
            <MySubtitle subtitle={'Resolución'} />
          </Grid>
          <Resolucion solicitud={solicitud} />
          <Grid item xs={12} sx={dialog.titleContainer}>
            <MySubtitle subtitle={'Permiso de Investigación'} />
          </Grid>
          <Grid item xs={12} style={{padding:'0'}}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} >
              <MyReadOnlyTextField id={'fecha'}
                                   label={'Fecha'}
                                   value={formValues['fecha']}
                                   icon={<CalendarMonthIcon  sx={{fontSize: '14px', color:'silver', mr:'0.8rem'}} />} />
              <MyReadOnlyTextField id={'tiempoVigencia'}
                                   label={'Tiempo de Vigencia'}
                                   value={formValues['tiempoVigencia']}
                                   icon={<Badge sx={{fontSize: '14px', color:'silver', mr:'0.8rem'}}/>} />
              <MyButtonBacan label={'VER PDF'}
                             onClick={() => {
                               const url = `${GLOBALS.mainUrl}/documentos/descargar?filename=vuv-${solicitud?.id}/elaborar-permiso/${payload['ElaborarPermiso']['pdf']}`
                               fetch(url)
                                 .then((res) => { return res.blob(); })
                                 .then((data) => {
                                   const dataPdf = new Blob([data], { type: 'application/pdf' })
                                   const a = document.createElement("a")
                                   a.href = window.URL.createObjectURL(dataPdf)
                                   a.target="_blank"
                                   a.click()
                                 })
                             }}
                             myTip={'Ver permiso/autorización'}
                             icon={FileDownloadOutlinedIcon} />
            </Stack>
          </Grid>
          <Grid item xs={12} sx={dialog.titleContainer}>
            <MySubtitle subtitle={'Notificación'} />
          </Grid>
          <Grid item xs={12} style={{p:'0'}}>
            <MyTextField id={'asunto'}
                         label={'Asunto *'}
                         formValues={formValues}
                         handleChange={handleChange}
                         canEdit={true} />
          </Grid>
          <Grid item xs={12} style={{p:'0', m:'0 0 3rem 0'}}>
            <MyAreaTextField id={'detalle'}
                             label={'Contenido *'}
                             formValues={formValues}
                             handleChange={handleChange}
                             rows={10} />
          </Grid>
        </Grid>

        <CssBaseline/>
        <AppBar position='fixed'
                color='primary'
                elevation={0}
                sx={accordeonBox.bottomBar} >
          <Toolbar>
            <Grid container >
              <Grid item xs={12}>
                <Stack direction="row"
                       justifyContent="space-between"
                       alignItems="center"
                       spacing={2}
                       sx={{p:0, m:'-1rem 4rem 0 4rem'}}>
                  <MyGobackButton onGoback={() => dispatch(handleClear())} />
                  {/*<Grid item xs={2}>*/}
                  {/*  <MyButtonBacan label={'generar PDF'}*/}
                  {/*                 onClick={() => {*/}
                  {/*                   API.fetchGenerarPDF(instanciaProceso?.solicitud?.id, dirName,`elaborar_permiso_${nombreOrganizacion}`,formValues.contenido)*/}
                  {/*                     .then(result => {*/}
                  {/*                       if(f.isValid(result.rutaDocumento)) {*/}
                  {/*                         const arr = result.rutaDocumento.split('/')*/}
                  {/*                         setFormValues({...formValues, pdfGenerado: true, pdf: arr[arr.length-1]})*/}
                  {/*                       } else {*/}
                  {/*                         setFormValues({...formValues, pdfGenerado: false})*/}
                  {/*                       }*/}
                  {/*                     })*/}
                  {/*                 }}*/}
                  {/*                 myTip={'Generar PDF con los datos de la plantilla'}*/}
                  {/*                 icon={FileDownloadOutlinedIcon} />*/}
                  {/*</Grid>*/}
                  {/*<Grid item xs={2}>*/}
                  {/*  <MyButtonBacan label={'bajar PDF'}*/}
                  {/*                 onClick={() => {*/}
                  {/*                   if(formValues.pdf !== '') {*/}
                  {/*                     const url = `${GLOBALS.mainUrl}/documentos/descargar?filename=vuv-${instanciaProceso?.solicitud?.id}/${dirName}/${formValues.pdf}`*/}
                  {/*                     fetch(url)*/}
                  {/*                       .then((res) => { return res.blob(); })*/}
                  {/*                       .then((data) => {*/}
                  {/*                         const dataPdf = new Blob([data], { type: 'application/pdf' })*/}
                  {/*                         const a = document.createElement("a")*/}
                  {/*                         a.href = window.URL.createObjectURL(dataPdf)*/}
                  {/*                         a.target="_blank"*/}
                  {/*                         a.click()*/}
                  {/*                       })*/}
                  {/*                   } else {*/}
                  {/*                     alert('no se ha generado el PDF')*/}
                  {/*                   }*/}
                  {/*                 }}*/}
                  {/*                 myTip={'Bajar PDF generado'}*/}
                  {/*                 icon={FileDownloadOutlinedIcon} />*/}
                  {/*</Grid>*/}
                  {/*<Grid item xs={2}>*/}
                    <Button variant='contained'
                            sx={{
                              borderRadius: 2,
                              backgroundColor: 'rgba(54, 160, 184, 1)',
                              fontSize: '0.8rem',
                              fontfamily: RobotoCondensedRegular,
                              fontWeight: 'normal',
                              width: '9rem',
                              height: '36px',
                            }}
                            component='label'
                            startIcon={<UploadIcon height={'1rem'} fill={'rgba(255, 255, 255, 0.6)'}/>}
                            size={'small'}>
                      SUBIR PDF
                      <input id={'IT'}
                             ref={inputRef}
                             accept='application'
                             onChange={() => {
                               const formData = new FormData()
                               formData.append('idSolicitud', instanciaProceso?.solicitud?.id)
                               formData.append('subFolder', dirName)
                               formData.append('archivo', inputRef.current.files[0])
                               const requestOptions = {
                                 method: 'POST',
                                 body: formData,
                                 redirect: 'follow'
                               }
                               fetch(`${GLOBALS.mainUrl}/documentos/cargar`, requestOptions)
                                 .then(response => response.text())
                                 .then(result => {
                                   const rslt = JSON.parse(result)
                                   const rutaDocumento = rslt['rutaDocumento']
                                   const splits = rutaDocumento.split('/')
                                   const documento = splits.length > 1 ? splits[splits.length - 1]:rslt
                                   setFormValues({...formValues, pdf:documento})
                                 })
                                 .catch(error => console.log('error: ', error))
                             }}
                             hidden
                             type='file' />
                    </Button>
                  {/*</Grid>*/}

                  <MySaveButton onSave={() => {
                                  payload[section]=formValues
                                  setCounter(0)
                                  dispatch(handleSaveSolicitud(instanciaProceso?.id,payload))
                                }}
                                disabled={counter <= 0 } />

                  <MySendButton onSend={() => {
                                  // console.log('. . . . formValues.pdfGenerado :: ', formValues.pdfGenerado, formValues.pdf, section)
                                  const metadata = JSON.stringify({
                                    "solicitudId": `${instanciaProceso?.solicitud?.id}`,
                                    "asunto": formValues.asunto,
                                    "detalle": formValues.detalle,
                                    "adjunto": payload['ElaborarPermiso']['pdf'],
                                    "carpeta": 'elaborar-permiso',
                                  })
                                  dispatch(handCompletarTareaAndSalir(instanciaProceso.id, instanciaTarea, perfilUsuario.id, metadata))
                                }}
                                disabled={counter > 0 || formValues.contenido === '' || !formValues.pdfGenerado || formValues.asunto === '' || formValues.detalle === ''}
                                label={'enviar'} />
                </Stack>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  }
  else {
    return null
  }
}
