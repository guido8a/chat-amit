import React, {useEffect, useRef, useState} from 'react'
import {AppBar, Box, ButtonGroup, CssBaseline, Divider, Grid, Select, Stack, Tab, Typography} from '@mui/material'
import {accordeonBox, dialog} from 'src/styles/styles'
import API from 'src/features/App/API'
import {useDispatch, useSelector} from 'react-redux'
import Solicitud from 'src/features/P01Solicitud/subcomponents/Solicitud'
import {
  handCompletarTareaCoordinador,
  handleClear,
  handleSaveSolicitud
} from 'src/features/App/sliceApp'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import MenuItem from "@mui/material/MenuItem";

import {SectionTitle} from 'src/components/SectionTitle'
import {MyAreaTextField} from 'src/components/MyAreaTextField'
import {MySendButton} from 'src/components/MySendButton'
import {format} from 'date-fns'
import {es} from 'date-fns/locale'
import {MyGobackButton, MySaveButton} from 'src/components/MyCommonButtons'
import {MySubtitle} from 'src/components/MySubtitle'
import {MyReadOnlyTextField} from 'src/components/MyReadOnlyTextField'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import {MyButtonBacan} from 'src/components/MyButtonBacan'
import {MySwitch} from "../../components/MySwitch";
import Toolbar from "@mui/material/Toolbar";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {f} from "../../commons";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import GLOBALS from "../App/globals";
import Button from "@mui/material/Button";
import RobotoCondensedRegular from "../../styles/MyFonts/Roboto_Condensed/RobotoCondensed-Regular.ttf";
import UploadIcon from "@mui/icons-material/Upload";
import {P0102PayloadRO} from 'src/features/P01Solicitud/P0102PayloadRO'
import {MyTableRecursos} from "../../components/MyTableRecursos";
import {MyTableMuestras} from "../../components/MyTableMuestras";
import {muestras} from "./CONF";
import {MyButtonBacan3} from "../../components/MyButtonBacan3";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import {DocxInformeTecnico} from "./subcomponents/DocxInformeTecnico";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import {MyFileUploadButton} from "../../components/MyFileUploadButton";
import {DocxInformeTecnicoMaate} from "./subcomponents/DocxInformeTecnicoMaate";

const range = (start, end) => {
  let ans = [];
  for (let i = start; i <= end; i++) {
    ans.push(i);
  }
  return ans;
}

const range20 = range(1,20).map(it => <MenuItem key={it} value={it}>{it}</MenuItem>)

const range5 = range(1,5).map(it => <MenuItem key={it} value={it}>{it}</MenuItem>)

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const dispatch = useDispatch()
  const funcionarios = useSelector(state => state.app.funcionarios)
  const perfilUsuario = useSelector(state => state.app.perfilUsuario)
  const section = `InformeTecnico${perfilUsuario?.perfil?.organizacion?.nombreOrganizacion}`
  const bandeja = useSelector(state => state.app.bandeja)
  const instanciaTarea = useSelector(state => state.app.instanciaTarea)
  const instanciaProceso = useSelector(state => state.app.instanciaProceso)
  const solicitud = {...instanciaProceso.solicitud}
  let payload = JSON.parse(!!instanciaProceso?.solicitud?.payload?instanciaProceso?.solicitud?.payload:'{}')
  payload.solicitudId = solicitud.id
  const inputRef = useRef()

  const today = format(new Date(), 'dd-MMMM-yyyy', {locale: es})
  const emptyPayload = {
    fecha:         today,
    identificador: solicitud.numeroSolicitud,
    congruencia:   {ponderacion:1, calificacion:1},
    experiencia:   {ponderacion:1, calificacion:1},
    informacion:   {ponderacion:1, calificacion:1},
    resultados:    {ponderacion:1, calificacion:1},
    campo:         {ponderacion:1, calificacion:1},
    laboratorio:   {ponderacion:1, calificacion:1},
    recursos:      payload?.Recursos?.recursos,
    muestras:      payload?.Recursos?.muestras,
    seAutoriza:    false,
    docx: '',
    pdf: '',
    docxLded: '',
    pdfLded: '',
    pdfSigned: '',
  }

  let myPayload = {
    "55000023_Activity_ElaborarInformeMaateWF15": payload?.Solicitud?.target?.payload,
  }[instanciaTarea?.tareaCodigoTarea]

  if(!f.isValid(myPayload)) {
    myPayload = payload
  } else {
    myPayload = JSON.parse(myPayload)
  }

  const [formValues, setFormValues] = useState({...emptyPayload, ...payload[section]})

  const handleChange = (e) => API.handleChange(e, bandeja, setFormValues, formValues)

  const informeTecnico = '56002006-1'

  if(!!instanciaProceso.id && !!instanciaTarea.id) {

    const toBPM = {
      "criterioTecnicoMaate": false,
      "informeCompletoMaate": true,
      "informacionTerritorioMaate": false,
      "amplicacionInformacionMaate": false
    }

    const [counter, setCounter] = useState(-1)  // updating counter

    const [resultado, setResultado] = useState(0)

    const [ponderacion, setPonderacion] = useState(0)

    useEffect(() => {
      setCounter(counter + 1)
      const mResultado = formValues.laboratorio.ponderacion * formValues.laboratorio.calificacion/5 +
        formValues.campo.ponderacion * formValues.campo.calificacion/5 +
        formValues.resultados.ponderacion * formValues.resultados.calificacion/5 +
        formValues.informacion.ponderacion * formValues.informacion.calificacion/5 +
        formValues.experiencia.ponderacion * formValues.experiencia.calificacion/5 +
        formValues.congruencia.ponderacion * formValues.congruencia.calificacion/5
      setResultado(mResultado.toFixed(1))

      const mPonderacion = formValues.laboratorio.ponderacion  +
        formValues.campo.ponderacion +
        formValues.resultados.ponderacion +
        formValues.informacion.ponderacion +
        formValues.experiencia.ponderacion +
        formValues.congruencia.ponderacion
      setPonderacion(mPonderacion)
    }, [ formValues])

    const [myTab, setMytab] = useState('1');

    const handleChangeTab = (event, newTab) => {
      setMytab(newTab)
    }

    const nombreOrganizacion = perfilUsuario?.perfil?.organizacion?.nombreOrganizacion

    const [recursoSelected, setRecursoSelected] = useState({})

    const subfolder = `informe-tecnico-${nombreOrganizacion}`
    const filename = `informe-tecnico-${formValues.identificador}-${nombreOrganizacion}`
    const filenamePDF = `${filename}.pdf`
    const filenameDOCX = `${filename}.docx`
    const filenameDOCXuploaded = `${filename}-upld.docx`
    const filenamePDFuploaded = `${filename}-upld.pdf`
    const filenamePDFsigned = `${filename}-firmado.pdf`
    const inputRef = useRef()

    const autorizador = funcionarios.filter(it => it.idPerfil === 1143)[0]

    return <>
      <Box sx={{...accordeonBox.container, pt:'2rem', height: '100%'}}>
        <AppBar position='fixed'
                color='primary'
                elevation={0}
                sx={{top:'64px', bottom:'auto', margin: 0, padding:0, backgroundColor:'rgba(148, 193, 32, 0.8)'}} >
          <SectionTitle title={`Informe Técnico`} onClick={()=> {dispatch(handleClear())}}/>
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
                <MySubtitle subtitle={'Calificación de la propuesta'} />
              </Grid>

              <Grid item xs={12} >
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell width={'55%'}>Evaluación Técnica</TableCell>
                        <TableCell align="right" width={'15%'}>Ponderación</TableCell>
                        <TableCell align="right" width={'15%'}>Calificación</TableCell>
                        <TableCell align="right" width={'15%'}>Valor</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow key={'1'} sx={{height:'3rem'}}>
                        <TableCell component="th" scope="row">
                          {'Congruencia de la información presentada (título, antecedentes, justificación, objetivos)'}
                        </TableCell>
                        <TableCell align="right">
                          <Select id="congruencia.ponderacion"
                                  value={formValues.congruencia.ponderacion}
                                  onChange={(e) => {
                                    formValues.congruencia.ponderacion = e.target.value
                                    setFormValues({...formValues})
                                  }}>{range20}</Select>
                        </TableCell>
                        <TableCell align="right">
                          <Select id="congruencia.calificacion"
                                  value={formValues.congruencia.calificacion}
                                  onChange={(e) => {
                                    formValues.congruencia.calificacion = e.target.value
                                    setFormValues({...formValues})
                                  }}>{range5}</Select>
                        </TableCell>
                        <TableCell align="right">
                          {(formValues.congruencia.ponderacion*formValues.congruencia.calificacion/5).toFixed(1)}
                        </TableCell>
                      </TableRow>

                      <TableRow key={'2'} sx={{height:'3rem'}}>
                        <TableCell component="th" scope="row">
                          {'Experiencia relacionada del equipo técnico'}
                        </TableCell>
                        <TableCell align="right">
                          <Select id="experiencia.ponderacion"
                                  value={formValues.experiencia.ponderacion}
                                  onChange={(e) => {
                                    formValues.experiencia.ponderacion = e.target.value
                                    setFormValues({...formValues})
                                  }}>{range20}</Select>
                        </TableCell>
                        <TableCell align="right">
                          <Select id="experiencia.calificacion"
                                  value={formValues.experiencia.calificacion}
                                  onChange={(e) => {
                                    formValues.experiencia.calificacion = e.target.value
                                    setFormValues({...formValues})
                                  }}>{range5}</Select>
                        </TableCell>
                        <TableCell align="right">
                          {(formValues.experiencia.ponderacion*formValues.experiencia.calificacion/5).toFixed(1)}
                        </TableCell>
                      </TableRow>

                      <TableRow key={'3'} sx={{height:'3rem'}}>
                        <TableCell component="th" scope="row">
                          {'Información detallada de los especímenes a ser investigados'}
                        </TableCell>
                        <TableCell align="right">
                          <Select id="informacion.ponderacion"
                                  value={formValues.informacion.ponderacion}
                                  onChange={(e) => {
                                    formValues.informacion.ponderacion = e.target.value
                                    setFormValues({...formValues})
                                  }}>{range20}</Select>
                        </TableCell>
                        <TableCell align="right">
                          <Select id="informacion.calificacion"
                                  value={formValues.informacion.calificacion}
                                  onChange={(e) => {
                                    formValues.informacion.calificacion = e.target.value
                                    setFormValues({...formValues})
                                  }}>{range5}</Select>
                        </TableCell>
                        <TableCell align="right">
                          {(formValues.informacion.ponderacion*formValues.informacion.calificacion/5).toFixed(1)}
                        </TableCell>
                      </TableRow>

                      <TableRow key={'4'} sx={{height:'3rem'}}>
                        <TableCell component="th" scope="row">
                          {'Resultados esperados concuerdan con los objetivos propuestos'}
                        </TableCell>
                        <TableCell align="right">
                          <Select id="resultados.ponderacion"
                                  value={formValues.resultados.ponderacion}
                                  onChange={(e) => {
                                    formValues.resultados.ponderacion = e.target.value
                                    setFormValues({...formValues})
                                  }}>{range20}</Select>
                        </TableCell>
                        <TableCell align="right">
                          <Select id="resultados.calificacion"
                                  value={formValues.resultados.calificacion}
                                  onChange={(e) => {
                                    formValues.resultados.calificacion = e.target.value
                                    setFormValues({...formValues})
                                  }}>{range5}</Select>
                        </TableCell>
                        <TableCell align="right">
                          {(formValues.resultados.ponderacion*formValues.resultados.calificacion/5).toFixed(1)}
                        </TableCell>
                      </TableRow>

                      <TableRow key={'5'} sx={{height:'3rem'}}>
                        <TableCell component="th" scope="row">
                          {'Metodología detallada para recolección y preservación de especímenes en campo'}
                        </TableCell>
                        <TableCell align="right">
                          <Select id="campo.ponderacion"
                                  value={formValues.campo.ponderacion}
                                  onChange={(e) => {
                                    formValues.campo.ponderacion = e.target.value
                                    setFormValues({...formValues})
                                  }}>{range20}</Select>
                        </TableCell>
                        <TableCell align="right">
                          <Select id="campo.calificacion"
                                  value={formValues.campo.calificacion}
                                  onChange={(e) => {
                                    formValues.campo.calificacion = e.target.value
                                    setFormValues({...formValues})
                                  }}>{range5}</Select>
                        </TableCell>
                        <TableCell align="right">
                          {(formValues.campo.ponderacion*formValues.campo.calificacion/5).toFixed(1)}
                        </TableCell>
                      </TableRow>

                      <TableRow key={'6'} sx={{height:'3rem'}}>
                        <TableCell component="th" scope="row">
                          {'Metodología detallada para trabajo en laboratorio'}
                        </TableCell>
                        <TableCell align="right">
                          <Select id="laboratorio.ponderacion"
                                  value={formValues.laboratorio.ponderacion}
                                  onChange={(e) => {
                                    formValues.laboratorio.ponderacion = e.target.value
                                    setFormValues({...formValues})
                                  }}>{range20}</Select>
                        </TableCell>
                        <TableCell align="right">
                          <Select id="laboratorio.calificacion"
                                  value={formValues.laboratorio.calificacion}
                                  onChange={(e) => {
                                    formValues.laboratorio.calificacion = e.target.value
                                    setFormValues({...formValues})
                                  }}>{range5}</Select>
                        </TableCell>
                        <TableCell align="right">
                          {(formValues.laboratorio.ponderacion*formValues.laboratorio.calificacion/5).toFixed(1)}
                        </TableCell>
                      </TableRow>

                      <TableRow key={'7'} sx={{height:'3rem'}}>
                        <TableCell />
                        <TableCell />
                        <TableCell >Resultado</TableCell>
                        <TableCell align="right" >{resultado}</TableCell>
                      </TableRow>

                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              {
                resultado > 100 ?
                  <Grid item xs={12}>
                    <Typography>El resultado no puede ser superior a 100</Typography>
                  </Grid>:null
              }
              {
                ponderacion !== 100 ?
                  <Grid item xs={12}>
                    <Typography>La suma de ponderaciones debe ser igual a 100</Typography>
                  </Grid>:null
              }
              <Grid item xs={12} sx={dialog.titleContainer}>
                <MySubtitle subtitle={'Cantidades Autorizadas'} />
              </Grid>
              {f.isValid(formValues.recursos)?
                <Grid item xs={12}>
                  <MyTableRecursos id={'recursos'}
                                   formValues={formValues}
                                   setFormValues={setFormValues}
                                   muestras={formValues.muestras}
                                   columnName={'Recursos'}
                                   canEdit={false}
                                   setRecursoSelected={setRecursoSelected}
                                   canDeleteRow={false} />
                </Grid>:null
              }
              {
                f.isValid(recursoSelected.scientificname)?
                  <>
                    <Grid item xs={12} sx={dialog.titleContainer}>
                      <MySubtitle subtitle={'Muestras y submuestras'} />
                    </Grid>
                    <Grid item xs={12} >
                      {recursoSelected.scientificname}
                    </Grid>
                    <Grid item xs={12} >
                      <MyTableMuestras id={'muestras'}
                                       selected={recursoSelected}
                                       formValues={formValues}
                                       setFormValues={setFormValues}
                                       canEdit={true}
                                       mode={'cantidades'}
                                       muestras={muestras} />
                    </Grid>
                  </>:null
              }

              <Grid item xs={12} sx={dialog.titleContainer}>
                <MySubtitle subtitle={'Informe'} />
              </Grid>
              <Grid item xs={12} style={{padding:'0'}}>
                <Stack direction={'row'} justifyContent="space-between" alignItems="center" spacing={2}>
                  <MyReadOnlyTextField id={'fecha'} label={'Fecha'} icon={<CalendarMonthIcon  sx={dialog.readOnlyIcon} />} value={formValues.fecha} />
                  <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={1} style={{padding:'0 24px 0 8rem'}}>
                    {/*<MyReadOnlyTextField id={'identificador'}*/}
                    {/*                     label={'Identificador'}*/}
                    {/*                     icon={<AssignmentIndOutlinedIcon  sx={dialog.readOnlyIcon} />}*/}
                    {/*                     value={formValues.identificador} />*/}
                    {
                      formValues.docx !== '' &&
                      <ButtonGroup variant={'contained'}>
                        <MyButtonBacan3 label={''}
                                        width={'3rem'}
                                        onClick={() => {
                                          setFormValues({
                                            ...formValues,
                                            docx: '',
                                            pdf: '',
                                            docxLded: '',
                                            pdfLded: '',
                                            pdfSigned: '',
                                          })
                                        }}
                                        icon={RestartAltIcon}/>
                      </ButtonGroup>
                    }
                    {
                      formValues.docx === '' &&
                      <ButtonGroup variant={'contained'}>
                        <MyButtonBacan3 label={'Generar Informe'}
                                        width={'11rem'}
                                        onClick={() => {
                                          const doc = DocxInformeTecnicoMaate({
                                            solicitud,
                                            formValues,
                                            myPayload,
                                            perfilUsuario,
                                            autorizador,
                                          })
                                          API.genDocxAnPdf({
                                            solicitudId: instanciaProceso?.solicitud?.id,
                                            document: doc,
                                            formValues,
                                            setFormValues,
                                            subfolder,
                                            filename: filenameDOCX,
                                          })
                                        }}
                                        icon={MiscellaneousServicesIcon} />
                      </ButtonGroup>
                    }
                    {
                      formValues.docx !== '' &&
                      <ButtonGroup variant={'contained'}>
                        <MyButtonBacan3 label={'DOCX'}
                                        icon={FileDownloadIcon}
                                        onClick={() => API.fetchDownloadDOCX({
                                          solicitudId: instanciaProceso?.solicitud?.id,
                                          subfolder,
                                          filename: (formValues.docxLded !== '') ? formValues.docxLded : formValues.docx,
                                        })}
                                        width={'5rem'} />
                        <MyButtonBacan3 label={'PDF'}
                                        icon={FileDownloadIcon}
                                        onClick={() => API.fetchDownloadPDF({
                                          solicitudId: instanciaProceso?.solicitud?.id,
                                          subfolder,
                                          filename: (formValues.pdfLded !== '') ? formValues.pdfLded : formValues.pdf
                                        })}
                                        width={'5rem'} />
                      </ButtonGroup>
                    }
                    {
                      formValues.docx !== '' &&
                      <ButtonGroup variant={'contained'}>
                        <MyFileUploadButton inputRef={inputRef}
                                            label={'DOCX'}
                                            solicitudId={instanciaProceso?.solicitud?.id}
                                            subfolder={subfolder}
                                            fileName={filenameDOCXuploaded}
                                            afterUpload={() => {
                                              API.fetchDocx2PDF(instanciaProceso?.solicitud?.id, subfolder, filenameDOCXuploaded).then(result2 => {
                                                if(f.isValid(result2.rutaDocumento)) {
                                                  const arr2 = result2.rutaDocumento.split('/')
                                                  setFormValues({...formValues, docxLded: filenameDOCXuploaded, pdfLded: arr2[arr2.length-1],})
                                                } else {
                                                  setFormValues({...formValues, docxLded: filenameDOCXuploaded, pdfLded: '',})
                                                }
                                              })
                                            }}
                                            width={'5rem'} />
                      </ButtonGroup>
                    }
                    {
                      formValues.docx !== '' &&
                      <ButtonGroup variant={'contained'}>
                        <MyFileUploadButton inputRef={inputRef}
                                            label={'PDF firmado'}
                                            solicitudId={instanciaProceso?.solicitud?.id}
                                            subfolder={subfolder}
                                            fileName={filenamePDFsigned}
                                            afterUpload={() => setFormValues({...formValues, pdfSigned: filenamePDFsigned})}
                                            width={'9rem'} />
                        {
                          formValues.pdfSigned !== '' && <MyButtonBacan3 label={''}
                                                                         icon={FileDownloadIcon}
                                                                         onClick={() => API.fetchDownloadPDF({
                                                                           solicitudId: instanciaProceso?.solicitud?.id,
                                                                           subfolder,
                                                                           filename: filenamePDFsigned,
                                                                         })}
                                                                         width={'3rem'}/>
                        }
                      </ButtonGroup>
                    }
                  </Stack>
                </Stack>
              </Grid>

              {
                !formValues.docx === '' ?
                  <Grid item xs={12} style={{padding: '0 24px 0 32px'}}>
                    <Typography>Falta generar INFORME</Typography>
                  </Grid> : null
              }
              <Grid item xs={12}>
                <Box sx={{p:'2rem 0 2rem 2rem'}}>
                  <MySwitch id={'seAutoriza'}
                            canEdit={true}
                            label={'¿Se aprueba el Informe Técnico y/o el uso de los recursos solicitados para las cantidades autorizadas?'}
                            formValues={formValues}
                            fullWidth={false}
                            handleChange={(e) => {
                              setFormValues({...formValues, seAutoriza: e.target.checked})
                            }} />
                </Box>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value="2">
            <P0102PayloadRO payload={myPayload} />
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
                       alignItems='center' sx={{p:'0 2rem 0 3rem'}}>
                  <MyGobackButton onGoback={() => dispatch(handleClear())} />
                  <MySaveButton onSave={() => {
                                  payload[section]={...formValues}
                                  setCounter(0)
                                  dispatch(handleSaveSolicitud(instanciaProceso?.id,payload))
                                }}
                                disabled={counter <= 0} />
                  <MySendButton onSend={ () => {
                                  const metadata = JSON.stringify({
                                    "solicitudId":`${instanciaProceso?.solicitud?.id}`,
                                    ...toBPM
                                  })
                                  dispatch(handCompletarTareaCoordinador(instanciaProceso.id, instanciaTarea, perfilUsuario.id, metadata))
                                }}
                                label={'enviar'}
                                disabled={counter > 0 || formValues.pdfSigned === ''} />
                </Stack>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  }
  else {
    return null
  }
}
