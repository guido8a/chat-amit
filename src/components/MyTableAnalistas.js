import React, {useState} from 'react'
import {DataGrid} from '@mui/x-data-grid'
import {Box, Stack/*, Typography*/} from '@mui/material'
import RobotoCondensedRegular from "../styles/MyFonts/Roboto_Condensed/RobotoCondensed-Regular.ttf";
import {f} from "../commons";

export const MyTableAnalistas = ({id, formValues, selected, setFormValues, items})  => {
  const selectedRow = items?.filter(it => it.id === selected)?.map(it => it.id)
  return (
    <Box sx={{ pb: '24px', width: '100%',}}>
      <Stack direction="column" spacing={1}>
        <DataGrid experimentalFeatures={{ newEditingApi: true }}
                  checkboxSelection
                  rows={items}
                  columns={columns}
                  autoHeight={true}
                  rowHeight={32}
                  pageSize={8}
                  rowsPerPageOptions={[8]}
                  headerHeight={40}
                  selectionModel={selectedRow}
                  onSelectionModelChange={(selection) => {
                    if(selection.length > 0)
                      setFormValues({...formValues, selected: selection[0]})
                    else
                      setFormValues({...formValues, selected: null})
                   }}
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
                  onCellClick={(e) => setFormValues({...formValues, [id]:e.row?.id})} />
      </Stack>
      {/*{*/}
      {/*  (f.isValid(formValues.selected) && items.indexOf(it => it.id === formValues.selected) > -1) ?*/}
      {/*    <Typography>items[items.indexOf(it => it.id === formValues.selected)][0]['nombreUsuario']</Typography>:*/}
      {/*    <Typography>... por asignar</Typography>*/}
      {/*}*/}
    </Box>
  )
}

const columns = [
  {
    field: 'id',
    headerName: 'id',
    type: 'number',
    editable: false,
    hide: true,
  },
  {
    field: 'usuarioNombreOrganizacion',
    headerName: 'Organización',
    width: 120,
    editable: false,
  },
  {
    field: 'nombreUsuario',
    headerName: 'Nombre Completo',
    width: 200,
    editable: false,
  },
  {
    field: 'descripcionPerfil',
    headerName: 'Cargo',
    width: 260,
    editable: false,
  },
  {
    field: 'telefonoUsuario',
    headerName: 'Teléfono',
    width: 160,
    editable: false
  },
  {
    field: 'correoUsuario',
    headerName: 'Correo',
    width: 160,
    editable: false
  },
]
