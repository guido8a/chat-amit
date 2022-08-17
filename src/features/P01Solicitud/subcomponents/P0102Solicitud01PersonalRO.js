import React,{useState} from 'react'
import Box from '@mui/material/Box'
import {Typography,} from '@mui/material'
import {accordeonBox} from 'src/styles/styles'
import {MyTablePersonal} from "../../../components/MyTablePersonal";
import {MyTableExperiencia} from "../../../components/MyTableExperiencia";

export const PersonalRO = ({payload}) => {
  const section = 'Personal'
  const personal = payload[section]
  const canEdit = false

  const [selected, setSelected] = useState({})

  return (
    <Box>
      <Box sx={accordeonBox.container}>
        <MyTablePersonal id={'personal'}
                         canEdit={canEdit}
                         formValues={personal}
                         canDeleteRow={canEdit}
                         selected={selected}
                         idSolicitud={payload.solicitudId}
                         setSelected={setSelected} />
        {
          (selected.id !== undefined && selected.cedula !== '') ?
            <Box sx={accordeonBox.container}>
              <Typography>{`Experiencia de ${selected.nombre}, relevante al proyecto que se está solicitando`}</Typography>
              <MyTableExperiencia id={'experiencia'}
                                  canEdit={canEdit}
                                  formValues={personal}
                                  canDeleteRow={canEdit}
                                  selected={selected}/>
            </Box>:null
        }
      </Box>
    </Box>
  )
}
