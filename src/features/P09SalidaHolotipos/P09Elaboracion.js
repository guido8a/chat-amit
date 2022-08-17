import React, {useEffect, useRef, useState} from 'react'
import {useDispatch} from 'react-redux'
import {
  AppBar,
  Box,
  CssBaseline,
  Grid, Stack,
} from '@mui/material'
import {format} from 'date-fns'
import {es} from 'date-fns/locale'
import {accordeonBox, dialog} from 'src/styles/styles'
import {handCompletarTareaAndSalir, handleClear, handleSaveSolicitud} from 'src/features/App/sliceApp'
import {SectionTitle} from 'src/components/SectionTitle'
import {MySubtitle} from 'src/components/MySubtitle'
import {f} from 'src/commons/f'
import {MyButtonBacan} from 'src/components/MyButtonBacan'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import {MySendButton} from 'src/components/MySendButton'
import {Solicitante} from 'src/features/P01Solicitud/subcomponents/Solicitante'
import Toolbar from '@mui/material/Toolbar'
import {MyReadOnlyTextField} from "../../components/MyReadOnlyTextField";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Autorizacion from "src/features/P01Solicitud/subcomponents/Autorizacion";
import {MySwitch} from "../../components/MySwitch";
// import {MyUpload} from "../../components/MyUpload";
import {MyReabOnlyTableRecursos} from "../../components/MyReadOnlyTableRecursos";
import {MyTableMuestras} from "../../components/MyTableMuestras";
import {AccountCircle, Badge} from "@mui/icons-material";
// import {MyReadOnlyAreaTextField} from "../../components/MyReadOnlyAreaTextField";
import GLOBALS from "../App/globals";
import API from "../App/API";
import {MyAreaTextField} from "../../components/MyAreaTextField";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import Button from "@mui/material/Button";
import RobotoCondensedRegular from "../../styles/MyFonts/Roboto_Condensed/RobotoCondensed-Regular.ttf";
import UploadIcon from '@mui/icons-material/Upload'

export default ({
                  instanciaTarea,
                  perfilUsuario,
                  instanciaProceso,
                  solicitud,
                  solicitudesAprobadas,
                  canEdit=true,
                }) => {
  const inputRef = useRef()
  const slct = {...solicitud, payload : JSON.parse(solicitud.payload)}
  slct.payload.Solicitud.solicitudAprobada = JSON.parse(slct.payload.Solicitud.solicitudAprobada)
  const mp = slct.payload.Solicitud.solicitudAprobada
  const dispatch = useDispatch()
  const section = 'Elaboracion'
  const payload = f.isValid(solicitud.payload)?JSON.parse(solicitud.payload):{}
  const today = format(new Date(), 'dd-MMMM-yyyy', {locale: es})
  const emptyPayload = {
    fecha:       today,
    contenido:   '',
    pdf:         '',
  }
  const nombreOrganizacion = perfilUsuario?.perfil?.organizacion?.nombreOrganizacion

  // console.log(' - - - -  > > > > nombreOrganizacion :: ', nombreOrganizacion)

  // console.log('- - - - > > > slct :: ', slct.payload.DictamenTecnico.informeFavorable)

  const [formValues, setFormValues] = useState({...emptyPayload,...payload[section]})

  const [counter, setCounter] = useState(-1)
  useEffect(() => {
    setCounter(counter + 1)
  }, [formValues])

  const [recursoSelected, setRecursoSelected] = useState({})

  const handleChange = (e) => API.handleChange(e, 'entrada', setFormValues, formValues)

  if(f.isValid(solicitudesAprobadas)) {
    return (
      <Box sx={accordeonBox.container}>
        <AppBar position='fixed'
                color='primary'
                elevation={0}
                sx={{top:'64px', bottom:'auto', margin: 0, padding:0, backgroundColor:'rgba(148, 193, 32, 0.8)'}} >
          {
            (instanciaTarea.tareaCodigoTarea === "55000010_Activity_ElaborarAprobacionAutorizacionWF09")?
              <SectionTitle title={'Elaboración Autorización de salida de holotipos'} />:
              <SectionTitle title={'Elaboración Negación de salida de holotipos'} />
          }
        </AppBar>
        <Grid container spacing={1} sx={{...accordeonBox.container2, m:'2rem 0 4rem 0'}}>
          <Grid item xs={12} sx={dialog.titleContainer}>
            <MySubtitle subtitle={'Solicitud'} />
          </Grid>
          <Grid item xs={6} >
            <MyReadOnlyTextField label={'Identificador'}
                                 icon={<BorderColorIcon fontSize={'1rem'} sx={{color:'silver', m:'0 0.8rem 0 0'}}/>}
                                 value={solicitud.numeroSolicitud} />
          </Grid>
          <Grid item xs={6} >
            <MyReadOnlyTextField label={'Fecha'}
                                 icon={<CalendarMonthIcon fontSize={'1rem'} sx={{color:'silver', m:'0 0.8rem 0 0'}}/>}
                                 value={slct.payload.Solicitud['fecha']} />
          </Grid>

          <Solicitante solicitud={{solicitud: {payload: mp}}} displayContact={false}/>

          <Autorizacion solicitud={{numeroSolicitud: formValues.aprobadaIdentificador, payload: mp}} />

          <Grid item xs={12} sx={dialog.titleContainer}>
            <MySubtitle subtitle={'Recursos'}/>
          </Grid>
          <Grid item xs={12} >
            <MyReabOnlyTableRecursos rows={slct.payload.Solicitud.recursos}
                                     setRecursoSelected={setRecursoSelected}
                                     canEdit={false}
                                     reduced={true} />
          </Grid>
          {
            f.isValid(recursoSelected.taxonid)?
              <>
                <Grid item xs={12} sx={dialog.titleContainer}>
                  <MySubtitle subtitle={'Muestras y submuestras'} />
                </Grid>
                <Grid item xs={12}>
                  {recursoSelected.scientificname}
                </Grid>
                <Grid item xs={12}>
                  <MyTableMuestras id={'muestras'}
                                   muestras={slct.payload.Solicitud.muestras}
                                   formValues={slct.payload.Solicitud}
                                   mode={'permisoExportacion'}
                                   selected={recursoSelected} />
                </Grid>
              </>:null
          }

          <Grid item xs={12} sx={dialog.titleContainer}>
            <MySubtitle subtitle={'Dictamen Técnico'} />
          </Grid>
          <Grid item xs={12} sx={{p:'1rem 0 1rem 0'}}>
            <Stack direction={'row'} spacing={1} justifyContent="space-between" alignItems='center' sx={{p:'0 2rem 0 0'}}>
              <MyReadOnlyTextField id='identificador'
                                   label={'Identificador'}
                                   value={solicitud.numeroSolicitud}
                                   icon={<AccountCircle sx={{fontSize: '14px', color:'silver', mr:'0.8rem'}}/>} />
              <MyReadOnlyTextField id='fecha'
                                   label={'Fecha'}
                                   value={format(new Date(formValues.fecha),'dd-MMMM-yyyy',{locale:es})}
                                   icon={<Badge sx={{fontSize: '14px', color:'silver', mr:'0.8rem'}}/>} />
              <MyButtonBacan label={'Ver PDF'}
                             onClick={() => {
                               const url = `${GLOBALS.mainUrl}/documentos/descargar?filename=vuv-${instanciaProceso?.solicitud?.id}/DT-Maate/${slct.payload.DictamenTecnico.pdf}`
                               fetch(url)
                                 .then((res) => { return res.blob(); })
                                 .then((data) => {
                                   const dataPdf = new Blob([data], { type: 'application/pdf' })
                                   const a = document.createElement("a")
                                   a.href = window.URL.createObjectURL(dataPdf)
                                   a.target="_blank"
                                   a.click()
                                 })
                             }} />
            </Stack>
          </Grid>
          <Grid item xs={12} sx={dialog.titleContainer}>
            {
              (instanciaTarea.tareaCodigoTarea === "55000010_Activity_ElaborarAprobacionAutorizacionWF09")?
                <MySubtitle subtitle={'Autorización'} />:
                <MySubtitle subtitle={'Negación'} />
            }
          </Grid>
          <Grid item xs={12} sx={{p:'1rem 0 1rem 0'}}>
            <Stack direction={'row'} spacing={1} justifyContent="space-between" alignItems='center' sx={{p:'0 2rem 0 0'}}>
              <MySwitch id={'informeFavorable'}
                        label={'¿El Informe Técnico es favorable?'}
                        fullWidth={false}
                        formValues={slct.payload.DictamenTecnico}
                        canEdit={false} />
              <MyButtonBacan label={'Plantilla'} onClick={() => {alert('P l a n t i l l a   p e n d i e n t e . . .')}} />
            </Stack>
          </Grid>
          <Grid item xs={12} style={{padding:'0 0 0 0.4rem'}}>
            <MyAreaTextField id={'contenido'}
                             label={'Contenido *'}
                             formValues={formValues}
                             handleChange={handleChange}
                             canEdit={false} />
          </Grid>
        </Grid>
        <CssBaseline/>
        <AppBar position='fixed' color='primary' elevation={0} sx={accordeonBox.bottomBar}>
          <Toolbar>
            <Grid container sx={{p:0, mt:'-1rem'}}>
              <Grid item xs={12} >
                <Stack direction={'row'} spacing={1} justifyContent="space-between" alignItems='center' sx={{p:'0 2rem 0 3rem'}}>
                  {
                    (canEdit)?
                      <>
                        <MyButtonBacan label={'Regresar'}
                                       icon={ArrowBackIcon}
                                       onClick={() => {
                                         if(counter <= 2) {
                                           dispatch(handleClear())
                                         } else {
                                           alert('Debe GUARDAR los cambios realizados')
                                         }
                                       }} />
                        <MyButtonBacan label={'generar PDF'}
                                       onClick={() => {
                                         API.fetchGenerarPDF(instanciaProceso?.solicitud?.id, `EL-${nombreOrganizacion}`,`dictamen_tecnico_${nombreOrganizacion}`,formValues.contenido)
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
                                         const url = `${GLOBALS.mainUrl}/documentos/descargar?filename=vuv-${instanciaProceso?.solicitud?.id}/EL-${nombreOrganizacion}/${formValues.pdf}`
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
                                   formData.append('subFolder', `EL-${nombreOrganizacion}`)
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
                        <MyButtonBacan label={'Guardar'} onClick={() => {
                                         const newPayload= {...payload ,[section]: {...formValues}}
                                         dispatch(handleSaveSolicitud(instanciaProceso?.id, newPayload))
                                         setCounter(0)
                                       }}
                                       disabled={counter <= 0}
                                       icon={SaveOutlinedIcon} />
                        <MySendButton disabled={counter > 0 || formValues.contenido === ''}
                                      label={(instanciaTarea.tareaCodigoTarea === "55000010_Activity_ElaborarAprobacionAutorizacionWF09")?'aprobar':'negar'}
                                      onSend={ () => {
                                        const metadata = JSON.stringify({
                                          "solicitudId": `${instanciaProceso?.solicitud?.id}`,
                                          "informeFavorable": formValues.informeFavorable,
                                        })
                                        dispatch(handCompletarTareaAndSalir(instanciaProceso.id, instanciaTarea, perfilUsuario.id, metadata))
                                      }} />
                      </>
                      :
                      <Grid item xs={4} style={{padding:'0 24px 0 0'}}>
                        <MyButtonBacan label={'Regresar'}
                                       icon={ArrowBackIcon}
                                       onClick={() => dispatch(handleClear())} />
                      </Grid>
                  }
                </Stack>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
    )
  }
  else return null
}
