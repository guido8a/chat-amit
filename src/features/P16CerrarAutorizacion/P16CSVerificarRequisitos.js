import React, {useEffect, useState} from 'react'
import {Box, CssBaseline, Grid, Stack} from '@mui/material'
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
import {MyTextField} from "../../components/MyTextField";
import API from 'src/features/App/API'
import {Solicitante} from "../P01Solicitud/subcomponents/Solicitante";
import {MyReadOnlyTextField} from "../../components/MyReadOnlyTextField";
import {MyAreaTextField} from "../../components/MyAreaTextField";
import {MyUpload} from "../../components/MyUpload";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Autorizacion from "../P01Solicitud/subcomponents/Autorizacion";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import {MyReadOnlyAreaTextField} from "../../components/MyReadOnlyAreaTextField";
import {MySwitch} from "../../components/MySwitch";
import GLOBALS from "../App/globals";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import {handCompletarTareaCoordinador} from 'src/features/App/sliceApp'

// eslint-disable-next-line import/no-anonymous-default-export
export default ({instanciaTarea, instanciaProceso, solicitud, perfilUsuario, solicitudesAprobadas}) => {
  const dispatch = useDispatch()
  const section = 'Verificar'
  const slct = {...solicitud, payload : JSON.parse(solicitud.payload)}
  slct.payload.Solicitud.solicitudAprobada = JSON.parse(slct.payload.Solicitud.solicitudAprobada)
  const mp = slct.payload.Solicitud.solicitudAprobada
  const payload = f.isValid(solicitud.payload)?JSON.parse(solicitud.payload):{}
  const today = format(new Date(), 'dd-MMMM-yyyy', {locale: es})
  const emptyPayload = {
    fecha:         today,
    requisito01:   false,
    requisito02:   false,
    requisito03:   false,
    requisito04:   false,
    requisito05:   false,
    requisito06:   false,
    requisito07:   false,
    pronunciamientoMaate: false,
    pronunciamientoSenadi: false,
    criterioTecnicoSenescyt: false,
    ampliacionInformacionSenescyt: false,
    cumpleRequisitos: false,
    asunto: '',
    detalle: '',
  }

  const canEdit = instanciaTarea.estadoInstanciaProceso === "En Progreso" && instanciaTarea.estadoInstanciaTarea === "Iniciada"
  const [formValues, setFormValues] = useState({...emptyPayload, ...payload[section]})
  const handleChange = (e) => API.handleChange(e, 'entrada', setFormValues, formValues)
  const [counter, setCounter] = useState(-1)  // updating counter

  useEffect(() => {
    setCounter(counter + 1)
  }, [formValues])

  useEffect(() => {
    if(formValues.cumpleRequisitos) {
      setFormValues({
        ...formValues,
        asunto: 'SOLICITUD DE CIERRE DE AUTORIZACIÓN CUMPLE REQUISITOS',
        detalle: '' +
          `Estimado/a ${mp?.Solicitante?.nombresCompletos},\n\n` +
          `Su solicitud realizada a través de la Ventanilla Única Virtual para el cierre de autorización registrada con el Nro. ${solicitud.numeroSolicitud} ` +
          `correspondiente al proyecto titulado ${mp?.Propuesta?.nombre}, cumple con los requisitos. \n` +
          '\n\nSaludos coordiales\n\n' +
          `${perfilUsuario.usuario.nombreUsuario}`
      })
    } else {
      setFormValues({
        ...formValues,
        asunto: 'SOLICITUD DE PERMISO DE INVESTIGACIÓN NO CUMPLE CON REQUISITOS',
        detalle: `Estimado/a ${mp?.Solicitante?.nombresCompletos},\n\n` +
          `Su solicitud realizada a través de la Ventanilla Única Virtual para el cierre de autorización registrada con el Nro. ${solicitud.numeroSolicitud} ` +
          `correspondiente al proyecto titulado ${mp?.Propuesta?.nombre}, no cumple con los requisitos. \n` +
          '\n\nSaludos coordiales\n\n' + `${perfilUsuario.usuario.nombreUsuario}`
      })
    }
  }, [formValues['cumpleRequisitos']])

  return <>
    <Box sx={{...accordeonBox.container, pt:'2rem', height: '100%', backgroundImage: 'url(src/style/MySvgIcons)'}}>
      <AppBar position='fixed'
              color='primary'
              elevation={0}
              sx={{top:'64px', bottom:'auto', margin: 0, padding:0, backgroundColor:'rgba(148, 193, 32, 0.8)'}} >
        <SectionTitle title={'Verificar requisitos cierre de autorización'} />
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
        <Grid item xs={12}>
          <MyUpload id={'pdf'}
                    label={'Respaldo'}
                    dir={instanciaProceso?.solicitud?.id}
                    formValues={payload.Solicitud}
                    canEdit={false}
                    info={'info...'} />
        </Grid>
        <Grid item xs={12} sx={dialog.titleContainer}>
          <MySubtitle subtitle={'Requisitos'} />
        </Grid>
        <Grid item xs={6} style={{padding:'0.5rem 2rem 0.5rem 2rem'}}>
          <MySwitch id={'requisito01'}
                    label={'Req 1'}
                    formValues={formValues}
                    setFormValues={setFormValues}
                    handleChange={handleChange}
                    canEdit={canEdit}/>
        </Grid>
        <Grid item xs={6} style={{padding:'0.5rem 2rem 0.5rem 2rem'}}>
          <MySwitch id={'requisito02'}
                    label={'Req 2'}
                    formValues={formValues}
                    handleChange={handleChange}
                    canEdit />
        </Grid>
        <Grid item xs={6} style={{padding:'0.5rem 2rem 0.5rem 2rem'}}>
          <MySwitch id={'requisito03'}
                    label={'Req 3'}
                    formValues={formValues}
                    handleChange={handleChange}
                    canEdit />
        </Grid>
        <Grid item xs={6} style={{padding:'0.5rem 2rem 0.5rem 2rem'}}>
          <MySwitch id={'requisito04'}
                    label={'Req 4'}
                    formValues={formValues}
                    handleChange={handleChange}
                    canEdit />
        </Grid>
        <Grid item xs={6} style={{padding:'0.5rem 2rem 0.5rem 2rem'}}>
          <MySwitch id={'requisito05'}
                    label={'Req 5'}
                    formValues={formValues}
                    handleChange={handleChange}
                    canEdit />
        </Grid>
        <Grid item xs={6} style={{padding:'0.5rem 2rem 0.5rem 2rem'}}>
          <MySwitch id={'requisito06'}
                    label={'Req 6'}
                    formValues={formValues}
                    handleChange={handleChange}
                    canEdit />
        </Grid>
        <Grid item xs={6} style={{padding:'0.5rem 2rem 0.5rem 2rem'}}>
          <MySwitch id={'requisito07'}
                    label={'Req 7'}
                    formValues={formValues}
                    handleChange={handleChange}
                    canEdit />
        </Grid>
        <Grid container>
          <Grid item xs={6} sx={{pr:'2.2rem'}}>
            <Stack direction={'column'}>
              <Grid item xs={12} sx={{...dialog.titleContainer, p:'0'}}>
                <MySubtitle subtitle={'Pronunciamiento MAATE'} />
              </Grid>
              <Grid item xs={12}>
                <MySwitch id='pronunciamientoMaate'
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
                <MySwitch id='pronunciamientoSenadi'
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
                <MySwitch id={'cumpleRequisitos'}
                          label={'¿Cumple requisitos?'}
                          formValues={formValues}
                          setFormValues={setFormValues}
                          canEdit={canEdit}
                          fullWidth={false}
                          handleChange={handleChange} />
              </Grid>
            </Stack>
          </Grid>

          <Grid item xs={12} sx={dialog.titleContainer}>
            <MySubtitle subtitle={'Notificacion'} />
          </Grid>
          <Grid item xs={12} style={{padding:'0 0 0 24px'}}>
            <MyTextField id={'asunto'}
                         label={'Asunto *'}
                         formValues={formValues}
                         handleChange={handleChange}
                         canEdit false/>
          </Grid>
          <Grid item xs={12} style={{padding:'0 0 0 24px'}}>
            <MyAreaTextField id={'detalle'}
                             label={'Contenido *'}
                             formValues={formValues}
                             handleChange={handleChange}
                             canEdit={false} />
          </Grid>
        </Grid>

      </Grid>
      <CssBaseline />
      <AppBar position='fixed'
              color='primary'
              elevation={0}
              sx={accordeonBox.bottomBar} >
        <Toolbar>
          <Grid container sx={{p:0, mt:'-1rem'}}>
            <Grid item xs={12} sx={{p:0, m:0, position: 'sticky',}}>
              <Stack direction={'row'} justifyContent="space-between" alignItems="center" sx={{p:'0 4rem 0 4rem'}}>
                <MyButtonBacan label={'Regresar'}
                               myTip={'Regresar a las tareas'}
                               icon={ArrowBackIcon}
                               onClick={() => { dispatch(handleClear()) }} />
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
                                  "pronunciamientoMaate": formValues.pronunciamientoMaate,
                                  "pronunciamientoSenadi": formValues.pronunciamientoSenadi,
                                  "cumpleRequisitos": formValues.cumpleRequisitos,
                                  "requisitosVerificados": ((formValues.pronunciamientoMaate && f.isValid(payload?.EmitirInformeTecnicoMaate?.pdf) && payload?.EmitirInformeTecnicoMaate?.pdf !== '') || !formValues.pronunciamientoMaate) &&
                                    ((formValues.pronunciamientoSenadi && f.isValid(payload?.EmitirInformeTecnicoSenadi?.pdf) && payload?.EmitirInformeTecnicoSenadi?.pdf !== '') || !formValues.pronunciamientoSenadi),
                                  "criterioTecnicoSenescyt": false,
                                  "ampliacionInformacionSenescyt": false,
                                  "asunto": formValues.asunto,
                                  "detalle": formValues.detalle,
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
