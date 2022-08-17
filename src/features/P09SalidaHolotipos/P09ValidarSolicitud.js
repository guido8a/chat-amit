import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {
  AppBar,
  Box,
  CssBaseline,
  Grid,
  Stack,
  Typography,
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
import {MyTextField} from "../../components/MyTextField";
import {MyAreaTextField} from "../../components/MyAreaTextField";
import {MySwitch} from "../../components/MySwitch";
import {MyUpload} from "../../components/MyUpload";
import {MyReabOnlyTableRecursos} from "../../components/MyReadOnlyTableRecursos";
import {MyTableMuestras} from "../../components/MyTableMuestras";
// import {MySelect} from "../../components/MySelect";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
// import {MyDatePicker} from "../../components/MyDatePicker";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import {MyReadOnlyAreaTextField} from "../../components/MyReadOnlyAreaTextField";

export default ({
                  instanciaTarea,
                  perfilUsuario,
                  instanciaProceso,
                  solicitud,
                  solicitudesAprobadas,
                  canEdit=true,
                  // atms=[],
                }) => {
  const slct = {...solicitud, payload : JSON.parse(solicitud.payload)}
  slct.payload.Solicitud.solicitudAprobada = JSON.parse(slct.payload.Solicitud.solicitudAprobada)
  const mp = slct.payload.Solicitud.solicitudAprobada
  const dispatch = useDispatch()
  const section = 'Validar'
  const payload = f.isValid(solicitud.payload)?JSON.parse(solicitud.payload):{}
  const today = format(new Date(), 'dd-MMMM-yyyy', {locale: es})
  const emptyPayload = {
    fecha:              today,
    requisito01:        false,
    requisito02:        false,
    requisito03:        false,
    requisito04:        false,
    requisito05:        false,
    cumpleRequisitos:   false,
    asunto:             '',
    detalle:            '',
  }

  const [formValues, setFormValues] = useState({...emptyPayload, ...payload[section]})

  useEffect(() => {
    if(formValues.cumpleRequisitos) {
      setFormValues({
        ...formValues,
        asunto:  'Validación de la Solicitud de salida de holotipos APROBADA',
        detalle: `Estimado/a ${mp.Solicitante.nombresCompletos},\n\n` +
          `Su solicitud realizada a través de la Ventanilla Única Virtual para la validación del ` +
          `Permiso de Salida de Holotipos con el Identificador: ${solicitud.numeroSolicitud} y correspondiente al ` +
          `proyecto titulado ${solicitud.nombreProyecto} HA SIDO ADMITIDO A TRÁMITA.\n\n` +
          'Saludos cordiales,\n\n' +
          `${perfilUsuario.usuario.nombreUsuario}`
      })
    } else {
      setFormValues({
        ...formValues,
        asunto:  'Validación de la Solicitud de salida de holotipos NEGADA',
        detalle: `Estimado/a ${mp.Solicitante.nombresCompletos},\n\n` +
          `Su solicitud realizada a través de la Ventanilla Única Virtual para la validación del ` +
          `Permiso de Salida de Holotipos con el Identificador: ${solicitud.numeroSolicitud} y correspondiente al ` +
          `proyecto titulado ${solicitud.nombreProyecto} NO HA SIDO ADMITIDO A TRÁMITA.\n\n` +
          'Saludos cordiales,\n\n' +
          `${perfilUsuario.usuario.nombreUsuario}`
      })
    }
  }, [formValues.cumpleRequisitos])

  const [counter, setCounter] = useState(-1)
  useEffect(() => {
    setCounter(counter + 1)
  }, [formValues])

  const [recursoSelected, setRecursoSelected] = useState({})

  const handleChange = (e) => API.handleChange2(e, canEdit, setFormValues, formValues)

  if(f.isValid(solicitudesAprobadas)) {
    return (
      <Box sx={accordeonBox.container}>
        <AppBar position='fixed'
                color='primary'
                elevation={0}
                sx={{top:'64px', bottom:'auto', margin: 0, padding:0, backgroundColor:'rgba(148, 193, 32, 0.8)'}} >
          <SectionTitle title={'Validación de solicitud de salida de holotipos'} />
        </AppBar>
        <Grid container spacing={1} sx={{...accordeonBox.container2, m:'2rem 0 4rem 0'}}>
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


          <Grid item xs={12} sx={dialog.titleContainer}>
            <MySubtitle subtitle={'Justificación de la salida del holotipo'} />
          </Grid>
          <Grid item xs={8} >
            <MyReadOnlyTextField id={'responsableEnvio'}
                                 label={'Responsable del envío *'}
                                 icon={<LocalShippingIcon sx={{fontSize: '14px', color:'silver', mr:'0.8rem'}}/>}
                                 value={slct.payload.Solicitud.responsableEnvio} />

          </Grid>
          <Grid item xs={2} />
          <Grid item xs={2} >
            <Box sx={{p:'0.9rem 1rem 0 0'}}>
              <MyReadOnlyTextField id={'fechaRetorno'}
                                   label={'Fecha estimada de retorno'}
                                   icon={<CalendarMonthIcon sx={{fontSize: '14px', color:'silver', mr:'0.8rem'}}/>}
                                   value={slct.payload.Solicitud.fechaRetorno} />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <MyReadOnlyAreaTextField id='justificacion'
                                     label={'Justificación de la salida *'}
                                     value={slct.payload.Solicitud.justificacion}
                                     icon={<ArticleOutlinedIcon sx={dialog.textFieldIcon}/>} />
          </Grid>
          <Grid item xs={12}>
            <Stack direction={'row'} spacing={1} justifyContent="space-between" alignItems='center' sx={{p:'0 0.6rem 0 0'}}>
              <MyUpload id={'certificadoDeposito'}
                        label={'Certificado de depósito'}
                        dir={instanciaProceso?.solicitud?.id}
                        canEdit={false}
                        formValues={slct.payload.Solicitud} />
              <Box sx={{p:'0 0 0 0'}}>
                <MySwitch id={'integridadHolotipo'}
                          label={'¿Se garantiza la integridad del holotipo en cuestión y su retorno en óptimas condiciones después del tiempo de salida establecido?'}
                          formValues={slct.payload.Solicitud}
                          canEdit={false} />
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={12} sx={dialog.titleContainer}>
            <MySubtitle subtitle={'Requisitos'} />
          </Grid>
          <Grid item xs={12} style={{padding:'0.5rem 0.6rem 0.5rem 0.6rem'}}>
            <MySwitch id={'requisito01'}
                      label={'req 01'}
                      formValues={formValues}
                      setFormValues={setFormValues}
                      handleChange={handleChange}
                      canEdit={canEdit}/>
          </Grid>
          <Grid item xs={12} style={{padding:'0.5rem 0.6rem 0.5rem 0.6rem'}}>
            <MySwitch id={'requisito02'}
                      label={'req 02'}
                      formValues={formValues}
                      handleChange={handleChange}
                      canEdit />
          </Grid>
          <Grid item xs={12} style={{padding:'0.5rem 0.6rem 0.5rem 0.6rem'}}>
            <MySwitch id={'requisito03'}
                      label={'req 03'}
                      formValues={formValues}
                      handleChange={handleChange}
                      canEdit />
          </Grid>
          <Grid item xs={12} style={{padding:'0.5rem 0.6rem 0.5rem 0.6rem'}}>
            <MySwitch id={'requisito04'}
                      label={'req 04'}
                      formValues={formValues}
                      handleChange={handleChange}
                      canEdit />
          </Grid>
          <Grid item xs={12} style={{padding:'0.5rem 0.6rem 0.5rem 0.6rem'}}>
            <MySwitch id={'requisito05'}
                      label={'req 05'}
                      formValues={formValues}
                      handleChange={handleChange}
                      canEdit />
          </Grid>
          <Grid item xs={12} style={{padding:'0.5rem 0.6rem 0.5rem 2rem'}}>
            <Stack direction={'row'} spacing={1} justifyContent="flex-end" alignItems='center' >
              <MySwitch id={'cumpleRequisitos'}
                        label={'¿La solicitud cumple con los Requisitos?'}
                        fullWidth={false}
                        formValues={formValues}
                        handleChange={handleChange}
                        canEdit />
            </Stack>
          </Grid>
          <Grid item xs={12} sx={dialog.titleContainer}>
            <MySubtitle subtitle={'Notificación'} />
          </Grid>
          <Grid item xs={12} style={{padding:'0 0 0 0.6rem'}}>
            <MyTextField id={'asunto'}
                         label={'Asunto *'}
                         formValues={formValues}
                         handleChange={handleChange}
                         canEdit={true} />
          </Grid>
          {
            formValues.asunto === ''?
              <Typography sx={common.warnig}>Asunto es obligatorio</Typography>
              :null
          }
          <Grid item xs={12} style={{padding:'0 0 0 0.6rem'}}>
            <MyAreaTextField id={'detalle'}
                             label={'Contenido *'}
                             formValues={formValues}
                             handleChange={handleChange}
                             canEdit={true} />
          </Grid>
          {
            formValues.detalle === ''?
              <Typography sx={common.warnig}>Contenido es obligatorio</Typography>
              :null
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
                        <MyButtonBacan label={'Guardar'} onClick={() => {
                                          const newPayload= {...payload ,[section]: {...formValues}}
                                          dispatch(handleSaveSolicitud(instanciaProceso?.id, newPayload))
                                          setCounter(0)
                                       }}
                                       disabled={counter <= 0}
                                       icon={SaveOutlinedIcon} />
                        <MySendButton disabled={counter > 0 ||
                                        formValues.asunto === '' ||
                                        formValues.detalle === ''
                                      }
                                      label={'enviar'}
                                      onSend={ () => {
                                        // {"cumpleRequisitos": true, "ampliacionInformacionSenescyt": true}
                                        const metadata = JSON.stringify({
                                          "solicitudId": `${instanciaProceso?.solicitud?.id}`,
                                          "cumpleRequisitos": formValues.cumpleRequisitos,
                                          "ampliacionInformacionSenescyt": false,
                                          "asunto": formValues.asunto,
                                          "detalle": formValues.detalle,
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
