import React, {useRef, useState} from 'react'
import {Grid, Typography} from '@mui/material'
import {dialog} from 'src/styles/styles'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined'
import {MyInfo} from 'src/components/MyInfo'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// import IconButton from '@mui/material/IconButton'
import RobotoCondensedRegular from 'src/styles/MyFonts/Roboto_Condensed/RobotoCondensed-Regular.ttf'
import {MyButtonBacan} from "./MyButtonBacan";
import GLOBALS from 'src/features/App/globals'
import {LoadingButton} from "@mui/lab";

// eslint-disable-next-line import/no-anonymous-default-export
export const MyUpload = ({
                           id,
                           dir='', // solicitud id
                           label,
                           formValues,
                           setFormValues,
                           // info=null,
                           canEdit=true //todo: false by default for production it is
}) => {
  const inputRef = useRef()
  const [selectedFile, setSelectedFile] = useState({})
  const [loading, setLoading] = useState(false)
  const INPUT_ID = `FILE-INPUT-${id}`
  const haveSelected = selectedFile !== undefined && selectedFile.name !== undefined && selectedFile.name !== null
  if(canEdit) {
    return (
      <Grid container sx={{maxWidth:'23rem', m:'1rem 0 1rem 0'}} spacing={1}>
        <Grid xs={5} item  >
          <Typography variant='subtitle1'
                      component='h2'
                      sx={{...dialog.titleTypography2, m:0, p:0,lineHeight:'1.2rem'}}>
            <>{label}</>
          </Typography>
        </Grid>
        <Grid xs={1} item>
          <span><MyInfo info={'info'} /></span>
        </Grid>
        <Grid xs={6} item>
          {(formValues[id] !== '' && formValues[id] !== undefined) ?
            <MyButtonBacan icon={PictureAsPdfOutlinedIcon}
                           label={'ver pdf'}
                           onClick={ () => {
                             const url = `${GLOBALS.mainUrl}/documentos/descargar?filename=vuv-${dir}/${id}/${formValues[id]}`
                             fetch(url)
                               .then((res) => { return res.blob(); })
                               .then((data) => {
                                 // const a = document.createElement("a")
                                 // a.href = window.URL.createObjectURL(data)
                                 // a.download = formValues[id]
                                 // a.click()
                                 const dataPdf = new Blob([data], { type: 'application/pdf' })
                                 const a = document.createElement("a")
                                 a.href = window.URL.createObjectURL(dataPdf)
                                 a.target="_blank"
                                 a.click()
                               })
                           }} />:null
          }
        </Grid>

        <Grid xs={6} item>
          <LoadingButton loading={loading}
                         loadingIndicator={'SUBIENDO'}
                         variant="contained"
                         sx={{
                           // borderRadius: 2,
                           backgroundColor: 'rgba(148, 193, 32, 1)',
                           fontSize: '0.8rem',
                           fontfamily: RobotoCondensedRegular,
                           fontWeight: 'normal',
                           width: '9rem',
                           height: '36px',
                         }}
                         startIcon={
                           <FileUploadIcon sx={{
                             height:'1rem',
                             // fill: color0,
                             // borderRadius:'6px',
                           }} />}
                         component='label'
                         size={'small'}>
            SUBIR ARCHIVO
            <input id={INPUT_ID}
                   ref={inputRef}
                   accept="application/pdf,application/vnd.ms-excel"
                   onChange={() => {
                     setSelectedFile(inputRef.current.files[0])
                     const formData = new FormData()
                     formData.append('idSolicitud', dir)
                     formData.append('subFolder', id)
                     formData.append('archivo', inputRef.current.files[0])

                     const requestOptions = {
                       method: 'POST',
                       body: formData,
                       redirect: 'follow'
                     }
                     setLoading(true)
                     fetch(`${GLOBALS.mainUrl}/documentos/cargar`, requestOptions)
                       .then(response => response.text())
                       .then(result => {
                         const rslt = JSON.parse(result)
                         const rutaDocumento = rslt['rutaDocumento']
                         const splits = rutaDocumento.split('/')
                         const documento = splits.length > 1 ? splits[splits.length - 1]:rslt
                         setFormValues({...formValues, [id]:documento})
                         setSelectedFile({})
                         setLoading(false)
                       })
                       .catch(error => {
                         console.log('error: ', error)
                         setLoading(false)
                       })
                     // const myInput = document.getElementById(INPUT_ID)
                     // const fReader = new FileReader()
                     // fReader.readAsDataURL(myInput.files[0])
                     // fReader.onloadend = function(event){
                     //   console.log(event.target.result)
                     // }
                   }}
                   hidden
                   type='file' />
          </LoadingButton>
        </Grid>

        <Grid xs={6} item>
          <MyButtonBacan variant='contained'
                         disabled={formValues[id] === ''}
                         icon={DeleteOutlineIcon}
                         label={'ELIMINAR'}
                         bgColor0={'rgba(146, 146, 146, 1)'}
                         color0={'white'}
                         bgColor1={'rgba(189, 188, 188, 1)'}
                         onClick={() => {
                           setFormValues({...formValues, [id]:''})
                           // fetch(`${GLOBALS.mainUrl}/documentos/borrar`, requestOptions)
                           //   .then(response => response.text())
                           //   .then(result => {
                           //   })
                           //   .catch(error => console.log('error: ', error));
                         }} />
        </Grid>

        <Grid xs={12} item>
          <Typography variant='subtitle1'
                      component='h2'
                      sx={dialog.fileSelected}>
            <>{
              haveSelected ?`A subir: ${selectedFile.name}`:formValues[id]
            }</>
          </Typography>
        </Grid>
      </Grid>
    )
  } else {
    return (
      <Grid container sx={{maxWidth:'30rem', m:'1rem 0 1rem 0'}} >
        <Grid xs={5} item  >
          <Typography variant='subtitle1'
                      component='h2'
                      sx={{...dialog.titleTypography2, m:0, p:0,lineHeight:'1.2rem'}}>
            <>{label}</>
          </Typography>
        </Grid>
        <Grid xs={1} item>
          <span><MyInfo info={'info'} /></span>
        </Grid>
        <Grid xs={6} item>
          {(formValues[id] !== '' && formValues[id] !== undefined) ?
            <MyButtonBacan icon={PictureAsPdfOutlinedIcon}
                           label={'ver pdf'}
                           onClick={ () => {
                             const url = `${GLOBALS.mainUrl}/documentos/descargar?filename=vuv-${dir}/${id}/${formValues[id]}`
                             fetch(url)
                               .then((res) => { return res.blob(); })
                               .then((data) => {
                                 const dataPdf = new Blob([data], { type: 'application/pdf' })
                                 const a = document.createElement("a")
                                 a.href = window.URL.createObjectURL(dataPdf)
                                 a.target="_blank"
                                 a.click()
                               })
                           }} />:null
          }
        </Grid>

        <Grid xs={12} item>
          <Typography variant='subtitle1' component='h2' sx={dialog.fileSelected}>
            <>{formValues[id]}</>
          </Typography>
        </Grid>

      </Grid>
    )
  }
}
