import React from 'react'
import Button from '@mui/material/Button'
import {Box, Typography, Popover, Tooltip} from "@mui/material"
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import RobotoCondensedLight from 'src/styles/MyFonts/Roboto_Condensed/RobotoCondensed-Light.ttf'
import {f} from 'src/commons/f'
import {MyTooltip} from 'src/components/MyTooltip'
import {color01} from 'src/styles/styles'

export const MyButtonBacan = ({
                                label='',
                                onClick=(e) => alert('on click ... not implemented'),
                                icon=ArrowBackIcon,
                                bgColor0='rgba(54, 138, 184, 1)',
                                color0='rgba(255, 255, 255, 0.6)',
                                bgColor1='rgba(54, 160, 184, 1)',
                                color1='rgba(255, 255, 255, 0.9)',
                                disabled=false,
                                myTip='',
                                width='9rem',
                                mode=null
                              }) => {
  // const height= '1.6rem'
  const height= '36px'
  const MyIcon=icon

  const [anchorEl, setAnchorEl] = React.useState(null)

  const handlePopoverOpen = (event) => {
    if(f.isValid(myTip) && myTip !== '') {
      setAnchorEl(event.currentTarget)
    } else {
      setAnchorEl(null)
    }
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl);

  return (
    <>
      <Box sx={{width:'8rem', p:0,}}
           aria-owns={open ? 'mouse-over-popover' : undefined}
           onMouseEnter={handlePopoverOpen}
           onMouseLeave={handlePopoverClose}>
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
                startIcon={
                  <MyIcon sx={{
                    height:'1rem',
                    fill: color0,
                    // borderRadius:'6px',
                  }} />}
                size={'small'}
                onClick={onClick}>{label}</Button>
      </Box>
      {/*<Popover*/}
      {/*  id="mouse-over-popover"*/}
      {/*  sx={{*/}
      {/*    pointerEvents: 'none',*/}
      {/*  }}*/}
      {/*  open={open}*/}
      {/*  anchorEl={anchorEl}*/}
      {/*  // anchorReference="anchorPosition"*/}
      {/*  // anchorPosition={{ top: -20, left: 0 }}*/}
      {/*  anchorOrigin={{*/}
      {/*    vertical: 'top',*/}
      {/*    horizontal: 'left',*/}
      {/*  }}*/}
      {/*  transformOrigin={{*/}
      {/*    vertical: 'bottom',*/}
      {/*    horizontal: 'left',*/}
      {/*  }}*/}
      {/*  onClose={handlePopoverClose}*/}
      {/*  disableRestoreFocus>*/}
      {/*  /!*classes={{ paper: {marginBottom: '1rem'}} }}*!/*/}
      {/*  <Typography sx={{*/}
      {/*                    p: 1,*/}
      {/*                    backgroundColor: '#dfff80',*/}
      {/*                    color: '#4d6600',*/}
      {/*                    fontFamily: RobotoCondensedLight,*/}
      {/*                    fontSize: '0.8rem',*/}
      {/*                    fontWeight: 'bolder',*/}
      {/*                 }}>*/}
      {/*    {myTip}*/}
      {/*  </Typography>*/}
      {/*</Popover>*/}
    </>
  )
}
