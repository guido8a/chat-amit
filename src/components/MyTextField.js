import React from 'react'
import {dialog} from 'src/styles/styles'
import {InputAdornment, TextField} from '@mui/material'
import RobotoCondensedRegular from 'src/styles/MyFonts/Roboto_Condensed/RobotoCondensed-Regular.ttf'

export const MyTextField = ({
                              id,
                              label,
                              value,
                              formValues,
                              icon,
                              handleChange,
                              error='',
                              isNumber=false,
                              canEdit=true}) => {
  return (
    <TextField id={id}
               label={label}
               value={!!value?value:formValues[id]}
               type={isNumber ? 'number' : 'text'}
               fullWidth
               variant='standard'
               aria-readonly={true}
               sx={{...dialog.textTypography, m:'1rem 0 1rem 0'}}
               onChange={handleChange}
               InputProps={{
                 inputProps:{style:{textAlign: isNumber?'right':'left',}},
                 disableUnderline: true,
                 form: {autocomplete: 'off'},
                 startAdornment:(
                   <InputAdornment position="start">
                     {icon}
                   </InputAdornment>
                 ),
                 sx: {
                   fontSize: '0.9rem',
                   fontfamily: RobotoCondensedRegular,
                   color: '#888888',
                   backgroundColor: (canEdit===true)?'white':'transparent',
                 }
               }}
               InputLabelProps={{ sx: {
                   fontSize: '1.2rem',
                   color: '#888888',
                   fontfamily: RobotoCondensedRegular,
                   padding: '-24px',
                   shrink: true
                 }}}
               FormHelperTextProps={{sx: {
                     fontSize: '0.7rem',
                     fontfamily: RobotoCondensedRegular,
                     lineHeight: '1.2rem',
                     color:'black',
                     fontWeight: 'normal',
                     pl:'1rem'}}}
               helperText={!!error && error.length>0?error:""} />
  )
}
