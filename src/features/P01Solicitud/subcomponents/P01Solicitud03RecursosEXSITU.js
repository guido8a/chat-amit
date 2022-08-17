import React, {useEffect, useState} from 'react'
import { useSelector} from 'react-redux'
import {
  Box,
  Grid, Stack,
} from '@mui/material'
import {dialog} from 'src/styles/styles'
import {rulesFor} from 'src/features/P01Solicitud'
import API from 'src/features/App/API'
import {MySubtitle} from 'src/components/MySubtitle'
import {MyMultipleSelect} from 'src/components/MyMultipleSelect'
import {f} from 'src/commons/f'
import {MyCentroDocumentacion} from "../../../components/MyCentroDocumentacion";
import AddIcon from "@mui/icons-material/Add";
import {MyButtonBacan2} from "../../../components/MyButtonBacan2";
import DeleteIcon from '@mui/icons-material/Delete'

const Recursos = ({payload,mainFormValues,incrementCounter}) => {
  const section = 'RecursosExSitu'

  const instanciaProceso = useSelector(state => state.app.instanciaProceso)

  if(!!!payload[section]) {payload[section] = {}}
  const laboratorios = useSelector(state => state.app.laboratorios)
  const bandeja = useSelector(state => state.app.bandeja)
  const canEdit = bandeja === 'entrada'

  const RULES = rulesFor(section)
  const emptyPayload = RULES.emptyPayload()
  const handlesChange= RULES.handlesChange()
  const validators = RULES.validators()
  const initErrors = RULES.initErros()
  const [formValues, setFormValues] = useState({...emptyPayload, ...payload[section]})
  const handleChange = (e) => API.handleChange(e, bandeja, setFormValues, formValues)
  const [centroDocumentacionSelected, setCentroDocumentacionSelected] = useState({})
  const [recursoSelected, setRecursoSelected] = useState({})

  useEffect(() => {
    mainFormValues[section] = formValues
    incrementCounter()
  },[formValues])

  return(
    <Box >
      <Grid container spacing={1}>
        <Grid item xs={12} sx={dialog.titleContainer}>
          <MySubtitle subtitle={'Centro de documentración'} />
        </Grid>
        {
          formValues.centrosDocumentacion?.map(cd => {
            return (
              <Grid key={cd.id} item xs={12}>
                <MyCentroDocumentacion id={cd.id}
                                       canEdit={canEdit}
                                       formValues={formValues}
                                       numeroSolicitud={instanciaProceso?.solicitud?.id}
                                       setFormValues={(id, centro) => {
                                         const idx = formValues.centrosDocumentacion.findIndex(it => it.id === id)
                                         formValues.centrosDocumentacion[idx] = {...centro}
                                         setFormValues({...formValues })
                                       }}
                                       handleDelete={(id) => {
                                         setFormValues({...formValues, centrosDocumentacion: formValues.centrosDocumentacion.filter(it => it.id !== id)})
                                       }} />
              </Grid>
            )
          })
        }

        <Grid item xs={12}>
          <Stack direction={'row'} justifyContent='flex-end' alignItems='center' spacing={2} sx={{p:'0 1rem 0 0 '}}>
            <MyButtonBacan2 onClick={() => {
                              const myMax = Math.max(...formValues.centrosDocumentacion.map(it => it.id))
                              const cds = [...formValues.centrosDocumentacion, {id:isNaN(myMax)?1:(myMax+1)}]
                              setFormValues({...formValues, centrosDocumentacion: cds})
                            }}
                            icon={AddIcon}
                            label={'Agregar Centro de Documentación'} />
          </Stack>
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

export default Recursos
