import * as React from 'react'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { Chip, Box } from '@mui/material'
import { InputAdornment } from '@mui/material'
import MenuItem from "@mui/material/MenuItem";

export const MyMultiSelect = ({ id, label, size, icon, value, valuesMap, handleChange }) => {
  let options = [];
  for (let [key, value] of valuesMap.entries()) {
    options.push(
      <MenuItem
        key={key}
        value={value}>
        {value}
      </MenuItem>);
  }
  return (
    <Box>
      <FormControl sx={{ m: '1rem', width: size }}>
        <InputLabel id={"select-label-" + id}>{label}</InputLabel>
        <Select labelId={"label_" + id}
                id={id}
                value={value}
                label={label}
                multiple={true}
                onChange={handleChange}
                startAdornment={
                  <InputAdornment position="start">
                    {icon}
                  </InputAdornment>
                }
                renderValue={(selected) => (
                  <Box sx={{gap: 0.5, maxWidth:'200px'}}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                {options}
              </Select>
      </FormControl>
    </Box>
  );
}