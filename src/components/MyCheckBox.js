import {Checkbox, FormControlLabel, Typography} from "@mui/material";
import React from "react";


export const MyCheckBox = ({id, label, formValues, handleChange, canEdit=false}) => {
  return (
    <FormControlLabel label={<Typography sx={{fontSize:'12px'}}>{label}</Typography>}
                      control={canEdit?
                        <Checkbox id={id}
                                  style ={{
                                    color: "#444444",
                                  }}
                                  size='small'
                                  checked={formValues[id]}
                                  onChange={handleChange} />
                        :
                        <Checkbox id={id}
                                  style ={{
                                    color: "#444444",
                                  }}
                                  size='small'
                                  checked={formValues[id]} />
                      }
    />
  )
}
