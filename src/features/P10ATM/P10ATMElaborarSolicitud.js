import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {
  AppBar,
  Box,
  CssBaseline,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import {format} from 'date-fns'
import {es} from 'date-fns/locale'
import {accordeonBox, common, dialog} from 'src/styles/styles'
import {handCompletarTareaAndSalir, handleClear, handleSaveSolicitud} from 'src/features/App/sliceApp'
import {SectionTitle} from 'src/components/SectionTitle'

import {MySubtitle} from 'src/components/MySubtitle'
import {f} from 'src/commons/f'
import FormControl from "@mui/material/FormControl"
import {MyButtonBacan} from 'src/components/MyButtonBacan'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import {MySendButton} from 'src/components/MySendButton'
import {Solicitante} from 'src/features/P01Solicitud/subcomponents/Solicitante'
import {MyTextField} from 'src/components/MyTextField'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import {MyReadOnlyTextField} from "src/components/MyReadOnlyTextField"
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import {MyReabOnlyTableRecursos} from 'src/components/MyReadOnlyTableRecursos'
import {MySwitch} from 'src/components/MySwitch'
import API from 'src/features/App/API'
import {MyUpload} from 'src/components/MyUpload'
import Toolbar from '@mui/material/Toolbar'
import BorderColorIcon from "@mui/icons-material/BorderColor";
import {MyTableMuestras} from "../../components/MyTableMuestras";
import {MyMultipleSelect} from "../../components/MyMultipleSelect";
import {AccountCircle} from "@mui/icons-material";
import Autorizacion from "../P01Solicitud/subcomponents/Autorizacion";

const evaluateRecursos = (recursos, muestras) => {
  let cantidades = 0
  recursos.forEach(it => {
    const m2 = muestras.filter(it4=> it4.taxonid === it.taxonid).forEach(it2 => {
      cantidades += (f.isValid(it2.cantidadSolicitada) ? parseInt(it2.cantidadSolicitada) : 0)
    })
  })
  return cantidades
}

export default ({
                  instanciaTarea,
                  perfilUsuario,
                  instanciaProceso,
                  solicitud,
                  solicitudesAprobadas,
                  canEdit=true
}) => {
  const dispatch = useDispatch()
  const section = 'Solicitud'
  const slct = {...solicitud, payload : JSON.parse(solicitud.payload)}
  slct.payload.Solicitud.solicitudAprobada = JSON.parse(slct.payload.Solicitud.solicitudAprobada)
  const mp = slct.payload.Solicitud.solicitudAprobada
  const payload = f.isValid(solicitud.payload)?JSON.parse(solicitud.payload):{}
  // const mp =f.isValid(payload[section].solicitudAprobada)?JSON.parse(payload[section].solicitudAprobada):{}
  const today = format(new Date(), 'dd-MMMM-yyyy', {locale: es})
  const emptyPayload = {
    fecha: today,
    aprobadaIdentificador: '',
    solicitudAprobada: {},
    recursos: mp.Recursos.recursos,
    muestras: mp.Recursos.muestras,
    plazo: mp.Propuesta.plazo,
    destinoFinal: [],
    condicion1:false, pagina1:0,
    condicion2:false, pagina2:0,
    condicion3:false, pagina3:0,
    condicion4:false, pagina4:0,
    condicion5:false, pagina5:0,
    condicion6:false, pagina6:0,
    atm:'',
    atmAdicional:'',texto: `Yo, ${mp?.Solicitante?.nombresCompletos} portador del documento de identidad ${mp?.Solicitante?.cedula}, en calidad de solicitante, declaro bajo ` +
      'juramento que la información constante en la presente solicitud es verdadera y de mi absoluta ' +
      'responsabilidad. En caso de omitir información, así como en caso de forzar, falsificar, modificar, alterar o ' +
      'introducir cualquier información falsa o corregir el presente documento, asumo toda la responsabilidad ' +
      'administrativa, civil o penal conforme lo establecido por ley.\n\n'+
      'Atención: Por favor revise la información del registro de la solicitud, si está seguro que los datos son ' +
      'correctos acepte y declare la veracidad de toda la información detallada en la presente solicitud y envíe ' +
      'la misma; caso contrario, cierre esta ventana y realice los cambios a través del botón guardar.\n',
    si:                         false,
  }

  const [formValues, setFormValues] = useState({ ...emptyPayload, ...payload[section] })

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
  const handleChange = (e) => API.handleChange2numeric(e, canEdit, setFormValues, formValues)

  const cantidades = evaluateRecursos(formValues.recursos, formValues.muestras)

  if(f.isValid(solicitudesAprobadas)) {
    return (
      <Box sx={{...accordeonBox.container, pt:'2rem', height: '100%'}}>
        <AppBar position='fixed'
                color='primary'
                elevation={0}
                sx={{top:'64px', bottom:'auto', margin: 0, padding:0, backgroundColor:'rgba(148, 193, 32, 0.8)'}} >
          <SectionTitle title={'Solicitud de Acuerdo de Transferencia ATM'} />
        </AppBar>
        <Grid container spacing={1} sx={{...accordeonBox.container2, mb:'4rem'}}>
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
            <MySubtitle subtitle={'Solicitud'} />
          </Grid>
          <Grid item xs={6}>
            <MyReadOnlyTextField id={'fecha'}
                                 label={'Fecha'}
                                 value={formValues.fecha}
                                 icon={<CalendarMonthIcon sx={{fontSize: '14px', color:'silver', mr:'0.8rem'}}/>}
                                 canEdit={false} />
          </Grid>
          <Grid item xs={3}>
            <Grid container>
              <Grid item xs={8}>
                <MyReadOnlyTextField id={'plazo'}
                                     label={'Plazo de ejecución'}
                                     value={formValues.plazo + ' meses'}
                                     icon={<AccessTimeIcon sx={{fontSize: '14px', color:'silver', mr:'0.8rem'}}/>}/>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} >
            <FormControl sx={{ width: '100%' }} variant="standard" >
              <MyMultipleSelect id={'destinoFinal'}
                                label={'destino-final'}
                                setFormValues={setFormValues}
                                formValues={formValues}
                                canEdit={canEdit}
                                data={mp?.Recursos?.laboratorios} />
              {
                formValues.destinoFinal.length === 0?
                  <Typography sx={common.warnig}>Seleccione al menos un destino final</Typography>
                  :null
              }
            </FormControl>
          </Grid>
          <Grid item xs={12} sx={dialog.titleContainer}>
            <MySubtitle subtitle={'Recursos'}/>
          </Grid>
          <Grid item xs={12} sx={dialog.titleContainer}>
            <MyReabOnlyTableRecursos rows={formValues.recursos}
                                     setRecursoSelected={setRecursoSelected} reduced={true}/>
          </Grid>
          <Grid item xs={12} sx={dialog.titleContainer}>
            <MySubtitle subtitle={'Muestras y submuestras'} />
          </Grid>
          <Grid item xs={12}>
            {recursoSelected.scientificname}
          </Grid>
          <MyTableMuestras id={'muestras'}
                           muestras={formValues.muestras}
                           formValues={formValues}
                           setFormValues={setFormValues}
                           mode={'ATM'}
                           selected={recursoSelected} />
          {
            cantidades === 0?
              <Typography sx={common.warnig}>Al menos una muestra debe tener cantidad mayor a 0</Typography>
              :null
          }
          <Grid item xs={12} sx={dialog.titleContainer}>
            <MySubtitle subtitle={'Cláusulas'} />
          </Grid>

          <Grid item xs={10} alignItems="center">
            <Box sx={{p:'1rem 0 0 0'}}>
              <MySwitch id={'condicion1'}
                        label={'¿El ATM contempla una cláusula de divulgación obligatoria del país de origen, fuente o proveedor de los recursos?'}
                        formValues={formValues}
                        setFormValues={setFormValues}
                        handleChange={(e,v) => defaultHandleChange4Switch(e,v,canEdit,setFormValues,formValues)}
                        canEdit={canEdit} />
            </Box>
            {
              (formValues.condicion1 && Number(formValues.pagina1) === 0)?
                <Typography sx={common.warnig}>Número de página no puede ser 0</Typography>
                :null
            }
          </Grid>
          <Grid item xs={2} >
            <Box sx={{p:'0.4rem 1rem 0 2rem', height:'4rem'}}>
              {formValues['condicion1'] && <MyTextField id={'pagina1'}
                                                        label={'Página No.'}
                                                        canEdit={canEdit}
                                                        formValues={formValues}
                                                        isNumber={true}
                                                        setFormValues={setFormValues}
                                                        handleChange={handleChange}/>}
            </Box>
          </Grid>

          <Grid item xs={10} >
            <Box sx={{p:'1rem 0 0 0'}}>
              <MySwitch id={'condicion2'}
                        label={'¿El ATM define una cláusula de sometimiento a la legislación ecuatoriana en materia de propiedad intelectual, incluyendo la prohibición de patentar recursos biológicos, genéticos o sus derivados de origen ecuatoriano?'}
                        formValues={formValues}
                        setFormValues={setFormValues}
                        handleChange={(e,v) => defaultHandleChange4Switch(e,v,canEdit,setFormValues,formValues)}
                        canEdit={canEdit} />
            </Box>
            {
              (formValues.condicion2 && Number(formValues.pagina2) === 0)?
                <Typography sx={common.warnig}>Número de página no puede ser 0</Typography>
                :null
            }
          </Grid>
          <Grid item xs={2} >
            <Box sx={{p:'0.4rem 1rem 0 2rem', height:'4rem'}}>
              {formValues['condicion2'] && <MyTextField id={'pagina2'}
                           label={'Página No.'}
                           canEdit={canEdit}
                           isNumber={true}
                           formValues={formValues}
                           setFormValues={setFormValues} handleChange={handleChange}/>}
            </Box>
          </Grid>

          <Grid item xs={10} >
            <Box sx={{p:'1rem 0 0 0'}}>
              <MySwitch id={'condicion3'}
                        label={'¿El ATM contine una cláusula que incluya la obligación de repatriar los recursos biológicos, genéticos o sus derivados y la información levantada a partir de estos, en caso de incumplimiento de los términos del Acuerdo.?'}
                        formValues={formValues}
                        isNumber={true}
                        setFormValues={setFormValues}
                        handleChange={(e,v) => defaultHandleChange4Switch(e,v,canEdit,setFormValues,formValues)}
                        canEdit={canEdit} />
            </Box>
            {
              (formValues.condicion3 && Number(formValues.pagina3) === 0)?
                <Typography sx={common.warnig}>Número de página no puede ser 0</Typography>
                :null
            }
          </Grid>
          <Grid item xs={2} >
            <Box sx={{p:'0.4rem 1rem 0 2rem', height:'4rem'}}>
              {formValues['condicion3'] && <MyTextField id={'pagina3'}
                           label={'Página No.'}
                           isNumber={true}
                           canEdit={canEdit}
                           formValues={formValues}
                           setFormValues={setFormValues} handleChange={handleChange}/>}
            </Box>
          </Grid>

          <Grid item xs={10} >
            <Box sx={{p:'1rem 0 0 0'}}>
              <MySwitch id={'condicion4'}
                        label={'¿El ATM define la obligación de reportar los resultados alcanzados?'}
                        formValues={formValues}
                        setFormValues={setFormValues}
                        handleChange={(e,v) => defaultHandleChange4Switch(e,v,canEdit,setFormValues,formValues)}
                        canEdit={canEdit} />
            </Box>
            {
              (formValues.condicion4 && Number(formValues.pagina4) === 0)?
                <Typography sx={common.warnig}>Número de página no puede ser 0</Typography>
                :null
            }
          </Grid>
          <Grid item xs={2} >
            <Box sx={{p:'0.4rem 1rem 0 2rem', height:'4rem'}}>
              {formValues['condicion4'] && <MyTextField id={'pagina4'}
                           label={'Página No.'}
                           isNumber={true}
                           canEdit={canEdit}
                           formValues={formValues}
                           setFormValues={setFormValues} handleChange={handleChange}/>}
            </Box>
          </Grid>

          <Grid item xs={10} >
            <Box sx={{p:'1rem 0 0 0'}}>
              <MySwitch id={'condicion5'}
                        label={'¿El ATM define la obligación del receptor de no transferir a terceros los recursos recibidos?'}
                        formValues={formValues}
                        setFormValues={setFormValues}
                        handleChange={(e,v) => defaultHandleChange4Switch(e,v,canEdit,setFormValues,formValues)}
                        canEdit={canEdit} />
            </Box>
            {
              (formValues.condicion5 && Number(formValues.pagina5) === 0)?
                <Typography sx={common.warnig}>Número de página no puede ser 0</Typography>
                :null
            }
          </Grid>
          <Grid item xs={2} >
            <Box sx={{p:'0.4rem 1rem 0 2rem', height:'4rem'}}>
              {formValues['condicion5'] && <MyTextField id={'pagina5'}
                                                        label={'Página No.'}
                                                        canEdit={canEdit}
                                                        isNumber={true}
                                                        formValues={formValues}
                                                        setFormValues={setFormValues}
                                                        handleChange={handleChange}/>}
            </Box>
          </Grid>
          <Grid item xs={10}>
            <Box sx={{p:'1rem 0 0 0'}}>
              <MySwitch id={'condicion6'}
                        label={'¿El ATM define el destino final del recurso transferido una vez alcanzando el objetivo?'}
                        formValues={formValues}
                        setFormValues={setFormValues}
                        handleChange={(e,v) => defaultHandleChange4Switch(e,v,canEdit,setFormValues,formValues)}
                        canEdit={canEdit} />
            </Box>
            {
              (formValues.condicion6 && Number(formValues.pagina6) === 0)?
                <Typography sx={common.warnig}>Número de página no puede ser 0</Typography>
                :null
            }
          </Grid>
          <Grid item xs={2} >
            <Box sx={{p:'0.4rem 1rem 0 2rem', height:'4rem'}}>
              {formValues['condicion6'] && <MyTextField id={'pagina6'}
                           label={'Página No.'}
                           isNumber={true}
                           canEdit={canEdit}
                           formValues={formValues}
                           setFormValues={setFormValues} handleChange={handleChange}/>}
            </Box>
          </Grid>
          <Grid item xs={12} sx={dialog.titleContainer}>
            <MySubtitle subtitle={'Anexos'} />
          </Grid>
          <Grid item xs={12}>
            <Stack direction={'row'} justifyContent="space-between" alignItems="center">
              <MyUpload id={'atm'}
                        dir={instanciaProceso?.solicitud?.id}
                        label={'Acuerdo de transferencia de material *'}
                        formValues={formValues}
                        setFormValues={setFormValues} />
              <MyUpload id={'atmAdicional'}
                        dir={instanciaProceso?.solicitud?.id}
                        label={'Documento adicional'}
                        formValues={formValues}
                        canEdit={true}
                        setFormValues={setFormValues} />
            </Stack>
          </Grid>
          <Grid item xs={12} sx={dialog.titleContainer}>
            <MySubtitle subtitle={'Declaración de veracidad de la información'} />
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
                         startAdornment:(
                           <InputAdornment position="start">
                             <AccountCircle sx={{fontSize: '14px', color:'silver'}}/>
                           </InputAdornment>
                         ),
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
          <Grid item xs={12}>
            <MySwitch id={'si'}
                      label={'Aceptar y enviar'}
                      formValues={formValues}
                      setFormValues={setFormValues}
                      handleChange={(e,v) => defaultHandleChange4Switch(e,v,canEdit,setFormValues,formValues)}
                      fullWidth={false}
                      canEdit={canEdit} />
          </Grid>
        </Grid>
        <CssBaseline/>
        <AppBar position='fixed' color='primary' elevation={0} sx={accordeonBox.bottomBar} >
          <Toolbar>
            <Grid container sx={{p:0, mt:'-1rem'}}>
              {
                (canEdit)?
                  <>
                    <Grid item xs={12} style={{padding:'0 4rem 0 4rem'}}>
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
                                         dispatch(handleSaveSolicitud(instanciaProceso?.id, newPayload))
                                         setCounter(0)
                                       }}
                                       disabled={counter <= 0}
                                       icon={SaveOutlinedIcon} />

                        <MySendButton disabled={
                                        counter > 0 ||
                                        formValues.atm === '' ||
                                        (formValues.condicion1 === true && Number(formValues.pagina1) === 0) ||
                                        (formValues.condicion2 === true && Number(formValues.pagina2) === 0) ||
                                        (formValues.condicion3 === true && Number(formValues.pagina3) === 0) ||
                                        (formValues.condicion4 === true && Number(formValues.pagina4) === 0) ||
                                        (formValues.condicion5 === true && Number(formValues.pagina5) === 0) ||
                                        (formValues.condicion6 === true && Number(formValues.pagina6) === 0) ||
                                        (evaluateRecursos(formValues.recursos, formValues.muestras) === 0) ||
                                        (formValues.destinoFinal === '') ||
                                        (formValues.atm === '')
                                      }
                                      label={'enviar'}
                                      onSend={ () => {
                                        const metadata = JSON.stringify({"solicitudId": `${instanciaProceso?.solicitud?.id}`,})
                                        dispatch(handCompletarTareaAndSalir(instanciaProceso.id, instanciaTarea, perfilUsuario.id, metadata))
                                      }} />
                      </Stack>
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
