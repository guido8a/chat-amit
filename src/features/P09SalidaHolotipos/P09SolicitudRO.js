import React from 'react'
import {AppBar, Box, CssBaseline, Grid} from '@mui/material'
import {useDispatch} from 'react-redux'
import {accordeonBox} from "../../styles/styles";
import {SectionTitle} from "../../components/SectionTitle";
import Toolbar from "@mui/material/Toolbar";
import {MyButtonBacan} from "../../components/MyButtonBacan";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {useNavigate} from 'react-router-dom'
import {handelSetAnyPayload, handleClear} from "../App/sliceApp";
// import {P09RO} from "./P10ATMRO";

export default () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const payload=useSelector(state => state.app.anyPayload)
  return (
    <Box sx={accordeonBox.container}>
      <AppBar position='fixed'
              color='primary'
              elevation={0}
              sx={{top:'64px', bottom:'auto', margin: 0, padding:0, backgroundColor:'rgba(148, 193, 32, 0.8)'}} >
        <SectionTitle title={'solicitud de salida de holotipos (ro)'} />
      </AppBar>

      {/*<P09RO payload={payload} />*/}

      <CssBaseline/>
      <AppBar position='fixed'
              color='primary'
              elevation={0}
              sx={accordeonBox.bottomBar} >
        <Toolbar>
          <Grid container sx={{p:0, mt:'-1rem'}}>
            <Grid item xs={4} style={{padding:'0 24px 0 0'}}>
              <MyButtonBacan label={'Regresar'}
                             icon={ArrowBackIcon}
                             onClick={() => {
                               dispatch(handleClear())
                               dispatch(handelSetAnyPayload({}))
                               navigate('/')
                             }} />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
