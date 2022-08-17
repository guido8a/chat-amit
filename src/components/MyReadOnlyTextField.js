import React from 'react'
import Box from '@mui/material/Box'
import {TextField} from '@mui/material'
import {dialog} from 'src/styles/styles'
import RobotoCondensedRegular from 'src/styles/MyFonts/Roboto_Condensed/RobotoCondensed-Regular.ttf'

export const MyReadOnlyTextField = ({icon, value, label, rows=1}) => (
  <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
    {icon}
    <TextField id='nombres'
               label={label}
               value={value}
               maxRows={rows}
               multiline={rows >1}
               fullWidth
               variant='standard'
               aria-readonly={true}
               sx={{...dialog.textTypography, height: '3rem',}}
               InputProps={{
                 disableUnderline: true,
                 sx: {
                   fontSize: '1rem',
                   fontFamily: RobotoCondensedRegular,
                   backgroundColor: 'transparent',
                   color: '#878787',
                 }
               }}
               InputLabelProps={{
                 sx: {
                   fontSize: '1.2rem',
                   fontFamily: RobotoCondensedRegular,
                   color:'#575756',
                 },
                 shrink: true
               }}/>
  </Box>
)