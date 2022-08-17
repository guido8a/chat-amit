import React from 'react'
import {Grid, Stack} from '@mui/material';
import {MyReadOnlyTextField} from 'src/components/MyReadOnlyTextField'
import {AccountCircle} from '@mui/icons-material'
import {MyReadOnlyAreaTextField} from 'src/components/MyReadOnlyAreaTextField'
import GLOBALS from "../../App/globals";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import {MyButtonBacan} from "../../../components/MyButtonBacan";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export const Resolucion = (solicitud) => {
  const s = solicitud.solicitud
  const p = !!s ? JSON.parse(s.payload) : {}
  return (
    <Grid container spacing={1} sx={{margin: '0'}}>
      <Grid item xs={12}>
        <Stack direction="row"
               justifyContent="space-between"
               alignItems="center"
               spacing={2} >
          <MyReadOnlyTextField id='identificador'
                               label={'Identificador'}
                               value={!!p ? p.Resolucion?.identificador : ''}
                               icon={<AccountCircle sx={{fontSize: '14px', color: 'silver', mr: '0.8rem'}}/>}/>
          <MyReadOnlyTextField id='fecha'
                               label={'Fecha'}
                               value={!!p ? p.Resolucion?.fecha : ''}
                               icon={<CalendarMonthIcon sx={{fontSize: '14px', color: 'silver', mr: '0.8rem'}}/>}/>
          <MyButtonBacan label={'VER PDF'}
                         onClick={() => {
                             const url = `${GLOBALS.mainUrl}/documentos/descargar?filename=vuv-${ solicitud?.solicitud?.id}/resolucion/${p['Resolucion']['pdf']}`
                             fetch(url)
                               .then((res) => { return res.blob(); })
                               .then((data) => {
                                 const dataPdf = new Blob([data], { type: 'application/pdf' })
                                 const a = document.createElement("a")
                                 a.href = window.URL.createObjectURL(dataPdf)
                                 a.target="_blank"
                                 a.click()
                               })
                         }}
                         myTip={'Ver resolución'}
                         icon={FileDownloadOutlinedIcon} />

        </Stack>
      </Grid>
    </Grid>
  )
}
