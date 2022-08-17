import React from 'react'
import {InputLabel,} from '@mui/material'
import TextareaAutosize from '@mui/base/TextareaAutosize'
import Box from "@mui/material/Box";

export const MyReadOnlyAreaTextField = ({id, label, value, icon, rows=4}) => {
  return (
    <Box sx={{m:'1rem 0 1rem 0'}}>
      <InputLabel sx={{fontSize: '0.9rem'}}
                  id="demo-simple-select-label">
        {label}
      </InputLabel>
      <TextareaAutosize id={id}
                        style={{
                          width:'100%', border: '1px dotted #cccccc', minHeight:'12vw',
                          maxHeight:'24vw', resize: "vertical", overflow: 'auto',
                          backgroundColor: 'transparent'
                        }}
                        value={value}
                        floatinglabel={"true"}
                        fullwidth={"true"} />
    </Box>
  )
}
