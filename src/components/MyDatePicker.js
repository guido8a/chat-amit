import React, {useState, useEffect} from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import {es} from 'date-fns/locale'
import {parse, format} from 'date-fns'
import {InputAdornment, TextField} from '@mui/material'
import {MyReadOnlyTextField} from './MyReadOnlyTextField'
import DateRangeIcon from '@mui/icons-material/DateRange'
import RobotoCondensedRegular from "src/styles/MyFonts/Roboto_Condensed/RobotoCondensed-Regular.ttf";

export const MyDatePicker = ({id, label, formValues, setFormValues, canEdit=true}) => {
  const [value, setValue] = useState(formValues[id] === '' ? new Date():parse(formValues[id], 'dd-MMMM-yyyy', new Date(), {locale: es}))
  useEffect(()=>{
    setFormValues({...formValues, [id]:format(value,'dd-MMMM-yyyy', {locale: es})})
  },[value])
  if(canEdit) {
    return (
      <LocalizationProvider locale={es} dateAdapter={AdapterDateFns}>
        <DatePicker label={label}
                    variant="inline"
                    inputFormat="dd-MMMM-yyyy"
                    disableMaskedInput={true}
                    sx={{width:'100%'}}
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                    renderInput={(params) =>
                      <TextField {...params}
                                 sx={{input: { fontfamily:RobotoCondensedRegular, color:'#888888', fontSize:'0.9rem' }}}
                                 fullWidth
                                 variant={'standard'}/>} />
      </LocalizationProvider>
    )
  } else {
    require (
      <MyReadOnlyTextField value={formValues[id]}
                           label={label}
                           icon={<DateRangeIcon sx={{fontSize: '14px', color: 'silver', mr: '0.8rem'}}/>}/>
    )
  }

}
