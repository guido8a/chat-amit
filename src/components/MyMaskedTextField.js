import React, {forwardRef} from 'react'
import {TextField} from '@mui/material'
import {IMaskInput} from 'react-imask'
import {dialog} from 'src/styles/styles'
import {InputAdornment} from '@mui/material'
import RobotoCondensedRegular from 'src/styles/MyFonts/Roboto_Condensed/RobotoCondensed-Regular.ttf'

const IntPhoneNumberMaskCustom = forwardRef(function IntPhoneNumberMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput {...other}
                mask="{+}(#00) 0-000-00000"
                definitions={{
                  "#": /[1-9]/
                }}
                inputRef={ref}
                onAccept={(value) => onChange({ target: { name: props.name, value } })}
                overwrite />
  )
})

const CellPhoneNumberMaskCustom = forwardRef(function CellPhoneNumberMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput {...other}
                mask="#0 0000-0000"
                definitions={{
                  "#": /[0]/
                }}
                inputRef={ref}
                onAccept={(value) => onChange({ target: { name: props.name, value } })}
                overwrite />
  )
})

const HomePhoneNumberMaskCustom = forwardRef(function HomePhoneNumberMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput {...other}
                mask="#0-000 00 00"
                definitions={{
                  "#": /[0]/
                }}
                inputRef={ref}
                onAccept={(value) => onChange({ target: { name: props.name, value } })}
                overwrite />
  )
})

const dollarMaskCustom = forwardRef(function HomePhoneNumberMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput {...other}
                mask={'num'}
                blocks={{
                  num: {
                    // nested masks are available!
                    mask: Number,
                    thousandsSeparator: ' '
                  }
                }}
                inputRef={ref}
                onAccept={(value) => onChange({ target: { name: props.name, value } })}
                overwrite />
  )
})

export const MyMaskedTextField = ({
                                   id,
                                   label,
                                   value,
                                   formValues,
                                   setFormValues,
                                   icon,
                                   error='',
                                   canEdit=true,
                                   isNumber=false,
                                   type='IntPhoneNumber',
                                }) => {
  return (
    <TextField id={id}
               label={label}
               value={!!value?value:formValues[id]}
               fullWidth
               variant='standard'
               aria-readonly={true}
               sx={{...dialog.textTypography, m:'1rem 0 1rem 0'}}
               onChange={e => {
                 if(canEdit) {
                   setFormValues({...formValues, [id]: e.target.value})
                 }
               }}
               InputProps={{
                 inputProps:{style:{textAlign: isNumber?'right':'left',}},
                 readOnly: !canEdit,
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
                 },
                 inputComponent: {
                   'IntPhoneNumber':   IntPhoneNumberMaskCustom,
                   'CellPhoneNumber':  CellPhoneNumberMaskCustom,
                   'HomePhoneNumber':  HomePhoneNumberMaskCustom,
                   'dollarMaskCustom': dollarMaskCustom,
                 }[type]
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
