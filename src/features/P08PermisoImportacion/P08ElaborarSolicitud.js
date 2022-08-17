import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
  AppBar,
  Box,
  CssBaseline,
  Grid,
  InputAdornment,
  TextField,
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
import {MyTableMuestrasCantidad} from 'src/features/P10ATM/subcomponents/MyTableMuestrasCantidad'
import API from 'src/features/App/API'
import Toolbar from '@mui/material/Toolbar'
import {AccountCircle, Email, PhoneInTalk, Smartphone} from "@mui/icons-material";
import {MyCheckBox} from "../../components/MyCheckBox";
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
import {MyUpload} from "../../components/MyUpload";
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
  const payload = f.isValid(solicitud.payload)?JSON.parse(solicitud.payload):{}
  const patrocinadores = useSelector(state => state.app.instituciones)

  const mp =f.isValid(payload[section].solicitudAprobada)?JSON.parse(payload[section].solicitudAprobada):{}

  const today = format(new Date(), 'dd-MMMM-yyyy', {locale: es})
  const emptyPayload = {
    fecha: today,
    aprobadaIdentificador:       '',
    solicitudAprobada:           {},
    documentoIdentificador:      '',
    documentoFecha:              today,
    documentoObjetivo:           '',
    permisoImportacion:          '',

    identificacionAutorizacion:  '',
    pais:                        '',
    institucion:                 '',

    responsableImportacion:      '',
    responsableCedula:           '',
    responsableContacto:         '',
    responsableCorreo:           '',
    laboratorio:                 '',
    recursos:                    mp.Recursos.recursos,
    muestras:                    mp.Recursos.muestras,
    texto:
      `Yo, ${mp?.Solicitante?.nombresCompletos} portador del documento de identidad ${mp?.Solicitante?.cedula}, en calidad de solicitante, declaro bajo ` +
      'juramento que la información constante en la presente solicitud es verdadera y de mi absoluta ' +
      'responsabilidad. En caso de omitir información, así como en caso de forzar, falsificar, modificar, alterar o ' +
      'introducir cualquier información falsa o corregir el presente documento, asumo toda la responsabilidad ' +
      'administrativa, civil o penal conforme lo establecido por ley.\n\n'+
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

  const handleChangePhone = (e) => {
    if(e.target.value === '' || f.isPhone(e.target.value))
      API.handleChange(e, canEdit?'entrada':'*', setFormValues, formValues)
  }

  if(f.isValid(solicitudesAprobadas)) {
    return (
      <Box sx={accordeonBox.container}>
        <AppBar position='fixed'
                color='primary'
                elevation={0}
                sx={{top:'64px', bottom:'auto', margin: 0, padding:0, backgroundColor:'rgba(148, 193, 32, 0.8)'}} >
          <SectionTitle title={'Permiso de Importacion'} />
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
                                 value={formValues['fecha']} />
          </Grid>
          <Solicitante solicitud={{payload: formValues.solicitudAprobada}} />
          <Autorizacion solicitud={{numeroSolicitud: formValues.aprobadaIdentificador, payload: formValues.solicitudAprobada}} />
          {/*permisoImportacion:     '',*/}
          <Grid item xs={12} sx={dialog.titleContainer}>
            <MySubtitle subtitle={'Documento habilitante'}/>
          </Grid>
          <Grid item xs={8}>
            <MyTextField id={'documentoIdentificador'}
                         label={'Identificador'}
                         formValues={formValues}
                         setFormValues={setFormValues}
                         icon={<LocalShippingIcon sx={{fontSize: '14px', color:'silver'}}/>}
                         canEdit={canEdit}
                         handleChange={handleChange} />
          </Grid>
          <Grid item xs={4}>
              <MyDatePicker id={'documentoFecha'}
                            label={'Fecha'}
                            formValues={formValues}
                            setFormValues={setFormValues} />
          </Grid>
          <Grid item xs={12}>
            <MyAreaTextField id='documentoObjetivo'
                             label={'Objetivo de la importación'}
                             formValues={formValues}
                             icon={<ArticleOutlinedIcon sx={dialog.textFieldIcon}/>}
                             canEdit={canEdit}
                             handleChange={(e) => {
                               if(canEdit) {
                                 setFormValues({...formValues, documentoObjetivo: e.target.value})
                               }
                             }} />
          </Grid>
          <Grid item xs={12}>
            <MyUpload id={'permisoImportacion'}
                      label={'Permiso de importación:'}
                      dir={instanciaProceso?.solicitud?.id}
                      canEdit={canEdit}
                      formValues={formValues}
                      setFormValues={setFormValues} />
          </Grid>

          <Grid item xs={12} sx={dialog.titleContainer}>
            <MySubtitle subtitle={'Origen del recurso'}/>
          </Grid>
          <Grid item xs={12}>
            <MyTextField id={'identificacionAutorizacion'}
                         width={'40rem'}
                         label={'Identificador de autorización de colecta/investigación'}
                         formValues={formValues}
                         setFormValues={setFormValues}
                         canEdit={canEdit} />
          </Grid>
          <Grid item xs={12}>
            <MySelect id={'pais'}
                      width={'40rem'}
                      label={'Pais *'}
                      formValues={formValues}
                      setFormValues={setFormValues}
                      canEdit={canEdit}
                      data={paises} />
          </Grid>
          <Grid item xs={12}>
            <MyTextField id={'institucion'}
                         width={'40rem'}
                         label={'institucion *'}
                         formValues={formValues}
                         setFormValues={setFormValues}
                         canEdit={canEdit} />
          </Grid>
          <Grid item xs={12} sx={dialog.titleContainer}>
            <MySubtitle subtitle={'Responsables'} />
          </Grid>
          <Grid item xs={12} >
            <MyTextField id={'responsableImportacion'}
                         label={'Responsable de la Transportación'}
                         formValues={formValues}
                         setFormValues={setFormValues}
                         icon={<LocalShippingIcon sx={{fontSize: '14px', color:'silver'}}/>}
                         canEdit={canEdit}
                         handleChange={handleChange} />
          </Grid>
          <Grid item xs={4}>
            <MyTextField id={'responsableCedula'}
                         label={'Cédula'}
                         formValues={formValues}
                         setFormValues={setFormValues}
                         icon={<Smartphone sx={{fontSize: '14px', color:'silver'}}/>}
                         canEdit={canEdit}
                         handleChange={handleChangePhone}/>
          </Grid>
          <Grid item xs={4}>
            <MyTextField id={'responsableContacto'}
                         label={'Número de Contacto'}
                         formValues={formValues}
                         setFormValues={setFormValues}
                         icon={<PhoneInTalk sx={{fontSize: '14px', color:'silver'}}/>}
                         canEdit={canEdit}
                         handleChange={handleChangePhone}/>
          </Grid>
          <Grid item xs={4}>
            <MyTextField id={'responsableCorreo'}
                         label={'Correo Electrónico'}
                         formValues={formValues}
                         setFormValues={setFormValues}
                         icon={<Email sx={{fontSize: '14px', color:'silver'}}/>}
                         canEdit={canEdit}
                         handleChange={handleChange}/>
          </Grid>
          <Grid item xs={12} sx={dialog.titleContainer}>
            <MySubtitle subtitle={'Destino'}/>
          </Grid>
          <MySelect id={'laboratorio'}
                    width={'40rem'}
                    label={'Destino Final *'}
                    formValues={formValues}
                    setFormValues={setFormValues}
                    data={mp.Recursos.laboratorios} />
          <Grid item xs={12} sx={dialog.titleContainer}>
            <MySubtitle subtitle={'Recursos'}/>
          </Grid>
          <Grid item xs={12} >
            <MyReabOnlyTableRecursos rows={formValues.recursos}
                                     setRecursoSelected={setRecursoSelected}
                                     reduced={true}/>
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
                  <MyTableMuestrasCantidad id={'muestras'}
                                           muestras={formValues.muestras}
                                           formValues={formValues}
                                           setFormValues={setFormValues}
                                           selected={recursoSelected} />
                </Grid>
              </>:null
          }
          <Grid item xs={12}>
            <TextField id='nombres'
                       multiline
                       rows={10}
                       value={formValues.texto}
                       fullWidth
                       variant='standard'
                       aria-readonly={true}
                       sx={dialog.textTypography}
                       InputProps={{
                         disableUnderline: true,
                         startAdornment:(
                           <InputAdornment position="start">
                             <AccountCircle sx={{fontSize: '14px', color:'silver'}}/>
                           </InputAdornment>
                         ),
                         sx: {
                           fontSize: '12px',
                           backgroundColor: 'white',
                         }
                       }}
                       InputLabelProps={{
                         sx: {
                           fontSize: '14px',
                         }
                       }} />
          </Grid>
          <Grid item xs={12}>
            <MyCheckBox id={'si'}
                        label={'Aceptar y enviar'}
                        formValues={formValues}
                        handleChange={handleChange}
                        canEdit={canEdit} />
          </Grid>
        </Grid>
        <CssBaseline/>
        <AppBar position='fixed'
                color='primary'
                elevation={0}
                sx={accordeonBox.bottomBar} >
          <Toolbar>
            <Grid container sx={{p:0, mt:'-1rem'}}>
              {
                (canEdit)?
                  <>
                    <Grid item xs={8} >
                      <MyButtonBacan label={'Regresar'}
                                     icon={ArrowBackIcon}
                                     onClick={() => {
                                       if(counter <= 2) {
                                         dispatch(handleClear())
                                       } else
                                         alert('Debe GUARDAR los cambios realizados')
                                     }} />
                    </Grid>
                    <Grid item xs={2}>
                      <MyButtonBacan label={'Guardar'} onClick={() => {
                                       const newPayload= {...payload ,[section]: {...formValues}}
                                       dispatch(handleSaveSolicitud(instanciaProceso?.id, newPayload))
                                       setCounter(0)
                                     }}
                                     disabled={counter <= 0}
                                     icon={SaveOutlinedIcon} />
                    </Grid>
                    <Grid item xs={2} >
                      <MySendButton disabled={counter > 0 || formValues.atm === '' || formValues.si !== false}
                                    label={'enviar'}
                                    onSend={ () => {
                                      const metadata = JSON.stringify({"solicitudId": `${instanciaProceso?.solicitud?.id}`,})
                                      dispatch(handCompletarTareaAndSalir(instanciaProceso.id, instanciaTarea, perfilUsuario.id, metadata))
                                    }} />
                    </Grid>
                  </>
                  :
                  <Grid item xs={4} style={{padding:'0 24px 0 0'}}>
                    <MyButtonBacan label={'Regresar'}
                                   icon={ArrowBackIcon}
                                   onClick={() => dispatch(handleClear())} />
                  </Grid>
              }
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
    )
  }
  else return null
}
