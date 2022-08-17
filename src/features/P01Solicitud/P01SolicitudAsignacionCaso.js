import React, {useState, useEffect} from 'react'
import {AppBar, Box, CssBaseline, Grid, Stack, Tab} from '@mui/material'

import {accordeonBox} from 'src/styles/styles'
import {useDispatch, useSelector} from 'react-redux'
import Solicitud from 'src/features/P01Solicitud/subcomponents/Solicitud'
import API from 'src/features/App/API'
import {handCompletarTareaAndSalir, handleClear, handleSaveSolicitud} from "src/features/App/sliceApp";
import {SectionTitle} from "src/components/SectionTitle";
import {MySendButton} from "src/components/MySendButton";
import {dialog} from 'src/styles/styles'
import {MyGobackButton, MySaveButton} from 'src/components/MyCommonButtons'
import {MyTableAnalistas} from "src/components/MyTableAnalistas";
import {MyAreaTextField} from "src/components/MyAreaTextField";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import {f} from 'src/commons'
import {MySubtitle} from 'src/components/MySubtitle'
import Toolbar from "@mui/material/Toolbar";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {P0102PayloadRO} from 'src/features/P01Solicitud/P0102PayloadRO'
import {P10ATMRO} from 'src/features/P10ATM/P10ATMRO'

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const dispatch = useDispatch()
  const instanciaTarea = useSelector(state => state.app.instanciaTarea)
  const instanciaProceso = useSelector(state => state.app.instanciaProceso)
  const solicitud = {...instanciaProceso.solicitud}
  const perfilUsuario = useSelector(state => state.app.perfilUsuario)
  const section = `T${instanciaTarea.tareaCodigoTarea}`
  let payload = !!solicitud.payload?JSON.parse(solicitud.payload):{}
  payload.solicitudId = solicitud.id

  let Sltd = {
    '55000006_Activity_AsignarCaso': P10ATMRO,
  }[instanciaTarea.tareaCodigoTarea]

  if(!f.isValid(Sltd)) { Sltd = P0102PayloadRO }

  const nextTarea = {
    '55000015_Activity_AsignarCasoWF0102':         {next_tarea: '55000006_Activity_ValidarATM', perfil_id: 1141},
    '55000002_Activity_AsignarCaso':               {next_tarea: '55000002_Activity_VerificarCumplimientoRequisitos', perfil_id: 1141},
    '55000015_Activity_AsignarCasoSenadiWF0102':   {next_tarea: '55000002_Activity_ElaborarInformeTecnicoSenadi', perfil_id: 1150},
    '55000015_Activity_AsignarCasoMaateWF0102':    {next_tarea: '55000002_Activity_ElaborarInformeTecnicoMaate', perfil_id: 1145},
    '55000006_Activity_AsignarCaso':               {next_tarea: '55000006_Activity_ValidarATM', perfil_id: 1141},
    '55000012_Activity_AsignarCasoWF11':           {next_tarea: '55000012_Activity_VerificarRequisitosWF11', perfil_id: 1141},
    '55000017_Activity_AsignarCasoWF0405':         {next_tarea: '55000017_Activity_VerificarCumplimientoRequisitosWF0405', perfil_id: 1141},
    '55000017_Activity_AsignarCasoMaateWF0405':    {next_tarea: '55000017_Activity_ElaborarInformeTecnicoMaateWF0405', perfil_id: 1141},
    '55000017_Activity_AsignarCasoSenadiWF0405':   {next_tarea: '55000017_Activity_ElaborarInformeTecnicoSenadiWF0405', perfil_id: 1141},
    '55000019_Activity_AsignarCasoWF13':           {next_tarea: '55000019_Activity_ActualizarVigenciaAutorizacionWF13', perfil_id: 1141},
    '55000023_Activity_AsignarCasoSenescytWF15':   {next_tarea: '55000023_Activity_RealizarMonitoreoWF15', perfil_id: 1141},
    '55000023_Activity_AsignarCasoMaateWF15':      {next_tarea: '55000023_Activity_ElaborarInformeMaateWF15', perfil_id: 1145},
    '55000023_Activity_AsignarCasoSenadiWF15':     {next_tarea: '55000023_Activity_ElaborarInformeSenadiWF15', perfil_id: 1145},
    '55000010_Activity_AsignarCasoSenescytWF09':   {next_tarea: '55000010_Activity_ValidarSolicitudWF09', perfil_id: 1145},
    '55000010_Activity_AsignarCasoMaateWF09':      {next_tarea: '55000010_Activity_ElaborarInformeTecnicoMaateWF09', perfil_id: 1145},
    '55000025_Activity_AsignarCasoSenescyt_WF16':  {next_tarea: '55000025_Activity_VerificarRequisitos_WF16', perfil_id: 1145},
    '55000025_Activity_AsignarCasoMaate_WF16':     {next_tarea: '55000025_Activity_ElaborarInformeMaate_WF16', perfil_id: 1141},
    '55000025_Activity_AsignarCasoSenadi_WF16':    {next_tarea: '55000025_Activity_ElaborarInformeSenadi_WF16', perfil_id: 1141},
    '55000027_Activity_AsignarCasoSenescyt_WF17':  {next_tarea: '55000027_Activity_EvaluarAutorizacion_WF17', perfil_id: 1141},
    '55000027_Activity_AsignarCasoMaate_WF17':     {next_tarea: '55000027_Activity_EmitirInformeMaate_WF17', perfil_id: 1145},
    '55000027_Activity_AsignarCasoSenadi_WF17':    {next_tarea: '55000027_Activity_EmitirInformeMaate_WF17', perfil_id: 1150},
  }[instanciaTarea.tareaCodigoTarea]

  const tituloTarea = {
    '55000015_Activity_AsignarCasoWF0102':        'Solicitud Asignación Caso',
    '55000002_Activity_AsignarCaso':              'Solicitud Asignación Caso',
    '55000015_Activity_AsignarCasoSenadiWF0102':  'Solicitud Asignación Caso [SENADI]',
    '55000015_Activity_AsignarCasoMaateWF0102':   'Solicitud Asignación Caso [MAATE]',
    '55000006_Activity_AsignarCaso':              'Asignar Caso ATM',
    '55000012_Activity_AsignarCasoWF11':          'Asignar Caso Permiso de Exportación',
    '55000017_Activity_AsignarCasoMaateWF0405':   'Asignar Caso',
    '55000017_Activity_AsignarCasoSenadiWF0405':  'Asignar Caso',
    '55000019_Activity_AsignarCasoWF13':          'Actualizare Vigencia',
    '55000023_Activity_AsignarCasoSenescytWF15':  'Realizar Monitores',
    '55000023_Activity_AsignarCasoMaateWF15':     'Realizar Monitores',
    '55000023_Activity_AsignarCasoSenadiWF15':    'Realizar Monitores',
    '55000010_Activity_AsignarCasoSenescytWF09':  'Validar solicitud salida de Holotipos',
    '55000010_Activity_AsignarCasoMaateWF09':     'Asignar caso [MAATE]',
    '55000025_Activity_AsignarCasoSenescyt_WF16': 'Asignar caso de cierre de autorización',
    '55000025_Activity_AsignarCasoMaate_WF16':    'Asignar informe técnico cierre de autorización',
    '55000025_Activity_AsignarCasoSenadi_WF16':   'Asignar informe técnico cierre de autorización',
    '55000027_Activity_AsignarCasoSenescyt_WF17': 'Asignar Caso',
    '55000027_Activity_AsignarCasoMaate_WF17':    'Asignar Caso',
    '55000027_Activity_AsignarCasoSenadi_WF17':   'Asignar Caso',
  }[instanciaTarea.tareaCodigoTarea]

  const [asignantes, setAsignantes] = useState([])

  useEffect(() => {
    API.fetchPerfilesUsuariosByPerfil(nextTarea.perfil_id).then((resultado) => {
      setAsignantes(resultado)
    })
  }, [nextTarea.perfil_id]);

  const [formValues, setFormValues] = useState({selected: null, observaciones:'', ...payload[section]})

  const [counter, setCounter] = useState(-1)  // updating counter

  useEffect(() => {
    setCounter(counter + 1)
  }, [formValues])

  const [myTab, setMytab] = useState('1');

  const handleChangeTab = (event, newTab) => {
    setMytab(newTab)
  }

  // console.log('0001 :: ', formValues)

  if(f.isValid(instanciaProceso.id) && f.isValid(instanciaTarea.id)) {
    return (
      <Box sx={{...accordeonBox.container, pt:'2rem', height: '100%'}}>
        <AppBar position='fixed'
                color='primary'
                elevation={0}
                sx={{top:'64px', bottom:'auto', margin: 0, padding:0, backgroundColor:'rgba(148, 193, 32, 0.8)'}} >
            <SectionTitle title={tituloTarea} />
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
                <MySubtitle subtitle={'Analistas'} />
              </Grid>
              <Grid item xs={12} sx={{ margin:'8px 28px 0px 20px'}}>
                <MyTableAnalistas id={'selected'}
                                  formValues={formValues}
                                  setFormValues={setFormValues}
                                  selected={formValues.selected}
                                  items={asignantes} />
              </Grid>
              <Grid item xs={12} sx={{ margin:'8px 28px 16px 20px'}}>
                <MyAreaTextField id='observaciones'
                                 label={'Observaciones'}
                                 formValues={formValues}
                                 setFormValues={setFormValues}
                                 icon={<ArticleOutlinedIcon sx={dialog.textFieldIcon} />}
                                 handleChange={(e) => {
                                   setFormValues({...formValues, ['observaciones']:e.target.value})
                                 }} />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value="2">
            <Sltd  payload={payload} />
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
                       alignItems='center'>
                  <MyGobackButton onGoback={() => dispatch(handleClear())} />
                  <MySaveButton onSave={
                    () => {
                      payload[section]=formValues
                      setCounter(0)
                      dispatch(handleSaveSolicitud(instanciaProceso?.id,payload))
                    }
                  } disabled={counter === 0}/>
                  {
                    f.isValid(formValues['selected'])?
                      <MySendButton onSend={() => {
                                      const metadata = JSON.stringify({
                                        "solicitudId":`${instanciaProceso?.solicitud?.id}`,
                                        "perfilUsuarioIdSelected":`${formValues.selected}`
                                      })
                                      dispatch(handCompletarTareaAndSalir(instanciaProceso.id, instanciaTarea, perfilUsuario.id, metadata))
                                    }}
                                    label={'Asignar'}
                                    myTip={'Asiganar y avanzar a la siguiente tarea del proceso'}
                                    disabled={counter > 0 || formValues.selected === -1}/> : null
                  }
                </Stack>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
    )
  }
  else {
    return null
  }
}
