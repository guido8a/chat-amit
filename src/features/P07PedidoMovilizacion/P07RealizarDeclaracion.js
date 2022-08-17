import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {
  AppBar,
  Box,
  CssBaseline,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import {format, parse, add} from 'date-fns'
import {es} from 'date-fns/locale'
import {accordeonBox, dialog} from 'src/styles/styles'
import {handCompletarTareaAndSalir, handleClear, handleSaveSolicitud} from 'src/features/App/sliceApp'
import {SectionTitle} from 'src/components/SectionTitle'
import {MySubtitle} from 'src/components/MySubtitle'
import {f} from 'src/commons/f'
import {MyButtonBacan} from 'src/components/MyButtonBacan'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import {MySendButton} from 'src/components/MySendButton'
import {Solicitante} from 'src/features/P01Solicitud/subcomponents/Solicitante'
import {MyReabOnlyTableRecursos} from 'src/components/MyReadOnlyTableRecursos'
import {MyTableMuestras} from 'src/components/MyTableMuestras'
import API from 'src/features/App/API'
import Toolbar from '@mui/material/Toolbar'
import {AccountCircle, Email, PhoneInTalk, Smartphone} from "@mui/icons-material"
import {MyMultipleSelect} from "../../components/MyMultipleSelect"
import {MyReadOnlyTextField} from "../../components/MyReadOnlyTextField"
import BorderColorIcon from '@mui/icons-material/BorderColor'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import Autorizacion from "src/features/P01Solicitud/subcomponents/Autorizacion"
import {MySelect} from "../../components/MySelect"
import {MyDatePicker} from "../../components/MyDatePicker"
import {MyTextField} from "../../components/MyTextField"
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import BiotechIcon from '@mui/icons-material/Biotech'
import {MyTableRecolectores} from "../../components/MyTableRecolectores"
import RobotoCondensedRegular from "src/styles/MyFonts/Roboto_Condensed/RobotoCondensed-Regular.ttf"
import {MySwitch} from "../../components/MySwitch"
import {Document, Footer, Header, Packer} from 'docx'
import {saveAs} from 'file-saver'
import {
  createLogoFooterSenescyt,
  createLogoHeaderSenescyt, dxSubTitleBlue,
  dxC1C2,
  dxParagraph, dxTextRun,
  dxTitle, dxSubTitleGray
} from "../../components/MyDocx";

export const P07RealizarDeclaracion = ({
                  instanciaTarea,
                  perfilUsuario,
                  instanciaProceso,
                  solicitud,
                  solicitudesAprobadas,
                  canEdit=true,
                  atms=[]
                }) => {
  const dispatch = useDispatch()
  const section = 'Solicitud'
  const slct = {...solicitud, payload : JSON.parse(solicitud.payload)}

  slct.payload.Solicitud.solicitudAprobada = JSON.parse(slct.payload.Solicitud.solicitudAprobada)
  console.log('-------------- > > > > > ', slct.payload.Solicitud.solicitudAprobada)

  const mp = slct.payload.Solicitud.solicitudAprobada
  const payload = f.isValid(solicitud.payload)?JSON.parse(solicitud.payload):{}
  const today = format(new Date(), 'dd-MMMM-yyyy', {locale: es})
  const emptyPayload = {
    fecha:                     today,
    aprobadaIdentificador:     '',
    solicitudAprobada:         {},
    provincias:                [],
    areasProtegidas:           [],
    bosquesProtectores:        [],
    origen:                    '',
    laboratorios:              '',
    tipoTransporte:            '',
    fechaInicio:               today,
    fechaFinal:                today,
    recursos:                  mp.Recursos.recursos,
    muestras:                  mp.Recursos.muestras,
    responsablesRecoleccion:   mp?.Personal?.personal.map(it => ({...it, recolecta:false, transporta:false})),
    responsableTransportacion: '',
    responsableCedula:         '',
    responsableContacto:       '',
    responsableCorreo:         '',
    solicitudATM:              (atms?.length > 0)?atms[0].codigoSolicitud:'',
    texto: `Yo, ${mp?.Solicitante?.nombresCompletos} portador del documento de identidad ${mp?.Solicitante?.cedula}, en calidad de solicitante, declaro bajo ` +
           'juramento que la información constante en la presente solicitud es verdadera y de mi absoluta ' +
           'responsabilidad. En caso de omitir información, así como en caso de forzar, falsificar, modificar, alterar o ' +
           'introducir cualquier información falsa o corregir el presente documento, asumo toda la responsabilidad ' +
           'administrativa, civil o penal conforme lo establecido por ley.\n\n'+
           'Atención: Por favor revise la información del registro de la solicitud, si está seguro que los datos son ' +
           'correctos acepte y declare la veracidad de toda la información detallada en la presente solicitud y envíe ' +
           'la misma; caso contrario, cierre esta ventana y realice los cambios a través del botón guardar.\n',
    si:                         false,
  }

  const [formValues, setFormValues] = useState({...emptyPayload,...payload[section]})

  const [counter, setCounter] = useState(-1)

  useEffect(() => {
    setCounter(counter + 1)
  }, [formValues])

  const [recursoSelected, setRecursoSelected] = useState({})

  const handleChange = (e) => API.handleChange2(e, canEdit, setFormValues, formValues)

  const handleChangePhone = (e) => {
    if(e.target.value === '' || f.isPhone(e.target.value)) {
      API.handleChange(e, canEdit?'entrada':'*', setFormValues, formValues)
    }
  }

  const emailError = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(formValues.responsableCorreo)?'':'No tiene el formato de correo electrónico'

  const [muestras0, setMuestras0] = useState({})

  const [payloadPC,setPayloadPC] = useState({})

  const [padreId,setPadreId] = useState(0)

  useEffect(() => {
    let solicitudPadreId = instanciaTarea.instanciaProcesoSolicitudPadreId
    if(!f.isValid(solicitudPadreId)) {
      const arr = instanciaTarea.instanciaProcesoNumeroSolicitudPadre?.split('-')
      solicitudPadreId = arr[arr?.length - 1]
    }
    setPadreId(Number(solicitudPadreId))
    API.fetchSolitudById(Number(solicitudPadreId)).then(slct => {
      setPayloadPC(JSON.parse(slct.payload))
      setMuestras0(JSON.parse(slct.payload)['InformeTecnicoMaate']['muestras'])
    })
  },[instanciaTarea.instanciaProcesoNumeroSolicitudPadre])
  const dInicio = parse(formValues.fechaInicio,'dd-MMMM-yyyy', new Date(), {locale: es})
  const dFinal = parse(formValues.fechaFinal,'dd-MMMM-yyyy', new Date(), {locale: es})
  const dResolucion = parse(mp?.Resolucion?.fecha,'dd-MMMM-yyyy', new Date(), {locale: es})
  const plazo = Number(mp?.Propuesta?.plazo)
  const dPlazo = add(dResolucion, {months: plazo})

  if(f.isValid(solicitudesAprobadas)) {
    return (
      <Box sx={accordeonBox.container}>
        <AppBar position='fixed'
                color='primary'
                elevation={0}
                sx={{top:'64px', bottom:'auto', margin: 0, padding:0, backgroundColor:'rgba(148, 193, 32, 0.8)'}} >
            <SectionTitle title={'Declaración de Movilización de Recursos'} />
        </AppBar>

        <Grid container spacing={1} sx={{...accordeonBox.container2, m:'2rem 0 4rem 0'}}>
          <Grid item xs={12} sx={dialog.titleContainer}>
            <MySubtitle subtitle={'Declaración'} />
          </Grid>
          <Grid item xs={6} >
            <MyReadOnlyTextField label={'Identificador'}
                                 icon={<BorderColorIcon fontSize={'1rem'} sx={{color:'silver', m:'0 0.8rem 0 0'}}/>}
                                 value={solicitud.numeroSolicitud} />
          </Grid>
          <Grid item xs={6} >
            <MyReadOnlyTextField label={'Fecha'}
                                 icon={<CalendarMonthIcon fontSize={'1rem'} sx={{color:'silver', m:'0 0.8rem 0 0'}}/>}
                                 value={formValues['fecha']} />
          </Grid>

          <Solicitante solicitud={{solicitud: {payload: mp}}} displayContact={false}/>
          <Autorizacion solicitud={{numeroSolicitud: formValues.aprobadaIdentificador, payload: mp}} />

          <Grid item xs={12} sx={dialog.titleContainer}>
            <MySubtitle subtitle={'Ubicación Geográfica y Movilidad'} />
          </Grid>
          <Grid item xs={6} >
            <MyMultipleSelect id={'provincias'}
                              label={'Provincias *'}
                              data={mp.Recursos.provincias}
                              setFormValues={setFormValues}
                              formValues={formValues}
                              canEdit={canEdit}
                              handleChange={handleChange} />
          </Grid>
          <Grid container sx={{p:'0 0 0 0.5rem'}}>
            <Grid item xs={6} >
              <MyMultipleSelect id={'areasProtegidas'}
                                label={'Áreas protegidas'}
                                data={mp.Recursos.areasProtegidas}
                                setFormValues={setFormValues}
                                formValues={formValues}
                                canEdit={canEdit}
                                handleChange={handleChange} />
            </Grid>
            <Grid item xs={6} >
              <MyMultipleSelect id={'bosquesProtectores'}
                                label={'Bosques Protectores'}
                                data={mp.Recursos.bosquesProtectores}
                                setFormValues={setFormValues}
                                formValues={formValues}
                                canEdit={canEdit}
                                handleChange={handleChange} />
            </Grid>
          </Grid>
          <Grid item xs={12} >
            <MySelect id={'origen'}
                      label={'Centro de depósito o laboratorio de origen'}
                      data={mp.Recursos.laboratorios}
                      setFormValues={setFormValues}
                      icon={<LocalShippingIcon sx={{fontSize: '14px', color:'silver'}} />}
                      formValues={formValues}
                      canEdit={canEdit} h
                      andleChange={handleChange}/>
          </Grid>
          <Grid item xs={12} >
            <MySelect id={'laboratorios'}
                      label={'Institución en la que se desarrolla la fase de laboratorio'}
                      data={mp.Recursos.laboratorios}
                      setFormValues={setFormValues}
                      icon={<BiotechIcon sx={{fontSize: '14px', color:'silver'}} />}
                      formValues={formValues}
                      canEdit={canEdit} h
                      andleChange={handleChange} />
          </Grid>
          <Grid container spacing={2} >
            <Grid item xs={6} >
              <Box sx={{p:'0 1rem 1rem 0.8rem'}}>
                <MySelect id={'tipoTransporte'}
                          label={'Tipo de Transporte *'}
                          data={['Aéreo', 'Terrestre', 'Fluvial', 'Marítimo']}
                          width={'10rem'}
                          formValues={formValues}
                          setFormValues={setFormValues}
                          icon={<LocalShippingIcon sx={dialog.textFieldIcon} />}
                          canEdit={canEdit} />
              </Box>
            </Grid>
            <Grid item xs={3} >
              <Box sx={{p:'0.9rem 1rem 1rem 1rem'}} >
                <MyDatePicker id={'fechaInicio'}
                              label={'Fecha Inicio'}
                              formValues={formValues}
                              setFormValues={setFormValues} />
              </Box>
            </Grid>
            <Grid item xs={3} sx={{p:'1rem 1rem 1rem 1rem'}}>
              <Box sx={{p:'0.9rem 1rem 1rem 1rem'}} >
                <MyDatePicker id={'fechaFinal'}
                              label={'Fecha Final'}
                              formValues={formValues}
                              setFormValues={setFormValues} />
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={2} >
            <Grid item xs={6} />
            <Grid item xs={3} >
              {
                (dInicio < dResolucion) ?
                  <Typography>Fecha de inicio no puede ser menor a la fecha de resolución</Typography>:
                  (dInicio > dFinal)?
                  <Typography>Fecha de inicio no puede ser mayor a la fecha final</Typography>:null
              }
            </Grid>
            <Grid item xs={3} sx={{p:'1rem 1rem 1rem 1rem'}}>
              {
                (dFinal > dPlazo) ?
                  <Typography>
                    Fecha final no puede ser mayor a la fecha de finalización de vigencia
                  </Typography> : null
              }
            </Grid>
          </Grid>

          <Grid item xs={12} sx={dialog.titleContainer}>
            <MySubtitle subtitle={'Recursos'}/>
          </Grid>
          <Grid item xs={12}>
            <MyReabOnlyTableRecursos rows={formValues.recursos}
                                     setRecursoSelected={setRecursoSelected} reduced={true}/>
          </Grid>
          {
            f.isValid(recursoSelected.taxonid)?
              <>
                <Grid item xs={12} sx={dialog.titleContainer}>
                  <MySubtitle subtitle={'Muestras y submuestras'} />
                </Grid>
                <Grid item xs={12}>
                  {recursoSelected.scientificname}
                </Grid>
                <Grid item xs={12}>
                  <MyTableMuestras id={'muestras'}
                                   muestras={formValues.muestras}
                                   formValues={formValues}
                                   setFormValues={setFormValues}
                                   mode={'DRM'}
                                   selected={recursoSelected} />
                </Grid>
              </>:null
          }
          <Grid item xs={12} sx={dialog.titleContainer}>
            <MySubtitle subtitle={'Responsables'} />
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{fontSize:'0.9rem', fontFamily: RobotoCondensedRegular }}>
              De la Recolección *
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <MyTableRecolectores id={'responsablesRecoleccion'}
                                 formValues={formValues}
                                 setFormValues={setFormValues}
                                 icon={<LocalShippingIcon sx={{fontSize: '14px', color:'silver'}} />}
                                 canEdit={canEdit} />
          </Grid>
          {
            (formValues.responsablesRecoleccion?.filter(it => it.transporta === true)?.length === 0)?
              <>
                <Grid item xs={12} sx={{mt:'2rem'}}>
                  <MyTextField id={'responsableTransportacion'}
                               label={'De la Transportación *'}
                               formValues={formValues}
                               setFormValues={setFormValues}
                               icon={<LocalShippingIcon sx={{fontSize: '14px', color:'silver'}}/>}
                               canEdit={canEdit}
                               handleChange={handleChange} />
                </Grid>
                <Grid item xs={4}>
                  <MyTextField id={'responsableCedula'}
                               label={'Cédula'}
                               formValues={formValues}
                               setFormValues={setFormValues}
                               icon={<Smartphone sx={{fontSize: '14px', color:'silver'}}/>}
                               canEdit={canEdit}
                               handleChange={handleChangePhone} />
                </Grid>
                <Grid item xs={4}>
                  <MyTextField id={'responsableContacto'}
                               label={'Número de Contacto'}
                               formValues={formValues}
                               setFormValues={setFormValues}
                               icon={<PhoneInTalk sx={{fontSize: '14px', color:'silver'}}/>}
                               canEdit={canEdit}
                               handleChange={handleChangePhone} />
                </Grid>
                <Grid item xs={4}>
                  <MyTextField id={'responsableCorreo'}
                               label={'Correo Electrónico'}
                               error={emailError}
                               formValues={formValues}
                               setFormValues={setFormValues}
                               icon={<Email sx={{fontSize: '14px', color:'silver'}}/>}
                               canEdit={canEdit}
                               handleChange={handleChange} />
                </Grid>
              </>:null
          }
          <Grid item xs={12} sx={dialog.titleContainer}>
            <MySubtitle subtitle={'Declaración de veracidad de la información'} />
          </Grid>
          <Grid item xs={12}>
            <TextField id='texto'
                       multiline
                       rows={10}
                       value={formValues.texto}
                       fullWidth
                       variant='standard'
                       aria-readonly={true}
                       sx={dialog.textTypography}
                       InputProps={{
                         disableUnderline: true,
                         startAdornment:(
                           <InputAdornment position="start">
                             <AccountCircle sx={{fontSize: '14px', color:'silver'}}/>
                           </InputAdornment>
                         ),
                         sx: {
                           fontSize: '12px',
                           backgroundColor: 'transparent',
                         }
                       }}
                       InputLabelProps={{
                         sx: {
                           fontSize: '14px',
                         }
                       }}/>
          </Grid>
          <Grid item xs={12}>
            <MySwitch id={'si'}
                      label={'Aceptar y enviar'}
                      formValues={formValues}
                      setFormValues={setFormValues}
                      handleChange={handleChange}
                      fullWidth={false}
                      canEdit={canEdit} />
          </Grid>
        </Grid>
        <CssBaseline/>
        <AppBar position='fixed'
                color='primary'
                elevation={0}
                sx={accordeonBox.bottomBar} >
          <Toolbar>
            <Grid container sx={{p:0, mt:'-1rem'}}>
              {
                (canEdit)?
                  <>
                    <Grid item xs={12} >
                      <Stack direction={'row'} spacing={1} justifyContent="space-between" alignItems='center' sx={{p:'0 2rem 0 3rem'}}>
                        <MyButtonBacan label={'Regresar'}
                                       icon={ArrowBackIcon}
                                       onClick={() => {
                                         if(counter <= 2) {
                                           dispatch(handleClear())
                                         } else
                                           alert('Debe GUARDAR los cambios realizados')
                                       }} />
                        <MyButtonBacan label={'DOCX'} onClick={() => {
                                          const doc = new Document({
                                            sections : [
                                              {
                                                // properties: {
                                                //   page: {
                                                //     margin: {
                                                //       top: 2000,
                                                //       right: 1000,
                                                //       bottom: 2000,
                                                //       left: 1200,
                                                //     },
                                                //   },
                                                // },
                                                // headers: {
                                                //   default: new Header({
                                                //     children: [createLogoHeaderSenescyt(),],
                                                //   }),
                                                // },
                                                // footers: {
                                                //   default: new Footer({
                                                //     children: [createLogoFooterSenescyt(),],
                                                //   }),
                                                // },
                                                children: [
                                                  dxTitle({
                                                    level: 'TITLE',
                                                    text:  'AUTORIZACION DE MOVILIZACIÓN DE ESPECÍMENES DE ESPECIES DE LA DIVERSIDAD BIOLÓGICA',
                                                  }),
                                                  dxTitle({
                                                    level: 'TITLE2',
                                                    text:  'AUTORIZACION DE COLECTA',
                                                  }),
                                                  // dxSubTitleBlue({text: 'Identificación'}),
                                                  // dxC1C2({text1:'id:', text2:solicitud.numeroSolicitud,}),
                                                  // dxC1C2({text1:'Fecha:', text2:formValues.fecha,}),
                                                  // dxSubTitleBlue({text: 'Solicitante'}),
                                                  // dxC1C2({text1:'Cédula/Pasaporte:', text2:slct.payload.Solicitud.solicitudAprobada.Solicitante.cedula,}),
                                                  // dxC1C2({text1:'Nombre:', text2:slct.payload.Solicitud.solicitudAprobada.Solicitante.nombresCompletos,}),
                                                  // dxSubTitleBlue({text: 'Autorización'}),
                                                  // dxC1C2({text1:'Identificador:', text2:slct.payload.Solicitud.solicitudAprobada.Resolucion.identificador,}),
                                                  // dxC1C2({text1:'Proyecto:', text2:slct.payload.Solicitud.solicitudAprobada.Propuesta.nombre,}),
                                                  // dxC1C2({text1:'Patrocinador:', text2:slct.payload.Solicitud.solicitudAprobada.Propuesta.patrocinador,}),
                                                  // dxC1C2({text1:'Vigencia:', text2:`${slct.payload.Solicitud.solicitudAprobada.Propuesta.plazo} meses`,}),
                                                  //
                                                  // dxSubTitleBlue({text: 'Responsables de las muestras o especímenes a movilizar'}),
                                                  //
                                                  //
                                                  //
                                                  //
                                                  //
                                                  //
                                                  //
                                                  //
                                                  // dxSubTitleBlue({text: 'Ubicación | Origen'}),








                                                  // dxSubTitleBlue({text: 'Ubicación | Destino'}),
                                                  //
                                                  //
                                                  //
                                                  //
                                                  //
                                                  //
                                                  //
                                                  //
                                                  // dxSubTitleBlue({text: 'Material biológico para recolectar/movilizar'}),









                                                  // ...slct.payload.Solicitud?.recursos?.map(it => {
                                                  //   const node = {scientificname: it.scientificname}
                                                  //   // const st = dxSubTitleGray({text: it.scientificname})
                                                  //   // return st
                                                  // })
                                                ],
                                              },
                                            ]
                                          })
                                          Packer.toBlob(doc).then(blob => {
                                            // console.log(blob.text());
                                            saveAs(blob, "example.docx");
                                            // console.log("Document created successfully");
                                          });
                                       }}
                                       icon={SaveOutlinedIcon} />
                        <MyButtonBacan label={'Guardar'} onClick={() => {
                                         const newPayload= {...payload ,[section]: {...formValues}}
                                         dispatch(handleSaveSolicitud(instanciaProceso?.id, newPayload))
                                         setCounter(0)
                                       }}
                                       disabled={counter <= 0}
                                       icon={SaveOutlinedIcon} />
                        <MySendButton disabled={
                                          counter > 0 ||
                                          formValues.si === false ||
                                          formValues.provincias.length === 0 ||
                                          formValues.tipoTransporte === '' ||
                                          (formValues.responsablesRecoleccion?.filter(it => it.transporta === true)?.length === 0 && formValues.responsableTransportacion === '') ||
                                          dInicio < dResolucion || dFinal > dPlazo || dPlazo < dInicio
                                      }
                                      label={'enviar'}
                                      onSend={ () => {
                                        const metadata = JSON.stringify({"solicitudId": `${instanciaProceso?.solicitud?.id}`,})
                                        const muestras2 = payload.Solicitud.muestras
                                        muestras0.forEach(it0 => {
                                          const m2 = muestras2.filter(it2 => it2.id === it0.id)[0]
                                          it0.saldoDRM = it0.saldoDRM - m2.cantidadSolicitada
                                        })
                                        payloadPC['InformeTecnicoMaate']['muestras'] = muestras0
                                        API.fetchSetPayload(padreId, payloadPC).then(() => {
                                          dispatch(handCompletarTareaAndSalir(instanciaProceso.id, instanciaTarea, perfilUsuario.id, metadata))
                                        })
                                      }} />
                      </Stack>
                    </Grid>
                  </>
                  :
                  <Grid item xs={4} style={{padding:'0 24px 0 0'}}>
                    <MyButtonBacan label={'Regresar'}
                                   icon={ArrowBackIcon}
                                   onClick={() => dispatch(handleClear())} />
                  </Grid>
              }
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
    )
  }
  else return null
}
