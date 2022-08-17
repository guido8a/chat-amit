import React, {useEffect, useState} from 'react'
import Box from '@mui/material/Box'
import {useSelector} from 'react-redux'
import {accordeonBox} from 'src/styles/styles'
// import {fetchInstanciaTarea, handleFetchInstanciaProceso, handleSetBandeja} from "src/features/App/sliceApp";
import {MyTablePersonal} from 'src/components/MyTablePersonal'
import {MyTableExperiencia} from 'src/components/MyTableExperiencia'
import {rulesFor} from 'src/features/P01Solicitud/CONF'
import Typography from '@mui/material/Typography'

const emptyItem = {
  cedula:         '',
  nombre:         '',
  pasaporte:      '',
  gradoAcademigo: '',
  institucion:    '',
  celular:        '',
  correo:         '',
  notificar:      false
}

const emptySubItem = {
  proyecto:       '',
  funcion:        '',
  inicio:         '',
  fin:            '',
  experiencia:    '',
}

const Personal = ({payload, mainFormValues, incrementCounter}) => {
  const section = 'Personal'
  const instanciaTarea = useSelector(state => state.app.instanciaTarea)
  const bandeja = useSelector(state => state.app.bandeja)
  const personal = (!!payload?.Personal)?payload?.Personal:{personal:[], experiencia:[]}
  const instanciaProceso = useSelector(state => state.app.instanciaProceso)
  const solicitud = {...instanciaProceso.solicitud}

  const RULES = rulesFor(section)
  const emptyPayload = RULES.emptyPayload()
  const validators = RULES.validators()
  const initErrors = RULES.initErros()
  const [formValues, setFormValues] = useState(
    {
      ...emptyPayload,
      personal: personal?.personal,
      experiencia: personal?.experiencia,
    }
  )

  const [selected, setSelected] = useState({})

  useEffect(() => {
    mainFormValues[section] = formValues
    incrementCounter()
  },[formValues])

  useEffect(() => {
    const personal = formValues.personal
    if(Array.isArray(personal)) {
      if(personal.filter(it => it.cedula === payload.Solicitante.cedula).length === 0) {
        const row = {
          cedula:         payload?.Solicitante?.cedula,
          celular:        payload?.Solicitante?.celular,
          correo:         payload?.Solicitante?.email,
          nombre:         payload?.Solicitante?.nombresCompletos,
          pais:           '',
          notificar:      true,
          gradoAcademigo: '',
          cargoProyecto:  '',
          pasaporte:      '',
          institucion:    '',
        }
        console.log('PERSONAL: ', formValues.personal, payload.Personal)
        setFormValues({...formValues, personal: [...formValues.personal, row]})
        // payload.Personal.personal = [...personal, row]
      }
    }
  },[])

  const canEdit = bandeja === 'entrada' && instanciaTarea.estadoInstanciaProceso === "En Progreso" && instanciaTarea.estadoInstanciaTarea === "Iniciada"

  return(
    <>
      <Box sx={accordeonBox.container}>
        <MyTablePersonal id={'personal'}
                         canEdit={canEdit}
                         formValues={formValues}
                         setFormValues={setFormValues}
                         addItem={() => {
                           setFormValues({...formValues,personal: [...formValues.personal, {...emptyItem}]})
                         }}
                         canDeleteRow={canEdit}
                         selected={selected}
                         idSolicitud={solicitud.id}
                         setSelected={setSelected} />
      </Box>
      {
        (selected.id !== undefined && selected.cedula !== '') ?
          <Box sx={accordeonBox.container}>
            <Typography>{`Experiencia de ${selected.nombre}, relevante al proyecto que se está solicitando`}</Typography>
            <MyTableExperiencia id={'experiencia'}
                                canEdit={canEdit}
                                formValues={formValues}
                                setFormValues={setFormValues}
                                addItem={() => {
                                  setFormValues({...formValues,experiencia: [...formValues.experiencia, {...emptySubItem, cedula: selected.cedula}]})
                                }}
                                canDeleteRow={canEdit}
                                selected={selected}/>
          </Box>:null
      }
    </>
  )
}

export default Personal
