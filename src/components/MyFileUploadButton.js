import React, {useRef} from 'react'
import RobotoCondensedRegular from '../styles/MyFonts/Roboto_Condensed/RobotoCondensed-Regular.ttf'
import GLOBALS from 'src/features/App/globals'
import Button from '@mui/material/Button'
import FileUploadIcon from '@mui/icons-material/FileUpload'

export const MyFileUploadButton = ({inputRef, label,solicitudId, subfolder, fileName, afterUpload, width='5rem'}) => {

  return (
    <Button variant="contained"
            sx={{
              backgroundColor: 'rgba(54, 160, 184, 1)',
              fontSize: '0.8rem',
              fontfamily: RobotoCondensedRegular,
              fontWeight: 'normal',
              width,
              height: '36px',
            }}
            component='label'
            startIcon={<FileUploadIcon height={'1rem'} fill={'rgba(255, 255, 255, 0.6)'}/>}
            size={'small'}>
      {label}
      <input id={'IT'}
             ref={inputRef}
             accept="application"
             onChange={() => {
               const formData = new FormData()
               formData.append('idSolicitud', solicitudId)
               formData.append('subFolder', subfolder)
               formData.append('archivo', inputRef.current.files[0])
               formData.append('fileName', fileName)
               const requestOptions = {
                 method: 'POST',
                 body: formData,
                 redirect: 'follow'
               }
               fetch(`${GLOBALS.mainUrl}/documentos/cargarnombre`, requestOptions)
                 .then(response => response.text())
                 .then(result => {
                   afterUpload()
                 })
                 .catch(error => console.log('error: ', error))
             }}
             hidden
             type='file' />
    </Button>
  )
}