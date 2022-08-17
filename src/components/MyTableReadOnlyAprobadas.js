import React, {useState, useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid'
import {Box, Stack} from '@mui/material'
import {f} from 'src/commons/f'
import RobotoCondensedRegular from 'src/styles/MyFonts/Roboto_Condensed/RobotoCondensed-Regular.ttf'

export const MyReadOnlyTableAprobadas = ({rows, setAprobadaSelected=null})  => {
  const [rowSelected, setRowSelected] = useState({})

  useEffect(()=>{
    if(f.isValid(setAprobadaSelected) && f.isValid(rowSelected.id)) {
      const payload = JSON.parse(rowSelected.payloadSolicitud)
      delete payload['Resolucion']
      delete payload['InformeTecnicoSenescyt']
      delete payload['InformeTecnicoSenadi']
      delete payload['InformeTecnicoMaate']
      delete payload['ElaborarPermiso']
      delete payload['DictamenTecnicoSenadi']
      delete payload['DictamenTecnicoMaate']
      delete payload['55000002_Activity_VerificarCumplimientoRequisitos']
      delete payload['T55000002_Activity_AsignarCaso']
      delete payload['T55000002_Activity_AsignarCasoMaate']
      delete payload['T55000002_Activity_AsignarCasoSenadi']
      setAprobadaSelected(rowSelected)
    }
  },[rowSelected])

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
                  }}
                  onCellClick={(e) => setRowSelected(e.row)} />
      </Stack>
    </Box>
  )
}

const columns = [
  {
    field: 'id',
    headerName: 'id',
    editable: false,
    hide: true
  },
  {
    field: 'solicitudNumeroSolicitud',
    headerName: 'Identificador',
    type: 'number',
    width: 160,
    editable: false,
  },
  {
    field: 'nombreProyectoSolicitud',
    headerName: 'Proyecto',
    width: 360,
    editable: false,
  },
]
