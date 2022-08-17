import React from 'react'
import {InputLabel, Typography,} from '@mui/material'
import TextareaAutosize from '@mui/base/TextareaAutosize'
import RobotoCondensedRegular from 'src/styles/MyFonts/Roboto_Condensed/RobotoCondensed-Regular.ttf'
import Box from "@mui/material/Box";

export const MyAreaTextField = ({id, label, value, formValues, icon, handleChange, rows=4, error}) => {
  if(!!error) console.log(error)
  return (
    <Box sx={{m:'1rem 0 1rem 0'}}>
      <InputLabel sx={{fontSize: '0.9rem', fontfamily: RobotoCondensedRegular}}
                  id="demo-simple-select-label">
        {label}
      </InputLabel>
      <TextareaAutosize id={id}
                        style={{
                          width:'100%',
                          border: '1px dotted #cccccc',
                          minHeight:'20rem',
                          maxHeight:'40rem',
                          resize: "vertical",
                          overflow: 'auto',
                          fontFamily: RobotoCondensedRegular,
                          color: '#888888'
                        }}
                        value={!!value?value:formValues[id]}
                        floatinglabel={"true"}
                        fullwidth={"true"}
                        onChange={handleChange} />
      {
        (error !== undefined && error !== null)?
          <Typography sx={{
            fontSize: '1rem',
            fontfamily: RobotoCondensedRegular,
            color:'silver',
            fontWeight: 'normal',
            pl:'1rem'}}>{error}</Typography>
          :null
      }
    </Box>
  )
}
