import React from 'react'
import {Stack, Typography} from '@mui/material'
import {dialog} from 'src/styles/styles'
import NoiseControlOffIcon from '@mui/icons-material/NoiseControlOff'

export const MySubtitle = ({subtitle}) => {
    return <Typography variant='subtitle1'
                       component='h1'
                       sx={dialog.sectionTitle}>
        {subtitle}
    </Typography>
}

export const MySubtitle2 = ({subtitle, bold=false}) => {
    return (
      <Stack direction={'row'} sx={{p:'1.4rem 0 0.6rem 0'}}>
        <NoiseControlOffIcon style={{fill:'#26a69a'}}/>
        <Typography variant='subtitle1'
                    component='h1'
                    sx={!bold?dialog.sectionTitle2:dialog.sectionTitle2bold}>
          {subtitle}
        </Typography>
      </Stack>
    )
}
