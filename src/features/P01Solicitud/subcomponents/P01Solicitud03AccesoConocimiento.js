import React, {useEffect, useState} from 'react'
import { useSelector} from 'react-redux'
import {
  Box,
  Grid,
} from '@mui/material'

import {dialog} from 'src/styles/styles'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import {MySwitch} from 'src/components/MySwitch'
import {rulesFor} from 'src/features/P01Solicitud'
import API from 'src/features/App/API'
import {MySubtitle} from 'src/components/MySubtitle'
// import {MyTextField} from 'src/components/MyTextField'
import {MyMultipleSelect} from 'src/components/MyMultipleSelect'
import {MyTableRecursos} from 'src/components/MyTableRecursos'
import {f} from 'src/commons/f'
import {MyTableMuestras} from 'src/components/MyTableMuestras'
import {muestras} from 'src/features/P01Solicitud/CONF'
import {MyTextField} from 'src/components/MyTextField'

const AccesoConocimiento = ({payload,mainFormValues,incrementCounter}) => {

  const section = 'AccesoConocimiento'

  if(!!!payload[section]) {payload[section] = {}}

  const bandeja = useSelector(state => state.app.bandeja)
  const canEdit = bandeja === 'entrada'

  const RULES = rulesFor(section)
  const emptyPayload = RULES.emptyPayload()
  const handlesChange= RULES.handlesChange()
  const validators = RULES.validators()
  const initErrors = RULES.initErros()

  const [formValues, setFormValues] = useState({...emptyPayload, ...payload[section]})
  const [formErrors, setFormErrors] = useState({...initErrors})
  const handleChange = (e) => API.handleChange(e, bandeja, setFormValues, formValues)

  // const [recursoSelected, setRecursoSelected] = useState({})
  // const [areasProtegidasData, setAreasProtegidasData] = useState([])
  // const [bosquesProtectoresData, setBosquesProtectoresData] = useState([])

  useEffect(() => {
    mainFormValues[section] = formValues
    incrementCounter()
  },[formValues])

  // useEffect(() => {
  //   setAreasProtegidasData(areasProtegidas.filter(it => formValues.provincias.includes(it.provincia)).map(it => it.nombre))
  //   setBosquesProtectoresData(bosquesProtectores.filter(it => formValues.provincias.includes(it.provincia)).map(it => it.nombre))
  // }, [formValues.provincias])

  const [rowSelected, setRowSelected] = useState({})

  return(
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={12} sx={dialog.titleContainer}>
          <MySubtitle subtitle={'Conocimiento tradicional'} />
        </Grid>
        <Grid item xs={12}>
          <MySwitch id='accesoConocimiento'
                    label={'¿Existe acceso a conocimientos tradicionales asociados a los recursos de la biodiversidad?'}
                    formValues={formValues}
                    canEdit={canEdit}
                    handleChange={(e,v) => handlesChange['accesoConocimiento'](e,v,canEdit,setFormValues,formValues)}/>
        </Grid>
        {formValues['accesoConocimiento']?
          <>
            <Grid item xs={6}>
              <MyTextField id={'clpi'}
                           label={'Número de contrato/CLPI'}
                           canEdit={canEdit}
                           setFormValues={setFormValues}
                           formValues={formValues}
                           formErrors={formErrors}
                           error={formErrors['clpi']}
                           handleChange={(e) => {
                             handlesChange['clpi'](
                               e,
                               canEdit,
                               setFormValues,
                               formValues,
                               validators['clpi'],
                               setFormErrors,
                               formErrors,
                               canEdit
                             )}
                           }
                           icon={<ArticleOutlinedIcon sx={dialog.textFieldIcon}/>} />
            </Grid>
            <Grid item xs={6}>
              <MyTextField id={'contratoAccesoConocimiento'}
                           label={'Registro de contrato de acceso al conocimiento tradicional'}
                           canEdit={canEdit}
                           setFormValues={setFormValues}
                           formValues={formValues}
                           formErrors={formErrors}
                           error={formErrors['contratoAccesoConocimiento']}
                           handleChange={(e) => {
                             handlesChange['contratoAccesoConocimiento'](
                               e,
                               canEdit,
                               setFormValues,
                               formValues,
                               validators['contratoAccesoConocimiento'],
                               setFormErrors,
                               formErrors,
                               canEdit
                             )}
                           }
                           icon={<ArticleOutlinedIcon sx={dialog.textFieldIcon}/>} />
            </Grid>
          </>:null
        }
        {!formValues['accesoConocimiento'] ?
          <>
            <Grid item xs={12}>
              <MySwitch id='ambitoComunitario'
                        label={'¿La investigación se desarrolla en un ámbito comunitario ancestral?'}
                        formValues={formValues}
                        canEdit={canEdit}
                        handleChange={(e, v) => handlesChange['ambitoComunitario'](e, v, canEdit, setFormValues, formValues)}/>
            </Grid>
            <Grid item xs={12}>
              <MySwitch id='valoresReligiososCultutrales'
                        label={'¿La investigación hace referencia a temas de cosmovisión valores religiosos o culturales?'}
                        formValues={formValues}
                        canEdit={canEdit}
                        handleChange={(e, v) => handlesChange['valoresReligiososCultutrales'](e, v, canEdit, setFormValues, formValues)}/>
            </Grid>
            <Grid item xs={12}>
              <MySwitch id='recursosBiologico'
                        label={'¿La investigación se relaciona con un ritual curativo donde se utilice los recursos biológicos?'}
                        formValues={formValues}
                        canEdit={canEdit}
                        handleChange={(e, v) => handlesChange['recursosBiologico'](e, v, canEdit, setFormValues, formValues)}/>
            </Grid>
            <Grid item xs={12}>
              <MySwitch id='practicasAncestrales'
                        label={'¿La investigación versan sobre mecanismos y prácticas de siembra cosecha, mantenimiento y recolección de semillas entre otras prácticas agropecuarias ancestrales?'}
                        formValues={formValues}
                        canEdit={canEdit}
                        handleChange={(e, v) => handlesChange['practicasAncestrales'](e, v, canEdit, setFormValues, formValues)}/>
            </Grid>
            <Grid item xs={12}>
              <MySwitch id='etnozoologicos'
                        label={'¿La investigación se basa en estudio de carácter etnobotánico o etnozoologico?'}
                        formValues={formValues}
                        canEdit={canEdit}
                        handleChange={(e, v) => handlesChange['etnozoologicos'](e, v, canEdit, setFormValues, formValues)}/>
            </Grid>
            <Grid item xs={12}>
              <MySwitch id='aConocimientoTradicional'
                        label={'¿La investigación hace referencia sobre el uso de un recurso biológico planta o animal asociado a un conocimiento tradicional?'}
                        formValues={formValues}
                        canEdit={canEdit}
                        handleChange={(e, v) => handlesChange['aConocimientoTradicional'](e, v, canEdit, setFormValues, formValues)}/>
            </Grid>
            <Grid item xs={12}>
              <MySwitch id='derivadosOSimilares'
                        label={'¿La investigación hace referencia a compuestos biológicos naturales para la elaboración de productos alimenticios dieteticos colorantes cosméticos y derevados o similares?'}
                        formValues={formValues}
                        canEdit={canEdit}
                        handleChange={(e, v) => handlesChange['derivadosOSimilares'](e, v, canEdit, setFormValues, formValues)}/>
            </Grid>
            <Grid item xs={12}>
              <MySwitch id='medicinaTradicional'
                        label={'¿La investigacion se basa en combinaciones de extractos biológicos naturales para la preparación de medicina tradicional?'}
                        formValues={formValues}
                        canEdit={canEdit}
                        handleChange={(e, v) => handlesChange['medicinaTradicional'](e, v, canEdit, setFormValues, formValues)}/>
            </Grid>
          </>:null
        }
      </Grid>
    </Box>
  )
}

export default AccesoConocimiento
