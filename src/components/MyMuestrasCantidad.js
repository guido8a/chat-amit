import React, {useState} from 'react'
import { DataGrid } from '@mui/x-data-grid'
import {Box, Stack, Tooltip} from '@mui/material'
import {f} from 'src/commons/f'
import RobotoCondensedRegular from "../styles/MyFonts/Roboto_Condensed/RobotoCondensed-Regular.ttf";

export const MyTableMuestrasCantidad = ({id, muestras, formValues, setFormValues, selected, canEdit=false})  => {
  const rows0 = formValues[id].map((item, idx) => ({...item, id:idx, }))
  const rows = rows0.filter(it => it.taxonid === selected.taxonid)
  const rows1 = rows0.filter(it => it.taxonid !== selected.taxonid)
  const [rowSelected, setRowSelected] = useState({})

  const reino = f.isValid(selected?.taxonomicHierarchy)?selected?.taxonomicHierarchy.split(',')[0]:''

  const processRowUpdate = (newRow) => {
    const nId = newRow.id
    const nRow = {...newRow}
    const nRows = [...rows]
    const index = nRows.findIndex(it => it.id === nId)
    if(index >= 0) {
      nRows[index] = {...nRows[index], ...nRow}
    }
    const filterdList = rows.filter(it => it.id === newRow.id)
    if(filterdList.length === 1) {
      const target = filterdList[0]
      target.item = newRow.item
      setFormValues({...formValues, [id]:[...rows1, ...nRows]})
    }
  }

  return (
    <Box sx={{ pb: '24px', width: '100%',}}>
      <Stack direction="column" spacing={1}>
        <DataGrid experimentalFeatures={{ newEditingApi: true }}
                  rows={rows}
                  columns={columns()}
                  processRowUpdate={processRowUpdate}
                  autoHeight={true}
                  rowHeight={32}
                  pageSize={8}
                  rowsPerPageOptions={[8]}
                  onE
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
  )
}

const columns = () => [
  {
    field: 'id',
    headerName: 'id',
    type: 'number',
    editable: false,
    hide: true
  },
  {
    field: 'taxonid',
    headerName: 'taxonid',
    type: 'number',
    editable: false,
    hide: true
  },
  {
    field: 'tipo',
    headerName: 'Tipo de recolección',
    width: 140,
    editable: false
  },
  {
    field: 'submuestra',
    headerName: 'Submuestra',
    width: 240,
    editable: false,
  },
  {
    field: 'loteotro',
    headerName: 'Otra Submuestra',
    width: 180,
    editable: false,
  },
  {
    field: 'cantidad',
    headerName: 'Cantidad',
    type: 'number',
    width: 120,
    editable: true
  }
]
