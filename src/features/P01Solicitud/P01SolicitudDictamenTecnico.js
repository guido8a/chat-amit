import React, {useEffect, useRef, useState} from 'react'
import {AppBar, Box, CssBaseline, Divider, Grid, Stack, Tab, Typography} from '@mui/material'
import {format} from 'date-fns'
import {es} from 'date-fns/locale'

import {accordeonBox, dialog} from 'src/styles/styles'
import API from 'src/features/App/API'
import {useDispatch, useSelector} from 'react-redux'
import Solicitud from 'src/features/P01Solicitud/subcomponents/Solicitud'
import {
  handCompletarTareaCoordinador,
  handleClear,
  handleSaveSolicitud
} from 'src/features/App/sliceApp'
import {SectionTitle} from 'src/components/SectionTitle'
import {MyAreaTextField} from 'src/components/MyAreaTextField'
import {MySendButton} from 'src/components/MySendButton'
import {MySubtitle} from 'src/components/MySubtitle'
import {MyReadOnlyTextField} from "../../components/MyReadOnlyTextField";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import {MyButtonBacan} from "../../components/MyButtonBacan";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import {MyGobackButton, MySaveButton} from "src/components/MyCommonButtons";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import GLOBALS from 'src/features/App/globals'
import Toolbar from "@mui/material/Toolbar";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {f} from "../../commons";
import RobotoCondensedRegular from "../../styles/MyFonts/Roboto_Condensed/RobotoCondensed-Regular.ttf";
import Button from "@mui/material/Button";
import UploadIcon from "@mui/icons-material/Upload"
import {P0102PayloadRO} from 'src/features/P01Solicitud/P0102PayloadRO'

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const dispatch = useDispatch()
  const perfilUsuario = useSelector(state => state.app.perfilUsuario)
  // const organizacion = perfilUsuario?.perfil?.organizacion?.nombreOrganizacion
  const section = `DictamenTecnico${perfilUsuario?.perfil?.organizacion?.nombreOrganizacion}`
  const bandeja = useSelector(state => state.app.bandeja)
  const instanciaTarea = useSelector(state => state.app.instanciaTarea)

  const instanciaProceso = useSelector(state => state.app.instanciaProceso)
  const solicitud = {...instanciaProceso.solicitud}
  // console.log('. . . . . . .  >> ', solicitud.numeroSolicitud)
  const payload = !!solicitud.payload?JSON.parse(solicitud.payload):{}
  payload.solicitudId = solicitud.id
  const inputRef = useRef()
  const nombreOrganizacion = perfilUsuario?.perfil?.organizacion?.nombreOrganizacion

  const informeTecnico = {
    'Senadi':   payload.InformeTecnicoSenadi,
    'Maate':    payload.InformeTecnicoMaate,
    'Senescyt': payload.InformeTecnicoSenescyt,
  }[nombreOrganizacion]

  const today = format(new Date(), 'dd-MMMM-yyyy', {locale: es})
  const emptyPayload = {
    fecha: today,
    identificador: solicitud.numeroSolicitud,
    asunto: '',
    contenido: '',   //informeTecnico?.contenido,
    pdfGenerado: false,
    pdf: '',
  }

  let myPayload = {
    "55000023_Activity_EmitirInformeSenadiWF15": payload?.Solicitud?.target?.payload,
    '55000023_Activity_EmitirInformeMaateWF15':  payload?.Solicitud?.target?.payload,
  }[instanciaTarea?.tareaCodigoTarea]

  if(!f.isValid(myPayload)) {
    myPayload = payload
  } else {
    myPayload = JSON.parse(myPayload)
  }

  const [formValues, setFormValues] = useState({...emptyPayload, ...payload[section]})

  const handleChange = (e) => API.handleChange(e, bandeja, setFormValues, formValues)

  const [counter, setCounter] = useState(-1)  // updating counter

  useEffect(() => {
    setCounter(counter + 1)
  }, [formValues])

  const dictamenTecnico = {
    'Senadi':   '56002019-1',
    'Maate':    '56002020-1',
    // 'Senescyt': '56002003-1',
  }[nombreOrganizacion]

  const [myTab, setMytab] = useState('1');

  const handleChangeTab = (event, newTab) => {
    setMytab(newTab);
  };

  const pdf = {
    'Senadi':   payload?.InformeTecnicoSenadi?.pdf,
    'Maate':    payload?.InformeTecnicoMaate?.pdf,
  }[nombreOrganizacion]

  return <>
    <Box sx={{...accordeonBox.container, pt:'2rem', height: '100%'}}>
      <AppBar position='fixed'
              color='primary'
              elevation={0}
              sx={{top:'64px', bottom:'auto', margin: 0, padding:0, backgroundColor:'rgba(148, 193, 32, 0.8)'}} >
        <SectionTitle title={`Dictamen Técnico`} onClick={()=> { dispatch(handleClear()) }}/>
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
              <MySubtitle subtitle={'Informe Técnico'} />
            </Grid>
            <Grid item xs={6} sx={{p:'0 2rem 0 2rem'}}>
              <MyReadOnlyTextField id={'itfecha'}
                                   label={'Fecha'}
                                   icon={<CalendarMonthIcon sx={{fontSize: '14px', color:'silver', mr:'0.8rem'}} />}
                                   value={informeTecnico?.fecha} />
            </Grid>
            <Grid item xs={6} style={{padding:'1rem 0 1rem 1rem'}}>
              <Stack direction={'row'} justifyContent="space-between" alignItems="center">
                <MyReadOnlyTextField id={'itidentificador'}
                                     label={'Identificador'}
                                     icon={<AssignmentIndOutlinedIcon sx={{fontSize: '14px', color:'silver', mr:'0.8rem'}} />}
                                     value={informeTecnico.identificador} />
                <MyButtonBacan label={'VER PDF'}
                               onClick={() => {
                                 const url = `${GLOBALS.mainUrl}/documentos/descargar?filename=vuv-${instanciaProceso?.solicitud?.id}/informe-tecnico-${nombreOrganizacion}/informe-tecnico-${solicitud.numeroSolicitud}-${nombreOrganizacion}-firmado.pdf`
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
              </Stack>
            </Grid>
            <Grid item xs={12} sx={dialog.titleContainer}>
              <MySubtitle subtitle={`${nombreOrganizacion} - Dictamen Técnico`} />
            </Grid>
            <Grid item xs={6}>
              <MyReadOnlyTextField id={'fecha'}
                                   label={'Fecha'}
                                   icon={<CalendarMonthIcon sx={{fontSize: '14px', color:'silver', mr:'0.8rem'}} />}
                                   value={formValues.fecha} />
            </Grid>
            <Grid item xs={6} style={{padding:'0 0 0 1rem'}}>
              <Stack direction={'row'}
                     justifyContent="space-between"
                     alignItems="center"
                     spacing={2}>
                <MyReadOnlyTextField id={'identificador'}
                                     label={'Identificador'}
                                     icon={<AssignmentIndOutlinedIcon sx={{fontSize: '14px', color:'silver', mr:'0.8rem'}} />}
                                     value={formValues.identificador} />
                <MyButtonBacan label={'Plantilla'}
                               onClick={() => {
                                 API.fetchPlantila(dictamenTecnico).then(result => {
                                   let contenido = result.contenidoPlantilla
                                   contenido = contenido.replace('[INSTITUCIÓN-DT-AÑO-NÚMERO]', `${nombreOrganizacion}-DT-2022-${Math.trunc(Math.random()*200)}`)
                                     .replaceAll('[NÚMERO DE SOLICITUD]', formValues.identificador)
                                     .replaceAll('[FECHA DE SOLICITUD]', today)
                                     .replaceAll('[NUMERO DE SOLICITUD]', formValues.identificador)
                                     .replaceAll('[NOMBRE DEL SOLICITANTE]', myPayload.Solicitante.nombresCompletos)
                                     .replaceAll('[TITULO DEL PROYECTO]', solicitud.nombreProyecto)
                                     .replaceAll('[TÍTULO DEL PROYECTO]', solicitud.nombreProyecto)
                                     .replaceAll('[TÍTULO DEL  PROYECTO]', solicitud.nombreProyecto)
                                     .replaceAll('[PLAZO DEL PROYECTO]', myPayload.Propuesta.plazo + ' meses')
                                     .replaceAll('[NOMBRE DEL ESPECIALISTA]',perfilUsuario.usuario.nombreUsuario)
                                     .replaceAll('[CARGO DEL ESPECIALISTA]',perfilUsuario.perfil.descripcionPerfil)
                                     .replaceAll('[TELÉFONO  DEL ESPECIALISTA DE INFORMES TÉCNICOS]',perfilUsuario.usuario.celularUsuario)
                                     .replaceAll('[CORREO DEL ESPECIALISTA DE INFORMES TÉCNICOS]',perfilUsuario.usuario.correoUsuario)
                                   setFormValues({...formValues,contenido})
                                 })
                               }}
                               icon={ArticleOutlinedIcon} />
              </Stack>

            </Grid>

            <Grid item xs={12} style={{padding:'0'}}>
              <MyAreaTextField id={'contenido'}
                               label={'Contenido'}
                               formValues={formValues}
                               handleChange={handleChange}
                               rows={20}/>
            </Grid>
            {
              !formValues.pdfGenerado ?
                <Grid item xs={12} style={{padding: '0 24px 0 32px'}}>
                  <Typography>Falta generar PDF</Typography>
                </Grid> : null
            }
          </Grid>
        </TabPanel>
        <TabPanel value="2">
          <P0102PayloadRO payload={myPayload}/>
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
              <Stack direction={'row'}
                     spacing={0}
                     justifyContent="space-between"
                     alignItems='center' sx={{p:'0 2rem 0 3rem'}}>
                <MyGobackButton onGoback={() => dispatch(handleClear())} />
                <MyButtonBacan label={'generar PDF'}
                               onClick={() => {
                                 API.fetchGenerarPDF(instanciaProceso?.solicitud?.id, `DT-${nombreOrganizacion}`,`dictamen_tecnico_${nombreOrganizacion}`,formValues.contenido)
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
                                 const url = `${GLOBALS.mainUrl}/documentos/descargar?filename=vuv-${instanciaProceso?.solicitud?.id}/DT-${nombreOrganizacion}/${formValues.pdf}`
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
                           formData.append('subFolder', `DT-${nombreOrganizacion}`)
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
                <MySaveButton onSave={() => {
                                payload[section]=formValues
                                setCounter(0)
                                dispatch(handleSaveSolicitud(instanciaProceso?.id,payload))
                              }}
                              disabled={counter <= 0} />
                <MySendButton onSend={ () => {
                                const metadata = JSON.stringify({"solicitudId":`${instanciaProceso?.solicitud?.id}`})
                                dispatch(handCompletarTareaCoordinador(instanciaProceso.id, instanciaTarea, perfilUsuario.id, metadata))
                              }}
                              label={'Enviar'}
                              disabled={counter > 0 || !formValues.pdfGenerado} />
              </Stack>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  </>
}
