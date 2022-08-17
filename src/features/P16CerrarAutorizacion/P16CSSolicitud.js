import React, {useEffect, useState} from 'react'
import {Box, CssBaseline, Grid, Stack, TextField} from '@mui/material'
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
import API from 'src/features/App/API'
import {Solicitante} from "../P01Solicitud/subcomponents/Solicitante";
import {MyReadOnlyTextField} from "../../components/MyReadOnlyTextField";
import {MyAreaTextField} from "../../components/MyAreaTextField";
import {MyUpload} from "../../components/MyUpload";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Autorizacion from "../P01Solicitud/subcomponents/Autorizacion";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import {MySwitch} from "../../components/MySwitch";

// eslint-disable-next-line import/no-anonymous-default-export
export default ({instanciaTarea, instanciaProceso, solicitud, perfilUsuario, solicitudesAprobadas}) => {
  const dispatch = useDispatch()
  const section = 'Solicitud'
  const slct = {...solicitud, payload : JSON.parse(solicitud.payload)}
  slct.payload.Solicitud.solicitudAprobada = JSON.parse(slct.payload.Solicitud.solicitudAprobada)
  const mp = slct.payload.Solicitud.solicitudAprobada
  const payload = f.isValid(solicitud.payload)?JSON.parse(solicitud.payload):{}
  // const instanciaTarea = useSelector(state => state.app.instanciaTarea)
  // const instanciaProceso = useSelector(state => state.app.instanciaProceso)
  // const perfilUsuario = useSelector(state => state.app.perfilUsuario)
  // const solicitud = {...instanciaProceso.solicitud}
  const today = format(new Date(), 'dd-MMMM-yyyy', {locale: es})
  const emptyPayload = {
    fecha:            today,
    modivo:           '',
    resultados:       '',
    pdf:              '',

    texto: `Yo, ${mp?.Solicitante?.nombresCompletos} portador del documento de identidad ${mp?.Solicitante?.cedula}, en calidad de solicitante, declaro bajo ` +
      'juramento que la información constante en la presente solicitud es verdadera y de mi absoluta ' +
      'responsabilidad. En caso de omitir información, así como en caso de forzar, falsificar, modificar, alterar o ' +
      'introducir cualquier información falsa o corregir el presente documento, asumo toda la responsabilidad ' +
      'administrativa, civil o penal conforme lo establecido por ley.\n\n'+
      'Atención: Por favor revise la información del registro de la solicitud, si está seguro que los datos son ' +
      'correctos acepte y declare la veracidad de toda la información detallada en la presente solicitud y envíe ' +
      'la misma; caso contrario, cierre esta ventana y realice los cambios a través del botón guardar.\n',
    si:                         false,
  }

  const canEdit = instanciaTarea.estadoInstanciaProceso === "En Progreso" && instanciaTarea.estadoInstanciaTarea === "Iniciada"
  const [formValues, setFormValues] = useState({...emptyPayload, ...payload[section]})
  const handleChange = (e) => API.handleChange(e, 'entrada', setFormValues, formValues)
  const [counter, setCounter] = useState(-1)  // updating counter

  useEffect(() => {
    setCounter(counter + 1)
  }, [formValues])

  return <>
    <Box sx={{...accordeonBox.container, pt:'2rem', height: '100%', backgroundImage: 'url(src/style/MySvgIcons)'}}>
      <AppBar position='fixed'
              color='primary'
              elevation={0}
              sx={{top:'64px', bottom:'auto', margin: 0, padding:0, backgroundColor:'rgba(148, 193, 32, 0.8)'}} >
        <SectionTitle title={'Cierre de la Autorización'} />
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
          <MyTextField id='motivo'
                       label={'Motivo *'}
                       formValues={formValues}
                       icon={<ArticleOutlinedIcon sx={dialog.textFieldIcon}/>}
                       canEdit={canEdit}
                       handleChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <MyAreaTextField id='resultados'
                           label={'Resultados alcanzados *'}
                           formValues={formValues}
                           icon={<ArticleOutlinedIcon sx={dialog.textFieldIcon}/>}
                           handleChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <MyUpload id={'pdf'}
                    label={'Respaldo *'}
                    dir={instanciaProceso?.solicitud?.id}
                    formValues={formValues}
                    setFormValues={setFormValues}
                    canEdit={canEdit}
                    info={'info...'} />
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
                                })
                                dispatch(handCompletarTareaCoordinador(instanciaProceso.id, instanciaTarea, perfilUsuario.id, metadata))
                              }}
                              label={'Enviar'}
                              disabled={
                                  formValues.identificador === '' ||
                                  formValues.resultados === '' ||
                                  formValues.pdf === '' ||
                                  formValues.si === false ||
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
