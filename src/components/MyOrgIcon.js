import React from 'react';
import Box from "@mui/material/Box";
// import {ReactComponent as SenadiIcon } from 'src/styles/MySvgIcons/senadi_senadi.svg'
// import {ReactComponent as MaateIcon } from 'src/styles/MySvgIcons/maate_maate-min.svg'
// import {ReactComponent as SenescytIcon } from 'src/styles/MySvgIcons/senescyt_senescyt.svg'

export const MyOrgIcon = ({tarea}) => {
  const codigoTarea = !!tarea?.codigo_tarea?tarea.codigo_tarea.toLowerCase():''
  const isSenadi = codigoTarea.search('senadi') >= 0
  const isMaate = codigoTarea.search('maate') >= 0
  // const isSenescyt = !isSenadi && !isMaate
  if(isSenadi)
    return <Box>senadi</Box>
  else
  if(isMaate)
    return <Box >maate</Box>
  else
    return <Box>senescyt</Box>
}
