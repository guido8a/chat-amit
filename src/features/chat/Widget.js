import React from 'react'
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import Typography from '@mui/material/Typography'
import {Checkbox, ListItem, ListItemIcon, ListItemText, Popover} from '@mui/material'
import {useDispatch, useSelector} from "react-redux";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import CropSquareIcon from '@mui/icons-material/CropSquare';
import SquareIcon from '@mui/icons-material/Square';
import {handleSetSolicitudAprobada} from 'src/features/App/sliceApp'
import {f} from 'src/commons/f'

export const Widget = () => {
  const dispatch = useDispatch()
  const solicitudesAprobadas = useSelector(state => state.app.solicitudesAprobadas)
  const solicitudAprobada = useSelector(state => state.app.solicitudAprobada)
  const [anchorEl1, setAnchorEl1] = React.useState(null)
  const handleClick = (e) => setAnchorEl1(e.currentTarget)
  const handleClose = () => {setAnchorEl1(null)}
  const open = Boolean(anchorEl1)
  const mid = open ? 'simple-popover' : undefined

  return (
    <>
      <Box aria-describedby={mid} onClick={handleClick} sx={{height:'100%'}}>
        <FactCheckOutlinedIcon sx={{color:'white', height:'100%', fontSize:'3rem', fontWeight:'lighter'}} />
      </Box>
      <Popover id={mid}
               open={open}
               anchorEl={anchorEl1}
               onClose={handleClose}
               transformOrigin={{
                 vertical: 'top',
                 horizontal: 'right',
               }}
               anchorOrigin={{
                 vertical: 'bottom',
                 horizontal: 'right',
               }} >
        <Box sx={{p:'0.8rem'}}>
          * * * c o n t i n o s . . .
        </Box>
      </Popover>
    </>
  )
}
