import React, {useState} from 'react'
import {
  Box,
  Button,
  Grid,
  Modal,
  Select,
  Stack,
  TextField,
  MenuItem,
  Typography
} from '@mui/material'
import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop';
import {common, dialog, modal} from 'src/styles/styles'
import GLOBALS from 'src/features/App/globals'

export const SelectTaxonomia0 = ({showTaxonomia=false, onSelectCosa, onCancel}) => {
  const [selected, setSelected] = useState(null)

  const [value, setValue] = useState('')
  const [kingdomValue, setKingdomValue] = useState(ranks['Kingdom'].option)
  const kingdomOptions = ranks['Kingdom'].options

  const [phillumOptions, setPhillumOptions] = useState([])
  const [phillumOption, setPhillumOption] = useState('')

  const [clasOptions, setClasOptions] = useState([])
  const [clasOption, setClasOption] = useState('')

  const [ordenOptions, setOrdenOptions] = useState([])
  const [ordenOption, setOrdenOption] = useState('')

  const [familiaOptions, setFamiliaOptions] = useState([])
  const [familiaOption, setFamiliaOption] = useState('')

  const [genusOptions, setGenusOptions] = useState([])
  const [genusOption, setGenusOption] = useState('')

  const [especieOptions, setEspecieOptions] = useState([])
  const [especieOption, setEspecieOption] = useState('')

  // const [taxonRank, setTaxonRank] = useState('Kingdom')
  return (
    <Modal open={showTaxonomia}>
      <Box sx={{...modal.box, ...common.bg, p:'18px'}} >
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{p:'8px 0 16px 0'}}>
            <Typography>TAXONOMIA</Typography>
          </Grid>
          <Grid item xs={12} sx={{p:'8px 0 8px 0'}}>
            <TextField id={'buscar'}
                       label={'Buscar'}
                       value={value}
                       onChange={(e) => setValue(e.target.value)}
                       fullWidth
                       helperText={'especie a buscar'}
                       variant={'standard'}
                       sx={dialog.textTypography}
                       InputProps={{
                         disableUnderline: false,
                         form: {autocomplete: 'off'},
                         sx: {
                           fontSize: '12px',
                           backgroundColor: 'white',
                         }
                       }}
                       InputLabelProps={{sx: {fontSize: '14px',}}} />
          </Grid>
        </Grid>
        { // Kingdom
          (!!value && value !== '')?
            <Grid item xs={12}  sx={{p:'8px 0 8px 0'}} >
              <Stack direction={'row'} spacing={2}>
                <Typography sx={{fontWeight:'bolder', mt:'4px', width:'120px'}}>Kingdom:</Typography>
                <Select id={'Kingdom'}
                        fullWidth
                        variant={'standard'}
                        value={kingdomValue}
                        label="Kingdom"
                        onChange={
                          (e) => {
                            setKingdomValue(e.target.value)
                            setSelected(null)
                          }
                        }>
                  {kingdomOptions.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
                </Select>
                <Button variant="outlined"
                        endIcon={<ScreenSearchDesktopIcon />}
                        onClick={ () => {
                          const body = {
                            terminoBusqueda:   `${value}`,
                            taxonRankBusqueda: 'Kingdom',
                            kingdom:           `${kingdomValue}`
                          }
                          searchEspecie(value, 'Kingdom', body).then((result) => {
                            setPhillumOptions(result)
                            if(result.length > 0) {
                              setPhillumOption(result[0])
                              setSelected(null)
                              setClasOption('')
                              setClasOptions([])
                              setOrdenOption('')
                              setOrdenOptions([])
                              setFamiliaOption('')
                              setFamiliaOptions([])
                              setGenusOption('')
                              setGenusOptions([])
                              setEspecieOption('')
                              setEspecieOptions([])
                            }
                          })
                        }}/>
              </Stack>
            </Grid>:null
        }
        { // Phyllum
          (!!value && value !== '' && phillumOptions.length > 0)?
            <Grid item xs={12}  sx={{p:'8px 0 8px 0'}} >
              <Stack direction={'row'} spacing={2}>
                <Typography sx={{fontWeight:'bolder', mt:'4px', width:'120px'}}>Phyllum:</Typography>
                <Select id={'Phyllum'}
                        fullWidth
                        variant={'standard'}
                        value={phillumOption}
                        label="Kingdom"
                        onChange={
                          (e) => {
                            setPhillumOption(e.target.value)
                            setSelected(null)
                          }
                        }>
                  {phillumOptions.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
                </Select>
                <Button variant="outlined"
                        endIcon={<ScreenSearchDesktopIcon />}
                        onClick={ () => {
                          const body = {
                            terminoBusqueda:   `${value}`,
                            taxonRankBusqueda: 'Phyllum',
                            kingdom:           `${kingdomValue}`,
                            phylum:            `${phillumOption}`,
                          }
                          searchEspecie(value, 'Phyllum', body).then((result) => {
                            setClasOptions(result)
                            if(result.length > 0) {
                              setClasOption(result[0])
                              setSelected(result[0])
                              setOrdenOption('')
                              setOrdenOptions([])
                              setFamiliaOption('')
                              setFamiliaOptions([])
                              setGenusOption('')
                              setGenusOptions([])
                            }
                          })
                        }}/>
              </Stack>
            </Grid>:null
        }
        { // Clas
          (!!value && value !== '' && phillumOptions.length > 0 && clasOptions.length > 0)?
            <Grid item xs={12}  sx={{p:'8px 0 8px 0'}} >
              <Stack direction={'row'} spacing={2}>
                <Typography sx={{fontWeight:'bolder', mt:'4px', width:'120px'}}>Clas:</Typography>
                <Select id={'Clas'}
                        fullWidth
                        variant={'standard'}
                        value={clasOption}
                        label="Clas"
                        onChange={
                          (e) => {
                            setClasOption(e.target.value)
                            setSelected(e.target.value)
                          }
                        }>
                  {clasOptions.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
                </Select>
                <Button variant="outlined"
                        endIcon={<ScreenSearchDesktopIcon />}
                        onClick={ () => {
                          const body = {
                            terminoBusqueda:   `${value}`,
                            taxonRankBusqueda: 'Clas',
                            kingdom:           `${kingdomValue}`,
                            phylum:            `${phillumOption}`,
                            clas:              `${clasOption}`,
                          }
                          searchEspecie(value, 'Phyllum', body).then((result) => {
                            setOrdenOptions(result)
                            if(result.length > 0) {
                              setOrdenOption(result[0])
                              setSelected(result[0])
                              setFamiliaOption('')
                              setFamiliaOptions([])
                              setGenusOption('')
                              setGenusOptions([])
                            }
                          })
                        }} />
              </Stack>
            </Grid>:null
        }
        { // Orden
          (!!value && value !== '' && phillumOptions.length > 0 && clasOptions.length > 0 && ordenOptions.length > 0)?
            <Grid item xs={12}  sx={{p:'8px 0 8px 0'}} >
              <Stack direction={'row'} spacing={2}>
                <Typography sx={{fontWeight:'bolder', mt:'4px', width:'120px'}}>Orden:</Typography>
                <Select id={'Clas'}
                        fullWidth
                        variant={'standard'}
                        value={ordenOption}
                        label="Clas"
                        onChange={
                          (e) => {
                            setOrdenOption(e.target.value)
                            setSelected(e.target.value)
                          }
                        }>
                  {ordenOptions.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
                </Select>
                <Button variant="outlined"
                        endIcon={<ScreenSearchDesktopIcon />}
                        onClick={ () => {
                          const body = {
                            terminoBusqueda:   `${value}`,
                            taxonRankBusqueda: 'Orden',
                            kingdom:           `${kingdomValue}`,
                            phylum:            `${phillumOption}`,
                            clas:              `${clasOption}`,
                            orden:             `${ordenOption}`,
                          }
                          searchEspecie(value, 'Orden', body).then((result) => {
                            setFamiliaOptions(result)
                            if(result.length > 0) {
                              setFamiliaOption(result[0])
                              setSelected(result[0])
                            }
                          })
                        }}/>
              </Stack>
            </Grid>:null
        }
        { // Familia
          (!!value && value !== '' && phillumOptions.length > 0 && clasOptions.length > 0 && ordenOptions.length > 0 && familiaOptions.length > 0)?
            <Grid item xs={12}  sx={{p:'8px 0 8px 0'}} >
              <Stack direction={'row'} spacing={2}>
                <Typography sx={{fontWeight:'bolder', mt:'4px', width:'120px'}}>Familia:</Typography>
                <Select id={'Familia'}
                        fullWidth
                        variant={'standard'}
                        value={familiaOption}
                        label="Clas"
                        onChange={
                          (e) => {
                            setFamiliaOption(e.target.value)
                            setSelected(e.target.value)
                          }
                        }>
                  {familiaOptions.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
                </Select>
                <Button variant="outlined"
                        endIcon={<ScreenSearchDesktopIcon />}
                        onClick={ () => {
                          const body = {
                            terminoBusqueda:   `${value}`,
                            taxonRankBusqueda: 'Familia',
                            kingdom:           `${kingdomValue}`,
                            phylum:            `${phillumOption}`,
                            clas:              `${clasOption}`,
                            orden:             `${ordenOption}`,
                            family:            `${familiaOption}`,
                          }
                          searchEspecie(value, 'Familia', body).then((result) => {
                            setGenusOptions(result)
                            if(result.length > 0) {
                              setGenusOption(result[0])
                              setSelected(result[0])
                            }
                          })
                        }}/>
              </Stack>
            </Grid>:null
        }
        { // Genus
          (!!value && value !== '' && phillumOptions.length > 0 && clasOptions.length > 0 && ordenOptions.length > 0 && familiaOptions.length > 0 && genusOptions.length > 0)?
            <Grid item xs={12}  sx={{p:'8px 0 8px 0'}} >
              <Stack direction={'row'} spacing={2}>
                <Typography sx={{fontWeight:'bolder', mt:'4px', width:'120px'}}>Genus:</Typography>
                <Select id={'Familia'}
                        fullWidth
                        variant={'standard'}
                        value={genusOption}
                        label="Clas"
                        onChange={
                          (e) => {
                            setGenusOption(e.target.value)
                            setSelected(e.target.value)
                          }
                        }>
                  {genusOptions.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
                </Select>
                <Button variant="outlined"
                        endIcon={<ScreenSearchDesktopIcon />}
                        onClick={ () => {
                          const body = {
                            terminoBusqueda:   `${value}`,
                            taxonRankBusqueda: 'Genus',
                            kingdom:           `${kingdomValue}`,
                            phylum:            `${phillumOption}`,
                            clas:              `${clasOption}`,
                            orden:             `${ordenOption}`,
                            family:            `${familiaOption}`,
                            genus:             `${genusOption}`,
                          }
                          searchEspecie(value, 'Genus', body).then((result) => {
                            setEspecieOptions(result?.map(it => it.scientificname))
                            if(result.length > 0) {
                              setEspecieOption(result[0].scientificname)
                              setSelected(result[0].scientificname)
                            }
                          })
                        }}/>
              </Stack>
            </Grid>:null
        }
        { // Especies
          (!!value && value !== '' && especieOptions.length > 0)?
            <Stack direction={'row'} spacing={2}>
              <Typography sx={{fontWeight:'bolder', mt:'4px', width:'120px'}}>Especies:</Typography>
              <Select id={'Familia'}
                      fullWidth
                      variant={'standard'}
                      value={especieOption}
                      label="Clas"
                      onChange={
                        (e) => {
                          setEspecieOption(e.target.value)
                          setSelected(e.target.value)
                        }
                      }>
                {especieOptions.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
              </Select>

            </Stack>
            :null
        }
          <Grid container spacing={2} sx={{p:'24px 0 0 0'}}>
            <Grid item xs={6} alignItems="center" justifyContent="center">
              <Button variant="contained"
                      style={{
                        height:'32px',
                        width: '120px',
                        borderRadius: 12,
                        backgroundColor: 'blue',
                        padding: "2px 8px",
                        fontSize: "10px",
                      }}
                      onClick={onCancel}>
                Regresar
              </Button>
            </Grid>
            <Grid item xs={6} alignItems="center" justifyContent="center">
              <Button disabled={selected===null}
                      variant="contained"
                      style={{
                        height:'32px',
                        width: '120px',
                        borderRadius: 12,
                        backgroundColor: 'darkgreen',
                        padding: "2px 8px",
                        fontSize: "10px",
                      }}
                      onClick={()=> {
                        onSelectCosa(selected)
                      }}>
                Seleccionar
              </Button>
            </Grid>
          </Grid>
      </Box>
    </Modal>
  )
}

const searchEspecie = async(value, taxonRank, body) => {
  const url    = `${GLOBALS.mainUrl}/v1/api/${ranks[taxonRank].method}`
  // console.log(url)
  const res    = await fetch(url,{
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body:JSON.stringify(body)
  })
  return res.json()
}

const ranks = {
  'Kingdom': {
    taxonRank: 'Kingdom',
    options:   ['Animal','Animalia','Archaea','Bacteria','Chromista','Fungi','Plantae','Protozoa','Viruses'],
    field:     'kingdom',
    option:    'Animal',
    method:    'taxonomia/get'
  },
  'Phyllum': {
    taxonRank: 'Phyllum',
    options: [],
    field:'phylum',
    option: null,
    method: 'taxonomia/get'
  },
  'Clas':    {
    taxonRank: 'Clas',
    options: [],
    field:'clas',
    option: null,
    method: 'taxonomia/get'
  },
  'Orden':   {
    taxonRank: 'Orden',
    options: [],
    field:'orden',
    option: null,
    method: 'taxonomia/get'
  },
  'Familia': {
    taxonRank: 'Familia',
    options: [],
    field:'family',
    option: null,
    method: 'taxonomia/get'
  },
  'Genus':   {
    taxonRank: 'Genus',
    options: [],
    field:'genus',
    option: null,
    method: 'taxonomia/getespecies'},
}
