import React, {useEffect, useRef, useState} from 'react'
import {AppBar, Box, CssBaseline, Grid, Tab, Typography} from '@mui/material'
import {format} from 'date-fns'
import {es} from 'date-fns/locale'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import GLOBALS from 'src/features/App/globals'
import {accordeonBox, dialog} from 'src/styles/styles'
import {useDispatch, useSelector} from 'react-redux'
import Solicitud from "src/features/P01Solicitud/subcomponents/Solicitud";
import API from "src/features/App/API";
import {MyTextField} from "src/components/MyTextField";
import {MyAreaTextField} from "src/components/MyAreaTextField";
import {handCompletarTareaAndSalir, handleClear, handleSaveSolicitud} from "src/features/App/sliceApp";
import {MySendButton} from 'src/components/MySendButton'
import {SectionTitle} from 'src/components/SectionTitle'
import {MyButtonBacan} from "../../components/MyButtonBacan";
import {MySubtitle} from "../../components/MySubtitle";
import Toolbar from "@mui/material/Toolbar";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {f} from "../../commons";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import Button from "@mui/material/Button";
import RobotoCondensedRegular from "../../styles/MyFonts/Roboto_Condensed/RobotoCondensed-Regular.ttf";
import UploadIcon from "@mui/icons-material/Upload";
import {P0102PayloadRO} from 'src/features/P01Solicitud/P0102PayloadRO'
import {MySwitch} from "../../components/MySwitch";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import {MyReadOnlyTextField} from "../../components/MyReadOnlyTextField";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const section = 'Resolucion'
  const dispatch = useDispatch()
  const instanciaTarea = useSelector(state => state.app.instanciaTarea)
  // const tareas =  useSelector(state => state.wf01.tareas)
  // const nombre_tarea = tareas.filter(it => it.codigo_tarea === instanciaTarea.tareaCodigoTarea)[0].nombre_tarea
  const perfilUsuario = useSelector(state => state.app.perfilUsuario)
  const bandeja = useSelector(state => state.app.bandeja)
  const instanciaProceso = useSelector(state => state.app.instanciaProceso)
  const solicitud = {...instanciaProceso.solicitud}
  const payload = !!solicitud.payload?JSON.parse(solicitud.payload):{}
  payload.solicitudId = solicitud.id
  const inputRef = useRef()

  const today = format(new Date(), 'dd-MMMM-yyyy', {locale: es})
  // const random = Math.trunc(Math.random()*9000)
  const emptyPayload = {
    identificador:    solicitud.numeroSolicitud,
    fecha:            today,
    contenido:        payload?.ProyectoResolucion?.contenido,
    seAprueba:        false,
    asunto:           '',
    contenido2:       '',
    pdfGenerado:      false,
    pdf:              '',
  }

  const [formValues, setFormValues] = useState({...emptyPayload, ...payload[section]})

  const handleChange = (e) => API.handleChange(e, bandeja, setFormValues, formValues)

  const canEdit = bandeja === 'entrada' && instanciaTarea.estadoInstanciaProceso === "En Progreso" && instanciaTarea.estadoInstanciaTarea === "Iniciada"

  const [counter, setCounter] = useState(-1)  // updating counter

  useEffect(() => {
    setCounter(counter + 1)
  }, [formValues])

  const [myTab, setMytab] = useState('1')

  const handleChangeTab = (event, newTab) => {
    setMytab(newTab)
  }

  const nombreOrganizacion = perfilUsuario?.perfil?.organizacion?.nombreOrganizacion

  useEffect(() => {
    if(!formValues.seAprueba) {
      setFormValues({
        ...formValues,
        asunto: 'RESOLUCIÓN DE PROYECTO DE INVESTIGACIÓN NEGADA',
        contenido2: `Estimado ${payload.Solicitante.nombresCompletos},\n\n`
          + `Su solicitud Nro. ${solicitud.numeroSolicitud} para el desarrollo del proyecto de investigación titulado "${payload.Propuesta.nombre}", ha concluido su proceso de revisión, negándose la autorización.\n\n`
          + 'RESOLUCIÓN ACERCA DEL PROYECTO DE INVESTIGACIÓN APROBADA\n\n'
          + 'Saludos cordiales,\n'
          + 'Sistema VUVIB.\n'
      })
    } else {
      setFormValues({
        ...formValues,
        asunto: 'RESOLUCIÓN DE PROYECTO DE INVESTIGACIÓN APROBADA',
        contenido2: `Estimado/a ${payload.Solicitante.nombresCompletos},\n\n`
          + `Su solictud Nro. ${solicitud.numeroSolicitud} para el desarrollo del proyecto de investigación titulado "${payload.Propuesta.nombre}", ha concluido su proceso de revisión de manera favorable.\n\n`
          + 'Saludos cordiales,\n'
          + 'Sistema VUVIB.\n'
      })
    }
  }, [formValues['seAprueba']])

  if(!!instanciaProceso.id && !!instanciaTarea.id) {
    return <>
      <Box sx={{...accordeonBox.container, pt:'2rem', height: '100%'}}>
        <AppBar position='fixed'
                color='primary'
                elevation={0}
                sx={{top:'64px', bottom:'auto', margin: 0, padding:0, backgroundColor:'rgba(148, 193, 32, 0.8)'}} >
          <SectionTitle title={`Resolución`} />
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
                <MySubtitle subtitle={'Resolución'} />
              </Grid>
              <Grid item xs={6} style={{padding:'0 24px 0 32px'}}>
                <MyReadOnlyTextField id={'identificador'}
                                     label={'Identificador'}
                                     value={formValues['identificador']}
                                     icon={<AssignmentIndOutlinedIcon sx={{fontSize: '14px', color:'silver', mr:'0.8rem'}} />} />
              </Grid>
              <Grid item xs={6} style={{padding:'0 24px 0 32px'}}>
                <MyReadOnlyTextField id={'fecha'}
                                     label={'Fecha'}
                                     value={formValues['fecha']}
                                     icon={<CalendarMonthIcon sx={{fontSize: '14px', color:'silver', mr:'0.8rem'}} />} />
              </Grid>
              <Grid item xs={12} style={{padding:'0'}}>
                <MyAreaTextField id={'contenido'}
                                 label={'Contenido'}
                                 formValues={formValues}
                                 handleChange={handleChange}
                                 rows={10} />
              </Grid>
              <Grid item xs={12} sx={dialog.titleContainer}>
                <MySubtitle subtitle={'Notificacion'} />
              </Grid>
              {/*<Grid item xs={12} style={{padding:'0'}}>*/}
              {/*  <MyCheckBox  id={'seAprueba'}*/}
              {/*               label={'¿Solicitud Aprobada?'}*/}
              {/*               formValues={formValues}*/}
              {/*               handleChange={handleChange}*/}
              {/*               canEdit={canEdit}/>*/}
              {/*</Grid>*/}
              <Grid item xs={12}>
                <MySwitch id='seAprueba'
                          label={'¿Solicitud Aprobada?'}
                          formValues={formValues}
                          canEdit={canEdit}
                          fullWidth={false}
                          handleChange={handleChange} />
              </Grid>

              <Grid item xs={12} style={{padding:'0'}}>
                <MyTextField id={'asunto'}
                             label={'Asunto *'}
                             formValues={formValues}
                             handleChange={handleChange}
                             rows={20} canEdit={true}/>
              </Grid>
              <Grid item xs={12} style={{padding:'0'}}>
                <MyAreaTextField id={'contenido2'}
                                 label={'Contenido *'}
                                 formValues={formValues}
                                 handleChange={handleChange}
                                 rows={10} />
              </Grid>
              {
                !formValues.pdfGenerado ?
                  <Grid item xs={12} style={{padding: '0 '}}>
                    <Typography>ATENCIÓN: NO SE HA GENERADO PDF</Typography>
                  </Grid> : null
              }
            </Grid>
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
            <Grid container>
              <Grid xs={2}>
              <MyButtonBacan label={'Regresar'}
                             icon={ArrowBackIcon}
                             onClick={() => dispatch(handleClear())}/>
              </Grid>
              <Grid xs={2}>
              <MyButtonBacan label={'generar PDF'}
                             onClick={() => {
                               API.fetchGenerarPDF(instanciaProceso?.solicitud?.id, 'resolucion',`resolucion_${nombreOrganizacion}`,formValues.contenido)
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
              </Grid>
              <Grid xs={2}>
              <MyButtonBacan label={'bajar PDF'}
                             onClick={() => {
                               if(formValues.pdf !== '') {
                                 const url = `${GLOBALS.mainUrl}/documentos/descargar?filename=vuv-${instanciaProceso?.solicitud?.id}/resolucion/${formValues.pdf}`
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
              </Grid>
              <Grid xs={2}>
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
                         formData.append('subFolder', 'resolucion')
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
              </Grid>
              <Grid xs={2}>
              <MyButtonBacan label={'Guardar'}
                             icon={SaveOutlinedIcon}
                             onClick={() => {
                               payload[section]=formValues
                               dispatch(handleSaveSolicitud(instanciaProceso?.id,payload))
                               setCounter(0)
                             }}
                             disabled={counter === 0} />
              </Grid>
              <Grid xs={2}>
              <MySendButton onSend={ () => {
                              const metadata = JSON.stringify({
                                "resolucionProcedente": formValues.seAprueba,
                                "permiso": instanciaProceso.tipoInstanciaProceso !== "Contrato",
                                "contrato": instanciaProceso.tipoInstanciaProceso === "Contrato",
                                "adjunto": payload[section]['pdf'],
                                "carpeta": 'resolucion',
                                "asunto": formValues.asunto,
                                "detalle": formValues.contenido2,
                              })
                              dispatch(handCompletarTareaAndSalir(instanciaProceso.id, instanciaTarea, perfilUsuario.id, metadata))
                            }}
                            label='Enviar'
                            disabled={counter > 0 || !formValues.pdfGenerado || formValues.asunto === '' || formValues.contenido2 === ''} />
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
