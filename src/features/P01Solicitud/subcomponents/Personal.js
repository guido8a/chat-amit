import React, {useState} from 'react'
import {Grid, Typography} from '@mui/material'
import {accordeonBox, dialog} from "../../../styles/styles";
import Box from "@mui/material/Box";
import {MyTablePersonal} from "../../../components/MyTablePersonal";
import {MyTableExperiencia} from "../../../components/MyTableExperiencia";
import {MySubtitle} from "../../../components/MySubtitle";

// eslint-disable-next-line import/no-anonymous-default-export
export default (solicitud) => {
  const s = solicitud.solicitud
  const p = JSON.parse(s?.payload)
  const section = p['Personal']
  const [selected, setSelected] = useState({})

  console.log('. . .. . . solicitud: ',solicitud, p['Personal'])

  return (
    <>
      <Grid item xs={12} sx={dialog.titleContainer}>
        <MySubtitle subtitle={'Personal'} />
      </Grid>
      <Box sx={accordeonBox.container}>
        <MyTablePersonal id={'personal'}
                         canEdit={false}
                         formValues={section}
                         canDeleteRow={false}
                         setSelected={setSelected} />
      </Box>
      {
        (selected.id !== undefined && selected.cedula !== '') ?
          <Box sx={accordeonBox.container}>
            <Typography>{`Experiencia de ${selected.nombre}`}</Typography>
            {/*<MyTableExperiencia id={'experiencia'}*/}
            {/*                    canEdit={false}*/}
            {/*                    formValues={section}*/}
            {/*                    canDeleteRow={false}*/}
            {/*                    selected={selected}/>*/}
          </Box>:null
      }
    </>
  )
}
