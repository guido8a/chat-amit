import FileUploadIcon from "@mui/icons-material/FileUpload";
import Button from "@mui/material/Button";
import React from "react";
import RobotoCondensedRegular from 'src/styles/MyFonts/Roboto_Condensed/RobotoCondensed-Regular.ttf'

// eslint-disable-next-line import/no-anonymous-default-export
export default ({label, color='gray', icon=<FileUploadIcon />, onClick}) => {
  return (
    <Button variant="contained"
            startIcon={icon}
            style={{
              borderRadius: 15,
              backgroundColor: {color},
              fontSize: '0.7rem',
              fontFamily:  RobotoCondensedRegular,
              fontWeight: 'normal',
              width: '8rem',
              height: '2rem',
            }}
            component="label"
            size={'small'}
            onClick={onClick}>
      {label}
    </Button>
  )
}
