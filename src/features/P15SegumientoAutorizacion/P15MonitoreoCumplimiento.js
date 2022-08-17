import React, {useEffect, useState} from 'react'
import {Box, CssBaseline, Grid, Stack} from '@mui/material'
import {accordeonBox, dialog} from 'src/styles/styles'
import {useDispatch, useSelector} from 'react-redux'
import {
  handleSaveSolicitud,
  handleClear,
  handCompletarTareaCoordinador
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
import {Email} from "@mui/icons-material";
import API from 'src/features/App/API'
import {Solicitante} from "../P01Solicitud/subcomponents/Solicitante";
import {Solicitud2} from "../P01Solicitud/subcomponents/Solicitud2";
import {MyReadOnlyTextField} from "../../components/MyReadOnlyTextField";
import {MyAreaTextField} from "../../components/MyAreaTextField";
import {MyUpload} from "../../components/MyUpload";
import {MyReadOnlyAreaTextField} from "../../components/MyReadOnlyAreaTextField";
import {MySwitch} from "../../components/MySwitch";
import GLOBALS from "../App/globals";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const dispatch = useDispatch()
  const section = 'Monitoreo'
  const instanciaTarea = useSelector(state => state.app.instanciaTarea)
  const instanciaProceso = useSelector(state => state.app.instanciaProceso)
  const perfilUsuario = useSelector(state => state.app.perfilUsuario)
  const solicitud = {...instanciaProceso.solicitud}
  const payload = !!solicitud.payload?JSON.parse(solicitud.payload):{}
  const today = format(new Date(), 'dd-MMMM-yyyy', {locale: es})
  const emptyPayload = {
    fecha:                  today,
    pronunciamientoMaate:   '',
    pronunciamientoSenadi:  '',
    obligaciones:           false,
    asunto:                 '',
    detalle:                '',
  }

  const canEdit = instanciaTarea.estadoInstanciaProceso === "En Progreso" && instanciaTarea.estadoInstanciaTarea === "Iniciada"

  const [formValues, setFormValues] = useState({...emptyPayload, ...payload[section]})

  const handleChange = (e) => API.handleChange(e, 'entrada', setFormValues, formValues)

  const [counter, setCounter] = useState(-1)  // updating counter

  useEffect(() => {
    setCounter(counter + 1)
  }, [formValues])

  const toBPM = {
    seguimientoSenadi:    formValues.pronunciamientoSenadi,
    seguimientoMaate:     formValues.pronunciamientoMaate,
    obligacionesVencidas: formValues.obligaciones,
    monitoreoCompleto:    false,
  }

  console.log('. . . target: ', payload?.Solicitud?.target)

  return <>
    <Box sx={{...accordeonBox.container, pt:'2rem', height: '100%', backgroundImage: 'url(src/style/MySvgIcons)'}}>
      <AppBar position='fixed'
              color='primary'
              elevation={0}
              sx={{top:'64px', bottom:'auto', margin: 0, padding:0, backgroundColor:'rgba(148, 193, 32, 0.8)'}} >
        <SectionTitle title={'Monitoreo de cumplimiento'} />
      </AppBar>
      <Grid container spacing={1} sx={accordeonBox.container2}>
        <Grid item xs={12} sx={dialog.titleContainer}>
          <MySubtitle subtitle={'Autorización'} />
        </Grid>
        <Grid item xs={2}>
          <MyReadOnlyTextField id={'solicitudNumero'}
                               value={payload['Solicitud']['solicitudNumero']}
                               label={'Identificador'}
                               icon={<Email sx={{fontSize: '14px', color:'silver'}}/>} />
        </Grid>
      </Grid>
      {f.isValid(payload.Solicitud.target?.id) ?
        <Box sx={{p:'0 2rem 0 2rem'}}>
          <Grid item xs={12} sx={dialog.titleContainer}>
            <MySubtitle subtitle={'Autorización'} />
          </Grid>
          <Grid item xs={12}>
            <Solicitud2 solicitud={payload.Solicitud.target} />
          </Grid>
          <Grid item xs={12}>
            <Solicitante solicitud={{solicitud:payload.Solicitud.target}} displayContact={false}/>
          </Grid>
          <Grid item xs={12} sx={dialog.titleContainer}>
            <MySubtitle subtitle={'Disposición'} />
          </Grid>
          <Grid item xs={12}>
            <Stack direction={'row'} justifyContent="space-between" alignItems="center" sx={{p:'1rem 1rem 1rem 0'}}>
              <MyReadOnlyTextField id={'solicitudNumero'}
                                   value={solicitud?.numeroSolicitud}
                                   label={'Identificador'}
                                   icon={<Email sx={{fontSize: '14px', color:'silver'}}/>} />
              <MyReadOnlyTextField id={'fecha'}
                                   value={payload.Solicitud?.fecha}
                                   label={'Fecha'}
                                   icon={<Email sx={{fontSize: '14px', color:'silver'}}/>} />
              <MyUpload id={'respaldo'}
                        label={'Respaldo'}
                        formValues={payload['Solicitud']}
                        dir={solicitud.id}
                        canEdit={false} />
            </Stack>
          </Grid>

          <Grid item xs={12} >
            <MyReadOnlyTextField id={'asunto'}
                                 value={payload['Solicitud']['asunto']}
                                 label={'Asunto'}
                                 icon={<Email sx={{fontSize: '14px', color:'silver'}}/>} />
          </Grid>
          <Grid item xs={12} >
            <MyReadOnlyAreaTextField id={'detalle'}
                                     label={'Contenido *'}
                                     value={payload['Solicitud']['detalle']} />
          </Grid>

          <Grid container>
            <Grid item xs={6} sx={{pr:'1rem'}}>
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
                {f.isValid(payload?.DictamenTecnicoMaate?.pdf) ?
                  <Stack direction={'row'}
                         justifyContent="flex-end"
                         alignItems="center"
                         spacing={2}>
                  <MyButtonBacan label={'DICTAMEN'}
                                 onClick={() => {
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
                                 icon={FileDownloadOutlinedIcon} />
                  </Stack>:null
                }
              </Stack>
            </Grid>

            <Grid item xs={6} sx={{pr:'1rem'}}>
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
                {f.isValid(payload?.DictamenTecnicoSenadi?.pdf) ?
                  <Stack direction={'row'}
                         justifyContent="flex-end"
                         alignItems="center"
                         spacing={2}>
                  <MyButtonBacan label={'DICTAMEN'}
                                 onClick={() => {
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
                                 icon={FileDownloadOutlinedIcon} />
                  </Stack>:null
                }
              </Stack>
            </Grid>
          </Grid>

          <Grid item xs={6}  sx={{p:'2rem 1rem 0 1rem'}}>
            <Stack direction={'row'}
                   justifyContent="flex-end"
                   alignItems="center"
                   spacing={2}>
              <MySendButton onSend={ () => {
                              const metadata = JSON.stringify({
                                "solicitudId":`${instanciaProceso?.solicitud?.id}`,
                                ...toBPM
                              })
                              dispatch(handCompletarTareaCoordinador(instanciaProceso.id, instanciaTarea, perfilUsuario.id, metadata))
                            }}
                            label={'Solicitar'}
                            myTip={'Solicitar pronunciuamiento a MAATE y/o SENADI'}
                            disabled={counter > 0} />
            </Stack>
          </Grid>

          <Grid item xs={12} sx={{...dialog.titleContainer, p:'0'}}>
            <MySubtitle subtitle={'Obligaciones'} />
          </Grid>
          <Grid container>
            <Grid item xs={6} />
            <Grid item xs={6}>
              <MySwitch id='obligaciones'
                        label={'¿Tiene obligaciones vencidas?'}
                        fullWidth={false}
                        formValues={formValues}
                        canEdit={true}
                        handleChange={handleChange}/>
            </Grid>

          </Grid>

          <Grid item xs={12} style={{padding:'0'}}>
            <MyTextField id={'asunto'}
                         label={'Asunto *'}
                         formValues={formValues}
                         handleChange={handleChange}
                         rows={20}
                         canEdit={true}/>
          </Grid>

          <Grid item xs={12} >
            <MyAreaTextField id={'detalle'}
                             label={'Contenido *'}
                             formValues={formValues}
                             setFormValues={setFormValues}
                             handleChange={canEdit?handleChange:null} />
          </Grid>
          <Grid container>
            <Grid item xs={6} />
            <Grid item xs={6}>
              <MySwitch id='monitoreoCompleto'
                        label={'¿Monitores Completo?'}
                        fullWidth={false}
                        formValues={formValues}
                        canEdit={true}
                        handleChange={handleChange}/>
            </Grid>

          </Grid>

        </Box> : null
      }

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
                                  "asunto": formValues.asunto,
                                  "detalle": formValues.detalle,
                                  "perfilUsuarioSolicitud": Number(payload?.Solicitud?.target?.perfilUsuarioId),
                                  "seguimientoSenadi":      formValues.pronunciamientoSenadi,
                                  "seguimientoMaate":       formValues.pronunciamientoMaate,
                                  "obligacionesVencidas":   formValues.obligaciones,
                                  "monitoreoCompleto":      formValues.monitoreoCompleto,
                                })
                                dispatch(handCompletarTareaCoordinador(instanciaProceso.id, instanciaTarea, perfilUsuario.id, metadata))
                              }}
                              label={'Enviar'}
                              disabled={!canEdit || counter > 0 || formValues.asunto === '' || formValues.detalle === ''} />
              </Stack>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  </>
}
