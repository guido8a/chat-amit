import React, {useEffect, useState} from 'react'
import { useSelector} from 'react-redux'
import {
  Box,
  Grid,
} from '@mui/material'

import {dialog} from 'src/styles/styles'
import {rulesFor} from 'src/features/P01Solicitud'
import API from 'src/features/App/API'
import {MySubtitle} from 'src/components/MySubtitle'
import {MyMultipleSelect} from 'src/components/MyMultipleSelect'
import {MyTableRecursos} from 'src/components/MyTableRecursos'
import {f} from 'src/commons/f'
import {MyTableMuestras} from 'src/components/MyTableMuestras'
import {muestras} from 'src/features/P01Solicitud/CONF'


const RecursosInSitu = ({payload,mainFormValues,incrementCounter}) => {
  const section = 'RecursosInSitu'
  if(!!!payload[section]) {payload[section] = {}}

  const provincias = useSelector(state => state.app.provincias)
  const bosquesProtectores = useSelector(state => state.app.bosques)
  const areasProtegidas  = useSelector(state => state.app.areasProtegidas)
  const laboratorios = useSelector(state => state.app.laboratorios)
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

  const [recursoSelected, setRecursoSelected] = useState({})
  const [areasProtegidasData, setAreasProtegidasData] = useState([])
  const [bosquesProtectoresData, setBosquesProtectoresData] = useState([])

  useEffect(() => {
    mainFormValues[section] = formValues
    incrementCounter()
  },[formValues])

  useEffect(() => {
    setAreasProtegidasData(areasProtegidas.filter(it => formValues.provincias.includes(it.provincia)).map(it => it.nombre))
    setBosquesProtectoresData(bosquesProtectores.filter(it => formValues.provincias.includes(it.provincia)).map(it => it.nombre))
  }, [formValues.provincias])

  const [rowSelected, setRowSelected] = useState({})

  return(
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={12} sx={dialog.titleContainer}>
          <MySubtitle subtitle={'Recursos a ser recolectados (in situ)'} bold={true}/>
        </Grid>
        <Grid item xs={12}>
          <MyTableRecursos id={'recursos'}
                           formValues={formValues}
                           setFormValues={setFormValues}
                           muestras={formValues.muestras}
                           columnName={'Recursos'}
                           canEdit={canEdit}
                           mode={'in-situ'}
                           addItems={(items) => {
                             const field = 'recursos'
                             items.forEach(it => {
                               it['id'] = it.taxonid
                               it['scientificname'] = f.isValid(it.scientificname)?it.scientificname:''
                               it['redList'] = f.isValid(it.nationalredlist)?it.nationalredlist:''
                               it['taxonomicHierarchy'] = f.isValid(it.taxonomicHierarchy)?it.taxonomicHierarchy:''
                               it['categoriaEspecial'] = f.isValid(it.descripcion)?it.descripcion:''
                               it['artificialGroup'] = f.isValid(it.artificialgroup)?it.artificialgroup:''
                               it['cites'] = f.isValid(it.cites)?it.cites:''
                             })
                             const newSet = [ ...formValues[field]]
                             items.forEach(it => {
                               const idx = newSet.findIndex(ns => ns.taxonid === it.taxonid)
                               if(idx < 0) {
                                 newSet.push(it)
                               }
                             })
                             setFormValues({...formValues, [field]:newSet})
                           }}
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
                                 formValues={formValues}
                                 setFormValues={setFormValues}
                                 canEdit={canEdit}
                                 muestras={muestras}
                                 addItem={() => {
                                   let key = 1
                                   if(formValues['muestras'].length > 0) {
                                     const keys = formValues['muestras'].map(it => Number(it.id.split('-')[1]))
                                     key = keys.reduce((a, b) => Math.max(a, b), -Infinity)+1
                                   }
                                   const newMuestra = {
                                     id:`${recursoSelected.taxonid}-${key}`,
                                     taxonid:recursoSelected.taxonid,
                                     tipo:'',
                                     submuestra: '',
                                     loteotro: '',
                                     descripcion: '',
                                     cantidadSolicitada: 0,
                                     cantidadAutorizada: 0,
                                     saldoDRM:0,
                                     saldorATM: 0,
                                   }
                                   setFormValues({...formValues,['muestras']:[...formValues['muestras'],newMuestra]})
                                 }} />
              </Grid>
            </>:null
        }

        <Grid item xs={12} sx={dialog.titleContainer}>
          <MySubtitle subtitle={'Origen de los recursos'} />
        </Grid>
        <Grid item xs={6}>
          <MyMultipleSelect id={'provincias'}
                            label={'Provincias *'}
                            data={provincias}
                            setFormValues={setFormValues}
                            formValues={formValues}
                            canEdit={canEdit}
                            handleChange={handlesChange['provincias']}/>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            <MyMultipleSelect id={'areasProtegidas'}
                              label={'Áreas protegidas'}
                              data={areasProtegidasData}
                              setFormValues={setFormValues}
                              formValues={formValues}
                              canEdit={canEdit}
                              handleChange={handlesChange['areasProtegidas']}/>
          </Grid>
          <Grid item xs={6}>
            <MyMultipleSelect id={'bosquesProtectores'}
                              label={'Bosques Protectores'}
                              data={bosquesProtectoresData}
                              setFormValues={setFormValues}
                              formValues={formValues}
                              canEdit={canEdit}
                              handleChange={handlesChange['areasProtegidas']}/>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={dialog.titleContainer}>
          <MySubtitle subtitle={'Destino de los recursos'} />
        </Grid>
        <Grid item xs={12} >
          <MyMultipleSelect id={'laboratorios'}
                            label={'Institución en la que se desarrolla la fase de laboratorio *'}
                            data={[...laboratorios].sort()}
                            setFormValues={setFormValues}
                            formValues={formValues}
                            canEdit={canEdit}
                            handleChange={handlesChange['areasProtegidas']} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default RecursosInSitu
