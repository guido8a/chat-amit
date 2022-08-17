import * as React from 'react'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import {InputAdornment, TextField} from '@mui/material'
import {dialog} from 'src/styles/styles'
import RobotoCondensedRegular from 'src/styles/MyFonts/Roboto_Condensed/RobotoCondensed-Regular.ttf'
import {f} from 'src/commons/f'

export const MySelect = ({
                           id,
                           label,
                           icon,
                           value=null,
                           error=null,
                           formValues,
                           setFormValues,
                           data,
                           handleChange,
                           canEdit=true,
                           defaultValue=''}
) => {
  let options = [];
  data?.map((value, idx) => {
      options.push(
        <MenuItem
          key={idx}
          value={value}>
          {value}
        </MenuItem>);
  })
  return (
    <Box>
      <TextField id={id}
                 select
                 label={label}
                 value={
                  f.isValid(value)?value:
                    (data.indexOf(formValues[id]) >= 0)?formValues[id]:
                      f.isValid(defaultValue)?defaultValue:data[0]
                 }
                 fullWidth
                 variant='standard'
                 aria-readonly={true}
                 sx={{...dialog.textTypography, m:'1rem 0 1rem 0'}}
                 onChange={(e)=> {
                   if(canEdit)
                     setFormValues({...formValues, [id]: e.target.value})
                 }}
                 InputProps={{
                   readOnly:!canEdit,
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
                 helperText={f.isValid(error) && error.length>0?error:""} >
        {options}
      </TextField>
    </Box>
  )
}
