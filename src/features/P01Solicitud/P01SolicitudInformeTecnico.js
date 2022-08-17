import React, {useEffect, useRef, useState} from 'react'
import {AppBar, Box, ButtonGroup, CssBaseline, Grid, Stack, Tab, Typography} from '@mui/material'
import {accordeonBox, dialog} from 'src/styles/styles'
import API from 'src/features/App/API'
import {useDispatch, useSelector} from 'react-redux'
import Solicitud from "src/features/P01Solicitud/subcomponents/Solicitud";
import {
  handCompletarTareaCoordinador,
  handleClear,
  handleSaveSolicitud
} from "src/features/App/sliceApp";
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
import Toolbar from "@mui/material/Toolbar";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import GLOBALS from "../App/globals";
import {f} from "../../commons";
import Button from "@mui/material/Button";
import RobotoCondensedRegular from '../../styles/MyFonts/Roboto_Condensed/RobotoCondensed-Regular.ttf'
import UploadIcon from '@mui/icons-material/Upload'
import {P0102PayloadRO} from 'src/features/P01Solicitud/P0102PayloadRO'
import {Document, Footer, Header, Packer} from 'docx'
import {saveAs} from 'file-saver'
import {
  createLogoFooterSenescyt,
  createLogoHeaderSenescyt,
  dxC1C2,
  dxParagraph,
  dxTextRun,
  dxTitle
} from "../../components/MyDocx";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices'
import {DocxInformeTecnico} from "./subcomponents/DocxInformeTecnico";
import {MyButtonBacan3} from "../../components/MyButtonBacan3";
import {MyFileUploadButton} from "../../components/MyFileUploadButton";
import RestartAltIcon from '@mui/icons-material/RestartAlt';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const dispatch = useDispatch()
  const perfilUsuario = useSelector(state => state.app.perfilUsuario)
  const section = `InformeTecnico${perfilUsuario?.perfil?.organizacion?.nombreOrganizacion}`
  const bandeja = useSelector(state => state.app.bandeja)
  const instanciaTarea = useSelector(state => state.app.instanciaTarea)
  const instanciaProceso = useSelector(state => state.app.instanciaProceso)
  const solicitud = {...instanciaProceso.solicitud}
  let payload = JSON.parse(!!instanciaProceso?.solicitud?.payload?instanciaProceso?.solicitud?.payload:'{}')
  payload.solicitudId = solicitud.id
  const funcionarios = useSelector(state => state.app.funcionarios)
  const inputRef = useRef()

  const today = format(new Date(), 'dd-MMMM-yyyy', {locale: es})
  const emptyPayload = {
    fecha: today,
    identificador: solicitud.numeroSolicitud,
    docx: '',
    pdf: '',
    docxLded: '',
    pdfLded: '',
    pdfSigned: '',
  }

  let myPayload = {
    "55000023_Activity_ElaborarInformeSenadiWF15": payload?.Solicitud?.target?.payload,
  }[instanciaTarea?.tareaCodigoTarea]

  if(!f.isValid(myPayload)) {
    myPayload = payload
  } else {
    myPayload = JSON.parse(myPayload)
  }

  const [formValues, setFormValues] = useState({...emptyPayload, ...payload[section]})

  const handleChange = (e) => API.handleChange(e, bandeja, setFormValues, formValues)

  const nombreOrganizacion = perfilUsuario?.perfil?.organizacion?.nombreOrganizacion

  const informeTecnico = {
    'Senadi':   '56002007-1',
    'Senescyt': '56002003-1',
  }[nombreOrganizacion]

  const codigoAutorizador = {
    'Senadi':   1148,
    'Senescyt': 1139,
  }[nombreOrganizacion]
  const autorizador = funcionarios.filter(it => it.idPerfil === codigoAutorizador)[0]

  // const [docx, setDocx] = useState(null)

  // const docs = f.isValid(docx)?[{uri: window.URL.createObjectURL(docx)}]:[{uri: docx}]

  if(!!instanciaProceso.id && !!instanciaTarea.id) {
    const toBPM = {
      '55000015_Activity_ElaborarInformeTecnicoSenescytWF0102': {
        "criterioTecnicoSenescyt": false,
        "informeCompletoSenescyt": true,
        "ampliacionInformacionSenescyt": false
      },
      '55000015_Activity_ElaborarInformeTecnicoSenadiWF0102': {
        "criterioTecnicoSenadi": false,
        "informeCompletoSenadi": true,
        "ampliacionInformacionSenadi": false
      },
      // '55000002_Activity_ElaborarInformeTecnicoMaate': {
      //   "criterioTecnicoMaate": false,
      //   "informeCompletoMaate": true,
      //   "informacionTerritorioMaate": false,
      //   "amplicacionInformacionMaate": false
      // },
      '55000017_Activity_ElaborarInformeTecnicoSenadiWF0405': {
        "criterioTecnicoSenadi": false,
        "informeCompletoSenadi": true,
        "ampliacionInformacionSenadi": false,
        "legitimoPoseedorSenadi": false,
      }
    }[instanciaTarea?.tareaCodigoTarea]

    const [counter, setCounter] = useState(-1)  // updating counter

    useEffect(() => { setCounter(counter + 1) }, [formValues])

    const [myTab, setMytab] = useState('1');

    console.log('- = - - - > ', formValues)

    const handleChangeTab = (event, newTab) => { setMytab(newTab) }

    const subfolder = `informe-tecnico-${nombreOrganizacion}`
    const filename = `informe-tecnico-${formValues.identificador}-${nombreOrganizacion}`
    const filenamePDF = `${filename}.pdf`
    const filenameDOCX = `${filename}.docx`
    const filenameDOCXuploaded = `${filename}-upld.docx`
    const filenamePDFuploaded = `${filename}-upld.pdf`
    const filenamePDFsigned = `${filename}-firmado.pdf`
    const inputRef = useRef()

    return <>
      <Box sx={{...accordeonBox.container, pt:'2rem', height: '100%'}}>
        <AppBar position='fixed'
                color='primary'
                elevation={0}
                sx={{top:'64px', bottom:'auto', margin: 0, padding:0, backgroundColor:'rgba(148, 193, 32, 0.8)'}} >
          <SectionTitle title={`Informe Técnico`} />
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
                <MySubtitle subtitle={'Informe'} />
              </Grid>
              <Grid item xs={5} sx={{pl:'4rem'}}>
                <Box sx={{pl:'1.8rem'}}>
                  <MyReadOnlyTextField id={'fecha'}
                                       label={'Fecha'}
                                       icon={<CalendarMonthIcon sx={{fontSize: '14px', color:'silver', mr:'0.8rem'}} />}
                                       value={formValues.fecha} />
                </Box>
              </Grid>
              <Grid item xs={7} >
                <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={1} style={{padding:'0 24px 0 8rem'}}>
                  {/*<MyReadOnlyTextField id={'identificador'}*/}
                  {/*                     label={'Identificador'}*/}
                  {/*                     icon={<AssignmentIndOutlinedIcon sx={{fontSize: '14px', color:'silver', mr:'0.8rem'}} />}*/}
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
                                          const doc = DocxInformeTecnico({
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
              </Grid>
              {
                formValues.pdfSigned &&
                  <Grid item xs={12} style={{padding: '0 24px 0 32px', height: '50rem'}}>
                    aquí va la presentación del PDF
                  </Grid>
              }
              {
                !formValues.pdfSigned &&
                  <Grid item xs={12} style={{padding: '0 24px 0 32px'}}>
                    <Typography>Falta subir informe firmado</Typography>
                  </Grid>
              }
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
                                  payload[section]=formValues
                                  setCounter(0)
                                  dispatch(handleSaveSolicitud(instanciaProceso?.id,payload))
                                }}
                                disabled={counter <= 0 } />
                  <MySendButton onSend={ () => {
                    const metadata = JSON.stringify({
                                    "solicitudId":`${instanciaProceso?.solicitud?.id}`,
                                    ...toBPM
                                  })
                                  dispatch(handCompletarTareaCoordinador(instanciaProceso.id, instanciaTarea, perfilUsuario.id, metadata))
                                }}
                                label={'enviar'}
                                myTip={'Enviar Informe Técnico y continuar con proceso'}
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
