import React from 'react'
import {MyButtonBacan} from 'src/components/MyButtonBacan'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'

export const MySaveButton = ({onSave, disabled=false}) =>
  <MyButtonBacan onClick={onSave}
                 label={'Guardar'}
                 disabled={disabled}
                 myTip={'Guardar cambios realizados'}
                 icon={SaveOutlinedIcon} />

export const MyGobackButton = ({onGoback, disabled=false}) =>
  <MyButtonBacan onClick={onGoback}
                 label={'Regresar'}
                 disabled={disabled}
                 myTip={'Regresar a la pantalla anterior'}
                 icon={ArrowBackOutlinedIcon} />
