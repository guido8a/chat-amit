import React, {useState} from 'react'
import { DataGrid } from '@mui/x-data-grid'
import {Box, Divider, Stack, Typography} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import {f} from 'src/commons/f'
import RobotoCondensedRegular from "../styles/MyFonts/Roboto_Condensed/RobotoCondensed-Regular.ttf";
import {MyButtonBacan2} from "./MyButtonBacan2";

export const MyTable = ({
    id,
    formValues,
    setFormValues,
    columnName='*',
    canEdit=false,
    addItem=null
  })  => {
  const rows = formValues[id].map((item, idx) => ({id:idx, item:item}))
  const [rowSelected, setRowSelected] = useState({})

  const processRowUpdate = (newRow) => {
    const nId = newRow.id
    const nRow = {...newRow}
    const nRows = [...rows]
    const index = nRows.findIndex(it => it.id === nId)
    if(index >= 0) {
      nRows[index] = {...nRows[index], ...nRow}
      setFormValues({...formValues, [id]:[...nRows.map(it=>it.item)]})
    }
    return newRow
  }

  return (
    <Box sx={{ pb: '24px', height:'auto', width: '100%', p:'24px 0 0 0' }}>
      <Stack direction="column" spacing={1}>
        {canEdit ?
          <Stack direction="row"
                 spacing={1}
                 divider={<Divider orientation="vertical" flexItem />}
                 justifyContent='flex-end'
                 alignItems='center'>
            <Stack direction="row" spacing={3}>
              <MyButtonBacan2 onClick={addItem}
                              icon={AddIcon}
                              label={'Agregar'} />
              {
                f.isValid(rowSelected.id)?
                  <MyButtonBacan2 onClick={() => {
                                    const nRows = [...rows].filter(it => it.id !== rowSelected.id)
                                    setFormValues({...formValues, [id]:nRows.map(it => it.item)})
                                  }}
                                  color0={'darkred'}
                                  icon={DeleteIcon}
                                  label={'Eliminar'} /> : null
              }
            </Stack>
          </Stack> : null
        }
        <DataGrid rows={rows}
                  columns={columns(columnName, canEdit)}
                  processRowUpdate={processRowUpdate}
                  autoHeight={true}
                  rowHeight={28}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  headerHeight={40}
                  onCellClick={(e) => {
                    setRowSelected(e.row)
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
                  experimentalFeatures={{ newEditingApi: true }} />
      </Stack>
      <Typography sx={{p:'1rem',fontSize: '0.8rem', fontfamily: RobotoCondensedRegular}}>{rowSelected?.item}</Typography>
    </Box>
  )
}

const columns = (columnName, canEdit) => [
  { field: 'id',   headerName: 'id', width: 24, type: 'number', editable: false, hide: true },
  { field: 'item', headerName: columnName, flex: 1, editable: canEdit },
]
