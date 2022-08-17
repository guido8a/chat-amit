import React from 'react'
import {accordeonBox} from 'src/styles/styles'
import {Box, Grid, Stack} from '@mui/material'
import Typography from '@mui/material/Typography'
import {f} from 'src/commons'

export const SectionTitle = ({title, icon}) => {
  if(!f.isValid(icon))
    return (
      <Box sx={accordeonBox.titleBox}>
        <Typography sx={accordeonBox.titleTypography}>
          {title}
        </Typography>
      </Box>
    )
  else
    return (
      <Box sx={accordeonBox.titleBox}>
        <Stack direction={'row'}>
          {icon}
          <Typography sx={accordeonBox.titleTypography}>
            {title}
          </Typography>
        </Stack>
      </Box>
    )
}