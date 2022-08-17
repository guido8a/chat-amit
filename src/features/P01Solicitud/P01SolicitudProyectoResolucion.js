import React, {useEffect, useRef, useState} from 'react'
import {AppBar, Box, CssBaseline, Grid, Stack, Tab, Typography} from '@mui/material'
import {format} from 'date-fns'
import {es} from 'date-fns/locale'

import {accordeonBox, dialog} from 'src/styles/styles'
import API from 'src/features/App/API'
import {useDispatch, useSelector} from 'react-redux'
import Solicitud from 'src/features/P01Solicitud/subcomponents/Solicitud'
import {
  handCompletarTareaAndSalir,
  handleClear,
  handleSaveSolicitud
} from 'src/features/App/sliceApp'
import {SectionTitle} from 'src/components/SectionTitle'
import {MyAreaTextField} from 'src/components/MyAreaTextField'
import {MySendButton} from 'src/components/MySendButton'
import VisibilityIcon from '@mui/icons-material/Visibility'
import {MyButtonBacan} from 'src/components/MyButtonBacan'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import {MySubtitle} from 'src/components/MySubtitle'
import {MyGobackButton, MySaveButton} from "../../components/MyCommonButtons";
import GLOBALS from 'src/features/App/globals'
import Toolbar from "@mui/material/Toolbar";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {f} from "../../commons";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import Button from "@mui/material/Button";
import RobotoCondensedRegular from "../../styles/MyFonts/Roboto_Condensed/RobotoCondensed-Regular.ttf";
import UploadIcon from "@mui/icons-material/Upload";
import {P0102PayloadRO} from 'src/features/P01Solicitud/P0102PayloadRO'

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const section = 'ProyectoResolucion'
  const dispatch = useDispatch()
  const perfilUsuario = useSelector(state => state.app.perfilUsuario)
  const bandeja = useSelector(state => state.app.bandeja)
  const instanciaTarea = useSelector(state => state.app.instanciaTarea)
  const instanciaProceso = useSelector(state => state.app.instanciaProceso)
  const solicitud = {...instanciaProceso.solicitud}
  const payload = !!solicitud.payload?JSON.parse(solicitud.payload):{}

  payload.solicitudId = solicitud.id
  const funcionarios = useSelector(state => state.app.funcionarios)
  const autorizador = funcionarios.filter(it => it.idPerfil === 1139)[0]
  const inputRef = useRef()

  const today = format(new Date(), 'dd-MMM-yyyy', {locale: es})
  const emptyPayload = {
    numero:      solicitud.numeroSolicitud,
    fecha:       today,
    contenido:   '',
    pdfGenerado: false,
    pdf:         '',
  }

  const solicitante = payload.Solicitante
  const propuesta = payload.Propuesta

  const [formValues, setFormValues] = useState({...emptyPayload, ...payload[section]})

  const [dictamen, setDictamen] = useState({})

  const handleChange = (e) => API.handleChange(e, bandeja, setFormValues, formValues)

  // const canEdit = bandeja === 'entrada' && instanciaTarea.estadoInstanciaProceso === "En Progreso" && instanciaTarea.estadoInstanciaTarea === "Iniciada"

  const [counter, setCounter] = useState(-1)  // updating counter

  useEffect(() => {
    setCounter(counter + 1)
  }, [formValues])

  const [myTab, setMytab] = useState('1');

  const handleChangeTab = (event, newTab) => {
    setMytab(newTab);
  }

  const nombreOrganizacion = perfilUsuario?.perfil?.organizacion?.nombreOrganizacion

  if(!!instanciaProceso.id && !!instanciaTarea.id) {
    return <>
      <Box sx={{...accordeonBox.container, pt:'2rem', height: '100%'}}>
        <AppBar position='fixed'
                color='primary'
                elevation={0}
                sx={{top:'64px', bottom:'auto', margin: 0, padding:0, backgroundColor:'rgba(148, 193, 32, 0.8)'}} >
          <SectionTitle title={'Proyecto de Resolucion'} />
        </AppBar>

        <TabContext value={myTab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
              <Tab label="Formulario" value="1" />
              <Tab label="Solicitud" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Grid container spacing={1} sx={accordeonBox.container2}>
              <Grid item xs={12} sx={dialog.titleContainer}>
                <MySubtitle subtitle={'Solicitud'} />
              </Grid>
              <Solicitud solicitud={solicitud}/>
              <Grid item xs={12} sx={dialog.titleContainer}>
                <MySubtitle subtitle={'Dictámenes'} />
              </Grid>
              <Grid item xs={12}>
                <Stack direction={'row'} justifyContent="space-between" alignItems="center">
                  <MyButtonBacan label={'SENESCYT'}
                                 onClick={() => {
                                   // setDictamen(payload.InformeTecnicoSenescyt)
                                   const url = `${GLOBALS.mainUrl}/documentos/descargar?filename=vuv-${instanciaProceso?.solicitud?.id}/informes/${payload['InformeTecnicoSenescyt']['pdf']}`
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
                                 icon={VisibilityIcon} />
                  <Grid item xs={4} display="flex" justifyContent="center">
                    <MyButtonBacan label={'MAATE'}
                                   onClick={() => {
                                     setDictamen(payload.DictamenTecnicoMaate)
                                     const url = `${GLOBALS.mainUrl}/documentos/descargar?filename=vuv-${instanciaProceso?.solicitud?.id}/DT-Maate/${payload['DictamenTecnicoMaate']['pdf']}`
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
                                   icon={VisibilityIcon} />
                  </Grid>
                  <MyButtonBacan label={'SENADI'}
                                 onClick={() => {
                                   // setDictamen(payload.InformeTecnicoSenadi)
                                   const url = `${GLOBALS.mainUrl}/documentos/descargar?filename=vuv-${instanciaProceso?.solicitud?.id}/DT-Senadi/${payload['DictamenTecnicoSenadi']['pdf']}`
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
                                 icon={VisibilityIcon }/>
                </Stack>
              </Grid>

              <Grid item xs={12} sx={dialog.titleContainer}>
                <MySubtitle subtitle={'Resolución'} />
              </Grid>
              <Grid item xs={12}>
                <Stack direction={'row'}
                       justifyContent="flex-end"
                       alignItems="center"
                       spacing={2}>
                  <MyButtonBacan label={'PLANTILLA'}
                                 onClick={() => {
                                   const url=`${GLOBALS.mainUrl}/plantilla/56002021-1`
                                   var requestOptions = {
                                     method: 'GET',
                                     redirect: 'follow'
                                   }
                                   fetch(url, requestOptions)
                                     .then(response => response.text())
                                     .then(result => {
                                       const docu = JSON.parse(result)
                                       // contenido?.contenidoPlantilla
                                       let contenido = docu.contenidoPlantilla.replace('${resolucion_senescyt}',`RES-2022-${Math.trunc(Math.random()*1000)}`)
                                         .replace('[NOMBRE DEL AUTORIZADOR PRINCIPAL DE SENESCYT]',autorizador.nombreUsuario)
                                         .replace('[CARGO DEL AUTORIZADOR PRINCIPAL DE SENESCYT]',autorizador.descripcionPerfil)
                                         .replace('[NOMBRE DEL SOLICITANTE]', solicitante.nombresCompletos)
                                         .replace('[TÍTULO DEL PROYECTO]', solicitud.nombreProyecto)
                                         .replace('[PLAZO DEL PROYECTO]', `${propuesta?.plazo} meses`)
                                       setFormValues({...formValues,contenido:contenido})
                                     })
                                     .catch(error => console.log('error', error))
                                 }}
                                 icon={FileDownloadIcon}/>
                </Stack>
              </Grid>

              <Grid item xs={12} style={{padding:'0'}}>
                <MyAreaTextField id={'contenido'}
                                 label={'Contenido'}
                                 formValues={formValues}
                                 handleChange={handleChange}
                                 rows={10}/>
              </Grid>
            </Grid>
            {
              !formValues.pdfGenerado ?
                <Grid item xs={12} style={{padding: '0 24px 0 32px'}}>
                  <Typography>Falta generar PDF</Typography>
                </Grid> : null
            }
          </TabPanel>
          <TabPanel value="2">
            <P0102PayloadRO payload={payload}/>
          </TabPanel>
        </TabContext>

        <CssBaseline/>
        <AppBar position='fixed'
                color='primary'
                elevation={0}
                sx={accordeonBox.bottomBar} >
          <Toolbar>
            <Grid container sx={{p:0, mt:'-1rem'}}>
              <Grid item xs={12} >
                <Stack direction={'row'} spacing={1} justifyContent="space-between" alignItems='center' sx={{p:'0 2rem 0 3rem'}}>
                  <MyGobackButton onGoback={() => dispatch(handleClear())} />
                  <MyButtonBacan label={'generar PDF'}
                                 onClick={() => {
                                   API.fetchGenerarPDF(instanciaProceso?.solicitud?.id, 'proyecto-resolucion',`proyecto_resolucion_${nombreOrganizacion}`,formValues.contenido)
                                     .then(result => {
                                       if(f.isValid(result.rutaDocumento)) {
                                         const arr = result.rutaDocumento.split('/')
                                         setFormValues({...formValues, pdfGenerado: true, pdf: arr[arr.length-1]})
                                       } else {
                                         setFormValues({...formValues, pdfGenerado: false})
                                       }
                                     })
                                 }}
                                 myTip={'Generar PDF con los datos de la plantilla'}
                                 icon={FileDownloadOutlinedIcon} />
                  <MyButtonBacan label={'bajar PDF'}
                                 onClick={() => {
                                   if(formValues.pdf !== '') {
                                     const url = `${GLOBALS.mainUrl}/documentos/descargar?filename=vuv-${instanciaProceso?.solicitud?.id}/proyecto-resolucion/${formValues.pdf}`
                                     fetch(url)
                                       .then((res) => { return res.blob(); })
                                       .then((data) => {
                                         const dataPdf = new Blob([data], { type: 'application/pdf' })
                                         const a = document.createElement("a")
                                         a.href = window.URL.createObjectURL(dataPdf)
                                         a.target="_blank"
                                         a.click()
                                       })
                                   } else {
                                     alert('no se ha generado el PDF')
                                   }
                                 }}
                                 myTip={'Bajar PDF generado'}
                                 icon={FileDownloadOutlinedIcon} />
                  <Button variant="contained"
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
                           accept="application"
                           onChange={() => {
                             const formData = new FormData()
                             formData.append('idSolicitud', instanciaProceso?.solicitud?.id)
                             formData.append('subFolder', 'proyecto-resolucion')
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

                  <MySaveButton onSave={ () => {
                    payload[section]=formValues
                    dispatch(handleSaveSolicitud(instanciaProceso?.id,payload))
                    setCounter(0)
                  }}
                                disabled={counter <= 0} />
                  <MySendButton onSend={ () => {
                    const metadata = JSON.stringify({
                        "solicitudId":`${instanciaProceso?.solicitud?.id}`,
                        "subFolder": "ProyectoResolucion",
                        "nombreArchivo": `PROYECTO-RESOLUCION-${instanciaProceso?.solicitud?.id}.pdf`,
                      }
                    )
                    dispatch(handCompletarTareaAndSalir(instanciaProceso.id, instanciaTarea, perfilUsuario.id, metadata))
                  }}
                                label={'Enviar'}
                                disabled={counter > 0  || !formValues.pdfGenerado} />
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
