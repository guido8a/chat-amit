import React from 'react'
import {Grid, Stack, TextField, Typography} from '@mui/material'
import {
  Wc,
  CoPresent, Badge,
} from '@mui/icons-material'
import {MyReadOnlyTextField} from "src/components/MyReadOnlyTextField";
import {MyTextField} from "../../../components/MyTextField";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import {dialog} from "../../../styles/styles";
import {MyAutocompleteTextField} from "../../../components/MyAutocompleteTextField";
import {areasInvestigacion, patrocinadores} from "../CONF";
import ApartmentIcon from "@mui/icons-material/Apartment";
import {MyUpload} from "../../../components/MyUpload";
import {MyAreaTextField} from "../../../components/MyAreaTextField";
import {MyTable as MyTableProductos, MyTable as MyTableObjetivos} from "../../../components/MyTable";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RobotoCondensedRegular from "../../../styles/MyFonts/Roboto_Condensed/RobotoCondensed-Regular.ttf";
import {MyReadOnlyAreaTextField} from "../../../components/MyReadOnlyAreaTextField";
import {MySubtitle} from "../../../components/MySubtitle";

// eslint-disable-next-line import/no-anonymous-default-export
export default (solicitud) => {
  const s = solicitud.solicitud
  const p = JSON.parse(s?.payload)
  const section = p['Propuesta']

  return (
    <Grid container spacing={1} sx={{margin:'0 0 0 0'}}>
      <Grid item xs={12} sx={dialog.titleContainer}>
        <MySubtitle subtitle={'Solicitud'} />
      </Grid>
      <Grid item xs={12}>
        <Stack direction='row'
               justifyContent='space-between'
               alignItems='center'
               spacing={2}>
        <MyReadOnlyTextField id='identificador'
                             label={'Identificador'}
                             value={solicitud?.solicitud?.numeroSolicitud}
                             icon={<Wc sx={{fontSize: '14px', color:'silver', mr:'0.8rem'}}/>} />
          <MyReadOnlyTextField id='fecha'
                               label={'Fecha'}
                               value={solicitud?.solicitud?.dateCreated}
                               icon={<Badge sx={{fontSize: '14px', color:'silver', mr:'0.8rem'}}/>}/>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <MyReadOnlyTextField id='nombre'
                             label={'Nombre del Proyecto'}
                             value={section?.nombre}
                             icon={<ArticleOutlinedIcon sx={dialog.textFieldIcon}/>}/>
      </Grid>
      <Grid item xs={12}>
        <MyReadOnlyTextField id='patrocinador'
                             label={'Patrocinador'}
                             value={section?.patrocinador}
                             icon={<ArticleOutlinedIcon sx={dialog.textFieldIcon}/>}/>
      </Grid>
      <Grid item xs={12} sx={{margin:'0 0 0 0'}}>
        <Stack direction='row'
               justifyContent='space-between'
               alignItems='center'
               spacing={2}>
          <MyReadOnlyTextField id='montFinancimiento'
                               label={'Monto de Financiamiento'}
                               value={section?.montFinancimiento}
                               icon={<ArticleOutlinedIcon sx={dialog.textFieldIcon}/>}/>
          <MyUpload id={'cartaPatrocidador'}
                    dir={s.id}
                    label={'Carta'}
                    formValues={section}
                    canEdit={false}
                    info={'info...'}/>
          {/*<MyUpload id={'convenioPatrocidador'}*/}
          {/*          dir={s.id}*/}
          {/*          label={'Convenio'}*/}
          {/*          formValues={section}*/}
          {/*          canEdit={false}*/}
          {/*          info={'info...'}/>*/}
          {/*<MyUpload id={'repLegalPatrocidador'}*/}
          {/*          dir={s.id}*/}
          {/*          label={'Nombramiento Representante Legal *'}*/}
          {/*          formValues={section}*/}
          {/*          canEdit={false}*/}
          {/*          info={'info...'}/>*/}
        </Stack>
      </Grid>

      <Grid item xs={12}>
        <MyReadOnlyTextField id='apoyo'
                             label={'Apoyo'}
                             value={section?.apoyo}
                             icon={<ArticleOutlinedIcon sx={dialog.textFieldIcon}/>}/>
      </Grid>

      <Grid item xs={12} sx={{margin:'0 0 0 0'}}>
        <Stack direction='row'
               justifyContent='space-between'
               alignItems='center'
               spacing={2}>
          <MyUpload id={'cartaApoyo'}
                    dir={s.id}
                    label={'Carta'}
                    formValues={section}
                    canEdit={false}
                    info={'info...'}/>
          <MyUpload id={'convenioApoyo'}
                    dir={s.id}
                    label={'Convenio'}
                    formValues={section}
                    canEdit={false}
                    info={'info...'}/>
          {/*<MyUpload id={'repLegalApoyo'}*/}
          {/*          dir={s.id}*/}
          {/*          label={'Nombramiento Representante Legal'}*/}
          {/*          formValues={section}*/}
          {/*          canEdit={false}*/}
          {/*          info={'info...'}/>*/}
        </Stack>
      </Grid>

      <Grid item xs={12}>
        <MyReadOnlyAreaTextField id='resumen'
                                 label={'Resumen Ejecutivo'}
                                 value={section['resumen']}
                                 icon={<ArticleOutlinedIcon sx={dialog.textFieldIcon}/>} />
      </Grid>

      <Grid item xs={12}>
        <MyReadOnlyAreaTextField id='objetivo'
                                 label={'Objetivo General'}
                                 value={section['objetivo']}
                                 icon={<ArticleOutlinedIcon sx={dialog.textFieldIcon} />} />
      </Grid>

      <Grid item xs={12}>
        <MyTableObjetivos id={'objetivos'}
                          formValues={section}
                          columnName={'Objetivos Específicos'}
                          canEdit={false} />
      </Grid>

      <Grid item xs={3}>
        <Grid container>
          <Grid item xs={8}>
            <MyReadOnlyTextField id='plazo'
                                 label={'Plazo de ejecución *'}
                                 value={section['plazo'] + ' meses'}
                                 icon={<AccessTimeIcon sx={dialog.textFieldIcon}/>} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={9}>
        <MyReadOnlyTextField id='areaInvestigacion'
                             label={'Área de Investigación'}
                             value={section['areaInvestigacion']}
                             icon={<ApartmentIcon sx={dialog.textFieldIcon}/>} />
      </Grid>
      <Grid item xs={12}>
        <MyReadOnlyAreaTextField id='definicionProblema'
                         label={'Definición del Problema'}
                         value={section['definicionProblema']}
                         icon={<ArticleOutlinedIcon sx={dialog.textFieldIcon}/>} />
      </Grid>
      <Grid item xs={12}>
        <MyReadOnlyAreaTextField id='justificacion'
                                 label={'Justificación'}
                                 value={section['justificacion']}
                                 icon={<ArticleOutlinedIcon sx={dialog.textFieldIcon}/>} />
      </Grid>
      <Grid item xs={12}>
        <MyReadOnlyAreaTextField id='metodologia'
                                 label={'Metodología de campo'}
                                 value={section['metodologia']}
                                 icon={<ArticleOutlinedIcon sx={dialog.textFieldIcon}/>} />
      </Grid>
      <Grid item xs={12}>
        <MyReadOnlyAreaTextField id='metodologiaLaboratorio'
                                 label={'Metodología de laboratorio'}
                                 value={section['metodologiaLaboratorio']}
                                 icon={<ArticleOutlinedIcon sx={dialog.textFieldIcon}/>} />
      </Grid>
      <Grid item xs={12}>
        <MyUpload id={'metodologiaDoc'}
                  label={'Metodología'}
                  dir={s.id}
                  formValues={section}
                  canEdit={false} />
      </Grid>
      <Grid item xs={12}>
        <MyTableProductos id={'resultadosEsperados'}
                          formValues={section}
                          columnName={'Resultados Esperados'}
                          canEdit={false} />
      </Grid>
    </Grid>

  )
}
