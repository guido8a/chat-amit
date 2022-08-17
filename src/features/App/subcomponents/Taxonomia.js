import React, {useState} from 'react'
import {
  Box,
  Grid,
  Modal,
  Select,
  Stack,
  TextField,
  MenuItem,
  Typography, InputLabel
} from '@mui/material'
import {common, dialog, modal} from 'src/styles/styles'
import FormControl from '@mui/material/FormControl'
import {MyButtonBacan} from 'src/components/MyButtonBacan'
import {f} from 'src/commons/f'
import SearchIcon from '@mui/icons-material/Search'
import API from 'src/features/App/API'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Checkbox from '@mui/material/Checkbox'

export const SelectTaxonomia = ({showTaxonomia=false, onSelectItems, onCancel}) => {
  const [selected, setSelected] = useState([])
  const [value, setValue] = useState('')
  const [kingdom, setKingdom] = useState('Animal')
  const [especies, setEspecies] = useState([])
  return (
    <Modal open={showTaxonomia}>
      <Box sx={{...modal.box, width: '70%', ...common.bg, p:'18px'}} >
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{p:'8px 0 16px 0'}}>
            <Typography>TAXONOMIA</Typography>
          </Grid>
          <Grid item xs={6} >
            <TextField id={'buscar'}
                       label={'Especie a buscar'}
                       value={value}
                       onChange={(e) => setValue(e.target.value)}
                       fullWidth
                       helperText={'al menos tres caracteres'}
                       variant={'standard'}
                       sx={{...dialog.textTypography, mt:'7px'}}
                       InputProps={{
                         disableUnderline: false,
                         form: {autocomplete: 'off'},
                         sx: {
                           fontSize: '12px',
                           backgroundColor: 'white',
                         }
                       }}
                       InputLabelProps={{
                         sx: {fontSize: '14px',},
                         shrink: true
                       }} />
          </Grid>
          <Grid item xs={3} >
            {f.isValid(kingdom)?
              <FormControl fullWidth>
                <InputLabel variant={'standard'} id={'label-kingdom'}>
                  Reino
                </InputLabel>
                <Select id={'select-kingdom'}
                        labelId={'label-kingdom'}
                        value={kingdom}
                        fullWidth
                        variant={'standard'}
                        onChange={(e)=>setKingdom(e.target.value)}>
                  <MenuItem value={'Animal'}>Animal</MenuItem>
                  <MenuItem value={'Animalia'}>Animalia</MenuItem>
                  <MenuItem value={'Archaea'}>Archaea</MenuItem>
                  <MenuItem value={'Bacteria'}>Bacteria</MenuItem>
                  <MenuItem value={'Chromista'}>Chromista</MenuItem>
                  <MenuItem value={'Fungi'}>Fungi</MenuItem>
                  <MenuItem value={'Plantae'}>Plantae</MenuItem>
                  <MenuItem value={'Protozoa'}>Protozoa</MenuItem>
                  <MenuItem value={'Viruses'}>Viruses</MenuItem>
                </Select>
              </FormControl>:null
            }
          </Grid>
          <Grid item xs={3} >
            <Box sx={{pt:'1rem'}}>
              <MyButtonBacan label={'Buscar'}
                             disabled={value.length < 3}
                             icon={SearchIcon}
                             onClick={() =>{
                               setSelected([])
                               Promise.all([
                                 API.fetchTaxonomia(value,kingdom,'Phyllum'),
                                 API.fetchTaxonomia(value,kingdom,'Clase'),
                                 API.fetchTaxonomia(value,kingdom,'Orden'),
                                 API.fetchTaxonomia(value,kingdom,'Familia'),
                                 API.fetchTaxonomia(value,kingdom,'Genero'),
                               ]).then(([Phyllum, Clase, Orden, Familia, Genero]) => {
                                 const filter = {Phyllum, Clase, Orden, Familia, Genero}
                                 let esp = []
                                 const ranks = Object.keys(filter)
                                 ranks.forEach((rank) => {
                                   if(filter[rank].length > 0) {
                                     filter[rank].forEach(it => {
                                       API.fetchEspecies({
                                         scientificname:it.scientificname,
                                         kingdom,
                                         taxonRankBusqueda:rank}).then(result => {
                                           esp = [...esp, ...result]
                                           setEspecies(esp)
                                         })
                                     })
                                   }
                                 })
                               })
                             }} />
            </Box>
          </Grid>
          <Grid item xs={12} >
            <Typography>
              {`Resultado: ${especies.length} especies, ${selected.length} seleccionadas`}
            </Typography>
          </Grid>
          <Grid item xs={12} >
            <List sx={{ width: '100%', height:'16rem', bgcolor: 'background.paper',overflow: 'auto' }}>
              {especies.map((esp, i) => {
                return (
                  <ListItem key={i}>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={selected.indexOf(esp.taxonid) > -1}
                        onClick={() => {
                          const idx=selected.indexOf(esp.taxonid)
                          if(idx >= 0) {
                            setSelected([...selected.filter(it => it !== esp.taxonid)])
                          } else {
                            setSelected([...selected, esp.taxonid])
                          }
                        }}
                        tabIndex={-1}
                        inputProps={{ 'aria-labelledby': i }}
                      />
                    </ListItemIcon>
                    {esp.scientificname}
                  </ListItem>
                )
              })}
            </List>
          </Grid>
          <Grid item xs={12} >
            <Stack direction={'row'} justifyContent='space-between' alignItems='center'>
              <MyButtonBacan label={'regresar'} onClick={onCancel}/>
              <MyButtonBacan label={'seleccionados'}
                             disabled={selected.length===0}
                             onClick={() => {
                               const items = especies.filter(it => selected.indexOf(it.taxonid) >= 0)
                               onSelectItems(items)
                             }}/>
              <MyButtonBacan label={'todos'}
                             disabled={especies.length===0}
                             onClick={()=>{
                               onSelectItems(especies)
                             }}/>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}
