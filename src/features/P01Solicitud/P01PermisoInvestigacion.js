import React, {useEffect, useState} from 'react'
import {Box, CssBaseline, Grid, Stack} from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {accordeonBox} from 'src/styles/styles'
import API from 'src/features/P01Solicitud/API'
import {useDispatch, useSelector} from 'react-redux'
import {handleSaveSolicitud, handleClear, handCompletarTareaAndSalir} from 'src/features/App/sliceApp'
import {MySendButton} from 'src/components/MySendButton'
import {SectionTitle} from 'src/components/SectionTitle'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import {CONF} from 'src/features/P01Solicitud/CONF'
import {MyButtonBacan} from 'src/components/MyButtonBacan'
import {f} from 'src/commons/f'

const evaluateRecursos = (recursos, muestras) => {
  let msgs = ''
  recursos.forEach(it => {
    const m2 = muestras.filter(it2 => it.taxonid === it2.taxonid)
    if(m2.length === 0) {
      msgs = msgs + `[${it.scientificname}] no tiene muestras definidas\n`
    } else {
      if(m2.filter(it3 => it3.cantidadSolicitada === 0 || it3.cantidadSolicitada === '0').length > 0)
        msgs = msgs + `[${it.scientificname}] tiene muestras con cantidades 0\n`
    }
  })
  return msgs
}

const evaluatePersonal = (personal, experiencia) => {
  let msgs = ''
  if(personal.length === 0)
    msgs += 'No ha ingresado personal\n'
  if(experiencia.length === 0)
    msgs += 'No ha ingresado experiencia\n'
  personal.forEach(it => {
    if(it.nombre === '')
      msgs += 'Al menos una persona está sin nombre\n'
    if(it.cedula === '')
      msgs += `${it.nombre} número de cédula no válido\n`
    if(it.correo === '' || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(it.correo)))
      msgs += `${it.nombre} correo electrónico vacío o no válido\n`
    if(it.celular === '')
      msgs += `${it.nombre} número de celular no válido\n`
    const exps = experiencia.filter(it2 => it2.cedula === it.cedula)
    if(exps.length === 0)
      msgs += `[${it.nombre}] no tiene experiencia específica\n`
  })

  experiencia.forEach(it => {
    const persona = personal?.find(it2 => it2.cedula === it.cedula)
    if(f.isValid(persona)) {
      if(it.proyecto === '') {
        msgs += `[${persona?.nombre}] experiencia: proyecto no definid0\n`
      }
      if(it.funcion === '') {
        msgs += `[${persona?.nombre}] experiencia: función no definida\n`
      }
      if(persona.experiencia === '') {
        msgs += `[${persona?.nombre}] experiencia (columna) no definida\n`
      }
      if(persona.inicio === '') {
        msgs += `[${persona?.nombre}] experiencia: fecha de inicio no definida\n`
      }
      if(persona.fin === '') {
        msgs += `[${persona?.nombre}] experiencia: fecha final no definida\n`
      }
      if(persona.inicio !== '' && persona.inicio !== '' ) {
        const di = new Date(it.inicio)
        const df = new Date(it.fin)
        if(di >= df) {
          msgs += `[${persona?.nombre}] experiencia: fecha de inicio es posterior o igual a la fecha final\n`
        }
      }
    }
  })

  return msgs
}

const evaluateResultadosEsperados = (re) => {
  const empties = re?.filter(it => it ==='')
  if(empties.length > 0) {
    return 'Hay resultados esperados vacíos. Registre el resultado o elimine la fila.\n'
  } else
    return ''
}

const evaluateObjetivos = (objs) => {
  const empties = objs?.filter(it => it ==='')
  if(empties.length > 0) {
    return 'Hay objetivos vacíos. Registre el objetivo o elimine la fila.\n'
  } else
    return ''
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const dispatch = useDispatch()
  const [expanded, setExpanded] = React.useState(false)
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }
  const recoleccionDeRecursos = useSelector(state => state.app.recoleccionDeRecursos)
  const bandeja = useSelector(state => state.app.bandeja)
  const instanciaTarea = useSelector(state => state.app.instanciaTarea)
  const instanciaProceso = useSelector(state => state.app.instanciaProceso)
  const perfilUsuario = useSelector(state => state.app.perfilUsuario)
  const solicitud = {...instanciaProceso.solicitud}
  const usuarioSenescyt = useSelector(state => state.app.usuarioSenescyt)
  const payload = !!solicitud.payload?JSON.parse(solicitud.payload):{}

  const sections = {
    'in-situ': API.sections.filter(it => it.code !== 'EXSITU'),
    'ex-situ': API.sections.filter(it => it.code !== 'INSITU'),
  }[recoleccionDeRecursos] ?? API.sections

  const clpis  = useSelector(state => state.app.clpis)
  const clpiContratos  = useSelector(state => state.app.clpiContratos)

  const [mainFormValues, setMainFormValues] = useState({...payload})
  const [counter, setCounter] = useState(-1)

  const incrementCounter = () => setCounter(counter + 1)

  useEffect(() => {
    if(!!instanciaProceso.id && !!solicitud.id && !!solicitud.payload && !!usuarioSenescyt.id && !!!payload.Solicitante) {
      payload.Solicitante = usuarioSenescyt
      dispatch(handleSaveSolicitud(instanciaProceso.id, payload))
    }
  }, [dispatch, solicitud, usuarioSenescyt, instanciaProceso.id])

  const title = {
    "Contrato": 'Solicitud de Contrato con Potencial Uso Comercial',
    "Permiso" : 'Solicitud de Permiso de Investigación',
  }[instanciaTarea.tipoInstanciaProceso]

  if(!!instanciaProceso.id && !!instanciaTarea.id && !!payload.Solicitante) {
    return <>
      <Box sx={{...accordeonBox.container, pt:'2rem', height: '100%', backgroundImage: 'url(src/style/MySvgIcons)'}}>
        <AppBar position='fixed'
                color='primary'
                elevation={0}
                sx={{top:'64px', bottom:'auto', margin: 0, padding:0, backgroundColor:'rgba(148, 193, 32, 0.8)'}} >
          <SectionTitle title={title} />
        </AppBar>
        {
          sections.map((section, idx) => (
            <Accordion disableGutters
                       elevation={0}
                       key={`panel${idx+1}`}
                       expanded={expanded === `panel${idx+1}`}
                       onChange={handleChange(`panel${idx+1}`)}
                       sx={{backgroundColor:'#F4FFF4'}}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}
                                aria-controls={`panel${idx + 1}bh-content`}
                                id={`panel${idx + 1}bh-header`}
                                sx={accordeonBox.titleBox2}>
                <Typography sx={accordeonBox.titleTypography2}>
                  {section.sectionTitle}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{pl:'52px'}}>{section.f(payload,mainFormValues,incrementCounter)}</AccordionDetails>
            </Accordion>
          ))
        }
        <CssBaseline />
        <AppBar position='fixed'
                color='primary'
                elevation={0}
                sx={accordeonBox.bottomBar} >
          <Toolbar>
            { (bandeja === 'entrada')?
              <Grid container sx={{p:0, mt:'-1rem'}}>
                <Grid item xs={12} sx={{p:0, m:0, position: 'sticky',}}>
                  <Stack direction={'row'} spacing={1} justifyContent="space-between" alignItems='center' sx={{p:'0 2rem 0 3rem'}}>
                    <MyButtonBacan label={'Regresar'}
                                   // myTip={'Regresar a las tareas'}
                                   icon={ArrowBackIcon}
                                   onClick={() => {
                                     if(counter <= 2) {
                                       dispatch(handleClear())
                                     } else
                                       alert('Debe GUARDAR los cambios realizados')
                                   }} />

                    <MyButtonBacan label={'Guardar'}
                                   // myTip={'Guarda el formulario, y permite continuar editando'}
                                   onClick={() => {
                                     const newPayload= {...payload ,...mainFormValues}
                                     dispatch(handleSaveSolicitud(instanciaProceso?.id, newPayload))
                                     setCounter(0)
                                   }}
                                   disabled={counter <= 0}
                                   icon={SaveOutlinedIcon} />

                    <MySendButton disabled={counter > 0}
                                  // myTip={'Enviar el formulario para su evaluación'}
                                  label={'Enviar'}
                                  onSend={ () => {
                                    if(counter <= 1) {
                                      let errores = ''
                                      const payload = JSON.parse(instanciaProceso.solicitud.payload)
                                      if (f.isValid(payload)) {
                                        const sections = Object.keys(payload)
                                        sections.forEach(section => {
                                          if(f.isValid(CONF[section])) {
                                            const fields = Object.keys(payload[section])
                                            // let msg = ''
                                            fields.forEach(field => {
                                              const value = payload[section][field]
                                              const validator = f.isValid(CONF[section][field])?CONF[section][field]['validator']:null
                                              if (f.isValid(validator)) {
                                                const msg2 = validator(value)
                                                if (msg2 !== '' && msg2 !== null) {
                                                  errores = errores + `${msg2};\n`
                                                }
                                              }
                                            })
                                          }
                                        })
                                        // if(!payload.Propuesta.recursoASerRecolectado && !payload.Propuesta.recursoRecolectadoPreviamente) {
                                        //   errores = errores + 'Debe elegir si va a recolectar recursos o utilizar recursos depositados previamente o los dos\n'
                                        // }
                                        // if(payload.Propuesta.recursoASerRecolectado) {
                                        //   if(payload.Propuesta.metodologia === '')
                                        //     errores = errores + 'Debe describir la metodología de campo asociada a los recursos a ser recolectados\n'
                                        //   if(payload.Recursos.provincias.length === 0)
                                        //     errores = errores + 'Debe seleccionar al menos una provincia\n'
                                        // }
                                        // if(payload.Recursos.laboratorios.length === 0)
                                        //   errores = errores + 'Debe seleccionar al menos un laboratorio\n'
                                        // if(payload.Propuesta.recursoRecolectadoPreviamente) {
                                        //   if(payload.Propuesta.metodologiaLaboratorio === '')
                                        //     errores = errores + 'Debe describir la Metodología de Laboratorio asociada a los recursos depositados previamente\n'
                                        // }
                                        // if((payload.Recursos['accesoConocimiento'] === true) && !(clpis.map(it => it.codigoRegistro).includes(payload.Recursos['clpi']))) {
                                        //   errores = errores + `Número de contrato/CLPI no registrado: ${payload.Recursos["clpi"]}\n`
                                        // }
                                        // if((payload.Recursos['accesoConocimiento'] === true) && !(clpiContratos.map(it => it.codigoRegistro).includes(payload.Recursos['contratoAccesoConocimiento']))) {
                                        //   errores = errores + `Registro de contrato de acceso al conocimiento tradicional no registrado: ${payload.Recursos["contratoAccesoConocimiento"]}\n`
                                        // }
                                        errores = errores + evaluateRecursos(payload.Recursos.recursos, payload.Recursos.muestras)
                                        errores = errores + evaluatePersonal(payload.Personal.personal, payload.Personal.experiencia)
                                        errores = errores + evaluateObjetivos(payload.Propuesta.objetivos)
                                        errores = errores + evaluateResultadosEsperados(payload.Propuesta.resultadosEsperados)
                                      }
                                      if (errores !== '')
                                        alert(errores)
                                      else {
                                        const myPayload = JSON.parse(instanciaProceso.solicitud?.payload)
                                        const metadata = JSON.stringify(
                                          {
                                            "solicitudId": `${instanciaProceso?.solicitud?.id}`,
                                            "nombreProyecto": myPayload?.Propuesta?.nombre
                                          }
                                        )
                                        dispatch(handCompletarTareaAndSalir(instanciaProceso.id, instanciaTarea, perfilUsuario.id, metadata))
                                      }
                                    } else
                                      alert('Debe guardar los cambios realizados ' + counter)
                    }} />
                  </Stack>
                </Grid>
              </Grid>
              :
              <Grid container sx={{p:0, mt:'-1rem'}}>
                  <MyButtonBacan label={'Regresar'}
                                 // myTip={'Regresa a la lista de tareas'}
                                 icon={ArrowBackIcon}
                                 onClick={() => dispatch(handleClear())} />
              </Grid>
            }
          </Toolbar>
        </AppBar>
      </Box>
    </>
  }
  else {
    return null
  }
}
