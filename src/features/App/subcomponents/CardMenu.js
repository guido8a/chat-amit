import React from 'react'
// import BorderColorIcon from "@mui/icons-material/BorderColor";
// import {Popover, Tooltip} from "@mui/material";
// import HighlightOffIcon from "@mui/icons-material/HighlightOff";
// import Box from "@mui/material/Box";
// import List from "@mui/material/List";
// import IconButton from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from '@mui/icons-material/Menu';
import {f} from "../../../commons";

const ITEM_HEIGHT = 48;

export const CardMenu =  ({menu}) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {setAnchorEl(event.currentTarget)}
  const handleClose = () => { setAnchorEl(null) }
  return (
    <>
      <MenuIcon id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                sx={{m:'0 0 0 -0.8rem', color: 'white'}}
                onClick={handleClick} />
      {
        (f.isValid(menu) && menu.length > 0)?
          <Menu id="long-menu"
                MenuListProps={{
                  'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: '21rem',
                  },
                }} >
            {menu.map((option) => (
              <MenuItem key={option.key}
                        // selected={option === 'Pyxis'}
                        onClick={()=> {
                          option.action()
                          setTimeout(() => {
                            handleClose()
                          }, 1000)
                        }} >
                {option.description}
              </MenuItem>
            ))}
          </Menu>:null
      }
    </>
  )
}
