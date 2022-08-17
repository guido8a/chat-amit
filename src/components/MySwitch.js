import React from 'react'
import {Stack, Switch, Typography} from '@mui/material'
import {makeStyles} from '@mui/styles'
import RobotoCondensedRegular from 'src/styles/MyFonts/Roboto_Condensed/RobotoCondensed-Regular.ttf'

const useStyles = makeStyles({
  root: {
    width: "50px",
    height: "24px",
    padding: "0px"
  },
  switchBase: {
    color: "#818181",
    padding: "1px",
    "&$checked": {
      "& + $track": {
        backgroundColor: "#94c11d"
      }
    }
  },
  thumb: {
    color: "white",
    width: "20px",
    height: "20px",
    margin: "1px"
  },
  track: {
    borderRadius: "20px",
    backgroundColor: "#888888",
    opacity: "1 !important",
    "&:after, &:before": {
      color: "white",
      fontSize: "0.8rem",
      fontFamily: RobotoCondensedRegular,
      position: "absolute",
      top: "6px"
    },
    "&:after": {
      content: "'SI'",
      left: "8px"
    },
    "&:before": {
      content: "'NO'",
      right: "7px"
    }
  },
  checked: {
    color: "#94c11d !important",
    transform: "translateX(26px) !important"
  }
});

export const MySwitch = ({id, canEdit, label, setFormValues, formValues, handleChange, not=false, fullWidth=true}) => {
  const classes = useStyles();
  return (
    <Stack direction="row" justifyContent={fullWidth ? "space-between" : "flex-end"} sx={{m:'1rem 1rem 1rem 0'}}>
      <Typography sx={{
        fontSize: '0.9rem',
        color: '#888888',
        fontFamily: RobotoCondensedRegular,
        fontWeight: 'normal',
        mr:'2rem',
        }}>
        {label}
      </Typography>
      <Switch id={id}
              classes={{
                root: classes.root,
                switchBase: classes.switchBase,
                thumb: classes.thumb,
                track: classes.track,
                checked: classes.checked
              }}
              disabled={!canEdit}
              checked={!not?formValues[id]:!formValues[id]}
              // checked={formValues[id]}
              onChange={(e, value) => {
                handleChange(e, value, canEdit, setFormValues, formValues)
              }}
      />
    </Stack>
  )
}
