import React, {useEffect, useRef, useState} from 'react'
import {AppBar, Box, CssBaseline, Grid, Stack, Tab, Typography} from '@mui/material'
import {accordeonBox, dialog} from 'src/styles/styles'
import API from 'src/features/App/API'
import {useDispatch, useSelector} from 'react-redux'
import Solicitud from "src/features/P01Solicitud/subcomponents/Solicitud";
import {
  handCompletarTareaCoordinador,
  handleClear,
  handleSaveSolicitud
} from "src/features/App/sliceApp";
import {SectionTitle} from 'src/components/SectionTitle'
import {MyAreaTextField} from 'src/components/MyAreaTextField'
import {MySendButton} from 'src/components/MySendButton'
import {format} from 'date-fns'
import {es} from 'date-fns/locale'
import {MyGobackButton, MySaveButton} from 'src/components/MyCommonButtons'
import {MySubtitle} from 'src/components/MySubtitle'
import {MyReadOnlyTextField} from 'src/components/MyReadOnlyTextField'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import {MyButtonBacan} from 'src/components/MyButtonBacan'
import Toolbar from "@mui/material/Toolbar";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import GLOBALS from "../App/globals";
import {f} from "../../commons";
import Button from "@mui/material/Button";
import RobotoCondensedRegular from '../../styles/MyFonts/Roboto_Condensed/RobotoCondensed-Regular.ttf'
import UploadIcon from '@mui/icons-material/Upload'
import {P0102PayloadRO} from 'src/features/P01Solicitud/P0102PayloadRO'
import {MySwitch} from "../../components/MySwitch";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const dispatch = useDispatch()
  const perfilUsuario = useSelector(state => state.app.perfilUsuario)
  const section = `InformeTecnico${perfilUsuario?.perfil?.organizacion?.nombreOrganizacion}`
  const bandeja = useSelector(state => state.app.bandeja)
  const instanciaTarea = useSelector(state => state.app.instanciaTarea)
  const instanciaProceso = useSelector(state => state.app.instanciaProceso)
  const solicitud = {...instanciaProceso.solicitud}
  let payload = JSON.parse(!!instanciaProceso?.solicitud?.payload?instanciaProceso?.solicitud?.payload:'{}')
  payload.solicitudId = solicitud.id
  const funcionarios = useSelector(state => state.app.funcionarios)
  const inputRef = useRef()

  const today = format(new Date(), 'dd-MMMM-yyyy', {locale: es})
  const emptyPayload = {
    fecha: today,
    identificador: solicitud.numeroSolicitud,
    asunto: '',
    contenido: '',
    pdfGenerado: false,
    pdf: '',
    pronunciamientoMaate:false,
    pronunciamientoSenadi:false,
    dictamenMAATE: '',
    dictamenSENADI: '',
    imnformeCompleto: false,
  }

  const [formValues, setFormValues] = useState({
    ...emptyPayload,
    ...payload[section],
    dictamenMAATE: f.isValid(payload?.DictamenTecnicoMaate?.pdf)?payload?.DictamenTecnicoMaate?.pdf:'',
    dictamenSENADI: f.isValid(payload?.DictamenTecnicoSenadi.pdf)?payload?.DictamenTecnicoSenadi.pdf:'',
  })

  const handleChange = (e) => API.handleChange(e, bandeja, setFormValues, formValues)

  const nombreOrganizacion = perfilUsuario?.perfil?.organizacion?.nombreOrganizacion

  const informeTecnico = '56002003-1'

  const codigoAutorizador = 1139

  const autorizador = funcionarios.filter(it => it.idPerfil === codigoAutorizador)[0]

  const toBPM = {
    "pronunciamientoMaate": formValues.pronunciamientoMaate,
    "pronunciamientoSenadi": formValues.pronunciamientoSenadi,
    "criterioTecnicoSenescyt": false,
    "informeCompletoSenescyt": formValues.imnformeCompleto,
    "ampliacionInformacionSenescyt": false
  }

  if(!!instanciaProceso.id && !!instanciaTarea.id && f.isValid(formValues)) {
    const [counter, setCounter] = useState(-1)  // updating counter

    useEffect(() => {
      setCounter(counter + 1)
    }, [formValues])

    const [myTab, setMytab] = useState('1');

    const handleChangeTab = (event, newTab) => {
      setMytab(newTab);
    };

    return <>
      <Box sx={{...accordeonBox.container, pt:'2rem', height: '100%'}}>
        <AppBar position='fixed'
                color='primary'
                elevation={0}
                sx={{top:'64px', bottom:'auto', margin: 0, padding:0, backgroundColor:'rgba(148, 193, 32, 0.8)'}} >
          <SectionTitle title={`Informe T??cnico`} />
        </AppBar>
        <TabContext value={myTab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
              <Tab label="Formulario" value="1" />
              <Tab label="Solicitud" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Grid container spacing={1} >
              <Grid item xs={12} sx={{...dialog.titleContainer, p:'0'}}>
                <MySubtitle subtitle={'Solicitud'} />
              </Grid>
              <Solicitud solicitud={solicitud}/>

              <Grid item xs={6} sx={{pr:'1rem'}}>
                <Stack direction={'column'}>
                  <Grid item xs={12} sx={{...dialog.titleContainer, p:'0'}}>
                  <MySubtitle subtitle={'Pronunciamiento MAATE'} />
                  </Grid>
                  <MySwitch id='pronunciamientoMaate'
                            label={'??Se requiere pronunciamiento?'}
                            formValues={formValues}
                            canEdit={true}
                            handleChange={handleChange}/>
                  {f.isValid(payload?.DictamenTecnicoMaate?.pdf) ?
                    <MyButtonBacan label={'DICTAMEN'}
                                   onClick={() => {
                                     const url = `${GLOBALS.mainUrl}/documentos/descargar?filename=vuv-${instanciaProceso?.solicitud?.id}/DT-Maate/${formValues.dictamenMAATE}`
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
                                   icon={FileDownloadOutlinedIcon} />:null
                  }
                </Stack>
              </Grid>

              <Grid item xs={6}  sx={{pl:'1rem'}}>
                <Stack direction={'column'}>
                  <Grid item xs={12} sx={{...dialog.titleContainer, p:'0'}}>
                  <MySubtitle subtitle={'Pronunciamiento SENADI'} />
                  </Grid>
                  <MySwitch id='pronunciamientoSenadi'
                            label={'??Se requiere pronunciamiento?'}
                            formValues={formValues}
                            canEdit={true}
                            handleChange={handleChange}/>
                  {f.isValid(payload?.DictamenTecnicoSenadi?.pdf) ?
                    <MyButtonBacan label={'DICTAMEN'}
                                   onClick={() => {
                                     const url = `${GLOBALS.mainUrl}/documentos/descargar?filename=vuv-${instanciaProceso?.solicitud?.id}/DT-Senadi/${formValues.dictamenSENADI}`
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
                                   icon={FileDownloadOutlinedIcon} />:null
                  }
                </Stack>
              </Grid>

              <Grid item xs={12}  sx={{p:'0 1rem 0 1rem'}}>
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
                              disabled={counter > 0 || formValues.contenido === '' || !formValues.pdfGenerado} />
                </Stack>
              </Grid>

              <Grid item xs={12} sx={dialog.titleContainer}>
                <MySubtitle subtitle={'Informe'} />
              </Grid>
              <Grid item xs={12} style={{padding:'0 1rem 0 0'}}>
                <Stack direction={'row'}
                       justifyContent="space-between"
                       alignItems="center"
                       spacing={2}>
                  <MyReadOnlyTextField id={'fecha'}
                                       label={'Fecha'}
                                       icon={<CalendarMonthIcon sx={{fill:'silver'}} />}
                                       value={formValues?.fecha} />
                  <MyReadOnlyTextField id={'identificador'}
                                       label={'Identificador'}
                                       icon={<AssignmentIndOutlinedIcon sx={{fill:'silver'}} />}
                                       value={formValues?.identificador} />
                  <MyButtonBacan label={'Plantilla'}
                                 onClick={() => {
                                   API.fetchPlantila(informeTecnico).then(result => {
                                     let contenido = result.contenidoPlantilla
                                     contenido = contenido.replace('(FECHA GENERADA POR EL SISTEMA)', today)
                                       .replaceAll('[N??MERO DE SOLICITUD]', formValues.identificador)
                                       .replaceAll('[FECHA DEL INFORME]', today)
                                       .replaceAll('[NUMERO DE SOLICITUD]', formValues.identificador)
                                       .replaceAll('[NUMERO DEL INFORME SENESCYT]', formValues.identificador)
                                       .replaceAll('[NOMBRE DEL SOLICITANTE]', payload.Solicitante.nombresCompletos)
                                       .replaceAll('[TITULO DEL PROYECTO]', solicitud.nombreProyecto)
                                       .replaceAll('[T??TULO DEL PROYECTO]', solicitud.nombreProyecto)
                                       .replaceAll('[T??TULO DEL  PROYECTO]', solicitud.nombreProyecto)
                                       .replaceAll('[PLAZO DEL PROYECTO]', payload.Propuesta.plazo + ' meses')
                                       .replaceAll('[NOMBRE DEL ESPECIALISTA DE INFORMES T??CNICOS]',perfilUsuario.usuario.nombreUsuario)
                                       .replaceAll('[CARGO DEL ESPECIALISTA DE INFORMES T??CNICOS]',perfilUsuario.perfil.descripcionPerfil)
                                       .replaceAll('[TEL??FONO  DEL ESPECIALISTA DE INFORMES T??CNICOS]',perfilUsuario.usuario.telefonoUsuario ?? '')
                                       .replaceAll('[CORREO DEL ESPECIALISTA DE INFORMES T??CNICOS]',perfilUsuario.usuario.correoUsuario)
                                       .replaceAll('[NOMBRE DEL PROGRAMA]',payload.Propuesta.areaInvestigacion)
                                       .replaceAll('[NOMBRE DEL GESTOR DE CASOS SENESCYT]',perfilUsuario.usuario.nombreUsuario)
                                       .replaceAll('[CORREO ELECTR??NICO DEL GESTOR DE CASOS SENESCYT]',perfilUsuario.usuario.correoUsuario)
                                       .replaceAll('[CARGO DEL GESTOR DE CASOS SENESCYT]',perfilUsuario.perfil.descripcionPerfil)
                                       .replaceAll('[TEL??FONO DEL ESPECIALISTA DE INFORMES T??CNICOS]',perfilUsuario.usuario.telefonoUsuario ?? '')
                                       .replaceAll('[NOMBRE DEL AUTORIZADOR PRINCIPAL DE SENESCYT]', autorizador.nombreUsuario)
                                       .replaceAll('[CORREO ELECTR??NICO DEL AUTORIZADOR PRINCIPAL DE SENESCYT]', autorizador.correoUsuario)
                                       .replaceAll('[CARGO DEL AUTORIZADOR PRINCIPAL DE SENESCYT]', autorizador.descripcionPerfil)
                                       .replaceAll('${informe_tecnico_senescyt}',  solicitud.numeroSolicitud)
                                       .replaceAll('[NOMBRE DEL AUTORIZADOR SECTORIAL DEL SENADI]', autorizador.nombreUsuario)
                                       .replaceAll('[CARGO DEL AUTORIZADOR SECTORIAL DEL SENADI]', autorizador.descripcionPerfil)
                                       .replaceAll('[TEL??FONO DEL AUTORIZADOR SECTORIAL DEL SENADI]', autorizador.telefonoUsuario)
                                       .replaceAll('[CORREO ELECTR??NICO DEL AUTORIZADOR SECTORIAL DEL SENADI]', autorizador.correoUsuario)
                                       .replaceAll('${informe_tecnico_senadi}',`IT-SENADI-${Math.trunc(Math.random()*1000)}`)
                                     setFormValues({...formValues,contenido})
                                   })
                                 }}
                                 icon={ArticleOutlinedIcon} />
                </Stack>
              </Grid>
              <Grid item xs={12} style={{padding:'0 1rem 0 0'}}>
                <MyAreaTextField id={'contenido'}
                                 label={'Contenido'}
                                 formValues={formValues}
                                 handleChange={handleChange}
                                 rows={20}/>
              </Grid>
              <Grid item xs={12} sx={{pr:'2rem'}}>
                <Stack direction={'row'} justifyContent="flex-end" alignItems="center">
                  <MySwitch id='imnformeCompleto'
                            label={'Informe completo'}
                            formValues={formValues}
                            canEdit={true}
                            handleChange={handleChange}/>
                </Stack>
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
                <Stack direction={'row'}
                       spacing={1}
                       justifyContent="space-between"
                       alignItems='center' sx={{p:'0 2rem 0 3rem'}}>
                  <MyGobackButton onGoback={() => dispatch(handleClear())} />
                  <MyButtonBacan label={'generar PDF'}
                                 onClick={() => {
                                   API.fetchGenerarPDF(instanciaProceso?.solicitud?.id, 'informes',`informe_tecnico_${nombreOrganizacion}`,formValues.contenido)
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
                                     const url = `${GLOBALS.mainUrl}/documentos/descargar?filename=vuv-${instanciaProceso?.solicitud?.id}/informes/${formValues.pdf}`
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
                             formData.append('subFolder', 'informes')
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
                                disabled={counter <= 0 } />
                  <MySendButton onSend={ () => {
                                  const metadata = JSON.stringify({
                                    "solicitudId":`${instanciaProceso?.solicitud?.id}`,
                                    ...toBPM
                                  })
                                  dispatch(handCompletarTareaCoordinador(instanciaProceso.id, instanciaTarea, perfilUsuario.id, metadata))
                                }}
                                label={'enviar'}
                                myTip={'Enviar Informe T??cnico y continuar con proceso'}
                                disabled={counter > 0 || formValues.contenido === '' || !formValues.pdfGenerado} />
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
