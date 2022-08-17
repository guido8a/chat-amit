import React from 'react'
import {Grid} from '@mui/material'
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
import {MyReadOnlyTextField} from 'src/components/MyReadOnlyTextField'
import {ReactComponent as Png21Icon } from 'src/styles/MySvgIcons/png-21-min.svg'
import {MyMaskedTextField} from 'src/components/MyMaskedTextField'

export const SolicitanteRO = ({payload}) => {
  const section = 'Solicitante'
  const solicitante = payload[section]
  const canEdit = false

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
                           formValues={solicitante}
                           icon={<Smartphone sx={{fontSize: '14px', color:'silver'}}/>}
                           canEdit={canEdit}
                           type={'CellPhoneNumber'} />
      </Grid>
      <Grid item xs={4}>
        <MyMaskedTextField id={'telefono'}
                           label={'Teléfono del Domicilio'}
                           formValues={solicitante}
                           icon={<PhoneInTalk sx={{fontSize: '14px', color:'silver'}}/>}
                           canEdit={canEdit}
                           type={'HomePhoneNumber'} />
      </Grid>
      <Grid item xs={4}>
        <MyTextField id={'email'}
                     label={'Correo Electrónico'}
                     formValues={solicitante}
                     icon={<Email sx={{fontSize: '14px', color:'silver'}}/>}
                     canEdit={canEdit} />
      </Grid>
      <Grid item xs={12}>
        <MyTextField id={'direccion'}
                     label={'Dirección del Domicilio'}
                     formValues={solicitante}
                     icon={<LocationOn sx={{fontSize: '14px', color:'silver'}} />}
                     canEdit={canEdit} />
      </Grid>
    </Grid>
  )
}
