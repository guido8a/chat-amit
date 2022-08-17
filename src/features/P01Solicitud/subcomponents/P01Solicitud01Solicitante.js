import React, {useEffect, useState} from 'react'
import {Grid} from '@mui/material'
import {useSelector} from 'react-redux'
import {SolicitanteTitle} from 'src/features/App/consts'
import {
  Badge,
  SelfImprovement,
  Public,
  CoPresent,
  Smartphone,
  PhoneInTalk,
  Email,
  LocationOn,
} from '@mui/icons-material'
import {dialog} from 'src/styles/styles'
import {MySubtitle} from 'src/components/MySubtitle'
import {MyTextField} from 'src/components/MyTextField'
import API from 'src/features/App/API'
import {MyReadOnlyTextField} from 'src/components/MyReadOnlyTextField'
import {ReactComponent as Png21Icon } from 'src/styles/MySvgIcons/png-21-min.svg'
import {rulesFor} from 'src/features/P01Solicitud/CONF'
import {f} from 'src/commons/f'
import {MyMaskedTextField} from 'src/components/MyMaskedTextField'

const Solicitante = ({payload,mainFormValues, incrementCounter}) => {
  const section = 'Solicitante'
  const instanciaTarea = useSelector(state => state.app.instanciaTarea)
  const bandeja = useSelector(state => state.app.bandeja)
  const solicitante = payload?.Solicitante

  const RULES = rulesFor(section)
  const emptyPayload = RULES.emptyPayload()

  // const handlesChange= RULES.handlesChange()
  const validators = RULES.validators()
  const initErrors = RULES.initErros()
  const [formValues, setFormValues] = useState(
    {
      ...emptyPayload,
      nombresCompletos: solicitante?.nombresCompletos,
      cedula:           solicitante?.cedula,
      genero:           solicitante?.genero,
      etnia:            solicitante?.etnia,
      nacionalidad:     solicitante?.nacionalidad,
      registro:         solicitante?.registro,
      celular:          solicitante.celular,
      telefono:         solicitante.telefono,
      email:            solicitante.email,
      direccion:        solicitante.direccion,
    }
  )
  const [formErrors, setFormErrors] = useState({...initErrors})
  // const handleChange = (e) => API.handleChange(e, bandeja, setFormValues, formValues)

  useEffect(() => {
    mainFormValues[section] = formValues
    incrementCounter()
  },[formValues])

  const canEdit = bandeja === 'entrada' && instanciaTarea.estadoInstanciaProceso === "En Progreso" && instanciaTarea.estadoInstanciaTarea === "Iniciada"

  const handleChange = (e) => API.handleChange(e, bandeja, setFormValues, formValues)

  const handleChangePhone = (e) => {
    if(e.target.value === '' || f.isPhone(e.target.value))
      API.handleChange(e, bandeja, setFormValues, formValues)
  }

  useEffect(() => {
    const newErrors = {
        celular:   validators['celular'](formValues['celular']),
        telefono:  validators['telefono'](formValues['telefono']),
        email:     validators['email'](formValues['email']),
        direccion: validators['direccion'](formValues['direccion']),
    }
    setFormErrors(newErrors)
    },[formValues])

  return(
    <Grid container spacing={1}>
      <Grid item xs={12} sx={dialog.titleContainer}>
        <MySubtitle subtitle={'Identificación'} />
      </Grid>
      <Grid item xs={6}  >
        <MyReadOnlyTextField value={!!solicitante?.nombresCompletos?solicitante?.nombresCompletos:''}
                             label={'Nombres Completos'}
                             icon={<Png21Icon style={dialog.readOnlyIcon}/>} />
      </Grid>
      <Grid item xs={6}>
        <MyReadOnlyTextField value={!!solicitante?.nombresCompletos?solicitante?.cedula:''}
                             label={SolicitanteTitle.cedula}
                             icon={<Badge sx={dialog.readOnlyIcon}/>} />
      </Grid>
      <Grid item xs={6}>
        <MyReadOnlyTextField value={!!solicitante?.nombresCompletos?solicitante?.genero:''}
                             label={SolicitanteTitle.genero}
                             icon={<Badge sx={dialog.readOnlyIcon}/>} />
      </Grid>
      <Grid item xs={6}>
        <MyReadOnlyTextField value={!!solicitante?.nombresCompletos?solicitante?.etnia:''}
                             label={'Etnia'}
                             icon={<SelfImprovement sx={dialog.readOnlyIcon}/>} />
      </Grid>
      <Grid item xs={6}>
        <MyReadOnlyTextField value={!!solicitante?.nacionalidad?solicitante?.nacionalidad:''}
                             label={SolicitanteTitle.nacionalidad}
                             icon={<Public sx={dialog.readOnlyIcon}/>} />
      </Grid>
      <Grid item xs={6}>
        <MyReadOnlyTextField value={!!solicitante?.registro?solicitante?.registro:''}
                             label={'Número de Registro / Acreditación'}
                             icon={<CoPresent sx={dialog.readOnlyIcon}/>} />
      </Grid>

      <Grid item xs={12} sx={dialog.titleContainer}>
        <MySubtitle subtitle={'Contacto'} />
      </Grid>
      <Grid item xs={4}>
        <MyMaskedTextField id={'celular'}
                           label={'Celular'}
                           formValues={formValues}
                           setFormValues={setFormValues}
                           icon={<Smartphone sx={{fontSize: '14px', color:'silver'}}/>}
                           error={formErrors['celular']}
                           canEdit={canEdit}
                           type={'CellPhoneNumber'}
                           handleChange={handleChangePhone}/>
      </Grid>
      <Grid item xs={4}>
        <MyMaskedTextField id={'telefono'}
                           label={'Teléfono del Domicilio'}
                           formValues={formValues}
                           setFormValues={setFormValues}
                           icon={<PhoneInTalk sx={{fontSize: '14px', color:'silver'}}/>}
                           error={formErrors['telefono']}
                           canEdit={canEdit}
                           type={'HomePhoneNumber'}
                           handleChange={handleChangePhone}/>
      </Grid>
      <Grid item xs={4}>
        <MyTextField id={'email'}
                     label={'Correo Electrónico'}
                     formValues={formValues}
                     setFormValues={setFormValues}
                     icon={<Email sx={{fontSize: '14px', color:'silver'}}/>}
                     error={formErrors['email']}
                     canEdit={canEdit}
                     handleChange={handleChange}/>
      </Grid>
      <Grid item xs={12}>
        <MyTextField id={'direccion'}
                     label={'Dirección del Domicilio'}
                     formValues={formValues}
                     setFormValues={setFormValues}
                     icon={<LocationOn sx={{fontSize: '14px', color:'silver'}} />}
                     error={formErrors['direccion']}
                     canEdit={canEdit}
                     handleChange={handleChange} />
      </Grid>
    </Grid>
  )
}

export default Solicitante
