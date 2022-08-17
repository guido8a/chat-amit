import React from 'react'
import SaveIcon from '@mui/icons-material/Save'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import {Stack} from '@mui/material'
import {MyButtonBacan} from 'src/components/MyButtonBacan'
import {f} from 'src/commons/f'

export const MyRegresarSaveButton = ({onSave, onRegresar, canEdit=false}) => {
  return (
    <Stack direction="row"
           justifyContent="space-between"
           alignItems="center"
           spacing={2}>
      { f.isValid(onRegresar)?
        <MyButtonBacan label={'regresar'}
                       icon={ArrowBackIcon}
                       onClick={onRegresar} /> :null
      }
      { f.isValid(onSave) && canEdit?
        <MyButtonBacan label={'Guardar'}
                       icon={SaveIcon}
                       onClick={onSave} />:null}
    </Stack>
  )
}
