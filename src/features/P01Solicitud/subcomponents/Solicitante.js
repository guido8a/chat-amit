import React from 'react'
import {Grid, Stack} from '@mui/material'
import {
  AccountCircle,
  Badge,
  Smartphone, PhoneInTalk, Email, LocationOn,
} from '@mui/icons-material'
import {MyReadOnlyTextField} from "src/components/MyReadOnlyTextField";
import {dialog} from "../../../styles/styles";
import {MySubtitle} from "../../../components/MySubtitle";
import {f} from "../../../commons";

// eslint-disable-next-line import/no-anonymous-default-export
export const Solicitante = ({solicitud, displayContact = true}) => {
  const s = solicitud.solicitud
  const p = f.isValid(s)?(typeof solicitud.solicitud !== 'object')?JSON.parse(s.payload):s.payload:{}
  return (
    <Grid container spacing={1} sx={{margin:0}}>
      <Grid item xs={12} sx={dialog.titleContainer}>
        <MySubtitle subtitle={'Solicitante'} />
      </Grid>
      <Grid item xs={6} >
          <MyReadOnlyTextField id='nombres'
                               label={'Nombres completos'}
                               value={!!p?p.Solicitante?.nombresCompletos:''}
                               icon={<AccountCircle sx={{fontSize: '14px', color:'silver', mr:'0.8rem'}}/>} />
      </Grid>
      <Grid item xs={6} >
          <MyReadOnlyTextField id='cedula'
                               label={'Cédula/Pasaporte'}
                               value={!!p?p.Solicitante?.cedula:''}
                               icon={<Badge sx={{fontSize: '14px', color:'silver', mr:'0.8rem'}}/>} />
      </Grid>
      {
        displayContact?
          <>
            <Grid item xs={12} sx={dialog.titleContainer}>
              <MySubtitle subtitle={'Contacto'} />
            </Grid>
            <Grid item xs={4}>
              <MyReadOnlyTextField id='celular'
                                   label={'Celular'}
                                   value={!!p?p.Solicitante?.celular:''}
                                   icon={<Smartphone sx={{fontSize: '14px', color:'silver', mr:'0.8rem'}}/>} />
            </Grid>
            <Grid item xs={4}>
              <MyReadOnlyTextField id='telefono'
                                   label={'Teléfono del Domicilio'}
                                   value={!!p?p.Solicitante?.telefono:''}
                                   icon={<PhoneInTalk sx={{fontSize: '14px', color:'silver', mr:'0.8rem'}}/>} />
            </Grid>
            <Grid item xs={4}>
              <MyReadOnlyTextField id='email'
                                   label={'Correo Electrónico'}
                                   value={!!p?p.Solicitante?.email:''}
                                   icon={<Email sx={{fontSize: '14px', color:'silver', mr:'0.8rem'}}/>} />
            </Grid>
            <Grid item xs={12}>
              <MyReadOnlyTextField id='direccion'
                                   label={'Dirección del Domicilio'}
                                   value={!!p?p.Solicitante?.direccion:''}
                                   icon={<LocationOn sx={{fontSize: '14px', color:'silver', mr:'0.8rem'}}/>} />
            </Grid>
          </>:null
      }

    </Grid>
  )
}