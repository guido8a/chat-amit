import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {AppBar, Box, CssBaseline, Grid, Stack, Tab} from '@mui/material'
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
import {MyTextField} from "../../components/MyTextField";
import {MyReadOnlyTextField} from "../../components/MyReadOnlyTextField";
import {MyReabOnlyTableRecursos} from "../../components/MyReadOnlyTableRecursos";
import {MyReadOnlyTableMuestras} from "../../components/MyReadOnlyMuestrasTable";
import {MySwitch} from 'src/components/MySwitch'
import {MyUpload} from 'src/components/MyUpload';
import Toolbar from "@mui/material/Toolbar";
import API from "../App/API";
import {MyAreaTextField} from "../../components/MyAreaTextField";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {P10ATMRO} from 'src/features/P10ATM/P10ATMRO'
import Autorizacion from "../P01Solicitud/subcomponents/Autorizacion";

export default ({
                  instanciaTarea,
                  perfilUsuario,
                  instanciaProceso,
                  solicitud,
                  solicitudesAprobadas,
                  canEdit=true
                }) => {
  const dispatch = useDispatch()
  const section = 'Validar'
  const slct = {...solicitud, payload : JSON.parse(solicitud.payload)}
  slct.payload.Solicitud.solicitudAprobada = JSON.parse(slct.payload.Solicitud.solicitudAprobada)
  const mp = slct.payload.Solicitud.solicitudAprobada
  const payload = f.isValid(solicitud.payload) ? JSON.parse(solicitud.payload) : {}

  const today = format(new Date(), 'dd-MMMM-yyyy', {locale: es})
  const emptyPayload = {
    fecha: today,
    plazo: 0,
    destinoFinal: '',
    aprobadaIdentificador: '',
    solicitudAprobada: {},
    check1: false,
    check2: false,
    check3: false,
    check4: false,
    check5: false,
    check6: false,
    seAprueba: false,
    asunto: '',
    detalle: '',
  }

  const [formValues, setFormValues] = useState({...emptyPayload, ...payload[section]})

  // const mp = f.isValid(payload?.Solicitud?.solicitudAprobada) ? JSON.parse(payload?.Solicitud?.solicitudAprobada) : {}

  const [counter, setCounter] = useState(-1)
  useEffect(() => {
    setCounter(counter + 1)
  }, [formValues])

  const [recursoSelected, setRecursoSelected] = useState({})

  const defaultHandleChange4Switch = (event, value, canEdit, setFormValues, formValues) => {
    if(canEdit) {
      setFormValues({...formValues, [event.target.id]: value})
    }
  }

  const handleChange = (e) => API.handleChange(e, 'entrada', setFormValues, formValues)

  const solicitudATM = payload.Solicitud

  const [myTab, setMytab] = useState('1');

  const handleChangeTab = (event, newTab) => { setMytab(newTab) }

  const [muestras0, setMuestras0] = useState({})

  const [payloadPC,setPayloadPC] = useState({})

  const [padreId,setPadreId] = useState(0)

  useEffect(() => {
    let solicitudPadreId = instanciaTarea.instanciaProcesoSolicitudPadreId
    if(!f.isValid(solicitudPadreId)) {
      const arr = instanciaTarea.instanciaProcesoNumeroSolicitudPadre?.split('-')
      solicitudPadreId = arr[arr?.length - 1]
      setPadreId(Number(solicitudPadreId))
    }
    API.fetchSolitudById(Number(solicitudPadreId)).then(slct => {
      setPayloadPC(JSON.parse(slct.payload))
      setMuestras0(JSON.parse(slct.payload)['InformeTecnicoMaate']['muestras'])
    })
  },[instanciaTarea.instanciaProcesoNumeroSolicitudPadre])

  useEffect(() => {
    if(formValues.seAprueba) {
      setFormValues({
        ...formValues,
        asunto:  'Solicitud de validación de Acuerdo de Transferencia de Material APROBADA',
        detalle: `Estimado/a ${mp.Solicitante.nombresCompletos},\n\n` +
                 `Su solicitud realizada a través de la Ventanilla Única Virtual para la validación del ` +
                 `Acuerdo de Transferencia de Material registrada con el Identificador: ${solicitud.numeroSolicitud} y correspondiente al ` +
                 `proyecto titulado ${solicitud.nombreProyecto} ha sido APROBADA.\n\n` +
                 'Saludos cordiales,\n\n' +
                 `${perfilUsuario.usuario.nombreUsuario}`
      })
    } else {
      setFormValues({
        ...formValues,
        asunto:  'Solicitud de validación de Acuerdo de Transferencia de Material NEGADA',
        detalle: `Estimado/a ${mp.Solicitante.nombresCompletos},\n\n` +
                 `Su solicitud realizada a través de la Ventanilla Única Virtual para la validación del ` +
                 `Acuerdo de Transferencia de Material registrada con el Identificador: ${solicitud.numeroSolicitud} y correspondiente al ` +
                 `proyecto titulado ${solicitud.nombreProyecto} ha sido NEGADA.\n\n` +
                 'Saludos cordiales,\n\n' +
                 `${perfilUsuario.usuario.nombreUsuario}`


      })
    }
  }, [formValues.seAprueba])

  // https://testvuv.tech/ws/v1/api/solicitud/get?idSolicitud=18566

  if(f.isValid(solicitudesAprobadas)) {
    return (
      <Box sx={{...accordeonBox.container, pt:'2rem', height: '100%'}}>
        <AppBar position='fixed'
                color='primary'
                elevation={0}
                sx={{top:'64px', bottom:'auto', margin: 0, padding:0, backgroundColor:'rgba(148, 193, 32, 0.8)'}} >
          <SectionTitle title={'Validación del Solicitud de Acuerdo de Transferencia ATM'} />
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
              <Grid item xs={6} >
                <MyReadOnlyTextField label={'Número de Solicitud'}
                                     value={instanciaTarea.instanciaProcesoSolicitudNumeroSolicitud}/>
              </Grid>
              <Grid item xs={6} >
                <MyReadOnlyTextField label={'Solicitud padre'}
                                     value={instanciaTarea.instanciaProcesoNumeroSolicitudPadre}/>
              </Grid>
              <Solicitante solicitud={{solicitud: {payload: mp}}} displayContact={false}/>
              <Autorizacion solicitud={{numeroSolicitud: formValues.aprobadaIdentificador, payload: mp}} />
              {
                f.isValid(formValues.solicitudAprobada.id) ?
                  <>
                    <Grid item xs={12} sx={dialog.titleContainer}>
                      <MySubtitle subtitle={'Recursos'}/>
                    </Grid>
                    <Grid item xs={12} sx={dialog.titleContainer}>
                      <MyReabOnlyTableRecursos rows={mp.Recursos?.recursos} setRecursoSelected={setRecursoSelected}/>
                    </Grid>
                  </> : null
              }
              {
                f.isValid(recursoSelected.scientificname) ?
                  <>
                    <Grid item xs={12} sx={dialog.titleContainer}>
                      <MySubtitle subtitle={'Muestras y submuestras'} />
                    </Grid>
                    <Grid item xs={12}>
                      {recursoSelected.scientificname}
                    </Grid>
                    <MyReadOnlyTableMuestras muestras={mp.Recursos?.muestras} selected={recursoSelected} />
                  </> : null
              }

              <Grid item xs={12} sx={dialog.titleContainer}>
                <MySubtitle subtitle={'Requisitos'} />
              </Grid>

              <Grid item xs={8} alignItems="center">
                <MySwitch id={'condicion1'}
                          label={'¿El ATM contempla una cláusula de divulgación obligatoria del país de origen, fuente o proveedor de los recursos?'}
                          formValues={solicitudATM}
                          canEdit={false} />
              </Grid>
              <Grid item xs={2} >
                <MyTextField id={'pagina1'}
                             label={'Página No.'}
                             canEdit={false}
                             formValues={solicitudATM}/>
              </Grid>
              <Grid item xs={1} alignItems="center">
                <MySwitch id={'check1'}
                          label={''}
                          formValues={formValues}
                          setFormValues={setFormValues}
                          handleChange={(e,v) => defaultHandleChange4Switch(e,v,canEdit,setFormValues,formValues)}
                          canEdit={canEdit} />
              </Grid>

              <Grid item xs={8} >
                <MySwitch id={'condicion2'}
                          label={'¿El ATM define una cláusula de sometimiento a la legislación ecuatoriana en materia de propiedad intelectual, incluyendo la prohibición de patentar recursos biológicos, genéticos o sus derivados de origen ecuatoriano?'}
                          formValues={solicitudATM}
                          canEdit={false} />
              </Grid>
              <Grid item xs={2} >
                <MyTextField id={'pagina2'}
                             label={'Página No.'}
                             canEdit={false}
                             formValues={solicitudATM} />
              </Grid>
              <Grid item xs={1} alignItems="center">
                <MySwitch id={'check2'}
                          label={''}
                          formValues={formValues}
                          setFormValues={setFormValues}
                          handleChange={(e,v) => defaultHandleChange4Switch(e,v,canEdit,setFormValues,formValues)}
                          canEdit={canEdit} />
              </Grid>

              <Grid item xs={8} >
                <MySwitch id={'condicion3'}
                          label={'¿El ATM contine una cláusula que incluya la obligación de repatriar los recursos biológicos, genéticos o sus derivados y la información levantada a partir de estos, en caso de incumplimiento de los términos del Acuerdo.?'}
                          formValues={solicitudATM}
                          canEdit={false} />
              </Grid>
              <Grid item xs={2} >
                <MyTextField id={'pagina3'}
                             label={'Página No.'}
                             canEdit={false}
                             formValues={solicitudATM} />
              </Grid>
              <Grid item xs={1} alignItems="center">
                <MySwitch id={'check3'}
                          label={''}
                          formValues={formValues}
                          setFormValues={setFormValues}
                          handleChange={(e,v) => defaultHandleChange4Switch(e,v,canEdit,setFormValues,formValues)}
                          canEdit={canEdit} />
              </Grid>

              <Grid item xs={8} >
                <MySwitch id={'condicion4'}
                          label={'¿El ATM define la obligación de reportar los resultados alcanzados?'}
                          formValues={solicitudATM}
                          handleChange={(e,v) => defaultHandleChange4Switch(e,v,canEdit,setFormValues,formValues)}
                          canEdit={false} />
              </Grid>
              <Grid item xs={2} >
                <MyTextField id={'pagina4'}
                             label={'Página No.'}
                             canEdit={false}
                             formValues={solicitudATM} />
              </Grid>
              <Grid item xs={1} alignItems="center">
                <MySwitch id={'check4'}
                          label={''}
                          formValues={formValues}
                          setFormValues={setFormValues}
                          handleChange={(e,v) => defaultHandleChange4Switch(e,v,canEdit,setFormValues,formValues)}
                          canEdit={canEdit} />
              </Grid>

              <Grid item xs={8} >
                <MySwitch id={'condicion5'}
                          label={'¿El ATM define la obligación del receptor de no transferir a terceros los recursos recibidos?'}
                          formValues={solicitudATM}
                          canEdit={false} />
              </Grid>
              <Grid item xs={2} >
                <MyTextField id={'pagina5'}
                             label={'Página No.'}
                             canEdit={false}
                             formValues={solicitudATM}/>
              </Grid>
              <Grid item xs={1} alignItems="center">
                <MySwitch id={'check5'}
                          label={''}
                          formValues={formValues}
                          setFormValues={setFormValues}
                          handleChange={(e,v) => defaultHandleChange4Switch(e,v,canEdit,setFormValues,formValues)}
                          canEdit={canEdit} />
              </Grid>

              <Grid item xs={8}>
                <MySwitch id={'condicion6'}
                          label={'¿El ATM define el destino final del recurso transferido una vez alcanzando el objetivo?'}
                          formValues={solicitudATM}
                          canEdit={false} />
              </Grid>
              <Grid item xs={2}>
                <MyTextField id={'pagina6'}
                             label={'Página No.'}
                             canEdit={false}
                             formValues={solicitudATM} />
              </Grid>
              <Grid item xs={1} alignItems="center">
                <MySwitch id={'check6'}
                          label={''}
                          formValues={formValues}
                          setFormValues={setFormValues}
                          handleChange={(e,v) => defaultHandleChange4Switch(e,v,canEdit,setFormValues,formValues)}
                          canEdit={canEdit} />
              </Grid>

              <Grid item xs={12} sx={dialog.titleContainer}>
                <MySubtitle subtitle={'Anexos'} />
              </Grid>
              <Grid item xs={12}>
                <Stack direction={'row'} justifyContent="space-between" alignItems="center">
                  <MyUpload id={'atm'}
                            dir={instanciaProceso?.solicitud?.id}
                            canEdit={false}
                            label={'Acuerdo de transferencia de material'}
                            formValues={solicitudATM}/>
                  <MyUpload id={'atmAdicional'}
                            dir={instanciaProceso?.solicitud?.id}
                            label={'Documento adicional'}
                            formValues={solicitudATM}
                            canEdit={false} />
                </Stack>
              </Grid>

              <Grid item xs={12} sx={dialog.titleContainer}>
                <MySubtitle subtitle={'Notificación'} />
              </Grid>
              <Grid item xs={12} style={{padding:'0 0 0 24px'}}>
                <MySwitch id={'seAprueba'}
                          label={'¿Admitir solicitud a trámite?'}
                          formValues={formValues}
                          handleChange={handleChange}
                          fullWidth={false}
                          canEdit />
              </Grid>
              <Grid item xs={12} style={{padding:'0'}}>
                <MyTextField id={'asunto'}
                             label={'Asunto *'}
                             formValues={formValues}
                             handleChange={handleChange}
                             canEdit />
              </Grid>
              <Grid item xs={12} style={{padding:'0'}}>
                <MyAreaTextField id={'detalle'}
                                 label={'Contenido *'}
                                 formValues={formValues}
                                 handleChange={handleChange}
                                 rows={5} />
              </Grid>

            </Grid>
          </TabPanel>
          <TabPanel value="2">
            <P10ATMRO payload={payload} />
          </TabPanel>
        </TabContext>

        <CssBaseline/>
        <AppBar position='fixed'
                color='primary'
                elevation={0}
                sx={accordeonBox.bottomBar} >
          <Toolbar>
            <Grid container sx={{p:0, mt:'-1rem'}}>
              { (canEdit)?
                <Grid container >
                  <Grid item xs={12} sx={{p:'0 4rem 0 4rem'}}>
                    <Stack direction={'row'} justifyContent="space-between" alignItems="center">

                      <MyButtonBacan label={'Regresar'}
                                     icon={ArrowBackIcon}
                                     onClick={() => {
                                       if(counter <= 2) {
                                         dispatch(handleClear())
                                       } else
                                         alert('Debe GUARDAR los cambios realizados')
                                     }} />

                      <MyButtonBacan label={'Guardar'}
                                     onClick={() => {
                                       const newPayload= {...payload ,[section]: {...formValues}}
                                       newPayload.Solicitud.muestras.forEach(it => {
                                          it.saldoExportaciones = it.cantidadSolicitada
                                          it.saldoHolotipos = it.cantidadSolicitada
                                       })
                                       dispatch(handleSaveSolicitud(instanciaProceso?.id, newPayload))
                                       setCounter(0)
                                     }}
                                     disabled={counter <= 0}
                                     icon={SaveOutlinedIcon} />

                      <MySendButton disabled={counter > 0|| formValues.asunto === '' || formValues.detalle === ''}
                                    label={'Enviar'}
                                    onSend={ () => {
                                      if(formValues.seAprueba === true) {
                                        const metadata = JSON.stringify({
                                          "validacionCompleta": true,
                                          "atmCumpleRequisitos": true,
                                          "solicitudId": `${instanciaProceso?.solicitud?.id}`,
                                          "asunto": formValues.asunto,
                                          "detalle": formValues.detalle,
                                          "adjunto": solicitudATM.atm,
                                          "carpeta": "atm",
                                        })
                                        const muestras2 = payload.Solicitud.muestras
                                        muestras0.forEach(it0 => {
                                          const m2 = muestras2.filter(it2 => it2.id === it0.id)[0]
                                          it0.saldorATM = it0.saldorATM - m2.cantidadSolicitada
                                        })
                                        payloadPC['InformeTecnicoMaate']['muestras'] = muestras0
                                        API.fetchSetPayload(padreId, payloadPC).then(() => {
                                          dispatch(handCompletarTareaAndSalir(instanciaProceso.id, instanciaTarea, perfilUsuario.id, metadata))
                                        })
                                      } else {
                                        const metadata = JSON.stringify({
                                          "validacionCompleta": false,
                                          "atmCumpleRequisitos": false,
                                          "solicitudId": `${instanciaProceso?.solicitud?.id}`,
                                          "asunto": formValues.asunto,
                                          "detalle": formValues.detalle,
                                          "adjunto": solicitudATM.atm,
                                          "carpeta": "atm",
                                        })
                                        dispatch(handCompletarTareaAndSalir(instanciaProceso.id, instanciaTarea, perfilUsuario.id, metadata))
                                      }
                                    }} />
                      {/*<MySendButton disabled={counter > 0 || formValues.asunto === '' || formValues.detalle === ''}*/}
                      {/*              label={'devolver'}*/}
                      {/*              onSend={ () => {*/}
                      {/*                // const myPayload = JSON.parse(instanciaProceso.solicitud?.payload)*/}
                      {/*                const metadata = JSON.stringify({*/}
                      {/*                  "validacionCompleta": false,*/}
                      {/*                  "atmCumpleRequisitos": false,*/}
                      {/*                  "solicitudId": `${instanciaProceso?.solicitud?.id}`,*/}
                      {/*                  "asunto": formValues.asunto,*/}
                      {/*                  "detalle": formValues.detalle,*/}
                      {/*                  "adjunto": solicitudATM.atm,*/}
                      {/*                })*/}
                      {/*                dispatch(handCompletarTareaAndSalir(instanciaProceso.id, instanciaTarea, perfilUsuario.id, metadata))*/}
                      {/*              }} />*/}
                      {/*<MySendButton disabled={counter > 0|| formValues.asunto === '' || formValues.detalle === ''}*/}
                      {/*              label={'Validar'}*/}
                      {/*              onSend={ () => {*/}
                      {/*                const metadata = JSON.stringify({*/}
                      {/*                  "validacionCompleta": true,*/}
                      {/*                  "atmCumpleRequisitos": true,*/}
                      {/*                  "solicitudId": `${instanciaProceso?.solicitud?.id}`,*/}
                      {/*                  "asunto": formValues.asunto,*/}
                      {/*                  "detalle": formValues.detalle,*/}
                      {/*                  "adjunto": solicitudATM.atm,*/}
                      {/*                  "carpeta": "atm",*/}
                      {/*                })*/}
                      {/*                const muestras2 = payload.Solicitud.muestras*/}
                      {/*                muestras0.forEach(it0 => {*/}
                      {/*                  const m2 = muestras2.filter(it2 => it2.id === it0.id)[0]*/}
                      {/*                  it0.saldorATM = it0.saldorATM - m2.cantidadSolicitada*/}
                      {/*                })*/}
                      {/*                payloadPC['InformeTecnicoMaate']['muestras'] = muestras0*/}
                      {/*                API.fetchSetPayload(padreId, payloadPC).then(() => {*/}
                      {/*                  dispatch(handCompletarTareaAndSalir(instanciaProceso.id, instanciaTarea, perfilUsuario.id, metadata))*/}
                      {/*                })*/}
                      {/*              }} />*/}
                    </Stack>
                  </Grid>
                </Grid>
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
