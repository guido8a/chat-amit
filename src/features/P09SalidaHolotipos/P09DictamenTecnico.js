import React, {useEffect, useRef, useState} from 'react'
import {useDispatch} from 'react-redux'
import {
  AppBar,
  Box,
  CssBaseline,
  Grid, Stack, Typography,
} from '@mui/material'
import {format} from 'date-fns'
import {es} from 'date-fns/locale'
import {accordeonBox, common, dialog} from 'src/styles/styles'
import {handCompletarTareaAndSalir, handleClear, handleSaveSolicitud} from 'src/features/App/sliceApp'
import {SectionTitle} from 'src/components/SectionTitle'
import {MySubtitle} from 'src/components/MySubtitle'
import {f} from 'src/commons/f'
import {MyButtonBacan} from 'src/components/MyButtonBacan'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import {MySendButton} from 'src/components/MySendButton'
import {Solicitante} from 'src/features/P01Solicitud/subcomponents/Solicitante'
import API from 'src/features/App/API'
import Toolbar from '@mui/material/Toolbar'
import {MyReadOnlyTextField} from "../../components/MyReadOnlyTextField";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Autorizacion from "src/features/P01Solicitud/subcomponents/Autorizacion";
import {MyAreaTextField} from "../../components/MyAreaTextField";
import {MySwitch} from "../../components/MySwitch";
import {MyUpload} from "../../components/MyUpload";
import {MyReabOnlyTableRecursos} from "../../components/MyReadOnlyTableRecursos";
import {MyTableMuestras} from "../../components/MyTableMuestras";
import {AccountCircle, Badge} from "@mui/icons-material";
import {MyReadOnlyAreaTextField} from "../../components/MyReadOnlyAreaTextField";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import GLOBALS from "../App/globals";
import RobotoCondensedRegular from "../../styles/MyFonts/Roboto_Condensed/RobotoCondensed-Regular.ttf";
import UploadIcon from "@mui/icons-material/Upload";
import Button from "@mui/material/Button";

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
  const section = 'DictamenTecnico'
  const payload = f.isValid(solicitud.payload)?JSON.parse(solicitud.payload):{}
  const today = format(new Date(), 'dd-MMMM-yyyy', {locale: es})
  const emptyPayload = {
    fecha:              today,
    dictamenTecnico:    '',
    informeFavorable:   false,
    pdf:                '',
    pdfGenerado:        false,
  }
  const nombreOrganizacion = perfilUsuario?.perfil?.organizacion?.nombreOrganizacion

  const [formValues, setFormValues] = useState({...emptyPayload,...payload[section]})

  const [counter, setCounter] = useState(-1)
  useEffect(() => {
    setCounter(counter + 1)
  }, [formValues])

  const [recursoSelected, setRecursoSelected] = useState({})

  const defaultHandleChange4Switch = (
    event,
    value,
    canEdit,
    setFormValues,
    formValues
  ) => {
    if(canEdit) {
      setFormValues({...formValues, [event.target.id]: value})
    }
  }

  const handleChange = (e) => API.handleChange2(e, canEdit, setFormValues, formValues)

  if(f.isValid(solicitudesAprobadas)) {
    return (
      <Box sx={accordeonBox.container}>
        <AppBar position='fixed'
                color='primary'
                elevation={0}
                sx={{top:'64px', bottom:'auto', margin: 0, padding:0, backgroundColor:'rgba(148, 193, 32, 0.8)'}} >
          <SectionTitle title={'Dictamen Técnico'} />
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

          <Solicitante solicitud={{solicitud: {payload: mp}}} displayContact={false} />

          <Autorizacion solicitud={{numeroSolicitud: formValues.aprobadaIdentificador, payload: mp}} />

          <Grid item xs={12} sx={dialog.titleContainer}>
            <MySubtitle subtitle={'Ubicación'}/>
          </Grid>
          <Grid item xs={12}>
            <MyReadOnlyTextField id={'ubicacionOrigen'}
                                 label={'Origen'}
                                 value={slct.payload.Solicitud.ubicacionOrigen} />
          </Grid>
          <Grid item xs={6}>
            <MyReadOnlyTextField id={'ubicacionPais'}
                                 label={'Origen'}
                                 value={slct.payload.Solicitud.ubicacionPais} />
          </Grid>
          <Grid item xs={6}>
            <MyReadOnlyTextField id={'ubicacionInstitucion'}
                                 label={'Origen'}
                                 value={slct.payload.Solicitud.ubicacionInstitucion} />
          </Grid>
          <Grid item xs={12}>
            <MyUpload id={'certificadoDeposito'}
                      label={'Certificado de depósito'}
                      dir={instanciaProceso?.solicitud?.id}
                      canEdit={false}
                      formValues={slct.payload.Solicitud} />
          </Grid>
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
          {/*<Grid item xs={12} sx={dialog.titleContainer}>*/}
          {/*  <MySubtitle subtitle={'Requisitos'} />*/}
          {/*</Grid>*/}
          {/*<Grid item xs={6} style={{padding:'0.5rem 2rem 0.5rem 1rem'}}>*/}
          {/*  <MySwitch id={'requisito01'}*/}
          {/*            label={'req 01'}*/}
          {/*            formValues={slct.payload.Validar}*/}
          {/*            canEdit={false} />*/}
          {/*</Grid>*/}
          {/*<Grid item xs={6} style={{padding:'0.5rem 2rem 0.5rem 1rem'}}>*/}
          {/*  <MySwitch id={'requisito02'}*/}
          {/*            label={'req 02'}*/}
          {/*            formValues={slct.payload.Validar}*/}
          {/*            canEdit={false} />*/}
          {/*</Grid>*/}
          {/*<Grid item xs={6} style={{padding:'0.5rem 2rem 0.5rem 1rem'}}>*/}
          {/*  <MySwitch id={'requisito03'}*/}
          {/*            label={'req 03'}*/}
          {/*            formValues={slct.payload.Validar}*/}
          {/*            canEdit={false} />*/}
          {/*</Grid>*/}
          {/*<Grid item xs={6} style={{padding:'0.5rem 2rem 0.5rem 1rem'}}>*/}
          {/*  <MySwitch id={'requisito04'}*/}
          {/*            label={'req 04'}*/}
          {/*            formValues={slct.payload.Validar}*/}
          {/*            canEdit={false} />*/}
          {/*</Grid>*/}
          {/*<Grid item xs={6} style={{padding:'0.5rem 2rem 0.5rem 1rem'}}>*/}
          {/*  <MySwitch id={'requisito05'}*/}
          {/*            label={'req 05'}*/}
          {/*            formValues={slct.payload.Validar}*/}
          {/*            canEdit={false} />*/}
          {/*</Grid>*/}
          {/*<Grid item xs={12} style={{padding:'0.5rem 2rem 0.5rem 1rem'}}>*/}
          {/*  <Stack direction={'row'} spacing={1} justifyContent='flex-end' alignItems='center' >*/}
          {/*    <MySwitch id={'cumpleRequisitos'}*/}
          {/*              label={'¿Cumple requisitos?'}*/}
          {/*              fullWidth={false}*/}
          {/*              formValues={slct.payload.Validar}*/}
          {/*              canEdit={false} />*/}
          {/*  </Stack>*/}
          {/*</Grid>*/}
          <Grid item xs={12} sx={dialog.titleContainer}>
            <MySubtitle subtitle={'Informe Técnico'} />
          </Grid>
          <Grid item xs={12} sx={{p:'1rem 0 1rem 0'}}>
            <Stack direction={'row'} spacing={1} justifyContent="space-between" alignItems='center' sx={{p:'0 2rem 0 0'}}>
              <MyReadOnlyTextField id='identificador'
                                   label={'Identificador'}
                                   value={slct.payload.InformeTecnicoMAATE }
                                   icon={<AccountCircle sx={{fontSize: '14px', color:'silver', mr:'0.8rem'}} />} />
              <MyReadOnlyTextField id='fecha'
                                   label={'Fecha'}
                                   value={format(new Date(slct.payload.InformeTecnicoMAATE.fecha),'dd-MMMM-yyyy',{locale:es})}
                                   icon={<Badge sx={{fontSize: '14px', color:'silver', mr:'0.8rem'}} />} />
            </Stack>
          </Grid>
          <Grid item xs={12} style={{padding:'0 2rem 0 1rem'}}>
            <MyReadOnlyAreaTextField id={'informeTecnico'}
                                     label={'Contenido *'}
                                     value={slct.payload.InformeTecnicoMAATE.informeTecnico} />
          </Grid>

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
              <MyButtonBacan label={'Plantilla'} />
            </Stack>
          </Grid>
          <Grid item xs={12} style={{padding:'0.5rem 0 0.5rem 1rem'}}>
            <Stack direction={'row'} spacing={1} justifyContent='flex-end' alignItems='center' >
              <MySwitch id={'informeFavorable'}
                        label={'¿Dictamen técnico favorable?'}
                        fullWidth={false}
                        formValues={formValues}
                        handleChange={defaultHandleChange4Switch}
                        setFormValues={setFormValues}
                        canEdit={canEdit} />
            </Stack>
          </Grid>
          <Grid item xs={12} style={{padding:'0 1rem 0 1rem'}}>
            <MyAreaTextField id={'dictamenTecnico'}
                             label={'Contenido *'}
                             formValues={formValues}
                             rows={10}
                             handleChange={handleChange}
                             canEdit={true} />
          </Grid>
          {
            formValues.detalle === ''?
              <Typography sx={common.warnig}>Contenido es obligatorio</Typography>
              :null
          }
          {
            !formValues.pdfGenerado ?
              <Grid item xs={12} style={{padding: '0 24px 0 32px'}}>
                <Typography>Falta generar PDF</Typography>
              </Grid> : null
          }
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
                                         API.fetchGenerarPDF(instanciaProceso?.solicitud?.id, `DT-${nombreOrganizacion}`,`dictamen_tecnico_${nombreOrganizacion}`,formValues.dictamenTecnico)
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
                        <MyButtonBacan label={'Guardar'} onClick={() => {
                                         const newPayload= {...payload ,[section]: {...formValues}}
                                         dispatch(handleSaveSolicitud(instanciaProceso?.id, newPayload))
                                         setCounter(0)
                                       }}
                                       disabled={counter <= 0}
                                       icon={SaveOutlinedIcon} />
                        <MySendButton disabled={counter > 0 ||
                                        formValues.detalle === '' ||
                                        formValues.pdf === '' ||
                                        !formValues.pdfGenerado
                                      }
                                      label={'enviar'}
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
