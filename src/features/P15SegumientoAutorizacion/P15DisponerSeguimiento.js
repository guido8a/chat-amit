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

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const dispatch = useDispatch()
  const section = 'Solicitud'
  const instanciaTarea = useSelector(state => state.app.instanciaTarea)
  const instanciaProceso = useSelector(state => state.app.instanciaProceso)
  const perfilUsuario = useSelector(state => state.app.perfilUsuario)
  const solicitud = {...instanciaProceso.solicitud}
  const payload = !!solicitud.payload?JSON.parse(solicitud.payload):{}
  const today = format(new Date(), 'dd-MMMM-yyyy', {locale: es})
  const emptyPayload = {
    fecha:              today,
    solicitudNumero:    '',
    sustento:           '',
    asunto:             '',
    detalle:            '',
    target:             {},
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
        <SectionTitle title={'Disponer Seguimiento'} />
      </AppBar>
      <Grid container spacing={1} sx={accordeonBox.container2}>
        <Grid item xs={12} sx={dialog.titleContainer}>
          <MySubtitle subtitle={'Autorización'} />
        </Grid>
        <Grid item xs={2}>
          <MyTextField id={'solicitudNumero'}
                       formValues={formValues}
                       setFormValues={setFormValues}
                       label={'Identificador'}
                       icon={<Email sx={{fontSize: '14px', color:'silver'}}/>}
                       error={null}
                       canEdit={canEdit}
                       handleChange={handleChange} />
        </Grid>
        <Grid item xs={2} sx={{m:'2rem 0 0 0'}}>
          <MyButtonBacan label={'buscar'}
                         onClick={() => {
                           if(canEdit) {
                             API.fetchSolicitudByNumero(formValues.solicitudNumero)
                               .then(mtg => { setFormValues({...formValues, target: mtg}) })
                               .catch((error) => setFormValues({...formValues, target: {}}))
                           }
                         }} />
        </Grid>
      </Grid>
      {f.isValid(formValues.target?.id) ?
        <Box sx={{p:'0 2rem 0 2rem'}}>
          <Grid item xs={12} sx={dialog.titleContainer}>
            <MySubtitle subtitle={'Autorización'} />
          </Grid>
          <Grid item xs={12}>
            <Solicitud2 solicitud={formValues.target} />
          </Grid>
          <Grid item xs={12}>
            <Solicitante solicitud={{solicitud:formValues.target}} displayContact={false}/>
          </Grid>
          <Grid item xs={12} sx={dialog.titleContainer}>
            <MySubtitle subtitle={'Disposición'} />
          </Grid>
          <Grid container>
            <Grid item xs={6} >
              <MyReadOnlyTextField id={'solicitudNumero'}
                                   value={solicitud.numeroSolicitud}
                                   label={'Identificador'}
                                   icon={<Email sx={{fontSize: '14px', color:'silver'}}/>} />
            </Grid>
            <Grid item xs={6} >
              <MyReadOnlyTextField id={'fecha'}
                                   value={formValues.fecha}
                                   label={'Fecha'}
                                   icon={<Email sx={{fontSize: '14px', color:'silver'}}/>} />
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

          <Grid item xs={12} >
            <MyUpload id={'respaldo'}
                      label={'Respaldo'}
                      formValues={formValues}
                      setFormValues={setFormValues}
                      dir={solicitud.id}
                      canEdit={canEdit} />
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
                                })
                                dispatch(handCompletarTareaCoordinador(instanciaProceso.id, instanciaTarea, perfilUsuario.id, metadata))
                              }}
                              label={'Enviar'}
                              disabled={formValues.asunto === '' || formValues.detalle === '' || counter > 0} />
              </Stack>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  </>
}
