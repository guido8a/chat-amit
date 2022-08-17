import React from 'react'
import {dialog} from 'src/styles/styles'
import {InputAdornment, TextField} from '@mui/material'

export const MyDateTextField = ({id, label, formValues, icon, handleChange}) => {
  return (
    <TextField id={id}
               label={label}
               value={formValues[id]}
               fullWidth
               variant='standard'
               aria-readonly={true}
               sx={dialog.textTypography}
               type="date"
               InputProps={{
                 shrink: true,
                 disableUnderline: true,
                 startAdornment:(
                   <InputAdornment position="start">
                     {icon}
                   </InputAdornment>
                 ),
                 sx: {
                   fontSize: '12px',
                   backgroundColor: 'white',
                 }
               }}
               InputLabelProps={{sx: {fontSize: '14px',}}}
               onChange={handleChange} />
  )
}