import React, {useState, useEffect} from 'react'
import {accordeonBox, dialog} from "../../styles/styles";
import {AppBar, CssBaseline, Grid, Stack} from "@mui/material";
import {SectionTitle} from "../../components/SectionTitle";
import Box from "@mui/material/Box";
import {MySubtitle} from "../../components/MySubtitle";
import {useDispatch, useSelector} from "react-redux";
import {MySwitch} from "../../components/MySwitch";
import API from "../App/API";
import {Solicitante} from "../P01Solicitud/subcomponents/Solicitante";
// import Autorizacion from "../P01Solicitud/subcomponents/Autorizacion";
import Toolbar from "@mui/material/Toolbar";
import {MyGobackButton, MySaveButton} from "../../components/MyCommonButtons";
import {handCompletarTareaAndSalir, handleClear, handleSaveSolicitud} from "../App/sliceApp";
import {MySendButton} from "../../components/MySendButton";
import {f} from "../../commons";
import Autorizacion from "../P01Solicitud/subcomponents/Autorizacion";
import {MyUpload} from "../../components/MyUpload";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {MyReadOnlyTextField} from "../../components/MyReadOnlyTextField";

export default ({instanciaTarea, instanciaProceso, solicitud, perfilUsuario}) => {
  const slct = {...solicitud, payload : JSON.parse(solicitud.payload)}
  slct.payload.Solicitud.solicitudAprobada = JSON.parse(slct.payload.Solicitud.solicitudAprobada)
  const mp = slct.payload.Solicitud.solicitudAprobada
  const atmSolicitud = JSON.parse(mp.father.payloadSolicitud)?.Solicitud
  const section = 'Validacion'
  const dispatch = useDispatch()
  const bandeja = useSelector(state => state.app.bandeja)
  const payload = f.isValid(solicitud.payload)?JSON.parse(solicitud.payload):{}

  const emptyPayload = {
    requisito01: false,
    requisito02: false,
    requisito03: false,
    requisito04: false,
    seAprueba:   false,
  }

  const [formValues, setFormValues] = useState({...emptyPayload, ...payload[section]})

  const handleChange = (e) => API.handleChange(e, bandeja, setFormValues, formValues)

  const [counter, setCounter] = useState(-1)  // updating counter

  useEffect(() => {
    setCounter(counter + 1)
  }, [formValues])

  return(
    <Box sx={accordeonBox.container}>
      <AppBar position='fixed'
              color='primary'
              elevation={0}
              sx={{top:'64px', bottom:'auto', margin: 0, padding:0, backgroundColor:'rgba(148, 193, 32, 0.8)'}} >
        <SectionTitle title={'Verificación de requisitos de permiso de exportación de recursos'} />
      </AppBar>
      <Grid container spacing={1} sx={{...accordeonBox.container2, pt:'2rem'}}>
        <Grid item xs={12} sx={dialog.titleContainer}>
          <MySubtitle subtitle={'Solicitud'} />
        </Grid>
        <Grid item xs={12}>
          <Stack direction={'row'} spacing={1} justifyContent='space-between' alignItems='center' >
          <MyReadOnlyTextField id={'numeroSolicitud'}
                               label={'Número solicitud'}
                               value={slct.numeroSolicitud}
                               icon={<LocalShippingIcon  sx={{fontSize: '14px', color:'silver', mr:'0.8rem'}} />} />
          <MyReadOnlyTextField id={'fecha'}
                               label={'Fecha'}
                               value={slct.payload.Solicitud.fecha}
                               icon={<CalendarMonthIcon  sx={{fontSize: '14px', color:'silver', mr:'0.8rem'}} />} />
          </Stack>
        </Grid>
        <Solicitante solicitud={{solicitud: {payload: mp}}} displayContact={false}/>
        <Autorizacion solicitud={{numeroSolicitud: formValues.aprobadaIdentificador, payload: mp}} />

        <Grid item xs={12} sx={dialog.titleContainer}>
          <MySubtitle subtitle={'Respaldos'} />
        </Grid>
        <Grid item xs={12}>
          <Stack direction={'row'} spacing={1} justifyContent="space-between" alignItems='center'>
          <MyUpload id={'permisoExportacion'}
                    label={'Permiso de exportación: *'}
                    dir={instanciaProceso?.solicitud?.id}
                    canEdit={false}
                    formValues={slct.payload.Solicitud} />
          <MyUpload id={'atm'}
                    dir={mp.father.idSolicitud}
                    label={'Acuerdo de transferencia de material *'}
                    formValues={atmSolicitud}
                    canEdit={false} />
          </Stack>
        </Grid>

        <Grid item xs={12} sx={dialog.titleContainer}>
          <MySubtitle subtitle={'Requisitos'} />
        </Grid>
        <Grid item xs={12} style={{padding:'0.5rem 2rem 0.5rem 0.6rem'}}>
          <MySwitch id={'requisito01'}
                    label={'¿La exportación ha sido debidamente autorizada por la entidad competente, conforme la normativa ecuatoriana vigente.?'}
                    formValues={formValues}
                    setFormValues={setFormValues}
                    handleChange={handleChange}
                    canEdit={true}/>
        </Grid>
        <Grid item xs={12} style={{padding:'0.5rem 2rem 0.5rem 0.6rem'}}>
          <MySwitch id={'requisito02'}
                    label={'¿La exportación se enmarca en un permiso de investigación/contrato autorizado previamente por la Autoridad competente?'}
                    formValues={formValues}
                    handleChange={handleChange}
                    canEdit={true} />
        </Grid>
        <Grid item xs={12} style={{padding:'0.5rem 2rem 0.5rem 0.6rem'}}>
          <MySwitch id={'requisito03'}
                    label={'¿La exportación se encuentra respaldada en un Acuerdo de Transferencia de Material previamente validado por la SENESCYT?'}
                    formValues={formValues}
                    handleChange={handleChange}
                    canEdit={true} />
        </Grid>
        <Grid item xs={12} style={{padding:'0.5rem 2rem 0.5rem 0.6rem'}}>
          <MySwitch id={'requisito04'}
                    label={'¿La exportación prevé el reporte de los resultados alcanzados.?'}
                    formValues={formValues}
                    handleChange={handleChange}
                    canEdit={true} />
        </Grid>
        <Grid item xs={12} style={{padding:'1.2rem 2rem 0 24px'}}>
          <Stack direction={'row'} spacing={1} justifyContent="flex-end" alignItems='center' >
            <MySwitch id='seAprueba'
                      label={'¿La solicitud cumple con los Requisitos?'}
                      formValues={formValues}
                      fullWidth={false}
                      handleChange={handleChange}
                      canEdit={true} />
          </Stack>
        </Grid>
      </Grid>
      <CssBaseline/>
      <AppBar position='fixed'
              color='primary'
              elevation={0}
              sx={accordeonBox.bottomBar} >
        <Toolbar>
          <Grid container sx={{p:0, mt:'-1rem'}}>
            <Grid item xs={12} >
            <Stack direction={'row'} spacing={1} justifyContent="space-between" alignItems='center' sx={{p:'0 2rem 0 3rem'}}>
              <MyGobackButton onGoback={() => dispatch(handleClear())} />
              <MySaveButton  onSave={() => {
                               payload[section]=formValues
                               setCounter(0)
                               dispatch(handleSaveSolicitud(instanciaProceso?.id, payload))
                             }}
                             disabled={counter <= 0} />
              <MySendButton onSend={() => {
                              const metadata = JSON.stringify({
                                  "solicitudId":`${instanciaProceso?.solicitud?.id}`,
                                  "cumpleRequisitos": formValues.seAprueba
                                })
                              dispatch(handCompletarTareaAndSalir(instanciaProceso.id, instanciaTarea, perfilUsuario.id, metadata))
                            }}
                            label={'Enviar'}
                            myTip={'Enviar y continuar el proceso'}
                            disabled={counter > 0} />
            </Stack>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
