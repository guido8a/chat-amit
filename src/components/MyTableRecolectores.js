import React, {useState} from 'react'
import { DataGrid,} from '@mui/x-data-grid'
import {Box, Stack} from '@mui/material'
import RobotoCondensedRegular from 'src/styles/MyFonts/Roboto_Condensed/RobotoCondensed-Regular.ttf'
import {paises} from 'src/features/P01Solicitud/CONF'

export const MyTableRecolectores = ({
                                  id,
                                  formValues,
                                  setFormValues,
                                  canEdit=false,
                                })  => {
  const rows = formValues[id].map((item, idx) => ({...item, id:idx, }))

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
      <Box sx={{pb: 0, width: '100%', pt:'1rem'}}>
        <DataGrid experimentalFeatures={{ newEditingApi: true }}
                  rows={rows}
                  columns={columns(canEdit)}
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
    headerName: 'Cédula o Pasaporte',
    width: 160,
    editable: false,
  },
  {
    field: 'nombre',
    headerName: 'Nombres y Apellidos',
    width: 300,
    editable: false
  },

  {
    field: 'pais',
    headerName: 'País de origen',
    width: 300,
    editable: false,
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
    field: 'celular',
    headerName: 'Celular',
    width: 160,
    editable: false,
  },
  {
    field: 'correo',
    headerName: 'Correo Electrónico',
    width: 200,
    editable: false,
  },
  {
    field: 'recolecta',
    headerName: '¿Recolecta?',
    width: 160,
    type: 'boolean',
    editable: canEdit,
  },
  {
    field: 'transporta',
    headerName: '¿Transporta?',
    width: 160,
    type: 'boolean',
    editable: canEdit,
  },
]
