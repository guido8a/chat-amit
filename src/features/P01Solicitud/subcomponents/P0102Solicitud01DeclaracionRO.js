import React from 'react'
import Box from '@mui/material/Box'
import { Grid } from '@mui/material'
import {MyReadOnlyAreaTextField} from "../../../components/MyReadOnlyAreaTextField";
import {MyCheckBox} from "../../../components/MyCheckBox";

export const DeclaracionRO = ({payload}) => {
  const section = 'Declaracion'
  const declaracion = payload[section]
  const solicitante = payload['Solicitante']
  const canEdit = false

  const texto = `Yo, ${!!solicitante?.nombresCompletos?solicitante?.nombresCompletos:''} portador del documento de identidad ${!!solicitante?.nombresCompletos?solicitante?.cedula:''}, en calidad de solicitante, declaro bajo ` +
    'juramento que la información constante en la presente solicitud es verdadera y de mi absoluta ' +
    'responsabilidad. En caso de omitir información, así como en caso de forzar, falsificar, modificar, alterar o ' +
    'introducir cualquier información falsa o corregir el presente documento, asumo toda la responsabilidad ' +
    'administrativa, civil o penal conforme lo establecido por ley.\n\n'+
    'Atención: Por favor revise la información del registro de la solicitud, si está seguro que los datos son ' +
    'correctos acepte y declare la veracidad de toda la información detallada en la presente solicitud y envíe ' +
    'la misma; caso contrario, cierre esta ventana y realice los cambios a través del botón guardar.\n'

  return (
    <Box>
      <Grid item xs={12}>
        <MyReadOnlyAreaTextField id={'declaracion'}
                                 formValues={declaracion}
                                 value={texto} />
      </Grid>
      <Grid item xs={12}>
        <MyCheckBox id={'si'}
                    label={'Aceptar y enviar'}
                    formValues={declaracion}
                    canEdit={canEdit} />
      </Grid>
    </Box>
  )
}
