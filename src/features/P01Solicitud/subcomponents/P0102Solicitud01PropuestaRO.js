import React from 'react'
import Box from '@mui/material/Box'
import {
  Grid,
  Stack, Typography,
} from '@mui/material'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import {dialog} from 'src/styles/styles'
import ApartmentIcon from '@mui/icons-material/Apartment'
import {MyTextField} from 'src/components/MyTextField'
import {MyUpload} from 'src/components/MyUpload'
import {MySubtitle} from 'src/components/MySubtitle'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import RobotoCondensedRegular from 'src/styles/MyFonts/Roboto_Condensed/RobotoCondensed-Regular.ttf'
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import {MyMaskedTextField} from "../../../components/MyMaskedTextField";
import {MyReadOnlyTextField} from "../../../components/MyReadOnlyTextField";
import {MyReadOnlyAreaTextField} from "../../../components/MyReadOnlyAreaTextField";
import ScienceIcon from '@mui/icons-material/Science';
import BiotechIcon from '@mui/icons-material/Biotech';
import {MySwitch} from "../../../components/MySwitch";

export const PropuestaRO = ({payload}) => {
  const section = 'Propuesta'
  const propuesta = payload[section]
  const canEdit = false

  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={12} sx={dialog.titleContainer}>
          <MySubtitle subtitle={'Solicitud'} />
        </Grid>
        <Grid item xs={12}>
          <MyTextField id='nombre'
                       label={'Nombre del Proyecto *'}
                       formValues={propuesta}
                       icon={<ArticleOutlinedIcon sx={dialog.textFieldIcon}/>}
                       canEdit={canEdit} />
        </Grid>
        <Grid item xs={8}>
          <MyTextField id='patrocinador'
                                   label={'Identificación de la Institución Patrocinadora *'}
                                   formValues={propuesta}
                                   icon={<ApartmentIcon sx={dialog.textFieldIcon}/>}
                                   canEdit={canEdit} />
        </Grid>
        <Grid item xs={4}>
          <MyMaskedTextField id='montFinancimiento'
                             type={'dollarMaskCustom'}
                             label={'Monto de Financiamiento Aproximado *'}
                             formValues={propuesta}
                             isNumber={true}
                             icon={<AttachMoneyIcon sx={dialog.textFieldIcon}/>}
                             canEdit={false}
                             handleChange={() => null} />
        </Grid>
        <Grid item xs={12}>
            <MyUpload id={'cartaPatrocidador'}
                      dir={payload.solicitudId}
                      label={'Carta'}
                      formValues={propuesta}
                      canEdit={false}
                      info={'info...'} />
        </Grid>
        <Grid item xs={12}>
          <MyReadOnlyTextField id='apoyo'
                               label={'Identificación de la Institución Nacional de Apoyo *'}
                               formValues={propuesta}
                               value={propuesta.apoyo}
                               icon={<ApartmentIcon sx={dialog.textFieldIcon}/>}
                               canEdit={false} />
        </Grid>
        <Grid item xs={12} >
          <Stack direction={"row"} spacing={2} justifyContent="space-between" alignItems="center">
            <MyUpload id={'cartaApoyo'}
                      label={'Carta'}
                      dir={payload.solicitudId}
                      formValues={propuesta}
                      canEdit={false}
                      info={'info...'} />
            <MyUpload id={'convenioApoyo'}
                      dir={payload.solicitudId}
                      label={'Convenio'}
                      canEdit={false}
                      formValues={propuesta}
                      info={'info...'}/>
          </Stack>
        </Grid>
        <Grid item xs={12} >
          <Stack direction={"row"} spacing={2} justifyContent="flex-end" alignItems="center">
            <MyUpload id={'repLegalApoyo'}
                      dir={payload.solicitudId}
                      label={'Nombramiento Representante Legal'}
                      canEdit={false}
                      formValues={propuesta}
                      info={'info...'}/>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <MyReadOnlyAreaTextField id='resumen'
                                   label={'Resumen Ejecutivo *'}
                                   formValues={propuesta}
                                   value={propuesta.resumen}
                                   icon={<ArticleOutlinedIcon sx={dialog.textFieldIcon}/>} />
        </Grid>
        <Grid item xs={12}>
          <MyReadOnlyAreaTextField id='objetivo'
                                   label={'Objetivo General *'}
                                   value={propuesta.objetivo}
                                   icon={<ArticleOutlinedIcon sx={dialog.textFieldIcon}/>} />
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{fontSize:'0.9rem', fontFamily:RobotoCondensedRegular}}>Objetivos Específicos</Typography>
          {propuesta.objetivos.map(it => {
            return <Typography sx={{fontSize:'0.8rem', fontFamily:RobotoCondensedRegular, m:'1rem'}}>{it}</Typography>
          })}
        </Grid>
        <Grid item xs={3}>
          <MyReadOnlyTextField id='plazo'
                               label={'Plazo de ejecución'}
                               value={propuesta.plazo + ' meses'}
                               icon={<AccessTimeIcon sx={dialog.textFieldIcon}/>}
                               isNumber={true} />
        </Grid>
        <Grid item xs={9}>
          <MyReadOnlyTextField id='areaInvestigacion'
                               label={'Área de Investigación'}
                               icon={<BiotechIcon sx={dialog.textFieldIcon}/>}
                               value={propuesta.areaInvestigacion} />
        </Grid>
        <Grid item xs={3} />
        <Grid item xs={9}>
          <MyReadOnlyTextField id='lineaInvestigacion'
                               label={'Línea de Investigación'}
                               icon={<ScienceIcon sx={dialog.textFieldIcon}/>}
                               value={propuesta.lineaInvestigacion} />
        </Grid>
        <Grid item xs={12}>
          <MyReadOnlyAreaTextField id='definicionProblema'
                                   label={'Definición del Problema'}
                                   value={propuesta.definicionProblema}
                                   icon={<ArticleOutlinedIcon sx={dialog.textFieldIcon}/>} />
        </Grid>
        <Grid item xs={12}>
          <MyReadOnlyAreaTextField id='justificacion'
                                   label={'Justificación'}
                                   value={propuesta.justificacion}
                                   icon={<ArticleOutlinedIcon sx={dialog.textFieldIcon}/>} />
        </Grid>
        <Grid item xs={5}>
          <MySwitch id='recursoASerRecolectado'
                    label={'¿Recurso a ser recolectado?'}
                    formValues={propuesta}
                    canEdit={false} />
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={5}>
          <MySwitch id='recursoRecolectadoPreviamente'
                    label={'¿Recurso depositado previamente?'}
                    formValues={propuesta}
                    canEdit={false} />
        </Grid>
        {propuesta['recursoASerRecolectado'] ?
          <Grid item xs={12}>
            <MyReadOnlyAreaTextField id='metodologia'
                                     label={'Metodología de campo *'}
                                     value={propuesta.metodologia}
                                     icon={<ArticleOutlinedIcon sx={dialog.textFieldIcon}/>}/>
          </Grid> : null
        }
        {propuesta['recursoRecolectadoPreviamente'] ?
          <Grid item xs={12}>
            <MyReadOnlyAreaTextField id='metodologiaLaboratorio'
                                     label={'Metodología de laboratorio*'}
                                     value={propuesta.metodologiaLaboratorio}
                                     icon={<ArticleOutlinedIcon sx={dialog.textFieldIcon}/>}/>
          </Grid> : null
        }
        {/*<Grid item xs={12}>*/}
        {/*  <MyUpload id={'metodologiaDoc'}*/}
        {/*            label={'Metodología *'}*/}
        {/*            dir={payload.solicitudId}*/}
        {/*            formValues={propuesta}*/}
        {/*            canEdit={false}*/}
        {/*            info={'info...'} />*/}
        {/*</Grid>*/}
        <Grid item xs={12}>
          <Typography sx={{fontSize:'0.9rem', fontFamily:RobotoCondensedRegular}}>Resultados Esperados</Typography>
          {propuesta.resultadosEsperados.map(it => {
            return <Typography sx={{fontSize:'0.8rem', fontFamily:RobotoCondensedRegular, m:'1rem'}}>{it}</Typography>
          })}
        </Grid>
      </Grid>
    </Box>
  )
}
