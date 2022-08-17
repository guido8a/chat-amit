import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
  AppBar,
  Box,
  CssBaseline,
  Grid, InputAdornment, Stack, TextField,
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
import {MyReabOnlyTableRecursos} from 'src/components/MyReadOnlyTableRecursos'
import API from 'src/features/App/API'
import Toolbar from '@mui/material/Toolbar'
import {MyReadOnlyTextField} from "../../components/MyReadOnlyTextField";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Autorizacion from "src/features/P01Solicitud/subcomponents/Autorizacion";
import {MySelect} from "../../components/MySelect";
import {MyTextField} from "../../components/MyTextField";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import {paises} from 'src/features/P01Solicitud/CONF'
import {MyDatePicker} from "../../components/MyDatePicker";
import {MyAreaTextField} from "../../components/MyAreaTextField";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import ScienceIcon from '@mui/icons-material/Science';
import {MyTableMuestras} from "../../components/MyTableMuestras";
import {MySwitch} from "../../components/MySwitch";
import {MyUpload} from "../../components/MyUpload";
import {AccountCircle} from "@mui/icons-material";
// import {MyCheckBox} from "../../components/MyCheckBox";
// import {MyDate}

export default ({
                  instanciaTarea,
                  perfilUsuario,
                  instanciaProceso,
                  solicitud,
                  solicitudesAprobadas,
                  canEdit=true,
                  // atms=[],
                }) => {
  const dispatch = useDispatch()
  const section = 'Solicitud'
  const slct = {...solicitud, payload : JSON.parse(solicitud.payload)}
  slct.payload.Solicitud.solicitudAprobada = JSON.parse(slct.payload.Solicitud.solicitudAprobada)
  const mp = slct.payload.Solicitud.solicitudAprobada
  const payload = f.isValid(solicitud.payload)?JSON.parse(solicitud.payload):{}
  // const patrocinadores = useSelector(state => state.app.instituciones)
  // const mp =f.isValid(payload[section].solicitudAprobada)?JSON.parse(payload[section].solicitudAprobada):{}
  const today = format(new Date(), 'dd-MMMM-yyyy', {locale: es})
  const emptyPayload = {
    fecha:                       today,
    ubicacionOrigen:             '',
    ubicacionPais:               '',
    ubicacionInstitucion:        '',
    recursos:                    mp.Recursos.recursos,
    muestras:                    mp.Recursos.muestras,
    responsableEnvio:            '',
    fechaRetorno:                today,
    justificacion:               '',
    integridadHolotipo:          false,
    certificadoDeposito:         '',
    texto:
      `Yo, ${mp?.Solicitante?.nombresCompletos} portador del documento de identidad ${mp?.Solicitante?.cedula}, ' +
      'en calidad de solicitante, declaro bajo ` +
      'juramento que la información constante en la presente solicitud es verdadera y de mi absoluta ' +
      'responsabilidad. En caso de omitir información, así como en caso de forzar, falsificar, modificar, alterar o ' +
      'introducir cualquier información falsa o corregir el presente documento, asumo toda la responsabilidad ' +
      'administrativa, civil o penal conforme lo establecido por ley.\n\n' +
      'Atención: Por favor revise la información del registro de la solicitud, si está seguro que los datos son ' +
      'correctos acepte y declare la veracidad de toda la información detallada en la presente solicitud y envíe ' +
      'la misma; caso contrario, cierre esta ventana y realice los cambios a través del botón guardar.',
    si: false,
  }

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
          <SectionTitle title={'Solicitud de salida de holotipos'} />
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
                                 value={formValues['fecha']} />
          </Grid>
          <Solicitante solicitud={{solicitud: {payload: mp}}} displayContact={false}/>
          <Autorizacion solicitud={{numeroSolicitud: formValues.aprobadaIdentificador, payload: mp}} />

          <Grid item xs={12} sx={dialog.titleContainer}>
            <MySubtitle subtitle={'Ubicación'}/>
          </Grid>
          <Grid item xs={12}>
            <MySelect id={'ubicacionOrigen'}
                      width={'40rem'}
                      label={'Origen *'}
                      formValues={formValues}
                      setFormValues={setFormValues}
                      canEdit={canEdit}
                      data={mp?.Recursos?.laboratorios} />
          </Grid>
          <Grid item xs={6}>
            <MySelect id={'ubicacionPais'}
                      width={'40rem'}
                      label={'Pais destino *'}
                      formValues={formValues}
                      setFormValues={setFormValues}
                      canEdit={canEdit}
                      data={paises} />
          </Grid>
          <Grid item xs={6}>
            <MyTextField id={'ubicacionInstitucion'}
                         label={'Institución *'}
                         formValues={formValues}
                         setFormValues={setFormValues}
                         icon={<ScienceIcon sx={{fontSize: '14px', color:'silver'}}/>}
                         canEdit={canEdit}
                         handleChange={handleChange} />
          </Grid>

          <Grid item xs={12} sx={dialog.titleContainer}>
            <MySubtitle subtitle={'Recursos'}/>
          </Grid>
          <Grid item xs={12} >
            <MyReabOnlyTableRecursos rows={formValues.recursos}
                                     setRecursoSelected={setRecursoSelected}
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
                                   muestras={formValues.muestras}
                                   formValues={formValues}
                                   setFormValues={setFormValues}
                                   mode={'permisoExportacion'}
                                   selected={recursoSelected} />
                </Grid>
              </>:null
          }

          <Grid item xs={12} sx={dialog.titleContainer}>
            <MySubtitle subtitle={'Justificación de la salida del holotipo'} />
          </Grid>
          <Grid item xs={8} >
            <MySelect id={'responsableEnvio'}
                      label={'Responsable del envío *'}
                      data={mp?.Personal?.personal?.map(it => it.nombre)}
                      formValues={formValues}
                      setFormValues={setFormValues}
                      icon={<LocalShippingIcon sx={{fontSize: '14px', color:'silver'}}/>}
                      canEdit={canEdit} />
          </Grid>
          <Grid item xs={2} />
          <Grid item xs={2} >
            <Box sx={{p:'0.9rem 1rem 0 0'}}>
              <MyDatePicker id={'fechaRetorno'}
                            setFormValues={setFormValues}
                            formValues={formValues}
                            canEdit={canEdit}
                            label={'Fecha estimada de retorno'} />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <MyAreaTextField id='justificacion'
                             label={'Justificación de la salida *'}
                             formValues={formValues}
                             icon={<ArticleOutlinedIcon sx={dialog.textFieldIcon}/>}
                             canEdit={canEdit}
                             handleChange={(e) => {
                               if(canEdit) {
                                 setFormValues({...formValues, justificacion: e.target.value})
                               }
                             }} />
          </Grid>
          <Grid item xs={12}>
            <Stack direction={'row'} spacing={1} justifyContent="space-between" alignItems='center' sx={{p:'0 2rem 0 0'}}>
              <MyUpload id={'certificadoDeposito'}
                        label={'Certificado de depósito'}
                        dir={instanciaProceso?.solicitud?.id}
                        canEdit={canEdit}
                        formValues={formValues}
                        setFormValues={setFormValues} />
              <Box sx={{p:'3rem 0 0 0'}}>
                <MySwitch id={'integridadHolotipo'}
                          label={'¿Se garantiza la integridad del holotipo en cuestión y su retorno en óptimas condiciones después del tiempo de salida establecido?'}
                          formValues={formValues}
                          setFormValues={setFormValues}
                          canEdit={canEdit}
                          handleChange={handleChange} />
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={12} sx={dialog.titleContainer}>
            <MySubtitle subtitle={'Declaración de veracidad de la información'}/>
          </Grid>
          <Grid item xs={12}>
            <TextField id='texto'
                       multiline
                       rows={10}
                       value={formValues.texto}
                       fullWidth
                       variant='standard'
                       aria-readonly={true}
                       sx={dialog.textTypography}
                       InputProps={{
                         disableUnderline: true,
                         sx: {
                           fontSize: '12px',
                           backgroundColor: 'transparent',
                         }
                       }}
                       InputLabelProps={{
                         sx: {
                           fontSize: '14px',
                         }
                       }} />
          </Grid>
          <Grid item xs={12} sx={{pr:'2rem'}}>
            <MySwitch id={'si'}
                      label={'¿Aceptar y enviar?'}
                      formValues={formValues}
                      setFormValues={setFormValues}
                      canEdit={canEdit}
                      fullWidth={false}
                      handleChange={handleChange} />
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
                        <MyButtonBacan label={'Guardar'} onClick={() => {
                                         const newPayload= {...payload ,[section]: {...formValues}}
                                         dispatch(handleSaveSolicitud(instanciaProceso?.id, newPayload))
                                         setCounter(0)
                                       }}
                                       disabled={counter <= 0}
                                       icon={SaveOutlinedIcon} />
                        <MySendButton disabled={counter > 0 ||
                                        formValues.ubicacionOrigen === '' ||
                                        formValues.ubicacionPais === '' ||
                                        formValues.ubicacionInstitucion === '' ||
                                        formValues.certificadoDeposito === '' ||
                                        formValues.responsableEnvio === '' ||
                                        formValues.justificacion === '' ||
                                        formValues.si === false
                                      }
                                      label={'enviar'}
                                      onSend={ () => {
                                        const metadata = JSON.stringify({"solicitudId": `${instanciaProceso?.solicitud?.id}`,})
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
