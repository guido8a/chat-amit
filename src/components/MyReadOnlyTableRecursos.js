import React, {useState, useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid'
import {Box, Stack} from '@mui/material'
import {f} from 'src/commons/f'
import RobotoCondensedRegular from "../styles/MyFonts/Roboto_Condensed/RobotoCondensed-Regular.ttf";

export const MyReabOnlyTableRecursos = ({rows, setRecursoSelected=null, reduced=false})  => {
  const [rowSelected, setRowSelected] = useState({})

  useEffect(()=>{
    if(f.isValid(setRecursoSelected)) {
      setRecursoSelected(rowSelected)
    }
  },[rowSelected])

  return (
    <Box sx={{ pb: '24px', width: '100%',}}>
      <Stack direction="column" spacing={1}>
        <DataGrid experimentalFeatures={{ newEditingApi: true }}
                  rows={rows}
                  columns={columns(reduced)}
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
                  onCellClick={(e) => setRowSelected(e.row)} />
      </Stack>
    </Box>
  )
}

const columns = (reduced) => [
  {
    field: 'id',
    headerName: 'id',
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
    hide: true,
    editable: false,
  },
  {
    field: 'scientificname',
    headerName: 'Especie',
    width: 240,
    editable: false,
  },
  {
    field: 'taxonomicHierarchy',
    headerName: 'Taxonomía',
    width: reduced?500:260,
    editable: false
  },
  {
    field: 'redList',
    headerName: 'Lista roja',
    width: 120,
    hide: reduced,
    editable: false
  },
  {
    field: 'artificialGroup',
    headerName: 'Grupo artificial',
    width: 80,
    hide: reduced,
    editable: false,
  },
]
