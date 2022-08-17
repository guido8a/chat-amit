import React, {useState} from 'react'
import { DataGrid} from '@mui/x-data-grid'
import {Box, Stack, Tooltip} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/EmojiNature'
import {MyButtonBacan2} from 'src/components/MyButtonBacan2'
import {f} from 'src/commons/f'
import RobotoCondensedRegular from "../styles/MyFonts/Roboto_Condensed/RobotoCondensed-Regular.ttf";

const lista = (reino, muestras) => {
  const myLista = muestras?.filter(it => it.reino === reino)
  if(!f.isValid(myLista)) {
    return []
  } else {
    return myLista.map(it => it.dato).sort((it1, it2) => it1 > it2 ? 1 : -1).filter(it => it !== 'OTROS')
  }
}

export const MyTableMuestras = ({
                                  id,
                                  muestras,
                                  formValues,
                                  setFormValues,
                                  selected,
                                  canEdit=false,
                                  addItem=null,
                                  mode='',
})  => {
  // console.log('. . . . mode:: ', mode, formValues, id)
  const rows0 = formValues[id]
  const rows = rows0.filter(it => it.taxonid === selected.taxonid)
  const [rowSelected, setRowSelected] = useState({})
  const reino = f.isValid(selected?.taxonomicHierarchy)?selected?.taxonomicHierarchy.split(',')[0]:''

  let lmuestra = lista(reino.toUpperCase(), muestras)
  if(lmuestra.length > 0) { lmuestra = [...lmuestra,'LOTE','OTROS',''] }

  const processRowUpdate = (newRow) => {
    let myNewRow = {...newRow}
    myNewRow.submuestra = (myNewRow.tipo !== 'MUESTRA')?'LOTE':myNewRow.submuestra
    myNewRow.loteotro = (myNewRow.submuestra !== 'OTROS')?'':myNewRow.loteotro
    myNewRow.cantidadAutorizada = 0
    myNewRow.saldoDRM = 0
    myNewRow.saldorATM = 0

    const nId = myNewRow.id
    const nRows = [...rows0]
    const index = nRows.findIndex(it => it.id === nId)
    if(index >= 0) {
      nRows[index] = {...newRow}
      setFormValues({...formValues, [id]:[...nRows]})
    }
    return myNewRow
  }

  const processRowUpdate2 = (newRow) => {
    let myNewRow = {...newRow}
    myNewRow.cantidadAutorizada = (myNewRow.cantidadAutorizada > myNewRow.cantidadSolicitada)?
      myNewRow.cantidadSolicitada:(myNewRow.cantidadAutorizada < 0 )?0:myNewRow.cantidadAutorizada
    myNewRow.saldoDRM = myNewRow.cantidadAutorizada
    myNewRow.saldorATM = myNewRow.cantidadAutorizada

    const nId = myNewRow.id
    let nRows = [...rows0]
    const index = nRows.findIndex(it => it.id === nId)
    if(index >= 0) {
      nRows[index] = {...myNewRow}
      setFormValues({...formValues, muestras:[...nRows]})
    }
    return myNewRow
  }

  const processRowUpdateATM = (newRow) => {
    let myNewRow = {...newRow}
    if(myNewRow.cantidadSolicitada > myNewRow.cantidadAutorizada) {
      myNewRow.cantidadSolicitada = myNewRow.cantidadAutorizada
    }
    if(myNewRow.cantidadSolicitada < 0) {
      myNewRow.cantidadSolicitada = 0
    }

    const nId = myNewRow.id
    let nRows = [...rows0]
    const index = nRows.findIndex(it => it.id === nId)
    if(index >= 0) {
      nRows[index] = {...myNewRow}
      setFormValues({...formValues, muestras:[...nRows]})
    }
    return myNewRow
  }

  const processRowUpdateDRM = (newRow) => {
    let myNewRow = {...newRow}
    if(myNewRow.cantidadSolicitada > myNewRow.cantidadAutorizada) {
      myNewRow.cantidadSolicitada = myNewRow.cantidadAutorizada
    }
    if(myNewRow.cantidadSolicitada < 0) {
      myNewRow.cantidadSolicitada = 0
    }

    const nId = myNewRow.id
    let nRows = [...rows0]
    const index = nRows.findIndex(it => it.id === nId)
    if(index >= 0) {
      nRows[index] = {...myNewRow}
      setFormValues({...formValues, muestras:[...nRows]})
    }
    return myNewRow
  }

  const processRowUpdatePermisoExportacion = (newRow) => {
    let myNewRow = {...newRow}
    if(myNewRow.cantidadSolicitada > myNewRow.cantidadAutorizada) {
      myNewRow.cantidadSolicitada = myNewRow.cantidadAutorizada
    }
    if(myNewRow.cantidadSolicitada < 0) {
      myNewRow.cantidadSolicitada = 0
    }
    myNewRow.saldoDRM = myNewRow.cantidadAutorizada - myNewRow.cantidadSolicitada

    const nId = myNewRow.id
    let nRows = [...rows0]
    const index = nRows.findIndex(it => it.id === nId)
    if(index >= 0) {
      nRows[index] = {...myNewRow}
      setFormValues({...formValues, muestras:[...nRows]})
    }
    return myNewRow
  }

  const [selectionModel, setSelectionModel] = useState([])

  const columnsDef = {
    '':                   columns(canEdit, lmuestra),
    'cantidades':         columns2(),
    'ATM':                columns3(),
    'DRM':                columnsDRM(),
    'permisoExportacion': columnsPermisoExportacion(),
    'permiso':            columnsPermiso(),
    'maatero':            columnsMaateRO()
  }[mode]

  const rowUpdateFc = {
    '':                   processRowUpdate,
    'cantidades':         processRowUpdate2,
    'ATM':                processRowUpdateATM,
    'DRM':                processRowUpdateDRM,
    'permisoExportacion': processRowUpdatePermisoExportacion,
    'permiso':            null,
    'maatero':            null,
  }[mode]

  return (
    <Box sx={{ pb: '24px', width: '100%',}}>
      <Stack direction="column" spacing={1}>
        {canEdit ?
          <Stack direction='row'
                 spacing={3}
                 justifyContent='flex-end'
                 alignItems='center'>
            {mode === '' ?
              <Stack direction='row'
                     spacing={3}>
                <MyButtonBacan2 onClick={addItem}
                                icon={AddIcon}
                                label={'Agregar muestra'}/>
              </Stack> : null
            }
            {
              (f.isValid(rowSelected?.id) && mode === '') ?
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
                processRowUpdate={rowUpdateFc}
                rows={rows}
                columns={columnsDef}
                autoHeight={true}
                rowHeight={32}
                pageSize={8}
                rowsPerPageOptions={[8]}
                selectionModel={selectionModel}
                onSelectionModelChange={(selection) => {
                  const selectionSet = new Set(selectionModel);
                  const result = selection.filter((s) => !selectionSet.has(s))
                  setSelectionModel(result)
                  if(result.length > 0) {
                    setRowSelected(rows.filter(it => it.id === result[0])[0])
                  } else setRowSelected({})
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
                }} />
      </Stack>
    </Box>
  )
}

const columns = (canEdit, lista) => [
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
    editable: canEdit,
    type: 'singleSelect',
    valueOptions: ['MUESTRA', 'LOTE',''],
  },
  {
    field: 'submuestra',
    headerName: 'Submuestra',
    width: 240,
    type: 'singleSelect',
    valueOptions: lista,
    editable: canEdit,
  },
  {
    field: 'loteotro',
    headerName: 'Otra Submuestra',
    width: 360,
    editable: canEdit,
  },
  {
    field: 'descripcion',
    headerName: 'Descripción/detalle',
    width: 440,
    editable: canEdit,
  },
  {
    field: 'cantidadSolicitada',
    headerName: 'Cantidad Solicitada',
    type: 'number',
    width: 140,
    editable: canEdit,
  }
]

const columns2 = () => [
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
    headerName: 'Otra Submuestra',
    width: 360,
    editable: false,
  },
  {
    field: 'descripcion',
    headerName: 'Descripción/detalle',
    width: 440,
    editable: false,
  },
  {
    field: 'cantidadSolicitada',
    headerName: 'Cantidad Solicitada',
    type: 'number',
    width: 140,
    editable: false,
  },
  {
    field: 'cantidadAutorizada',
    headerName: 'Cantidad Autorizada',
    type: 'number',
    width: 140,
    editable: true,
  },
  {
    field: 'saldoDRM',
    headerName: 'Saldo DRM',
    type: 'number',
    width: 140,
    editable: false,
  },
  {
    field: 'saldorATM',
    headerName: 'Saldo ATM',
    type: 'number',
    width: 140,
    editable: false,
  }
]

const columns3 = () => [
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
    headerName: 'Otra Submuestra',
    width: 360,
    editable: false,
  },
  {
    field: 'descripcion',
    headerName: 'Descripción/detalle',
    width: 440,
    editable: false,
  },
  {
    field: 'cantidadAutorizada',
    headerName: 'Cantidad Autorizada',
    type: 'number',
    width: 140,
    editable: false,
  },
  {
    field: 'saldorATM',
    headerName: 'Saldo ATM',
    type: 'number',
    width: 140,
    editable: false,
  },
  {
    field: 'cantidadSolicitada',
    headerName: 'Cantidad Solicitada',
    type: 'number',
    width: 140,
    editable: true,
  },
  {
    field: 'saldoExportaciones',
    type: 'number',
    hide: true,
  },
  {
    field: 'saldoHolotipos',
    type: 'number',
    hide: true,
  },
]

const columnsDRM = () => [
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
    headerName: 'Otra Submuestra',
    width: 360,
    editable: false,
  },
  {
    field: 'descripcion',
    headerName: 'Descripción/detalle',
    width: 440,
    editable: false,
  },
  {
    field: 'cantidadAutorizada',
    headerName: 'Cantidad Autorizada',
    type: 'number',
    width: 140,
    editable: false,
  },
  {
    field: 'cantidadSolicitada',
    headerName: 'Cantidad Solicitada',
    type: 'number',
    width: 140,
    editable: true,
  },
  {
    field: 'saldoDRM',
    headerName: 'Saldo DRM',
    type: 'number',
    width: 140,
    editable: false,
  },
  {
    field: 'saldorATM',
    headerName: 'Saldo ATM',
    type: 'number',
    width: 140,
    hide: true,
  }
]

const columnsPermisoExportacion = () => [
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
    headerName: 'Otra Submuestra',
    width: 360,
    editable: false,
  },
  {
    field: 'descripcion',
    headerName: 'Descripción/detalle',
    width: 440,
    editable: false,
  },
  {
    field: 'cantidadAutorizada',
    headerName: 'Cantidad Autorizada',
    type: 'number',
    width: 140,
    editable: false,
  },
  {
    field: 'cantidadSolicitada',
    headerName: 'Cantidad Solicitada',
    type: 'number',
    width: 140,
    editable: true,
  },
  // {
  //   field: 'saldorATM',
  //   headerName: 'Saldo ATM',
  //   type: 'number',
  //   width: 140,
  //   hide: true,
  // },
  // {
  //   field: 'saldoDRM',
  //   headerName: 'Saldo DMR',
  //   type: 'number',
  //   width: 140,
  //   editable: false,
  // },
]

const columnsPermiso = () => [
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
    headerName: 'Otra Submuestra',
    width: 360,
    editable: false,
  },
  {
    field: 'descripcion',
    headerName: 'Descripción/detalle',
    width: 440,
    editable: false,
  },
  {
    field: 'cantidadSolicitada',
    headerName: 'Cantidad Solicitada',
    type: 'number',
    width: 140,
    editable: false,
  },
  {
    field: 'cantidadAutorizada',
    headerName: 'Cantidad Autorizada',
    type: 'number',
    width: 140,
    editable: false,
  },
]

const columnsMaateRO = () => [
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
    headerName: 'Otra Submuestra',
    width: 360,
    editable: false,
  },
  {
    field: 'descripcion',
    headerName: 'Descripción/detalle',
    width: 440,
    editable: false,
  },
  {
    field: 'cantidadSolicitada',
    headerName: 'Cantidad Solicitada',
    type: 'number',
    width: 140,
    editable: false,
  },
  {
    field: 'cantidadAutorizada',
    headerName: 'Cantidad Autorizada',
    type: 'number',
    width: 140,
    editable: false,
  },

  {
    field: 'saldoDRM',
    headerName: 'Saldo DMR',
    type: 'number',
    width: 140,
    editable: false,
  },
  {
    field: 'saldorATM',
    headerName: 'Saldo ATM',
    type: 'number',
    width: 140,
    editable: false,
  },
]
