import { styled, alpha } from '@mui/material/styles'
import Menu from '@mui/material/Menu'
import {Box} from '@mui/material'

export const StldMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
    }}
    transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
          theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
          'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                  theme.palette.primary.main,
                  theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}))

export const SltdBoxPopup = styled(Box)(
  ({width=400}) => {
    return(
      {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width,
        backgroundColor: 'white',
        border: '1px solid #000',
        borderRadius: 8,
        boxShadow: 4,
        padding: 24,
      }
    )
  }
)
