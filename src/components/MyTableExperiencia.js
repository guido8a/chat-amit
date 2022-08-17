import React, {useState} from 'react'
import { DataGrid } from '@mui/x-data-grid'
import {Box, Stack, Tooltip} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import {MyButtonBacan2} from 'src/components/MyButtonBacan2'
import {f} from 'src/commons/f'
import RobotoCondensedRegular from 'src/styles/MyFonts/Roboto_Condensed/RobotoCondensed-Regular.ttf'
import {format} from 'date-fns'
import {es} from 'date-fns/locale'


export const MyTableExperiencia = ({id, formValues, setFormValues, selected, canEdit=false, addItem=null})  => {
  const rows0 = formValues[id].map((item, idx) => ({...item, id:idx, }))
  const rows = rows0.filter(it => it.cedula === selected.cedula)
  const rows1 = rows0.filter(it => it.cedula !== selected.cedula)
  const [rowSelected, setRowSelected] = useState({})

  const processRowUpdate = (newRow) => {
    const nId = newRow.id
    const nRow = {...newRow}
    const nRows = [...rows]
    const index = nRows.findIndex(it => it.id === nId)
    if(index >= 0) {
      nRows[index] = {...nRows[index], ...nRow}
      setFormValues({...formValues, [id]:[...rows1, ...nRows]})
    }
    return newRow
  }

  return (
    <Box sx={{ pb: '24px', width: '100%',}}>
      <Stack direction="column" spacing={2}>
        {canEdit ?
          <Stack direction='row'
                 spacing={3}
                 justifyContent='flex-end'
                 alignItems='center'>
            <Stack direction='row' spacing={3}>
              <MyButtonBacan2 onClick={addItem}
                              icon={AddIcon}
                              label={'Agregar'} />
            </Stack>
            {
              (f.isValid(rowSelected.id)) ?
                <Tooltip title='Eliminar registro seleccionado'
                         placement='top'
                         arrow>
                  <MyButtonBacan2 onClick={() => {
                                    const nRows0 = [...rows0].filter(it => it.id !== rowSelected.id)
                                    setFormValues({...formValues, [id]:[...nRows0]})
                                  }}
                                  icon={DeleteIcon}
                                  label={'Eliminar'} />
                </Tooltip> :null
            }
          </Stack>: null
        }
        <DataGrid experimentalFeatures={{ newEditingApi: true }}
                  // checkboxSelection
                  // disableSelectionOnClick
                  rows={rows}
                  columns={columns(canEdit)}
                  processRowUpdate={processRowUpdate}
                  autoHeight={true}
                  rowHeight={32}
                  pageSize={8}
                  rowsPerPageOptions={[8]}
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
                  }}
                  onCellClick={(e) => {
                    setRowSelected(e.row)
                  }} />
      </Stack>
    </Box>
  );
}

const columns = (canEdit) => [
  {
    field: 'id',
    headerName: 'id',
    type: 'number',
    editable: false,
    hide: true
  },
  {
    field: 'cedula',
    headerName: 'cedula',
    type: 'number',
    editable: false,
    hide: true,
  },
  {
    field: 'proyecto',
    headerName: 'Proyecto',
    width: 180,
    editable: canEdit,
  },
  {
    field: 'experiencia',
    headerName: 'Experiencia',
    width: 240,
    editable: canEdit
  },
  {
    field: 'inicio',
    headerName: 'Inicio',
    width: 140,
    editable: canEdit,
    sortable: false,
    type: 'date',
    valueGetter: (params) => {
      if(params.value !== '') {
        return format(new Date(params.value), 'dd-MMMM-yyyy', {locale: es})
      } else {
        return ''
      }
    }
  },
  {
    field: 'fin',
    headerName: 'fin',
    width: 140,
    editable: canEdit,
    type: 'date',
    valueGetter: (params) => {
      if(params.value !== '') {
        return format(new Date(params.value), 'dd-MMMM-yyyy', {locale: es})
      } else {
        return ''
      }
    }
  },
  {
    field: 'funcion',
    headerName: 'Función',
    width: 640,
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
]
