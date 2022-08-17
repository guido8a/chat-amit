import React, {useEffect, useState} from 'react'
import {Box, CssBaseline, Grid, Stack, Typography} from '@mui/material'
import {accordeonBox, dialog} from 'src/styles/styles'
import {useDispatch} from 'react-redux'
import {
  handleSaveSolicitud,
  handleClear,
  // handCompletarTareaCoordinador
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
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import {MyReadOnlyAreaTextField} from "../../components/MyReadOnlyAreaTextField";
import GLOBALS from "../App/globals";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import {handCompletarTareaCoordinador} from 'src/features/App/sliceApp'

// eslint-disable-next-line import/no-anonymous-default-export
export default ({instanciaTarea, instanciaProceso, solicitud, perfilUsuario, solicitudesAprobadas}) => {
  const dispatch = useDispatch()
  const section = 'ElaborarResolucion'
  const slct = {...solicitud, payload : JSON.parse(solicitud.payload)}
  slct.payload.Solicitud.solicitudAprobada = JSON.parse(slct.payload.Solicitud.solicitudAprobada)
  const mp = slct.payload.Solicitud.solicitudAprobada
  const payload = f.isValid(solicitud.payload)?JSON.parse(solicitud.payload):{}
  const today = format(new Date(), 'dd-MMMM-yyyy', {locale: es})
  const emptyPayload = {
    fecha:       today,
    pdf:         '',
    resolucion:  '',
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
        <SectionTitle title={'Elaborar Resolución'} />
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

        <Grid item xs={12} sx={dialog.titleContainer}>
          <MySubtitle subtitle={'Solicitud de cierre'} />
        </Grid>
        <Grid item xs={12}>
          <MyReadOnlyTextField id='motivo'
                               label={'Motivo'}
                               value={payload.Solicitud?.motivo}
                               icon={<ArticleOutlinedIcon sx={dialog.textFieldIcon}/>} />
        </Grid>
        <Grid item xs={12}>
          <MyReadOnlyAreaTextField id='resultados'
                                   label={'Resultados alcanzados *'}
                                   value={payload.Solicitud?.resultados}
                                   icon={<ArticleOutlinedIcon sx={dialog.textFieldIcon}/>} />
        </Grid>

        <Grid item xs={12} sx={{pr:'1rem'}}>
          <Stack direction={'row'} justifyContent="flex-end" alignItems="center" spacing={2}>
            <Typography>Respaldo</Typography>
            <MyButtonBacan label={'VER PDF'}
                           onClick={() => {
                             const url = `${GLOBALS.mainUrl}/documentos/descargar?filename=vuv-${instanciaProceso?.solicitud?.id}/pdf/${payload.Solicitud.pdf}`
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
          </Stack>
        </Grid>

        <Grid item xs={12} sx={dialog.titleContainer}>
          <MySubtitle subtitle={'Informes Técnicos'} />
        </Grid>

        <Grid container>
          {
            f.isValid(payload?.EmitirInformeTecnicoMaate?.pdf) ?
              <Grid item xs={6} sx={{pl:'1rem'}}>
                <Stack direction={'row'} justifyContent="flex-start" alignItems="center" spacing={2}>
                  <Typography>Informe Técnico MAATE</Typography>
                  <MyButtonBacan label={'VER PDF'}
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
                </Stack>
              </Grid>:null
          }

          {
            f.isValid(payload?.EmitirInformeTecnicoSenadi?.pdf) ?
              <Grid item xs={6} sx={{pr:'1rem'}}>
                <Stack direction={'row'} justifyContent="flex-end" alignItems="center" spacing={2}>
                  <Typography>Informe Técnico SENADI</Typography>
                  <MyButtonBacan label={'VER PDF'}
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
                </Stack>
              </Grid>: null
          }

          <Grid item xs={12} sx={dialog.titleContainer}>
            <MySubtitle subtitle={'Resolución'} />
          </Grid>
          <Grid item xs={12} style={{padding:'0 0 0 24px'}}>
            <MyAreaTextField id={'resolucion'}
                             label={'Contenido *'}
                             formValues={formValues}
                             handleChange={handleChange}
                             canEdit={false} />
          </Grid>
        </Grid>

      </Grid>
      <CssBaseline />
      <AppBar position='fixed' color='primary' elevation={0} sx={accordeonBox.bottomBar} >
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
                                 API.fetchGenerarPDF(instanciaProceso?.solicitud?.id, 'elaborar_resolucion','resolucion',formValues.resolucion)
                                   .then(result => {
                                     if(f.isValid(result.rutaDocumento)) {
                                       const arr = result.rutaDocumento.split('/')
                                       setFormValues({...formValues, pdfGenerado: true, pdf: arr[arr.length-1]})
                                     } else {
                                       setFormValues({...formValues, pdfGenerado: false})
                                     }
                                   })
                               }}
                               icon={FileDownloadOutlinedIcon} />
                <MyButtonBacan label={'bajar PDF'}
                               onClick={() => {
                                 const url = `${GLOBALS.mainUrl}/documentos/descargar?filename=vuv-${instanciaProceso?.solicitud?.id}/elaborar_resolucion/${formValues.pdf}`
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
                               icon={FileDownloadOutlinedIcon} />
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
                                })
                                dispatch(handCompletarTareaCoordinador(instanciaProceso.id, instanciaTarea, perfilUsuario.id, metadata))
                              }}
                              label={'Enviar'}
                              disabled={
                                formValues.pdf === '' ||
                                formValues.resolucion === '' ||
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
