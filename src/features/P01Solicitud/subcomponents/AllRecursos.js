import React, {useState} from 'react'
import {FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Stack, TextField, Typography} from '@mui/material'
import {
  Wc,
  CoPresent,
} from '@mui/icons-material'
import {MyReadOnlyTextField} from "src/components/MyReadOnlyTextField";
import {MyTextField} from "../../../components/MyTextField";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import {dialog} from "../../../styles/styles";
import {MyAutocompleteTextField} from "../../../components/MyAutocompleteTextField";
import {areasInvestigacion, areasProtegidas, muestras, patrocinadores, provincias} from "../CONF";
import ApartmentIcon from "@mui/icons-material/Apartment";
import {MyUpload} from "../../../components/MyUpload";
import {MyAreaTextField} from "../../../components/MyAreaTextField";
import {MyTable, MyTable as MyTableProductos, MyTable as MyTableObjetivos} from "../../../components/MyTable";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RobotoCondensedRegular from "../../../styles/MyFonts/Roboto_Condensed/RobotoCondensed-Regular.ttf";
import {MyReadOnlyAreaTextField} from "../../../components/MyReadOnlyAreaTextField";
import {MySubtitle} from "../../../components/MySubtitle";
import {MyTableRecursos} from "../../../components/MyTableRecursos";
import {f} from "../../../commons";
import {MyTableMuestras} from "../../../components/MyTableMuestras";
import {MyMultipleSelect} from "../../../components/MyMultipleSelect";
import {MySwitch} from "../../../components/MySwitch";

// eslint-disable-next-line import/no-anonymous-default-export
export default (solicitud) => {
  const s = solicitud.solicitud
  const p = JSON.parse(s?.payload)
  const section = p['Recursos']
  const [recursoSelected, setRecursoSelected] = useState({})

  return (
    <Grid container spacing={1} sx={{margin:'0 0 0 0'}}>
       <Grid item xs={12} sx={dialog.titleContainer}>
         <MySubtitle subtitle={'Recursos'} />
       </Grid>
       <Grid item xs={12}>
         <MyTableRecursos id={'recursos'}
                          formValues={section}
                          columnName={'Recursos'}
                          canEdit={false}
                          setRecursoSelected={setRecursoSelected}
                          canDeleteRow={false} />
       </Grid>

       {
         f.isValid(recursoSelected.scientificname)?
           <>
             <Grid item xs={12} sx={dialog.titleContainer}>
               <MySubtitle subtitle={'Muestras y submuestras'} />
             </Grid>
             <Grid item xs={12} >
               {recursoSelected.scientificname}
             </Grid>
             <Grid item xs={12} >
               <MyTableMuestras id={'muestras'}
                                selected={recursoSelected}
                                formValues={section}
                                canEdit={false}
                                muestras={muestras} />
             </Grid>
           </>:null
       }

      <Grid item xs={12} sx={dialog.titleContainer}>
        <MySubtitle subtitle={'Ubicación Geográfica'} />
      </Grid>
      <Grid item xs={6} >
        <MyTable id={'provincias'}
                 columnName={'Provincias'}
                 formValues={section}
                 canEdit={false} />
      </Grid>
      <Grid item xs={6} >
        <MyTable id={'areasProtegidas'}
                 columnName={'Áreas Protegidas'}
                 formValues={section}
                 canEdit={false} />
      </Grid>
      <Grid item xs={6} >
        <MyTable id={'bosquesProtectores'}
                 columnName={'Bosques Protectores'}
                 formValues={section}
                 canEdit={false} />
      </Grid>
      <Grid item xs={12} >
        <MyTable id={'laboratorios'}
                 columnName={'Destino'}
                 formValues={section}
                 canEdit={false} />
      </Grid>

      {/*<Grid item xs={12} sx={dialog.titleContainer}>*/}
      {/*  <MySubtitle subtitle={'Importación/Exportación'} />*/}
      {/*</Grid>*/}
      {/*<Grid item xs={8}>*/}
      {/*  <FormLabel sx={dialog.formLabel}>*/}
      {/*    {`¿La investigación amerita importación de recursos? ${section.importacionRecursos}`}*/}
      {/*  </FormLabel>*/}
      {/*</Grid>*/}
      {/*<Grid item xs={4}>*/}
      {/*  <Grid item xs={12}>*/}
      {/*    { ['si', 'no'].includes(section['importacionRecursos'])?*/}
      {/*      <MySwitch id='importacionHolotipo'*/}
      {/*                label={'¿Se trata de un holotipo?'}*/}
      {/*                formValues={section}*/}
      {/*                canEdit={false} />*/}
      {/*      :'Recuerde, en caso de requerir la investigación importar recursos, deberá solicitar la autorización correspondiente'*/}
      {/*    }*/}
      {/*  </Grid>*/}
      {/*</Grid>*/}
      {/*<Grid item xs={8}>*/}
      {/*  <FormLabel sx={dialog.formLabel}>*/}
      {/*    {`¿La investigación amerita exportacion de recursos? ${section['exportacionRecursos']}`}*/}
      {/*  </FormLabel>*/}
      {/*</Grid>*/}
      {/*<Grid item xs={4}>*/}
      {/*  {*/}
      {/*    ['si', 'no'].includes(section['exportacionRecursos']) ?*/}
      {/*      <MySwitch id='exportacionHolotipo'*/}
      {/*                label={'¿Se trata de un holotipo?'}*/}
      {/*                formValues={section}*/}
      {/*                canEdit={false} />*/}
      {/*      : 'Recuerde, en caso de requerir la investigación importar recursos, deberá solicitar la autorización correspondiente'*/}
      {/*  }*/}
      {/*</Grid>*/}
      <Grid item xs={12} sx={dialog.titleContainer}>
        <MySubtitle subtitle={'Conocimiento tradicional'} />
      </Grid>
      <Grid item xs={12}>
        <MySwitch id='accesoConocimiento'
                  label={'¿Existe acceso a conocimientos tradicionales asociados a los recursos de la biodiversidad?'}
                  formValues={section}
                  canEdit={false} />
      </Grid>
      {section['accesoConocimiento']?
        <>
          <Grid item xs={6}>
            <MyReadOnlyTextField id='clpi'
                                 label={'Número de contrato/CLPI'}
                                 value={section['clpi']}
                                 icon={<ArticleOutlinedIcon sx={dialog.textFieldIcon}/>}
                                 canEdit={false} />
          </Grid>
          <Grid item xs={6}>
            <MyReadOnlyTextField id='contratoAccesoConocimiento'
                                 label={'Registro de contrato de acceso al conocimiento tradicional'}
                                 value={section['contratoAccesoConocimiento']}
                                 icon={<ArticleOutlinedIcon sx={dialog.textFieldIcon}/>}
                                 canEdit={false} />
          </Grid>
        </>:null
      }
      {!section['accesoConocimiento'] ?
        <>
          <Grid item xs={12}>
            <MySwitch id='ambitoComunitario'
                      label={'¿La investigación se desarrolla en un ámbito comunitario ancestral?'}
                      formValues={section}
                      canEdit={false} />
          </Grid>
          <Grid item xs={12}>
            <MySwitch id='valoresReligiososCultutrales'
                      label={'¿La investigación hace referencia a temas de cosmovisión valores religiosos o culturales?'}
                      formValues={section}
                      canEdit={false} />
          </Grid>
          <Grid item xs={12}>
            <MySwitch id='recursosBiologico'
                      label={'¿La investigación se relaciona con un ritual curativo donde se utilice los recursos biológicos?'}
                      formValues={section}
                      canEdit={false} />
          </Grid>
          <Grid item xs={12}>
            <MySwitch id='practicasAncestrales'
                      label={'¿La investigación versan sobre mecanismos y prácticas de siembra cosecha, mantenimiento y recolección de semillas entre otras prácticas agropecuarias ancestrales?'}
                      formValues={section}
                      canEdit={false} />
          </Grid>
          <Grid item xs={12}>
            <MySwitch id='etnozoologicos'
                      label={'¿La investigación se basa en estudio de carácter etnobotánico o etnozoologico?'}
                      formValues={section}
                      canEdit={false} />
          </Grid>
          <Grid item xs={12}>
            <MySwitch id='aConocimientoTradicional'
                      label={'¿La investigación hace referencia sobre el uso de un recurso biológico planta o animal asociado a un onocimiento tradicional?'}
                      formValues={section}
                      canEdit={false} />
          </Grid>
          <Grid item xs={12}>
            <MySwitch id='derivadosOSimilares'
                      label={'¿La investigación hace referencia a compuestos biológicos naturales para la elaboración de productos alimenticios dieteticos colorantes cosméticos y derevados o similares?'}
                      formValues={section}
                      canEdit={false} />
          </Grid>
          <Grid item xs={12}>
            <MySwitch id='medicinaTradicional'
                      label={'¿La investigacion se basa en combinaciones de extractos biológicos naturales para la preparación de medicina tradicional?'}
                      formValues={section}
                      canEdit={false} />
          </Grid>
        </>:null
      }
    </Grid>
  )
}