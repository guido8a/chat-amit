import React, {useEffect, useState} from 'react'
import {Grid, InputAdornment, TextField} from '@mui/material'
import {useSelector} from 'react-redux'
import {rulesFor} from 'src/features/P01Solicitud/CONF'
import {format} from 'date-fns'
import {es} from 'date-fns/locale'

import {
  AccountCircle,
} from '@mui/icons-material'
import {dialog} from 'src/styles/styles'
import API from "src/features/App/API";
import {MySwitch} from "../../../components/MySwitch";

const Declaracion = ({payload,mainFormValues,incrementCounter}) => {
  const section = 'Declaracion'
  const bandeja = useSelector(state => state.app.bandeja)
  if(!!!payload[section]) {payload[section] = {}}
  const solicitante = payload?.Solicitante
  const canEdit = bandeja === 'entrada'
  const texto = `Yo, ${!!solicitante?.nombresCompletos?solicitante?.nombresCompletos:''} portador del documento de identidad ${!!solicitante?.nombresCompletos?solicitante?.cedula:''}, en calidad de solicitante, declaro bajo ` +
    'juramento que la información constante en la presente solicitud es verdadera y de mi absoluta ' +
    'responsabilidad. En caso de omitir información, así como en caso de forzar, falsificar, modificar, alterar o ' +
    'introducir cualquier información falsa o corregir el presente documento, asumo toda la responsabilidad ' +
    'administrativa, civil o penal conforme lo establecido por ley.\n\n'+
    'Atención: Por favor revise la información del registro de la solicitud, si está seguro que los datos son ' +
    'correctos acepte y declare la veracidad de toda la información detallada en la presente solicitud y envíe ' +
    'la misma; caso contrario, cierre esta ventana y realice los cambios a través del botón guardar.\n'
  const RULES = rulesFor(section)
  const emptyPayload = RULES.emptyPayload()
  const [formValues, setFormValues] = useState({...emptyPayload, ...payload[section]})
  const handleChange = (e) => API.handleChange(e, bandeja, setFormValues, formValues)
  useEffect(() => {
    mainFormValues[section] = formValues
    incrementCounter()
  },[formValues])

  return(
    <Grid container spacing={1}>

      <Grid item xs={12}>
        <TextField id='nombres'
                   multiline
                   rows={12}
                   value={texto}
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
                  fullWidth={false}
                  canEdit={canEdit}
                  handleChange={handleChange} />
      </Grid>
    </Grid>
  )
}

export default Declaracion
