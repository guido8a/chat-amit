import React from 'react'
import {dialog} from 'src/styles/styles'
import {Autocomplete, InputAdornment, TextField} from '@mui/material'
import RobotoCondensedRegular from 'src/styles/MyFonts/Roboto_Condensed/RobotoCondensed-Regular.ttf'

export const MyAutocompleteTextField = ({
                                          options,
                                          id,
                                          label,
                                          formValues,
                                          icon,
                                          handleChange,
                                          error,
                                          canEdit
                                       }) => {
  return (
    <Autocomplete freeSolo
                  readOnly={!canEdit}
                  value={formValues[id]}
                  id={id}
                  disableClearable
                  options={options}
                  onSelect={handleChange}
                  renderInput={(params) => (
                    <TextField {...params}
                               id={id}
                               label={label}
                               // value={formValues[id]}
                               fullWidth
                               variant='standard'
                               aria-readonly={true}
                               sx={
                                 {...dialog.textTypography, m:'1rem 0 1rem 0'}
                               }
                               InputProps={{
                                 ...params.InputProps,
                                 readOnly: !canEdit,
                                 type: 'search',
                                 disableUnderline: true,
                                 startAdornment:(
                                   <InputAdornment position='start'>
                                     {icon}
                                   </InputAdornment>
                                 ),
                                 sx: {
                                   fontSize: '0.8rem',
                                   fontfamily: RobotoCondensedRegular,
                                   backgroundColor: (canEdit===true)?'white':'transparent',
                                 }
                               }}
                               InputLabelProps={{sx: {
                                   fontSize: '1.2rem',
                                   fontfamily: RobotoCondensedRegular,
                                 }}}
                               FormHelperTextProps={{sx: {
                                   fontSize: '0.7rem',
                                   fontfamily: RobotoCondensedRegular,
                                   color:'black',
                                   fontWeight: 'normal',
                                   pl:'1rem'}}}
                               helperText={!!error && error.length>0?error:""}
                    />
                  )}  />
  )
}
