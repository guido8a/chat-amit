import React from 'react'
import Button from '@mui/material/Button'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import RobotoCondensedLight from 'src/styles/MyFonts/Roboto_Condensed/RobotoCondensed-Light.ttf'

export const MyButtonBacan3 = ({
                                label='',
                                onClick=() => alert('on click ... not implemented'),
                                icon=ArrowBackIcon,
                                bgColor0='rgba(54, 138, 184, 1)',
                                color0='rgba(255, 255, 255, 0.6)',
                                bgColor1='rgba(54, 160, 184, 1)',
                                color1='rgba(255, 255, 255, 0.9)',
                                disabled=false,
                                width='9rem',
                              }) => {
  const height= '36px'
  const MyIcon=icon

  return (
        <Button variant='contained'
                disabled={disabled}
                sx={{
                  borderRadius: '0.2rem',
                  p:0,
                  height,
                  width,
                  fontFamily: RobotoCondensedLight,
                  fontSize: '0.8rem',
                  fontWeight: 'normal',
                  color: color1,
                  backgroundColor: bgColor1,
                  "&:hover":{
                    backgroundColor: bgColor0,
                  },
                  "&:disabled":{
                    backgroundColor: '#888888',
                    color: '#444444'
                  },
                }}
                startIcon={<MyIcon sx={{height:'1rem', fill: color0, }} />}
                size={'small'}
                onClick={onClick}>{label}</Button>
  )
}
