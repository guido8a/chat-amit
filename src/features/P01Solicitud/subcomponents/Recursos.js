import React from 'react'
import {Box,} from '@mui/material'
import {DataGrid} from "@mui/x-data-grid"
import {paises} from "src/features/P01Solicitud/CONF";
import RobotoCondensedRegular from "../../../styles/MyFonts/Roboto_Condensed/RobotoCondensed-Regular.ttf";

const Recursos = ({recursos}) => {
  return(
    !!recursos?
    <Box sx={{width:'100%', padding:'0 24px 0 24px'}}>
          <DataGrid experimentalFeatures={{ newEditingApi: true }}
                    rows={recursos}
                    columns={columns(false)}
                    autoHeight={true}
                    rowHeight={32}
                    pageSize={8}
                    rowsPerPageOptions={[8]}
                    headerHeight={40}
                    hideFooter={true}
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
    </Box>: null
)}

const columns = (canEdit) => [
  {
    field: 'id',
    headerName: 'id',
    type: 'number',
    editable: false,
    hide: true
  },
  {
    field: 'tipo',
    headerName: 'Tipo',
    width: 120,
    editable: canEdit,
    type: 'singleSelect',
    valueOptions: ['BIOLOGICO', 'DERIVADO', 'GENETICO']
  },
  {
    field: 'especie',
    headerName: 'Especie',
    width: 360,
    editable: false,
  },
  {
    field: 'cantidad',
    headerName: 'Cantidad',
    width: 80,
    type: 'number',
    editable: canEdit
  },
  {
    field: 'depositado',
    headerName: 'Depositado previamente',
    width: 80, type: 'boolean',
    editable: canEdit
  },
  {
    field: 'pais',
    headerName: 'País de origen',
    width: 160,
    editable: canEdit,
    type: 'singleSelect',
    valueOptions: paises
  },
]

export default Recursos
