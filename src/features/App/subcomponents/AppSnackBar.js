import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Snackbar from '@mui/material/Snackbar'
import {Alert} from '@mui/material'
import {setSnackMessage} from 'src/features/App/sliceApp'
import {useTheme} from '@mui/material/styles'

export const AppSnackbar = () => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const showSnackBar = useSelector(state => state.app.showSnackBar)
  const snackBarMessage = useSelector(state => state.app.snackBarMessage)
  const bgcolor = {
    'error': theme.palette.error.main,
    'warning': theme.palette.warning.main,
    'info': theme.palette.info.main,
    'success': theme.palette.success.main,
  }[snackBarMessage.severity.toLowerCase()] ?? theme.palette.info.main
  const color = 'white'

  const handleClose = () => {dispatch(setSnackMessage({message:'', severity:'info'}))}

  if(snackBarMessage?.message !== '' && snackBarMessage?.severity !== '') {
    return (
        <Snackbar open={showSnackBar} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose}
                 severity={snackBarMessage.severity}
                 sx={{
                   width:'100%',
                   backgroundColor:`${bgcolor}`,
                   color:`${color}`,
                   mb:'4rem',
                   "& .MuiAlert-icon": {
                     color:`${color}`
                   }}} >
            {snackBarMessage.message}
          </Alert>
        </Snackbar> )
  } else {
    return null
  }

}
