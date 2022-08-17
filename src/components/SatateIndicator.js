import React from 'react'
import BorderColorIcon from "@mui/icons-material/BorderColor";
import {Tooltip} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
// import Box from "@mui/material/Box";
// import List from "@mui/material/List";
// import IconButton from "@mui/material/Button";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import SatateIndicator from '@mui/icons-material/Menu';
import DoDisturbAltIcon from '@mui/icons-material/DoDisturbAlt';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

// const ITEM_HEIGHT = 48;

export const SatateIndicator =  ({state, tip=''}) => {
  const sx = {color: 'white', fontSize: '1rem'}
  const MyIcon = {
    'editable':     BorderColorIcon,
    'noEditable':   HighlightOffIcon,
    'noAprobabada': HighlightOffIcon,
    'aprobada':     CheckCircleOutlineIcon,
    'suspendida':   DoDisturbAltIcon,
  }[state] ?? AcUnitIcon

  return (
    <Tooltip title={tip} >
      <MyIcon sx={sx} />
    </Tooltip>
  )
}
