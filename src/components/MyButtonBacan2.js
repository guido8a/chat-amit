import * as React from 'react'
import IconButton from '@mui/material/Button'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import RobotoCondensedLight from 'src/styles/MyFonts/Roboto_Condensed/RobotoCondensed-Light.ttf'
import Typography from "@mui/material/Typography";
import {Stack} from "@mui/material";
import Box from "@mui/material/Box";

export const MyButtonBacan2 = ({
                                label='no label ...',
                                onClick=(e) => alert('on click ... not implemented'),
                                icon=ArrowBackIcon,
                                bgColor0='transparent',
                                color0='rgba(0, 0, 0, 0.8)',
                                color1='rgba(0, 0, 0, 0.8)',
                                disabled=false
                              }) => {
  const height= '1.8rem'
  const MyIcon=icon
  return (
    <Stack spacing={1} direction={'row'} sx={{widtg:'8rem', p:0}}>
      <IconButton variant="contained"
              disabled={disabled}
              size={'small'}
              sx={{
                borderRadius: '1rem',
                p:0,
                minWidth: '1rem',
                backgroundColor: bgColor0,
                width: '2rem',
                height,
                "&:hover":{
                  backgroundColor: bgColor0,
                },
                "&:disabled":{
                  backgroundColor: '#AAAAAA',
                  color: '#444444'
                },
              }}
              onClick={onClick} >
        <MyIcon sx={{height:'1rem', fill: color0, borderRadius:'6px',}}/>
      </IconButton>
      <Box sx={{pt:'0.4rem'}}>
        <Typography sx={{
                      fontFamily: RobotoCondensedLight,
                      fontSize: '0.9rem',
                      fontWeight: 'light',
                      color: color1,
                    }}>{label}</Typography>
      </Box>
    </Stack>
  )
}
