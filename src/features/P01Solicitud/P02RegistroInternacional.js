import React, {useEffect, useRef, useState} from 'react'
import {AppBar, Box, CssBaseline, Grid, Stack} from '@mui/material'
import {add, format, parse} from 'date-fns'
import {es} from 'date-fns/locale'
// import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import {accordeonBox, dialog} from 'src/styles/styles'
import {useDispatch, useSelector} from 'react-redux'
import API from "src/features/App/API";
import {handCompletarTareaAndSalir, handleClear, handleSaveSolicitud} from "src/features/App/sliceApp";
import {MySendButton} from 'src/components/MySendButton'
import {MySubtitle} from 'src/components/MySubtitle'
import {Solicitante} from 'src/features/P01Solicitud/subcomponents/Solicitante'
import GLOBALS from 'src/features/App/globals'
import {SectionTitle} from "../../components/SectionTitle";
import {MyReadOnlyTextField} from "../../components/MyReadOnlyTextField";
import {AccountCircle} from "@mui/icons-material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import {MyButtonBacan} from "../../components/MyButtonBacan";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import Toolbar from "@mui/material/Toolbar";
import {MyGobackButton, MySaveButton} from "../../components/MyCommonButtons";
import {MyTextField} from "../../components/MyTextField";
import {MyDatePicker} from "../../components/MyDatePicker";
import Button from "@mui/material/Button";
import RobotoCondensedRegular from "../../styles/MyFonts/Roboto_Condensed/RobotoCondensed-Regular.ttf";
import UploadIcon from "@mui/icons-material/Upload";
import ApprovalIcon from '@mui/icons-material/Approval';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const section = 'CertificadoInternacional'
  const dirName = 'certificado-internacional'
  const inputRef = useRef()
  const dispatch = useDispatch()
  const instanciaTarea = useSelector(state => state.app.instanciaTarea)
  const perfilUsuario = useSelector(state => state.app.perfilUsuario)
  const bandeja = useSelector(state => state.app.bandeja)
  const instanciaProceso = useSelector(state => state.app.instanciaProceso)
  const solicitud = {...instanciaProceso.solicitud}
  const payload = !!solicitud.payload?JSON.parse(solicitud.payload):{}

  const slct = {...solicitud, payload : JSON.parse(solicitud.payload)}

  const today = format(new Date(), 'dd-MMMM-yyyy', {locale: es})
  const emptyPayload = {
    fecha:           today,
    identificador:   '',
    pdf:             '',
  }

  const [formValues, setFormValues] = useState({...emptyPayload, ...payload[section]})

  const handleChange = (e) => API.handleChange(e, bandeja, setFormValues, formValues)

  // const [recursoSelected, setRecursoSelected] = useState({})

  const dResolucion = parse(slct.payload.Resolucion.fecha,'dd-MMMM-yyyy', new Date(), {locale: es})
  const plazo = Number(slct.payload.Propuesta.plazo)
  const dPlazo = add(dResolucion, {months: plazo})

  const [counter, setCounter] = useState(-1)  // updating counter
  useEffect(() => {setCounter(counter + 1)}, [formValues])

  if(!!instanciaProceso.id && !!instanciaTarea.id) {
    return <>
      <Box sx={{...accordeonBox.container, pt:'2rem', height: '100%'}}>
        <Grid sx={{...accordeonBox.container, pt:'2rem', height: '100%'}}>
          <AppBar position='fixed'
                  color='primary'
                  elevation={0}
                  sx={{top:'64px', bottom:'auto', margin: 0, padding:0, backgroundColor:'rgba(148, 193, 32, 0.8)'}} >
            <SectionTitle title={'Registro de contrato de acceso con potencial uso comercial'} />
          </AppBar>
          <Grid container spacing={1} sx={accordeonBox.container2}>
            <Solicitante solicitud={{solicitud: {payload}}} displayContact={false} />
            <Grid item xs={12} sx={dialog.titleContainer}>
              <MySubtitle subtitle={'Resolución'} />
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{p:'0 1rem 0 0'}} >
                <MyReadOnlyTextField id='identificador'
                                     label={'Identificador'}
                                     value={solicitud?.numeroSolicitud}
                                     icon={<AccountCircle sx={{fontSize: '14px', color: 'silver', mr: '0.8rem'}} />} />
                <MyReadOnlyTextField id='fecha'
                                     label={'Fecha'}
                                     value={slct?.payload?.Resolucion?.fecha}
                                     icon={<CalendarMonthIcon sx={{fontSize: '14px', color: 'silver', mr: '0.8rem'}} />} />
                <MyButtonBacan label={'VER PDF'}
                               onClick={() => {
                                 const url = `${GLOBALS.mainUrl}/documentos/descargar?filename=vuv-${solicitud?.id}/resolucion/${slct.payload?.Resolucion?.pdf}`
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
                               myTip={'Ver resolución'}
                               icon={FileDownloadOutlinedIcon} />
              </Stack>
            </Grid>

            <Grid item xs={12} sx={dialog.titleContainer}>
              <MySubtitle subtitle={'Contrato'} />
            </Grid>
            <Grid item xs={3} style={{padding:'0 24px 0 0.5rem'}} >
              <MyReadOnlyTextField id='identificador'
                                   label={'Identificador'}
                                   value={solicitud?.numeroSolicitud}
                                   icon={<AccountCircle sx={{fontSize: '14px', color: 'silver', mr: '0.8rem'}}/>}/>
            </Grid>
            <Grid item xs={3} style={{padding:'0 24px 0 0.5rem'}} >
              <MyReadOnlyTextField id='fecha'
                                   label={'Fecha de emisión'}
                                   value={format(dResolucion, 'dd-MMM-yyyy', {locale: es})}
                                   icon={<CalendarMonthIcon sx={{fontSize: '14px', color: 'silver', mr: '0.8rem'}} />} />
            </Grid>
            <Grid item xs={3} style={{padding:'0 24px 0 0.5rem'}} >
              <MyReadOnlyTextField id='plazo'
                                   label={'Vigencia'}
                                   value={`${plazo} meses`}
                                   icon={<CalendarMonthIcon sx={{fontSize: '14px', color: 'silver', mr: '0.8rem'}} />} />
            </Grid>
            <Grid item xs={3} style={{padding:'0 24px 0 0.5rem'}} >
              <MyReadOnlyTextField id='fechaCaducidad'
                                   label={'Fecha de caducidad'}
                                   value={format(dPlazo, 'dd-MMM-yyyy', {locale: es})}
                                   icon={<CalendarMonthIcon sx={{fontSize: '14px', color: 'silver', mr: '0.8rem'}} />} />
            </Grid>
            <Grid item xs={3} style={{padding:'0 24px 0 0.5rem'}} >
              <MyReadOnlyTextField id={'idRegistro'}
                                   label={'Identificador de registro'}
                                   value={slct.payload.RegistrarContrato.idRegistro}
                                   icon={<ApprovalIcon sx={{fontSize: '14px', color: 'silver', mr: '0.8rem'}} />}/>
            </Grid>
            <Grid item xs={3} style={{padding:'1rem 24px 0 0.5rem'}} >
              <MyReadOnlyTextField id={'fecha'}
                                   label={'Fecha de registro'}
                                   value={slct.payload.RegistrarContrato.fecha}
                                   icon={<CalendarMonthIcon sx={{fontSize: '14px', color: 'silver', mr: '0.8rem'}} />}/>
            </Grid>
            <Grid item xs={3} style={{padding:'1rem 24px 0 0.5rem'}} >
            </Grid>
            <Grid item xs={3} style={{padding:'2rem 24px 0 0.5rem'}} >
              <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} >
                <MyButtonBacan label={'VER PDF'}
                               onClick={() => {
                                 const url = `${GLOBALS.mainUrl}/documentos/descargar?filename=vuv-${instanciaProceso?.solicitud?.id}/registro/${slct.payload.RegistrarContrato.pdf}`
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
                               myTip={'Ver resolución'}
                               icon={FileDownloadOutlinedIcon} />
              </Stack>
            </Grid>
            <Grid item xs={12} sx={dialog.titleContainer}>
              <MySubtitle subtitle={'Certificado internacional de investigación'} />
            </Grid>
            <Grid item xs={12} style={{padding:'0 24px 0 0.5rem'}} >
              <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2} >
                <Box sx={{width:'25%'}} >
                  <MyTextField id={'identificador'}
                               label={'Identificador de registro *'}
                               formValues={formValues}
                               setFormValues={setFormValues}
                               handleChange={handleChange}
                               canEdit={true} />
                </Box>
                <Box sx={{width:'10rem'}} >
                  <MyDatePicker id={'fecha'}
                                canEdit={true}
                                label={'Fecha'}
                                formValues={formValues}
                                setFormValues={setFormValues} />
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
        <CssBaseline/>
        <AppBar position='fixed' color='primary' elevation={0} sx={accordeonBox.bottomBar} >
          <Toolbar>
            <Grid container sx={{p:0, mt:'-1rem'}}>
              <Grid item xs={12} >
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} >
                  <MyGobackButton onGoback={() => dispatch(handleClear())} />
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
                    SUBIR IRCC
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
                  {
                    <MyButtonBacan label={'bajar IRCC'}
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
                  }
                  <MySaveButton onSave={() => {
                                  payload[section]=formValues
                                  setCounter(0)
                                  dispatch(handleSaveSolicitud(instanciaProceso?.id,payload))
                                }}
                                disabled={counter <= 0 || formValues.identificador === ''} />
                  <MySendButton onSend={() => {
                                  const metadata = JSON.stringify({
                                    "solicitudId": `${instanciaProceso?.solicitud?.id}`,
                                    "icrr": formValues.cuentaConIRCC,
                                  })
                                  dispatch(handCompletarTareaAndSalir(instanciaProceso.id, instanciaTarea, perfilUsuario.id, metadata))
                                }}
                                disabled={counter > 0 || formValues.pdf === ''}
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
