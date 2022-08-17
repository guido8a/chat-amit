import React from 'react'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import {green} from '@mui/material/colors'
import { styled } from '@mui/material/styles'

export const MyTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} placement='top'/>
))(({ theme }) => ({

  [`& .${tooltipClasses.arrow}`]: {
    color: green[100],
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: green[100],
    color:green[900],
  },
}))
