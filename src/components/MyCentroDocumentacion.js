import React, {useEffect, useState} from 'react'
import {Grid, Stack} from '@mui/material'
import {useSelector} from "react-redux";
import {MyAutocompleteTextField} from "./MyAutocompleteTextField";
import ApartmentIcon from "@mui/icons-material/Apartment";
import {dialog} from "../styles/styles";
import {f} from "../commons";
import {format} from "date-fns"
import {es} from "date-fns/locale"
import {Email, PhoneInTalk, } from "@mui/icons-material";
import {MyTextField} from "./MyTextField";
import {MyButtonBacan2} from "./MyButtonBacan2";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import AdbIcon from '@mui/icons-material/Adb';
import DeleteIcon from "@mui/icons-material/Delete";
import {MyTableRecursos} from 'src/components/MyTableRecursos'
import {muestras} from "../features/P01Solicitud/CONF"
import {MyUpload} from 'src/components/MyUpload'

const setErrors = (formValues) => {
  const errors = []
  if(formValues.centroDocumentacion === '') errors.push('Centro de Documentación no puede quedar vacío')
  if(formValues.acronimo === '') errors.push('Acrónimo no puede quedar vacío')
  if(formValues.curadorAdministrador === '') errors.push('Curador administrador no puede quedar vacío')
  if(formValues.telefono === '') errors.push('Teléfono no puede quedar vacío')
  if(formValues.email === '') errors.push('Mail no puede quedar vacío')
  if(formValues.recursos?.length === 0) errors.push('No se han definido especies')
  if(formValues.recursos?.length > 0 && formValues.recursos.filter(it => it.cantidadSolicitada === 0).length > 0) {
    errors.push('No se permite candidades autorizadas 0')
  }

  return errors
}

export const MyCentroDocumentacion = ({
                                        id,
                                        numeroSolicitud,
                                        formValues,
                                        setFormValues,
                                        handleDelete,
                                        canEdit=false
                                     })  => {
  const centrosDocumentacion = useSelector(state => state.app.centrosDocumentacion)

  const today = format(new Date(), 'dd-MMMM-yyyy', {locale: es})
  const lEmptyPayload = {
    id:                      -99,
    fecha:                   today,
    centroDocumentacion:     '',
    acronimo:                '',
    curadorAdministrador:    '',
    telefono:                '',
    email:                   '',
    recursos:                [],
    errores:                 [],
  }

  const formErrors = {
    centroDocumentacion:     '',
    adjunto:                 '',
    acronimo:                '',
    curadorAdministrador:    '',
    telefono:                '',
    email:                   '',
    recursos:                [],
    errores:                 [],
  }

  const [lFormValues, lSetFormValues] = useState({
    ...lEmptyPayload,
    id:                      formValues.centrosDocumentacion.filter(it => it.id === id)[0]?.id ?? -99,
    centroDocumentacion:     formValues.centrosDocumentacion.filter(it => it.id === id)[0]?.centroDocumentacion ?? '',
    adjunto:                 formValues.centrosDocumentacion.filter(it => it.id === id)[0]?.adjunto ?? '',
    acronimo:                formValues.centrosDocumentacion.filter(it => it.id === id)[0]?.acronimo ?? '',
    curadorAdministrador:    formValues.centrosDocumentacion.filter(it => it.id === id)[0]?.curadorAdministrador ?? '',
    telefono:                formValues.centrosDocumentacion.filter(it => it.id === id)[0]?.telefono ?? '',
    email:                   formValues.centrosDocumentacion.filter(it => it.id === id)[0]?.email ?? '',
    recursos:                formValues.centrosDocumentacion.filter(it => it.id === id)[0]?.recursos ?? [],
    errores:                 setErrors(formValues.centrosDocumentacion.filter(it => it.id === id)[0]),
  })

  const handlePhoneChange = (e) => {
    if(canEdit) {
        const name = e.target.id
        const value = e.target.value
        lSetFormValues({...lFormValues, [name]: value})
    }
  }

  const handleMailChange = (e) => {
    if(canEdit) {
      const name = e.target.id
      const value = e.target.value
      lSetFormValues({...lFormValues, [name]: value})
    }
  }

  const handleChange = (e) => {
    if(canEdit) {
      const name = e.target.id
      const value = e.target.value
      lSetFormValues({...lFormValues, [name]: value})
    }
  }

  useEffect(() => {
    const errores = setErrors(lFormValues)
    lSetFormValues({...lFormValues, errores})
    setFormValues(id, {...lFormValues, errores})
  }, [
    lFormValues.id,
    lFormValues.centroDocumentacion,
    lFormValues.adjunto,
    lFormValues.acronimo,
    lFormValues.curadorAdministrador,
    lFormValues.telefono,
    lFormValues.email,
    lFormValues.recursos,
  ])

  const [recursoSelected, setRecursoSelected] = useState({})

  return (
    <Stack direction="column" spacing={1} sx={{m:'0 0 1rem 0', p:'1rem', border:'1px dotted green', borderRadius: '0.5rem'}}>
      <MyAutocompleteTextField id='centroDocumentacion'
                               options={centrosDocumentacion.map(it => it.itemCatalogo)}
                               label={'Centro de documentación *'}
                               formValues={lFormValues}
                               icon={<ApartmentIcon sx={dialog.textFieldIcon}/>}
                               canEdit={canEdit}
                               handleChange={handleChange} />

      <MyUpload id={'adjunto'}
                dir={numeroSolicitud}
                label={'Adjunto'}
                formValues={lFormValues}
                setFormValues={lSetFormValues}
                canEdit={canEdit}
                info={'info...'} />

      <MyTextField id={'acronimo'}
                   label={'Acrónimo *'}
                   formValues={lFormValues}
                   setFormValues={lSetFormValues}
                   icon={<ChatBubbleOutlineIcon sx={{fontSize: '14px', color:'silver'}}/>}
                   canEdit={canEdit}
                   handleChange={handleChange} />

      <MyTextField id={'curadorAdministrador'}
                   label={'Curador / Administrador *'}
                   formValues={lFormValues}
                   setFormValues={lSetFormValues}
                   icon={<AdbIcon sx={{fontSize: '14px', color:'silver'}}/>}
                   canEdit={canEdit}
                   handleChange={handleChange} />

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <MyTextField id={'telefono'}
                       label={'Teléfono *'}
                       formValues={lFormValues}
                       setFormValues={lSetFormValues}
                       icon={<PhoneInTalk sx={{fontSize: '14px', color:'silver'}}/>}
                       canEdit={canEdit}
                       handleChange={handlePhoneChange} />
        </Grid>

        <Grid item xs={6}>
          <MyTextField id={'email'}
                       label={'Correo Electrónico *'}
                       formValues={lFormValues}
                       setFormValues={lSetFormValues}
                       icon={<Email sx={{fontSize: '14px', color:'silver'}}/>}
                       canEdit={canEdit}
                       handleChange={handleMailChange} />
        </Grid>
      </Grid>

      <MyTableRecursos id={'recursos'}
                       formValues={lFormValues}
                       setFormValues={lSetFormValues}
                       // muestras={formValues.muestras}
                       columnName={'Recursos'}
                       canEdit={canEdit}
                       mode={'ex-situ'}
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
                           it['taxonrank'] = f.isValid(it.taxonrank)?it.taxonrank:''
                           it['cantidadSolicitada'] = 0
                           it['cantidadAutorizada'] = 0
                         })
                         const newSet = [ ...lFormValues[field]]
                         items.forEach(it => {
                           const idx = newSet.findIndex(ns => ns.taxonid === it.taxonid)
                           if(idx < 0) {
                             newSet.push(it)
                           }
                         })
                         lSetFormValues({...lFormValues, [field]:newSet})
                       }}
                       addItems2={(items) => {
                         const field = 'recursos'
                         items.forEach(it => {
                           it['id'] = it.taxonid
                           it['clasificacion'] = f.isValid(it.clasificacion)?it.clasificacion:''
                           it['scientificname'] = f.isValid(it.scientificname)?it.scientificname:''
                           it['redList'] = f.isValid(it.nationalredlist)?it.nationalredlist:''
                           it['taxonomicHierarchy'] = f.isValid(it.taxonomicHierarchy)?it.taxonomicHierarchy:''
                           it['categoriaEspecial'] = ''
                           it['artificialGroup'] = f.isValid(it.artificialgroup)?it.artificialgroup:''
                           it['cites'] = f.isValid(it.cites)?it.cites:''
                           it['taxonrank'] = f.isValid(it.taxonrank)?it.taxonrank:''
                           it['cantidadSolicitada'] = 0
                           it['cantidadAutorizada'] = 0
                         })
                         const newSet = [ ...lFormValues[field]]
                         items.forEach(it => {
                           const idx = newSet.findIndex(ns => ns.taxonid === it.taxonid)
                           if(idx < 0) {
                             newSet.push(it)
                           }
                         })
                         lSetFormValues({...lFormValues, [field]:newSet})
                       }}
                       muestras={muestras}
                       setRecursoSelected={setRecursoSelected}
                       canDeleteRow={canEdit} />
      {
        canEdit &&
          <Stack direction={'row'} justifyContent='flex-end' alignItems='center' spacing={2} sx={{p:'0 1rem 0 0 '}}>
            <MyButtonBacan2 onClick={() => handleDelete(id)}
                            icon={DeleteIcon}
                            label={'Eliminar Centro de Documentación'} />
          </Stack>
      }

    </Stack>
  )
}
