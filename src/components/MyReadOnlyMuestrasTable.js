import React from 'react'
import {DataGrid} from '@mui/x-data-grid'
import {Box, Stack, } from '@mui/material'
import RobotoCondensedRegular from "../styles/MyFonts/Roboto_Condensed/RobotoCondensed-Regular.ttf";

export const MyReadOnlyTableMuestras = ({muestras, selected})  => {
  const rows0 = muestras.map((item, idx) => ({...item, id: idx}))
  const rows = rows0.filter(it => it.taxonid === selected.taxonid)

  return (
    <Box sx={{ pb: '24px', width: '100%',}}>
      <Stack direction="column" spacing={1}>
        <DataGrid experimentalFeatures={{ newEditingApi: true }}
                  rows={rows}
                  columns={columns}
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
    headerName: ' Otra Submuestra',
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
]
