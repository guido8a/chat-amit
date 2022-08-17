import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import AppsTwoToneIcon from '@mui/icons-material/AppsTwoTone'
import {StldMenu} from 'src/features/App/StyledComponents'
import MenuItem from '@mui/material/MenuItem'
import EditIcon from '@mui/icons-material/Edit'
import IconButton from '@mui/material/IconButton'
import {
  handleCrearProceso, handleRefreshTareas,
} from 'src/features/App/sliceApp'

const Widget = () => {
  const perfilUsuario = useSelector(state => state.app.perfilUsuario)
  const investigador = useSelector(state => state.app.investigador)
  const dispatch = useDispatch()
  const [anchorEl0, setAnchorEl0] = React.useState(null)
  const open = Boolean(anchorEl0)
  const handleClick = (event) => { setAnchorEl0(event.currentTarget) }
  const handleClose = () => { setAnchorEl0(null) }
  // const
  if(!!perfilUsuario?.id) {
    return (
      <>
        <IconButton id="app-customized-button"
                    size="large"
                    edge="end"
                    color="inherit"
                    aria-label="menu"
                    aria-controls={open ? 'app-customized-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup='true'
                    onClick={handleClick}
                    sx={{m: 0, pl: 0, color: 'white'}} >
          <AppsTwoToneIcon id={'user-menu'}/>
        </IconButton>
        {
          investigador?
          <StldMenu id="app-customized-menu"
                    MenuListProps={{'aria-labelledby': 'app-customized-menu',}}
                    anchorEl={anchorEl0}
                    open={Boolean(anchorEl0)}
                    onClose={handleClose}>
            <MenuItem onClick={() => {
              dispatch(handleCrearProceso(55000001, perfilUsuario?.id, perfilUsuario?.idPerfilUsuario))
              setTimeout(function(){
                dispatch(handleRefreshTareas(perfilUsuario.id))
              }, 1500);
              handleClose()
            }} >
              <EditIcon />
              {'Nueva Solicitud'}
            </MenuItem>
            {/*<MenuItem onClick={() => {*/}
            {/*  dispatch(handleCrearProceso(55000004, perfilUsuario?.id, perfilUsuario?.idPerfilUsuario))*/}
            {/*  handleClose()*/}
            {/*}} disableRipple>*/}
            {/*  <EditIcon/>*/}
            {/*  {'Declaración de Movilización'}*/}
            {/*</MenuItem>*/}
          </StldMenu>:null
        }
      </>
    )
  } else {
    return (
      <IconButton id="app-customized-button"
                  size="large"
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  aria-controls={open ? 'app-customized-menu' : undefined}
                  aria-expanded={open ? 'true' : undefined}
                  aria-haspopup='true'
                  sx={{m: 0, pl: 0, color: 'white'}} >
      <AppsTwoToneIcon id={'user-menu'}/>
    </IconButton>
    )
  }
}

export default Widget
