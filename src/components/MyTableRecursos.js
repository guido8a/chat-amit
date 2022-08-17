import React, {useState, useRef} from 'react'
import { DataGrid } from '@mui/x-data-grid'
import {Box, InputLabel, Select, Stack} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import YardIcon from '@mui/icons-material/Yard'
import {SelectTaxonomiaR1} from 'src/features/App/subcomponents/TaxonomiaR1'
import {SelectTaxonomiaR2} from 'src/features/App/subcomponents/TaxonomiaR2'
import RobotoCondensedRegular from "../styles/MyFonts/Roboto_Condensed/RobotoCondensed-Regular.ttf";
import {MyButtonBacan2} from "./MyButtonBacan2";
import {f} from "../commons";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
// import Button from "@mui/material/Button";
// import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
// import GLOBALS from "../features/App/globals";

export const MyTableRecursos = ({
                                  id,
                                  formValues,
                                  setFormValues,
                                  canEdit=false,
                                  addItems=null,
                                  addItems2=null,
                                  setRecursoSelected=null,
                                  muestras,
                                  mode='in-situ'
                               })  => {


  const muestrasSet = [...(new Set(muestras.map(it => it.dato).sort((t1, t2) => (t1 > t2)?+1:-1)))]

  const columns = {
    'in-situ' : columnsInSitu,
    'ex-situ' : columnsExSitu,
  }[mode] ?? columnsInSitu

  const rows = formValues[id]
  const [selectionModel, setSelectionModel] = useState([])
  const [showTaxonomia, setShowTaxonomia] = useState(false)

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

  let taxonid = null
  let muestraslength = 0
  if(selectionModel.length > 0) {
    taxonid = selectionModel[0]
    muestraslength = muestras?.filter(it => it.taxonid === taxonid)?.length
  }

  const inputRef = useRef()
  const INPUT_ID = `FILE-INPUT-${f.isValid(selectionModel[0])?selectionModel[0]:''}`

  const [agregar, setAgregar] = React.useState('orden');

  const handleChange = (e) => { setAgregar(e.target.value) }

  return (
    <Box sx={{ pb: '24px', width: '100%',}}>
      <Stack direction="column" spacing={1}>
        {canEdit &&
          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <Stack direction="row"
                   justifyContent={'right'}
                   spacing={3}>
              {/*{*/}
              {/*  (mode === 'ex-situ')?*/}
              {/*    <Button variant="outlined"*/}
              {/*            startIcon={<AddAPhotoIcon />}*/}
              {/*            sx={{*/}
              {/*              borderRadius: 2,*/}
              {/*              fontSize: '0.8rem',*/}
              {/*              fontfamily: RobotoCondensedRegular,*/}
              {/*              fontWeight: 'normal',*/}
              {/*              width: '11rem',*/}
              {/*              height: '1.7rem',*/}
              {/*            }}*/}
              {/*            component='label'*/}
              {/*            size={'small'}>*/}
              {/*      SUBIR PASAPORTE*/}
              {/*      <input id={INPUT_ID}*/}
              {/*             ref={inputRef}*/}
              {/*             accept="application/pdf,application/jpg,application/png"*/}
              {/*             onChange={() => {*/}
              {/*               const formData = new FormData()*/}
              {/*               formData.append('idSolicitud', idSolicitud)*/}
              {/*               formData.append('subFolder', selectionModel[0])*/}
              {/*               formData.append('archivo', inputRef.current.files[0])*/}
              {/*               const requestOptions = {*/}
              {/*                 method: 'POST',*/}
              {/*                 body: formData,*/}
              {/*                 redirect: 'follow'*/}
              {/*               }*/}
              {/*               fetch(`${GLOBALS.mainUrl}/documentos/cargar`, requestOptions)*/}
              {/*                 .then(response => response.text())*/}
              {/*                 .then(result => {*/}
              {/*                   const rslt = JSON.parse(result)*/}
              {/*                   const rutaDocumento = rslt['rutaDocumento']*/}
              {/*                   const splits = rutaDocumento.split('/')*/}
              {/*                   const pasaporte = splits.length > 1 ? splits[splits.length - 1]:rslt*/}
              {/*                   const mselected = {...selected, pasaporte}*/}
              {/*                   processRowUpdate(mselected)*/}
              {/*                 })*/}
              {/*                 .catch(error => console.log('error: ', error))*/}
              {/*             }}*/}
              {/*             hidden*/}
              {/*             type='file' />*/}
              {/*    </Button>: null*/}
              {/*}*/}

              <FormControl sx={{width:'11rem'}}>
                <InputLabel id="agregar-label">Taxonomía</InputLabel>
                <Select labelId="agregar-label"
                        id="agregar-select"
                        value={agregar}
                        label="Taxonomía"
                        onChange={handleChange}>
                  <MenuItem value={'rank'}>Por taxon rank</MenuItem>
                  <MenuItem value={'orden'}>Por orden</MenuItem>
                </Select>
              </FormControl>
              <Box sx={{pt:'0.9rem'}}>
                <MyButtonBacan2 icon={YardIcon}
                                label={'agregar especies'}
                                onClick={()=>setShowTaxonomia(true)} />
              </Box>
            </Stack>
            {
              selectionModel.length > 0 &&
              <Box sx={{pt:'0.9rem'}}>
                <MyButtonBacan2 onClick={() => {
                                  if(muestraslength > 0) {
                                    alert('NO SE PUIEDEN BORRAR ESPECIES MIENTRAS TENGAN MUESTRAS Y SUBMUESTRAS DEPENDIENTES')
                                  } else {
                                    const selectedIDs = new Set(selectionModel)
                                    const nRows = [...rows].filter(it => !selectedIDs.has(it.id))
                                    setFormValues({...formValues, [id]:[...nRows]})
                                  }
                                }}
                                color0={'darkred'}
                                icon={DeleteIcon}
                                label={'Eliminar'} />
              </Box>
            }
          </Stack>
        }
        <DataGrid experimentalFeatures={{ newEditingApi: true }}
                  disableSelectionOnClick={false}
                  rows={rows}
                  columns={columns(canEdit, muestrasSet)}
                  processRowUpdate={processRowUpdate}
                  autoHeight={true}
                  rowHeight={32}
                  pageSize={8}
                  selectionModel={selectionModel}
                  rowsPerPageOptions={[8]}
                  onSelectionModelChange={(selection) => {
                    const selectionSet = new Set(selectionModel);
                    const result = selection.filter((s) => !selectionSet.has(s))
                    setSelectionModel(result)
                    if(result.length > 0)
                      setRecursoSelected(rows.filter(it => it.id === result[0])[0])
                    else
                      setRecursoSelected({})
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
      </Stack>
      {(showTaxonomia && agregar==='rank') && <SelectTaxonomiaR1 showTaxonomia={showTaxonomia}
                                                                 onCancel={()=>setShowTaxonomia(false)}
                                                                 onSelectItems={(items)=> {
                                                                                 addItems(items)
                                                                                 setShowTaxonomia(false)
                                                                               }}/>}
      {(showTaxonomia && agregar==='orden') && <SelectTaxonomiaR2 showTaxonomia={showTaxonomia}
                                                                  onCancel={()=>setShowTaxonomia(false)}
                                                                  onSelectItems={(items)=> {
                                                                                  addItems2(items)
                                                                                  setShowTaxonomia(false)
                                                                                }}/>}
    </Box>
  )
}

const columnsInSitu = (canEdit) => [
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
    hide: true,
  },
  {
    field: 'scientificname',
    headerName: 'Nombre Científico',
    width: 240,
    editable: false,
    valueGetter: (params) => params?.row?.scientificname,
  },
  {
    field: 'taxonomicHierarchy',
    headerName: 'Taxonomía',
    width: 500,
    editable: false
  },
  {
    field: 'cites',
    headerName: 'Cites',
    width: 100,
    editable: false,
  },
  {
    field: 'redList',
    headerName: 'Lista roja',
    width: 160,
    editable: false
  },
  {
    field: 'categoriaEspecial',
    headerName: 'Categoría Especial',
    width: 200,
    editable: false,
  },
  {
    field: 'artificialGroup',
    headerName: 'Grupo artificial',
    width: 200,
    editable: false,
  },
]

const columnsExSitu = (canEdit, muestras) => [
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
    hide: true,
  },
  {
    field: 'clasificacion',
      headerName: 'Clasificación',
    width: 120,
    editable: false,
  },
  {
    field: 'taxonrank',
    headerName: 'Rango taxonómico',
    width: 140,
    editable: false,
  },
  {
    field: 'scientificname',
    headerName: 'Nombre científico',
    width: 240,
    editable: false,
    valueGetter: (params) => params?.row?.scientificname,
  },
  {
    field: 'taxonomicHierarchy',
    headerName: 'Taxonomía',
    width: 500,
    editable: false,
    hide: true,
  },
  {
    field: 'cites',
    headerName: 'Cites',
    width: 100,
    editable: false,
  },
  {
    field: 'especimenTipo',
    headerName: 'Especimen tipo',
    width: 160,
    editable: true,
  },
  {
    field: 'tipoMuestra',
    headerName: 'Tipo de Muestra',
    width: 200,
    editable: true,
    type: 'singleSelect',
    valueOptions: muestras,
  },
  {
    field: 'cantidadSolicitada',
    headerName: 'Cantidad solicitada',
    width: 200,
    type: 'number',
    editable: true,
  },
  {
    field: 'cantidadAutorizada',
    headerName: 'Cantidad autorizada',
    width: 200,
    type: 'number',
    editable: false,
    hide:true,
  },
  {
    field: 'detalle',
    headerName: 'Detalle cantidad',
    width: 200,
    editable: true,
  },
]
