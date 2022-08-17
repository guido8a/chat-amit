import React, {useState} from 'react'
import {DataGrid} from '@mui/x-data-grid'
import {Box, Stack, } from '@mui/material'
import RobotoCondensedRegular from "src/styles/MyFonts/Roboto_Condensed/RobotoCondensed-Regular.ttf";

export const MyTableMuestrasCantidad = ({id, formValues, setFormValues, muestras, selected})  => {
  const rows0 = muestras.map((item, idx) => ({cantidadDeclarada:0, ...item, id: idx}))
  const rows = rows0.filter(it => it.taxonid === selected.taxonid)
  const rows1 = rows0.filter(it => it.taxonid !== selected.taxonid)
  const [rowSelected, setRowSelected] = useState({})

  const processRowUpdate = (newRow) => {
    let myNewRow = {...newRow}
    myNewRow.submuestra = (myNewRow.tipo !== 'MUESTRA')?'':myNewRow.submuestra
    myNewRow.loteotro = (myNewRow.submuestra !== 'OTROS')?'':myNewRow.loteotro
    const nId = myNewRow.id
    let nRows = [...rows0]
    const index = rows0.findIndex(it => it.id === nId && it.taxonid === myNewRow.taxonid)
    if(index >= 0) {
      nRows[index].cantidadDeclarada =  (nRows[index].cantidad >= newRow.cantidadDeclarada)?newRow.cantidadDeclarada:nRows[index].cantidad
      setFormValues({...formValues, [id]:nRows})
    }
    return myNewRow
  }
  const [selectionModel, setSelectionModel] = useState([])

  return (
    <Box sx={{ pb: '24px', width: '100%',}}>
      <Stack direction="column" spacing={1}>
        <DataGrid experimentalFeatures={{ newEditingApi: true }}
                  rows={rows}
                  columns={columns}
                  autoHeight={true}
                  rowHeight={32}
                  pageSize={8}
                  processRowUpdate={processRowUpdate}
                  selectionModel={selectionModel}
                  onSelectionModelChange={(selection) => {
                    const selectionSet = new Set(selectionModel);
                    const result = selection.filter((s) => !selectionSet.has(s))
                    setSelectionModel(result)
                    if(result.length > 0)
                      setRowSelected(rows[result[0]])
                    else
                      setRowSelected({})
                  }}
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
                  }} />
      </Stack>
    </Box>
  )
}

const columns = [
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
    width: 120,
    editable: false,
  },
  {
    field: 'submuestra',
    headerName: 'Submuestra',
    width: 240,
    editable: false,
  },
  {
    field: 'loteotro',
    headerName: 'LOTE',
    width: 180,
    editable: false,
  },
  {
    field: 'cantidad',
    headerName: 'Cantidad Autorizada',
    type: 'number',
    width: 120,
    editable: false
  },
  {
    field: 'cantidadDeclarada',
    headerName: 'Cantidad declarada',
    type: 'number',
    width: 120,
    editable: true,
  }
]
