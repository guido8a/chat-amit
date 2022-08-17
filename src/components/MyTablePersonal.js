import React, {useRef, useState} from 'react'
import { DataGrid,} from '@mui/x-data-grid'
import {Box, Divider, Stack} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import {MyButtonBacan2} from 'src/components/MyButtonBacan2'
import RobotoCondensedRegular from 'src/styles/MyFonts/Roboto_Condensed/RobotoCondensed-Regular.ttf'
import {f} from 'src/commons/f'
import {paises} from 'src/features/P01Solicitud/CONF'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import Button from "@mui/material/Button";
import GLOBALS from "../features/App/globals";
import {useSelector} from "react-redux";

export const MyTablePersonal = ({
                                  id,
                                  idSolicitud,
                                  formValues,
                                  setFormValues,
                                  selected,
                                  setSelected,
                                  canEdit=false,
                                  addItem=null
                                })  => {
  const inputRef = useRef()
  const INPUT_ID = `FILE-INPUT-${f.isValid(selected?.cedula)?selected?.cedula:''}`
  const rows = formValues[id].map((item, idx) => ({...item, id:idx, }))
  const patrocinadores = useSelector(state => state.app.instituciones)

  const [selectionModel, setSelectionModel] = useState([])

  const processRowUpdate = (newRow) => {
    const nId = newRow.id
    const nRow = {...newRow}
    const nRows = [...rows]
    const index = nRows.findIndex(it => it.id === nId)
    if(index >= 0) {
      nRows[index] = {...nRows[index], ...nRow}
      setFormValues({...formValues, [id]:[...nRows]})
    }
    return newRow
  }

  return (
    <Stack direction="column" spacing={1}>
      <Stack direction="row"
             spacing={1}
             divider={<Divider orientation="vertical" flexItem />}
             justifyContent='flex-end'
             alignItems='center'>
        {(selected.pasaporte !== '')?
          <Button variant="outlined"
                  startIcon={<AddAPhotoIcon />}
                  onClick={() => {
                    const url = `${GLOBALS.mainUrl}/documentos/descargar?filename=vuv-${idSolicitud}/${selected.cedula}/${selected.pasaporte}`
                    fetch(url)
                      .then((res) => { return res.blob(); })
                      .then((data) => {
                        const dataPdf = new Blob([data], { type: 'application/pdf' })
                        const a = document.createElement("a")
                        a.href = window.URL.createObjectURL(dataPdf)
                        a.target="_blank"
                        a.click()
                      })
                  }}
                  sx={{
                    borderRadius: 2,
                    fontSize: '0.8rem',
                    fontfamily: RobotoCondensedRegular,
                    fontWeight: 'normal',
                    width: '11rem',
                    height: '1.7rem',
                  }}
                  component='label'
                  size={'small'}>
            VER PASAPORTE
          </Button>:null
        }
        {canEdit ?
          <Stack direction="row" spacing={3}>
            {
              (f.isValid(selected.cedula) && selected.pais !== 'ECUADOR')?
                <Button variant="outlined"
                        startIcon={<AddAPhotoIcon />}
                        sx={{
                          borderRadius: 2,
                          fontSize: '0.8rem',
                          fontfamily: RobotoCondensedRegular,
                          fontWeight: 'normal',
                          width: '11rem',
                          height: '1.7rem',
                        }}
                        component='label'
                        size={'small'}>
                  SUBIR PASAPORTE
                  <input id={INPUT_ID}
                         ref={inputRef}
                         accept="application/pdf,application/jpg,application/png"
                         onChange={() => {
                           const formData = new FormData()
                           formData.append('idSolicitud', idSolicitud)
                           formData.append('subFolder', selected.cedula)
                           formData.append('archivo', inputRef.current.files[0])
                           const requestOptions = {
                             method: 'POST',
                             body: formData,
                             redirect: 'follow'
                           }
                           fetch(`${GLOBALS.mainUrl}/documentos/cargar`, requestOptions)
                             .then(response => response.text())
                             .then(result => {
                               const rslt = JSON.parse(result)
                               const rutaDocumento = rslt['rutaDocumento']
                               const splits = rutaDocumento.split('/')
                               const pasaporte = splits.length > 1 ? splits[splits.length - 1]:rslt
                               const mselected = {...selected, pasaporte}
                               processRowUpdate(mselected)
                             })
                             .catch(error => console.log('error: ', error))
                         }}
                         hidden
                         type='file' />
                </Button>:
                null
            }
            <MyButtonBacan2 onClick={addItem} icon={AddIcon} label={'Agregar'} />
            {
              selectionModel.length > 0 ?
                <MyButtonBacan2 onClick={() => {
                                  const selectedIDs = new Set(selectionModel)
                                  const nRows = [...rows].filter(it => !selectedIDs.has(it.id))
                                  setFormValues({...formValues, [id]:[...nRows]})
                                }}
                                color0={'darkred'}
                                icon={DeleteIcon}
                                label={'Eliminar'} /> : null
            }
          </Stack> : null
        }

      </Stack>

      <Box sx={{pb: 0, width: '100%', pt:'1rem'}}>
        <DataGrid experimentalFeatures={{ newEditingApi: true }}
                  rows={rows}
                  columns={columns(canEdit, inputRef, patrocinadores)}
                  processRowUpdate={processRowUpdate}
                  autoHeight={true}
                  rowHeight={32}
                  pageSize={8}
                  rowsPerPageOptions={[8]}
                  selectionModel={selectionModel}
                  onSelectionModelChange={(selection) => {
                    const selectionSet = new Set(selectionModel);
                    const result = selection.filter((s) => !selectionSet.has(s))
                    setSelectionModel(result)
                    if(result.length > 0)
                      setSelected(rows[result[0]])
                    else
                      setSelected({})
                  }}
                  headerHeight={40}
                  sx={{
                    borderRadius: 0,
                    '& .MuiDataGrid-columnHeaders': {
                      backgroundColor: "rgba(244,244,244,0.4)",
                      color: "#aeaeae",
                      fontSize: '0.8rem',
                      fontfamily: RobotoCondensedRegular,
                      fontweight: 'lighter',
                    },
                    '& .MuiDataGrid-virtualScrollerRenderZone': {
                      '& .MuiDataGrid-row': {
                        backgroundColor: 'rgba(255, 255, 255, .7)',
                        fontSize: '0.8rem',
                        fontfamily: RobotoCondensedRegular,
                        fontweight: 'lighter',
                        color: "#888888",
                      },
                      '& .Mui-selected': {
                        color: "#000000",
                      }
                    },
                  }} />
      </Box>
    </Stack>
  )
}

const columns = (canEdit, inputRef, patrocinadores) => [
  {
    field: 'id',
    headerName: 'id',
    type: 'number',
    editable: false,
    hide: true
  },
  {
    field: 'cedula',
    headerName: 'Cédula o Pasaporte',
    width: 160,
    editable: canEdit,
    valueParser: (value, params) => {
      return value.replace(/\D/g,'')
    }
  },
  {
    field: 'nombre',
    headerName: 'Nombres y Apellidos',
    width: 300,
    editable: canEdit
  },

  {
    field: 'pais',
    headerName: 'País de origen',
    width: 300,
    editable: canEdit,
    type: 'singleSelect',
    valueOptions: paises
  },
  {
    field: 'pasaporte',
    headerName: 'Pasaporte',
    width: 160,
    editable: false,
    align: 'center',
  },
  {
    field: 'gradoAcademigo',
    headerName: 'Grado Académico',
    width: 160,
    editable: canEdit,
    type: 'singleSelect',
    valueOptions: [
      'Estudiante',
      'Cuarto nivel',
      'Pasante',
      'Tercer nivel',
      'Tesista',
      '',
    ]
  },
  {
    field: 'cargoProyecto',
    headerName: 'Cargo Proyecto',
    width: 260,
    editable: canEdit,
    type: 'singleSelect',
    valueOptions: [
      'ANALISTA DE LABORATORIO',
      'ASISTENTE DE CAMPO',
      'ASISTENTE DE INVESTIGACIÓN',
      'AYUDANTE DE INVESTIGACIÓN',
      'CO – INVESTIGADOR/A PRINCIPAL',
      'COORDINADOR/A DE INVESTIGACIÓN',
      'COORDINADOR/A DE LABORATORIO',
      'DIRECTOR/A DE PROYECTO SUBROGANTE',
      'DIRECTOR/A DE PROYECTO',
      'INVESTIGADOR ASOCIADO',
      'INVESTIGADOR/A COLABORADOR/A',
      'INVESTIGADOR/A DE PROYECTOS',
      'INVESTIGADOR/A PRINCIPAL',
      'INVESTIGADOR/A',
      'OTRO PERSONAL DE INVESTIGACIÓN (OPCIÓN PARA INCLUIR OTRA FUNCIÓN EN LA INVESTIGACIÓN)',
      'POSTGRADISTA',
      'RESPONSABLE TÉCNICO/A DEL PROYECTO',
      'TÉCNICO/A DE CAMPO',
      'TÉCNICO/A DE LABORATORIO',
      'TESISTA',
      '',
    ]
  },
  {
    field: 'institucion',
    headerName: 'Institución a la que pertenece',
    width: 500,
    editable: canEdit,
    type: 'singleSelect',
    valueOptions: patrocinadores
  },
  {
    field: 'celular',
    headerName: 'Celular',
    width: 160,
    editable: canEdit,
    valueParser: (value, params) => {
      const ok = f.isPhone(value)
      return ok?value:''
    }
  },
  {
    field: 'correo',
    headerName: 'Correo Electrónico',
    width: 200,
    editable: canEdit,
  },
  {
    field: 'notificar',
    headerName: 'Notificar',
    width: 80,
    type: 'boolean',
    editable: canEdit,
  },
]
