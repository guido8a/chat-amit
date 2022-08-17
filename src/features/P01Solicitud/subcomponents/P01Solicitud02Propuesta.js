import React, {useEffect, useState} from 'react'
import Box from '@mui/material/Box'
import {useSelector} from "react-redux"
import {useDispatch} from "react-redux";
import {
  FormControlLabel,
  Grid, Radio, RadioGroup,
  Stack, Typography,
} from '@mui/material'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import {dialog} from 'src/styles/styles'
import ApartmentIcon from '@mui/icons-material/Apartment'
import {MyTextField} from 'src/components/MyTextField'
import {MyAutocompleteTextField} from 'src/components/MyAutocompleteTextField'
import API from 'src/features/App/API'
import {MyUpload} from 'src/components/MyUpload'
import {MyAreaTextField} from 'src/components/MyAreaTextField'
import {rulesFor} from 'src/features/P01Solicitud'
import {MySubtitle} from 'src/components/MySubtitle'
import {
  agricultura,
  ambienteBio,
  areaInvestigacion,
  cienciaTec,
  marino_costero,
  procesosInd
} from 'src/features/P01Solicitud/CONF'
import {MyTable as MyTableObjetivos} from 'src/components/MyTable'
import {MyTable as MyTableProductos} from 'src/components/MyTable'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import RobotoCondensedRegular from 'src/styles/MyFonts/Roboto_Condensed/RobotoCondensed-Regular.ttf'
import {MySelect} from 'src/components/MySelect'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import {f} from 'src/commons'
import {MySwitch} from "../../../components/MySwitch";
import {MyMaskedTextField} from "../../../components/MyMaskedTextField";
import FormControl from "@mui/material/FormControl";
import {handleSetRecoleccionDeRecursos} from 'src/features/App/sliceApp'

const Propuesta = ({payload,mainFormValues,incrementCounter}) => {
  const section = 'Propuesta'
  const dispatch = useDispatch()
  const bandeja = useSelector(state => state.app.bandeja)
  const instanciaProceso = useSelector(state => state.app.instanciaProceso)
  const patrocinadores = useSelector(state => state.app.instituciones)

  if(!!!payload[section]) {payload[section] = {}}
  const RULES = rulesFor(section)
  const emptyPayload = RULES.emptyPayload()

  const handlesChange= RULES.handlesChange()
  const validators = RULES.validators()
  const initErrors = RULES.initErros()

  const [formValues, setFormValues] = useState({...emptyPayload, ...payload[section]})
  const [formErrors, setFormErrors] = useState({...initErrors})
  const handleChange = (e) => API.handleChange(e, bandeja, setFormValues, formValues)
  const canEdit = bandeja === 'entrada'

  useEffect(() => {
    mainFormValues[section] = formValues
    incrementCounter()
  },[formValues])

  const myData = (formValues['areaInvestigacion'] === 'Agricultura y ganadería')?agricultura:
    (formValues['areaInvestigacion'] === 'Espacio marino-costero y recursos bioacuáticos')?marino_costero:
      (formValues['areaInvestigacion'] === 'Ambiente, bioeconomía, bioconocimiento, cambio y variabilidad climática')?ambienteBio:
        (formValues['areaInvestigacion'] === 'Procesos industriales')?procesosInd:
          (formValues['areaInvestigacion'] === 'Ciencia, tecnología, sociedad y gobernabilidad')?cienciaTec:[]

  const [patrocinadoresAll, setPatrocinadoresAll] = useState([])

  useEffect(() => {
    if(canEdit) {
      API.fetchPatrocinadoresAll().then(patr => setPatrocinadoresAll(patr?.map(it => it.nombre)))
    }
  },[])

  useEffect(() => {
    dispatch(handleSetRecoleccionDeRecursos(formValues.recoleccionDeRecursos))
  },[formValues.recoleccionDeRecursos])

  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={12} sx={dialog.titleContainer}>
          <MySubtitle subtitle={'Solicitud'} />
        </Grid>
        <Grid item xs={12}>
          <MyTextField id='nombre'
                       label={'Nombre del Proyecto *'}
                       formValues={formValues}
                       icon={<ArticleOutlinedIcon sx={dialog.textFieldIcon}/>}
                       error={formErrors['nombre']}
                       canEdit={canEdit}
                       handleChange={(e) => handlesChange['nombre'](
                                               e,
                                               canEdit,
                                               setFormValues,
                                               formValues,
                                               validators['nombre'],
                                               setFormErrors,
                                               formErrors,
                                               canEdit
                                             )} />
        </Grid>
        <Grid item xs={9}>
          <MyAutocompleteTextField id='patrocinador'
                                   options={patrocinadoresAll}
                                   label={'Identificación de la Institución Patrocinadora *'}
                                   formValues={formValues}
                                   icon={<ApartmentIcon sx={dialog.textFieldIcon}/>}
                                   canEdit={canEdit}
                                   error={
                                     (f.isValid(formErrors['patrocinador'])?formErrors['patrocinador']:'')
                                       //+ ((!patrocinadoresAll.includes(formValues['patrocinador'])?' fuera de lista de patrocinadores':''))
                                   }
                                   selectedFile={formValues.patrocinador}
                                   handleChange={(e) => canEdit?handlesChange['patrocinador'](
                                         e,
                                         canEdit,
                                         setFormValues,
                                         formValues,
                                         validators['patrocinador'],
                                         setFormErrors,
                                         formErrors
                                       ):null} />
        </Grid>
        <Grid item xs={3}>
          <MyMaskedTextField id='montFinancimiento'
                             type={'dollarMaskCustom'}
                             label={'Monto de Financiamiento Aproximado *'}
                             formValues={formValues}
                             setFormValues={setFormValues}
                             isNumber={true}
                             icon={<AttachMoneyIcon sx={dialog.textFieldIcon}/>}
                             error={formErrors['montFinancimiento']}
                             canEdit={canEdit}
                             handleChange={(e) => handlesChange['montFinancimiento'](
                               e,
                               canEdit,
                               setFormValues,
                               formValues,
                               validators['montFinancimiento'],
                               setFormErrors,
                               formErrors,
                               canEdit
                             )} />
        </Grid>
        <Grid item xs={12}>
            <MyUpload id={'cartaPatrocidador'}
                      dir={instanciaProceso?.solicitud?.id}
                      label={'Carta'}
                      formValues={formValues}
                      setFormValues={setFormValues}
                      canEdit={canEdit}
                      info={'info...'} />
        </Grid>
        <Grid item xs={12}>
          <MyAutocompleteTextField id='apoyo'
                                   options={patrocinadores}
                                   label={'Identificación de la Institución Nacional de Apoyo *'}
                                   formValues={formValues}
                                   icon={<ApartmentIcon sx={dialog.textFieldIcon}/>}
                                   error={
                                     (f.isValid(formErrors['apoyo'])?formErrors['apoyo']:'')
                                     // + ((!patrocinadores.includes(formValues['apoyo'])?' fuera de lista de instituciones nacionales de apoyo':''))
                                   }
                                   canEdit={canEdit}
                                   handleChange={(e) =>
                                     handlesChange['apoyo'](
                                       e,
                                       canEdit,
                                       setFormValues,
                                       formValues,
                                       validators['apoyo'],
                                       setFormErrors,
                                       formErrors
                                     )} />
        </Grid>
        <Grid item xs={12} >
          <Stack direction={"row"} spacing={2} justifyContent="space-between" alignItems="center">
            <MyUpload id={'cartaApoyo'}
                      label={'Carta'}
                      dir={instanciaProceso?.solicitud?.id}
                      formValues={formValues}
                      setFormValues={setFormValues}
                      canEdit={canEdit}
                      info={'info...'} />
            <MyUpload id={'convenioApoyo'}
                      dir={instanciaProceso?.solicitud?.id}
                      label={'Convenio'}
                      canEdit={canEdit}
                      formValues={formValues}
                      setFormValues={setFormValues}
                      info={'info...'}/>
          </Stack>
        </Grid>
        <Grid item xs={12} >
          <Stack direction={"row"} spacing={2} justifyContent="flex-end" alignItems="center">
            <MyUpload id={'repLegalApoyo'}
                      dir={instanciaProceso?.solicitud?.id}
                      label={'Nombramiento Representante Legal *'}
                      formValues={formValues}
                      canEdit={canEdit}
                      setFormValues={setFormValues}
                      info={'info...'}/>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <MyAreaTextField id='resumen'
                           label={'Resumen Ejecutivo *'}
                           formValues={formValues}
                           icon={<ArticleOutlinedIcon sx={dialog.textFieldIcon}/>}
                           error={formErrors['resumen']}
                           handleChange={(e) => handlesChange['resumen'](
                                                   e,
                                                   canEdit,
                                                   setFormValues,
                                                   formValues,
                                                   validators['resumen'],
                                                   setFormErrors,
                                                   formErrors,
                                                   canEdit)} />
        </Grid>
        <Grid item xs={12}>
          <MyAreaTextField id='objetivo'
                           label={'Objetivo General *'}
                           formValues={formValues}
                           icon={<ArticleOutlinedIcon sx={dialog.textFieldIcon}/>}
                           canEdit={canEdit}
                           error={formErrors['objetivo']}
                           handleChange={(e) => handlesChange['objetivo'](
                                              e,
                                              canEdit,
                                              setFormValues,
                                              formValues,
                                              validators['objetivo'],
                                              setFormErrors,
                                              formErrors,
                                              canEdit)} />
        </Grid>
        <Grid item xs={12}>
          <MyTableObjetivos id={'objetivos'}
                            formValues={formValues}
                            setFormValues={setFormValues}
                            columnName={'Objetivos Específicos *'}
                            canEdit={canEdit}
                            addItem={() => {
                              if(formValues['objetivos'].filter(it => it === '').length === 0) {
                                const field = 'objetivos'
                                const newSet = [ ...formValues[field], ...['']]
                                const newFormValues = {...formValues, [field]:newSet}
                                setFormValues(newFormValues)
                              }
                            }}
          />
        </Grid>
        <Grid item xs={3}>
          <Grid container>
            <Grid item xs={8}>
              <MyTextField id='plazo'
                           label={'Plazo de ejecución *'}
                           formValues={formValues}
                           icon={<AccessTimeIcon sx={dialog.textFieldIcon}/>}
                           error={formErrors['plazo']}
                           canEdit={canEdit}
                           isNumber={true}
                           handleChange={(e) => {
                             if(e.target.value === '' || !isNaN(e.target.value))
                               handlesChange['plazo'](
                                 e,
                                 canEdit,
                                 setFormValues,
                                 formValues,
                                 validators['plazo'],
                                 setFormErrors,
                                 formErrors,
                                 canEdit
                               )}} />
            </Grid>
            <Grid item xs={4} sx={{p:'2rem 0 0 0.3rem'}}>
              <Typography sx={{color:'#575756',fontfamily: RobotoCondensedRegular,fontSize: '0.9rem',}}>(meses)</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={9}>
          <MySelect id='areaInvestigacion'
                    label={'Área de Investigación *'}
                    canEdit={canEdit}
                    formValues={formValues}
                    setFormValues={setFormValues}
                    data={areaInvestigacion} />
        </Grid>
        <Grid item xs={3} />
        <Grid item xs={9}>
          <MySelect id='lineaInvestigacion'
                    label={'Línea de Investigación *'}
                    formValues={formValues}
                    canEdit={canEdit}
                    setFormValues={setFormValues}
                    defaultValue={''}
                    data={myData} />
        </Grid>
        <Grid item xs={12}>
          <MyAreaTextField id='definicionProblema'
                       label={'Definición del Problema *'}
                       formValues={formValues}
                       icon={<ArticleOutlinedIcon sx={dialog.textFieldIcon}/>}
                       handleChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <MyAreaTextField id='justificacion'
                       label={'Justificación *'}
                       formValues={formValues}
                       icon={<ArticleOutlinedIcon sx={dialog.textFieldIcon}/>}
                       handleChange={handleChange} />
        </Grid>

        <Grid item xs={12}>
          <FormControl>
            <RadioGroup row
                        aria-labelledby="recoleccion-recurso"
                        name="recoleccion-recurso-rg"
                        id='recoleccionDeRecursos'
                        value={formValues.recoleccionDeRecursos}
                        onChange={(e, v) => setFormValues({...formValues,recoleccionDeRecursos:v})}>
              <FormControlLabel value="in-situ" control={<Radio />} label="¿Recurso a ser recolectado (in situ)?" />
              <FormControlLabel value="ex-situ" control={<Radio />} label="¿Recurso depositado previamente (ex situ)?" />
              <FormControlLabel value="in-ex-situ" control={<Radio />} label="Ambos, in situ y ex situ" />
            </RadioGroup>
          </FormControl>
        </Grid>

        {['in-ex-situ', 'in-situ'].includes(formValues['recoleccionDeRecursos'])?
          <Grid item xs={12}>
            <MyAreaTextField id='metodologia'
                             label={'Metodología de campo *'}
                             formValues={formValues}
                             icon={<ArticleOutlinedIcon sx={dialog.textFieldIcon}/>}
                             handleChange={handleChange} />
          </Grid>:null
        }
        {['in-ex-situ', 'ex-situ'].includes(formValues['recoleccionDeRecursos']) ?
          <Grid item xs={12}>
            <MyAreaTextField id='metodologiaLaboratorio'
                             label={'Metodología de laboratorio*'}
                             formValues={formValues}
                             icon={<ArticleOutlinedIcon sx={dialog.textFieldIcon}/>}
                             handleChange={handleChange}/>
          </Grid> : null
        }
      </Grid>
        <Grid item xs={12}>
          <MyTableProductos id={'resultadosEsperados'}
                            formValues={formValues}
                            setFormValues={setFormValues}
                            columnName={'Resultados Esperados *'}
                            canEdit={canEdit}
                            addItem={() => {
                              if(formValues['resultadosEsperados'].filter(it => it === '').length === 0) {
                                const field = 'resultadosEsperados'
                                const newSet = [ ...formValues[field], ...['']]
                                const newFormValues = {...formValues, [field]:newSet}
                                setFormValues(newFormValues)
                              }
                            }} />
        </Grid>
    </Box>
  )
}

export default Propuesta
