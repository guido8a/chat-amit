import React, { useEffect } from 'react'
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
import { Chat } from './Chat';
import { useNavigate } from 'react-router-dom'

export const Widget = () => {
  const dispatch = useDispatch()
  const solicitudesAprobadas = useSelector(state => state.app.solicitudesAprobadas)
  const solicitudAprobada = useSelector(state => state.app.solicitudAprobada)
  const [anchorEl1, setAnchorEl1] = React.useState(null)
  // const handleClick = (e) => setAnchorEl1(e.currentTarget)
  const handleClose = () => {setAnchorEl1(null)}
  const open = Boolean(anchorEl1)
  const mid = open ? 'simple-popover' : undefined

  const instanciaTarea = useSelector(state => state.app.instanciaTarea)
  const instanciaProceso = useSelector(state => state.app.instanciaProceso)
  const navigate = useNavigate()

  const handleClick = () => {navigate('/chat')}

  useEffect(()=> {
    if(!f.isValid(instanciaTarea.id)) {navigate('/')}
  }, [instanciaTarea, navigate])

  useEffect(() => {window.scrollTo(0, 0)}, [])

  // if(f.isValid(instanciaTarea.id) && f.isValid(instanciaProceso.id) ) {

    // return(
    //   <>
    //   <Chat />
    //   </>
    // )

    // const formulario = {
    //  '' : () => <Chat />,
    // }[instanciaTarea?.tareaCodigoTarea]
    
    // if(f.isValid(formulario)) {
    //   return formulario()
    // } else {
    //   return <Box sx={{m:'80px 0 0 0'}}>{`ERROR, EN FORMULARIO PARA TAREA ${instanciaTarea?.nombreTarea} .- (${instanciaTarea?.tareaCodigoTarea})`}</Box>
    // }
  // }
  // else return (
  //   <Box sx={{m:'80px 0 0 0', height:'80px'}}>
  //     {'loading'}
  //   </Box>
  // )




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
        <Chat />
        <Box sx={{p:'0.8rem'}}>
          Acceso al Chat
          
        </Box>
      </Popover>
    </>
  )
}
