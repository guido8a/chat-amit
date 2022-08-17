import React, {useEffect, useState} from 'react'
import {AppBar, Box, CssBaseline, Grid, Stack, Tab, Typography} from '@mui/material'
import {accordeonBox, common, dialog} from 'src/styles/styles'
import API from 'src/features/App/API'
import {useDispatch, useSelector} from 'react-redux'
import Solicitud from "src/features/P01Solicitud/subcomponents/Solicitud";
import {MyTextField} from "src/components/MyTextField";
import {
  handCompletarTareaAndSalir,
  handleClear,
  handleSaveSolicitud
} from "src/features/App/sliceApp";
import {SectionTitle} from 'src/components/SectionTitle'
import {MySendButton} from 'src/components/MySendButton'
import {MySwitch} from "../../components/MySwitch";
import {MySubtitle} from "../../components/MySubtitle";
import {MyGobackButton, MySaveButton} from "../../components/MyCommonButtons";
import Toolbar from "@mui/material/Toolbar";
import {MyAreaTextField} from "../../components/MyAreaTextField";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {P0102PayloadRO} from 'src/features/P01Solicitud/P0102PayloadRO'

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const instanciaTarea = useSelector(state => state.app.instanciaTarea)
  const section = instanciaTarea?.tareaCodigoTarea
  // const tareas = useSelector(state => state.wf01.tareas)
  // const nombre_tarea = tareas.filter(it => it.codigo_tarea === instanciaTarea.tareaCodigoTarea)[0].nombre_tarea
  // const tarea = tareas.filter(it => it,instanciaTarea?.tareaCodigoTarea)[0]

  const dispatch = useDispatch()
  const perfilUsuario = useSelector(state => state.app.perfilUsuario)
  const bandeja = useSelector(state => state.app.bandeja)
  const instanciaProceso = useSelector(state => state.app.instanciaProceso)
  const solicitud = {...instanciaProceso.solicitud}

  let payload = !!solicitud.payload?JSON.parse(solicitud.payload):{[section]:{}}
  payload.solicitudId = solicitud.id

  const emptyPayload = {
    requisito01: false,
    requisito02: false,
    requisito03: false,
    requisito04: false,
    requisito05: false,
    requisito06: false,
    requisito07: false,
    asunto:      '',
    detalle:     '',
    seAprueba:   false,
  }

  const [formValues, setFormValues] = useState({...emptyPayload, ...payload[section]})

  const handleChange = (e) => API.handleChange(e, bandeja, setFormValues, formValues)

  const canEdit = bandeja === 'entrada' && instanciaTarea.estadoInstanciaProceso === "En Progreso" && instanciaTarea.estadoInstanciaTarea === "Iniciada"

  const [counter, setCounter] = useState(-1)  // updating counter

  useEffect(() => {
    setCounter(counter + 1)
  }, [formValues])

  useEffect(() => {
    if(formValues.seAprueba) {
      setFormValues({
        ...formValues,
        asunto: 'SOLICITUD DE PERMISO DE INVESTIGACIÓN ADMITIDA A TRAMITE',
        detalle: '' +
          `Estimado/a ${payload.Solicitante.nombresCompletos},\n\n` +
          `Su solicitud realizada a través de la Ventanilla Única Virtual para la Investigación sobre Biodiversidad ha sido registrada con el Nro. ${solicitud.numeroSolicitud} ` +
          `correspondiente al proyecto titulado ${payload.Propuesta.nombre}. Por lo tanto, se verificará y validará la información remitida en el término de tres (3) días. \n` +
          'En caso de que se verifique que la información no cumpla con los requisitos establecidos o se encuentre incompleta, la solicitud será negada y archivada.\n' +
          '\n\nSaludos coordiales\n\n' +
          `${perfilUsuario.usuario.nombreUsuario}`
      })
    } else {
      setFormValues({
        ...formValues,
        asunto: 'SOLICITUD DE PERMISO DE INVESTIGACIÓN NO ADMITIDA A TRAMITE',
        detalle: `Estimado/a ${payload.Solicitante.nombresCompletos},\n\n` +
          `Su solicitud Nro. ${solicitud.numeroSolicitud} correspondiente al proyecto titulado ${payload.Propuesta.nombre} no ha sido admitida a trámite ` +
          'debido a que no cumple con los siguientes criterios de admisión:\n\n'
          + (!formValues['requisito01']?'\tDatos de contacto del usuario VUVIB\n':'')
          + (!formValues['requisito02']?'\tDatos de contacto del usuario VUVIB\n':'')
          + (!formValues['requisito03']?'\tDatos de contacto del usuario VUVIB\n':'')
          + (!formValues['requisito04']?'\tDatos de contacto del usuario VUVIB\n':'')
          + (!formValues['requisito05']?'\tDatos de contacto del usuario VUVIB\n':'')
          + (!formValues['requisito06']?'\tDatos de contacto del usuario VUVIB\n':'')
          + (!formValues['requisito07']?'\tUbicación geográfica del proyecto\n':'')
          + '\n\nSaludos coordiales\n\n' + `${perfilUsuario.usuario.nombreUsuario}`
      })
    }
  }, [
    formValues['seAprueba'],
    formValues['requisito01'],
    formValues['requisito02'],
    formValues['requisito03'],
    formValues['requisito04'],
    formValues['requisito05'],
    formValues['requisito06'],
    formValues['requisito07']
  ])

  const [myTab, setMytab] = useState('1');

  const handleChangeTab = (event, newTab) => {
    setMytab(newTab)
  }

  return <>
    <Box sx={{...accordeonBox.container, pt:'2rem', height: '100%'}}>
      <AppBar position='fixed'
              color='primary'
              elevation={0}
              sx={{top:'64px', bottom:'auto', margin: 0, padding:0, backgroundColor:'rgba(148, 193, 32, 0.8)'}} >
        <SectionTitle title={`Verificación de Cumplimiento`}/>
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
              <MySubtitle subtitle={'Requisitos'} />
            </Grid>
            <Grid item xs={6} style={{padding:'0.5rem 2rem 0.5rem 2rem'}}>
              <MySwitch id={'requisito01'}
                        label={'Datos de contacto del usuario VUVIB'}
                        formValues={formValues}
                        setFormValues={setFormValues}
                        handleChange={handleChange}
                        canEdit={canEdit}/>
            </Grid>
            <Grid item xs={6} style={{padding:'0.5rem 2rem 0.5rem 2rem'}}>
              <MySwitch id={'requisito02'}
                        label={'Carta de intención de apoyo a la investigación / Copia de convenio(s) de cooperación de instituciones involucradas en los proyectos de investigación (de ser el caso)'}
                        formValues={formValues}
                        handleChange={handleChange}
                        canEdit />
            </Grid>
            <Grid item xs={6} style={{padding:'0.5rem 2rem 0.5rem 2rem'}}>
              <MySwitch id={'requisito03'}
                        label={'Documento certificado del nombramiento o acción de personal del representante legal de la Institución Nacional de Apoyo (actual)'}
                        formValues={formValues}
                        handleChange={handleChange}
                        canEdit />
            </Grid>
            <Grid item xs={6} style={{padding:'0.5rem 2rem 0.5rem 2rem'}}>
              <MySwitch id={'requisito04'}
                        label={'Ubicación geográfica del proyecto'}
                        formValues={formValues}
                        handleChange={handleChange}
                        canEdit />
            </Grid>
            <Grid item xs={6} style={{padding:'0.5rem 2rem 0.5rem 2rem'}}>
              <MySwitch id={'requisito05'}
                        label={'Pasaportes de investigadores extranjeros '}
                        formValues={formValues}
                        handleChange={handleChange}
                        canEdit />
            </Grid>
            <Grid item xs={6} style={{padding:'0.5rem 2rem 0.5rem 2rem'}}>
              <MySwitch id={'requisito06'}
                        label={'La investigación involucra conocimientos tradicionales'}
                        formValues={formValues}
                        handleChange={handleChange}
                        canEdit />
            </Grid>
            <Grid item xs={6} style={{padding:'0.5rem 2rem 0.5rem 2rem'}}>
              <MySwitch id={'requisito07'}
                        label={'La propuesta cuenta con CLPI y registro de contrato de acceso al conocimiento tradicional '}
                        formValues={formValues}
                        handleChange={handleChange}
                        canEdit />
            </Grid>
            <Grid item xs={12} sx={dialog.titleContainer}>
              <MySubtitle subtitle={'Notificacion'} />
            </Grid>
            <Grid item xs={12} style={{padding:'0 0 0 24px'}}>
              <MySwitch id={'seAprueba'}
                        label={'¿Admitir solicitud a trámite?'}
                        formValues={formValues}
                        handleChange={handleChange}
                        fullWidth={false}
                        canEdit />
            </Grid>
            <Grid item xs={12} style={{padding:'0 0 0 24px'}}>
              <MyTextField id={'asunto'}
                           label={'Asunto *'}
                           formValues={formValues}
                           handleChange={handleChange}
                           canEdit false/>
            </Grid>
            {
              formValues.asunto === ''?
                <Typography sx={common.warnig}>Asunto es obligatorio</Typography>
                :null
            }
            <Grid item xs={12} style={{padding:'0 0 0 24px'}}>
              <MyAreaTextField id={'detalle'}
                               label={'Contenido *'}
                               formValues={formValues}
                               handleChange={handleChange}
                               canEdit={false} />
            </Grid>
            {
              formValues.detalle === ''?
                <Typography sx={common.warnig}>Contenido es obligatorio</Typography>
                :null
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
                     alignItems='center'
                     sx={{p:'0 2rem 0 3rem'}}>
                <MyGobackButton onGoback={() => dispatch(handleClear())} />
                <MySaveButton  onSave={() => {
                                  payload[section]=formValues
                                  setCounter(0)
                                  dispatch(handleSaveSolicitud(instanciaProceso?.id, payload))
                               }}
                               disabled={counter <= 0} />
                {(!formValues.seAprueba)?
                  <MySendButton onSend={() => {
                                  const metadata = JSON.stringify({
                                      "solicitudId":`${instanciaProceso?.solicitud?.id}`,
                                      "solicitudAdmitida": false
                                    }
                                  )
                                  dispatch(handCompletarTareaAndSalir(instanciaProceso.id, instanciaTarea, perfilUsuario.id, metadata))
                                }}
                                myTip={'Devolver, no cumple con todos los requisitos'}
                                label={'devolver'}
                                disabled={formValues.asunto === '' || formValues.detalle === '' || counter > 0} />:null
                }
                {(formValues.seAprueba) ?
                  <MySendButton onSend={() => {
                                  const metadata = JSON.stringify({
                                      "solicitudId": `${instanciaProceso?.solicitud?.id}`,
                                      "solicitudAdmitida": true,
                                      "asunto": formValues.asunto,
                                      "detalle": formValues.detalle,
                                    }
                                  )
                                  dispatch(handCompletarTareaAndSalir(instanciaProceso.id, instanciaTarea, perfilUsuario.id, metadata))
                                }}
                                label={'Admitir'}
                                myTip={'Admitir y continuar el proceso'}
                                disabled={formValues.asunto === '' || formValues.detalle === '' || counter > 0}/> : null
                }
              </Stack>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  </>
}
