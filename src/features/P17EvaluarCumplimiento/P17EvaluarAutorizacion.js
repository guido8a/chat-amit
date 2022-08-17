import React, {useEffect, useRef, useState} from 'react'
import {Box, CssBaseline, Grid, Stack, Typography} from '@mui/material'
import {accordeonBox, dialog} from 'src/styles/styles'
import {useDispatch} from 'react-redux'
import {
  handleSaveSolicitud,
  handleClear,
} from 'src/features/App/sliceApp'
import {MySendButton} from 'src/components/MySendButton'
import {SectionTitle} from 'src/components/SectionTitle'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import {MyButtonBacan} from 'src/components/MyButtonBacan'
import {f} from 'src/commons/f'
import {format} from "date-fns";
import {es} from "date-fns/locale";
import {MySubtitle} from "../../components/MySubtitle";
import API from 'src/features/App/API'
import {Solicitante} from "../P01Solicitud/subcomponents/Solicitante";
import {MyReadOnlyTextField} from "../../components/MyReadOnlyTextField";
import {MyAreaTextField} from "../../components/MyAreaTextField";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Autorizacion from "../P01Solicitud/subcomponents/Autorizacion";
import {MySwitch} from "../../components/MySwitch";
import GLOBALS from "../App/globals";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import {handCompletarTareaCoordinador} from 'src/features/App/sliceApp'
import Button from "@mui/material/Button";
import RobotoCondensedRegular from "../../styles/MyFonts/Roboto_Condensed/RobotoCondensed-Regular.ttf";
import UploadIcon from "@mui/icons-material/Upload";


// eslint-disable-next-line import/no-anonymous-default-export
export default ({instanciaTarea, instanciaProceso, solicitud, perfilUsuario, solicitudesAprobadas}) => {
  const dispatch = useDispatch()
  const inputRef = useRef()
  const dirName = 'evaluar-autorizacion'
  const section = 'Evaluacion'
  const slct = {...solicitud, payload : JSON.parse(solicitud.payload)}
  slct.payload.Solicitud.solicitudAprobada = JSON.parse(slct.payload.Solicitud.target.payload)
  const mp = slct.payload.Solicitud.solicitudAprobada
  const payload = f.isValid(solicitud.payload)?JSON.parse(solicitud.payload):{}
  const today = format(new Date(), 'dd-MMMM-yyyy', {locale: es})
  const emptyPayload = {
    fecha:         today,
    evaluacionMaate: false,
    evaluacionSenadi: false,
    criterioTecnicoSenescyt: false,
    ampliacionInformacionSenescyt: false,
    autorizacionEvaluada: false,
    informe: '',
    pdf: '',
    pdfGenerado: false,
  }

  const canEdit = instanciaTarea.estadoInstanciaProceso === "En Progreso" && instanciaTarea.estadoInstanciaTarea === "Iniciada"
  const [formValues, setFormValues] = useState({...emptyPayload, ...payload[section]})
  const handleChange = (e) => API.handleChange(e, 'entrada', setFormValues, formValues)
  const [counter, setCounter] = useState(-1)  // updating counter

  useEffect(() => {
    setCounter(counter + 1)
  }, [formValues])

  return <>
    <Box sx={{...accordeonBox.container, pt:'2rem', height: '100%', backgroundImage: 'url(src/style/MySvgIcons)'}}>
      <AppBar position='fixed'
              color='primary'
              elevation={0}
              sx={{top:'64px', bottom:'auto', margin: 0, padding:0, backgroundColor:'rgba(148, 193, 32, 0.8)'}} >
        <SectionTitle title={'Evaluar autorización'} />
      </AppBar>
      <Grid container spacing={1} sx={accordeonBox.container2}>
        <Grid item xs={12} sx={dialog.titleContainer}>
          <MySubtitle subtitle={'Declaración'} />
        </Grid>
        <Grid item xs={6} >
          <MyReadOnlyTextField label={'Identificador'}
                               icon={<BorderColorIcon fontSize={'1rem'} sx={{color:'silver', m:'0 0.8rem 0 0'}}/>}
                               value={solicitud.numeroSolicitud} />
        </Grid>
        <Grid item xs={6} >
          <MyReadOnlyTextField label={'Fecha'}
                               icon={<CalendarMonthIcon fontSize={'1rem'} sx={{color:'silver', m:'0 0.8rem 0 0'}}/>}
                               value={formValues['fecha']} />
        </Grid>

        <Solicitante solicitud={{solicitud: {payload: mp}}} displayContact={false}/>
        <Autorizacion solicitud={{numeroSolicitud: formValues.aprobadaIdentificador, payload: mp}} />

        <Grid container>
          <Grid item xs={6} sx={{pr:'2.2rem'}}>
            <Stack direction={'column'}>
              <Grid item xs={12} sx={{...dialog.titleContainer, p:'0'}}>
                <MySubtitle subtitle={'Pronunciamiento MAATE'} />
              </Grid>
              <Grid item xs={12}>
                <MySwitch id='evaluacionMaate'
                          label={'¿Se requiere pronunciamiento?'}
                          formValues={formValues}
                          fullWidth={false}
                          canEdit={true}
                          handleChange={handleChange}/>
              </Grid>
              {f.isValid(payload?.EmitirInformeTecnicoMaate?.pdf) ?
                <Stack direction={'row'} justifyContent="flex-end" alignItems="center" spacing={2}>
                  <MyButtonBacan label={'DICTAMEN'}
                                 onClick={() => {
                                   const url = `${GLOBALS.mainUrl}/documentos/descargar?filename=vuv-${instanciaProceso?.solicitud?.id}/DT-Maate/informe_tecnico.pdf`
                                   fetch(url)
                                     .then((res) => { return res.blob(); })
                                     .then((data) => {
                                       const dataPdf = new Blob([data], { type: 'application/pdf' })
                                       const a = document.createElement("a")
                                       a.href = window.URL.createObjectURL(dataPdf)
                                       a.target = "_blank"
                                       a.click()
                                     })
                                 }}
                                 icon={FileDownloadOutlinedIcon} />
                </Stack>:null
              }
            </Stack>
          </Grid>

          <Grid item xs={6} sx={{pr:'2.5rem'}}>
            <Stack direction={'column'}>
              <Grid item xs={12} sx={{...dialog.titleContainer, p:'0'}}>
                <MySubtitle subtitle={'Pronunciamiento SENADI'} />
              </Grid>
              <Grid item xs={12}>
                <MySwitch id='evaluacionSenadi'
                          label={'¿Se requiere pronunciamiento?'}
                          formValues={formValues}
                          fullWidth={false}
                          canEdit={true}
                          handleChange={handleChange}/>
              </Grid>
              {f.isValid(payload?.EmitirInformeTecnicoSenadi?.pdf) ?
                <Stack direction={'row'} justifyContent="flex-end" alignItems="center" spacing={2}>
                  <MyButtonBacan label={'DICTAMEN'}
                                 onClick={() => {
                                   const url = `${GLOBALS.mainUrl}/documentos/descargar?filename=vuv-${instanciaProceso?.solicitud?.id}/DT-Senadi/informe_tecnico.pdf`
                                   fetch(url)
                                     .then((res) => { return res.blob(); })
                                     .then((data) => {
                                       const dataPdf = new Blob([data], { type: 'application/pdf' })
                                       const a = document.createElement("a")
                                       a.href = window.URL.createObjectURL(dataPdf)
                                       a.target = "_blank"
                                       a.click()
                                     })
                                 }}
                                 icon={FileDownloadOutlinedIcon} />
                </Stack>:null
              }
              <Grid item xs={12} >
                <MySwitch id={'autorizacionEvaluada'}
                          label={'¿Autorización evaluada'}
                          formValues={formValues}
                          setFormValues={setFormValues}
                          canEdit={canEdit}
                          fullWidth={false}
                          handleChange={handleChange} />
              </Grid>
            </Stack>
          </Grid>

          <Grid item xs={12} sx={dialog.titleContainer}>
            <MySubtitle subtitle={'Informe de evaluación'} />
          </Grid>
          <Grid item xs={12} style={{padding:'0 0 0 24px'}}>
            <MyAreaTextField id={'informe'}
                             label={'Contenido *'}
                             formValues={formValues}
                             handleChange={handleChange}
                             canEdit={false} />
          </Grid>
          <Grid item xs={12} style={{padding:'0 0 0 24px'}}>
            {
              !formValues.pdfGenerado ?
                <Grid item xs={12} style={{padding: '0 24px 0 32px'}}>
                  <Typography>Falta generar PDF</Typography>
                </Grid> : null
            }
          </Grid>
        </Grid>

      </Grid>
      <CssBaseline />
      <AppBar position='fixed' color='primary' elevation={0} sx={accordeonBox.bottomBar}>
        <Toolbar>
          <Grid container sx={{p:0, mt:'-1rem'}}>
            <Grid item xs={12} sx={{p:0, m:0, position: 'sticky',}}>
              <Stack direction={'row'} justifyContent="space-between" alignItems="center" sx={{p:'0 4rem 0 4rem'}}>
                <MyButtonBacan label={'Regresar'}
                               myTip={'Regresar a las tareas'}
                               icon={ArrowBackIcon}
                               onClick={() => { dispatch(handleClear()) }} />

                <MyButtonBacan label={'generar PDF'}
                               onClick={() => {
                                 API.fetchGenerarPDF(instanciaProceso?.solicitud?.id, dirName,`informe`,formValues.informe)
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
                                   const url = `${GLOBALS.mainUrl}/documentos/descargar?filename=vuv-${instanciaProceso?.solicitud?.id}/${dirName}/${formValues.pdf}`
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

                <MyButtonBacan label={'Guardar'}
                               myTip={'Guarda el formulario, y permite continuar editando'}
                               onClick={() => {
                                 payload[section]=formValues
                                 setCounter(0)
                                 dispatch(handleSaveSolicitud(instanciaProceso?.id,payload))
                               }}
                               disabled={!canEdit || counter <= 0}
                               icon={SaveOutlinedIcon} />

                <MySendButton onSend={ () => {
                                const metadata = JSON.stringify({
                                  "solicitudId":`${instanciaProceso?.solicitud?.id}`,
                                  "evaluacionMaate": formValues.evaluacionMaate,
                                  "evaluacionSenadi": formValues.evaluacionSenadi,
                                  "autorizacionEvaluada": formValues.autorizacionEvaluada,
                                  "criterioTecnicoSenescyt": false,
                                  "ampliacionInformacionSenescyt": false,
                                })
                                dispatch(handCompletarTareaCoordinador(instanciaProceso.id, instanciaTarea, perfilUsuario.id, metadata))
                              }}
                              label={'Enviar'}
                              disabled={
                                formValues.identificador === '' ||
                                formValues.resultados === '' ||
                                formValues.pdf === '' ||
                                formValues.asunto === '' ||
                                formValues.detalle === '' ||
                                counter > 0
                              } />
              </Stack>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  </>
}
