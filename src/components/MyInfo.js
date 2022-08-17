import React from 'react'
import InfoIcon from '@mui/icons-material/Info'
import Box from '@mui/material/Box'
import {Tooltip} from "@mui/material";
import {withStyles} from "@mui/styles";
import RobotoCondensedRegular from 'src/styles/MyFonts/Roboto_Condensed/RobotoCondensed-Regular.ttf'

const MyTooltip = withStyles({
  tooltip: {
    color: 'black',
    border: '1px solid red',
    backgroundColor: 'white',
    shadows: '4px',
    fontfamily: RobotoCondensedRegular,
    fontSize: '0.8rem'
  }
})(Tooltip);

export const MyInfo = ({info}) => {
  return (
    <MyTooltip title={info}
               placement="top"
               arrow
               enterDelay={500}
               leaveDelay={200}>
      <Box><InfoIcon fontSize={'0.9rem'} sx={{mt:'4px'}}/></Box>
    </MyTooltip>
  );

}