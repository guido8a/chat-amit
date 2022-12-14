import React, {useState} from 'react'
import Box from '@mui/material/Box'
import {
  Grid,
  Typography,
} from '@mui/material'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import {dialog} from 'src/styles/styles'
import {MySubtitle} from 'src/components/MySubtitle'
import RobotoCondensedRegular from 'src/styles/MyFonts/Roboto_Condensed/RobotoCondensed-Regular.ttf'
import {MyReadOnlyTextField} from "../../../components/MyReadOnlyTextField";
import {MySwitch} from "../../../components/MySwitch";
import {MyTableRecursos} from "../../../components/MyTableRecursos";
import {f} from "../../../commons";
import {MyTableMuestras} from "../../../components/MyTableMuestras";
import {muestras} from "../CONF";

export const RecursosRO = ({payload}) => {
  const section = 'Recursos'
  const recursos = payload[section]
  const recursosMAATE = f.isValid(payload['InformeTecnicoMaate'])?payload['InformeTecnicoMaate']:recursos
  const canEdit = false

  // console.log('. . . . recursosMAATE :: ', recursosMAATE)

  const [recursoSelected, setRecursoSelected] = useState({})

  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={12} sx={dialog.titleContainer}>
          <MySubtitle subtitle={'Recursos'} />
        </Grid>
        <Grid item xs={12}>
          <MyTableRecursos id={'recursos'}
                           formValues={recursos}
                           muestras={recursos.muestras}
                           columnName={'Recursos'}
                           canEdit={canEdit}
                           setRecursoSelected={setRecursoSelected}
                           canDeleteRow={canEdit} />
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
                                 formValues={recursosMAATE}
                                 canEdit={canEdit}
                                 mode={'maatero'}
                                 muestras={muestras} />
              </Grid>
            </>:null
        }
        <Grid item xs={12} sx={dialog.titleContainer}>
          <MySubtitle subtitle={'Ubicaci??n Geogr??fica'} />
        </Grid>
        {
          payload['Propuesta']['recursoASerRecolectado'] ?
            <>
              <Grid item xs={6}>
                <Typography sx={{fontSize:'0.9rem', fontFamily:RobotoCondensedRegular}}>Provincias</Typography>
                {recursos.provincias.map(it => {
                  return <Typography sx={{fontSize:'0.8rem', fontFamily:RobotoCondensedRegular, m:'1rem'}}>{it}</Typography>
                })}
              </Grid>
              <Grid container>
                <Grid item xs={6}>
                  <Typography sx={{fontSize:'0.9rem', fontFamily:RobotoCondensedRegular}}>??reas protegidas</Typography>
                  {recursos.areasProtegidas.map(it => {
                    return <Typography sx={{fontSize:'0.8rem', fontFamily:RobotoCondensedRegular, m:'1rem'}}>{it}</Typography>
                  })}
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{fontSize:'0.9rem', fontFamily:RobotoCondensedRegular}}>Bosques Protectores</Typography>
                  {recursos.bosquesProtectores.map(it => {
                    return <Typography sx={{fontSize:'0.8rem', fontFamily:RobotoCondensedRegular, m:'1rem'}}>{it}</Typography>
                  })}
                </Grid>
              </Grid>
            </> : null
        }
        {
          payload['Propuesta']['recursoRecolectadoPreviamente']?
            <>
              <Grid item xs={12} >
                <Typography sx={{fontSize:'0.9rem', fontFamily:RobotoCondensedRegular}}>
                  Instituci??n en la que se desarrolla la fase de laboratorio
                </Typography>
                {recursos.laboratorios.map(it => {
                  return <Typography sx={{fontSize:'0.8rem', fontFamily:RobotoCondensedRegular, m:'1rem'}}>{it}</Typography>
                })}
              </Grid>
            </>:null
        }


        <Grid item xs={12} sx={dialog.titleContainer}>
          <MySubtitle subtitle={'Conocimiento tradicional'} />
        </Grid>
        <Grid item xs={12}>
          <MySwitch id='accesoConocimiento'
                    label={'??Existe acceso a conocimientos tradicionales asociados a los recursos de la biodiversidad?'}
                    formValues={recursos}
                    canEdit={canEdit} />
        </Grid>
        {recursos['accesoConocimiento']?
          <>
            <Grid item xs={6}>
              <MyReadOnlyTextField id={'clpi'}
                                   label={'N??mero de contrato/CLPI'}
                                   canEdit={canEdit}
                                   value={recursos.clpi}
                                   icon={<ArticleOutlinedIcon sx={dialog.textFieldIcon}/>} />
            </Grid>
            <Grid item xs={6}>
              <MyReadOnlyTextField id={'contratoAccesoConocimiento'}
                           label={'Registro de contrato de acceso al conocimiento tradicional'}
                           canEdit={canEdit}
                           value={recursos.contratoAccesoConocimiento}
                           icon={<ArticleOutlinedIcon sx={dialog.textFieldIcon}/>} />
            </Grid>
          </>:null
        }
        {!recursos['accesoConocimiento'] ?
          <>
            <Grid item xs={12}>
              <MySwitch id='ambitoComunitario'
                        label={'??La investigaci??n se desarrolla en un ??mbito comunitario ancestral?'}
                        formValues={recursos}
                        canEdit={canEdit} />
            </Grid>
            <Grid item xs={12}>
              <MySwitch id='valoresReligiososCultutrales'
                        label={'??La investigaci??n hace referencia a temas de cosmovisi??n valores religiosos o culturales?'}
                        formValues={recursos}
                        canEdit={canEdit} />
            </Grid>
            <Grid item xs={12}>
              <MySwitch id='recursosBiologico'
                        label={'??La investigaci??n se relaciona con un ritual curativo donde se utilice los recursos biol??gicos?'}
                        formValues={recursos}
                        canEdit={canEdit} />
            </Grid>
            <Grid item xs={12}>
              <MySwitch id='practicasAncestrales'
                        label={'??La investigaci??n versan sobre mecanismos y pr??cticas de siembra cosecha, mantenimiento y recolecci??n de semillas entre otras pr??cticas agropecuarias ancestrales?'}
                        formValues={recursos}
                        canEdit={canEdit} />
            </Grid>
            <Grid item xs={12}>
              <MySwitch id='etnozoologicos'
                        label={'??La investigaci??n se basa en estudio de car??cter etnobot??nico o etnozoologico?'}
                        formValues={recursos}
                        canEdit={canEdit} />
            </Grid>
            <Grid item xs={12}>
              <MySwitch id='aConocimientoTradicional'
                        label={'??La investigaci??n hace referencia sobre el uso de un recurso biol??gico planta o animal asociado a un onocimiento tradicional?'}
                        formValues={recursos}
                        canEdit={canEdit} />
            </Grid>
            <Grid item xs={12}>
              <MySwitch id='derivadosOSimilares'
                        label={'??La investigaci??n hace referencia a compuestos biol??gicos naturales para la elaboraci??n de productos alimenticios dieteticos colorantes cosm??ticos y derevados o similares?'}
                        formValues={recursos}
                        canEdit={canEdit} />
            </Grid>
            <Grid item xs={12}>
              <MySwitch id='medicinaTradicional'
                        label={'??La investigacion se basa en combinaciones de extractos biol??gicos naturales para la preparaci??n de medicina tradicional?'}
                        formValues={recursos}
                        canEdit={canEdit} />
            </Grid>
          </>:null
        }



      </Grid>
    </Box>
  )
}
