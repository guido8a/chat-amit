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

export const SelectTaxonomiaR = ({showTaxonomia=false, onSelectItems, onCancel}) => {
  const [selected, setSelected] = useState([])
  const [value, setValue] = useState('')
  // const [kingdom, setKingdom] = useState('Animal')
  const [taxonrank, setTaxonrank] = useState('Phyllum')
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
            <FormControl fullWidth>
              <InputLabel variant={'standard'} id={'label-kingdom'}>
                Taxon rank
              </InputLabel>
              <Select id={'select-kingdom'}
                      labelId={'label-kingdom'}
                      value={taxonrank}
                      fullWidth
                      variant={'standard'}
                      onChange={(e)=>setTaxonrank(e.target.value)}>
                <MenuItem value={'Phyllum'}>Phyllum</MenuItem>
                <MenuItem value={'Clase'}>Clase</MenuItem>
                <MenuItem value={'Orden'}>Orden</MenuItem>
                <MenuItem value={'Familia'}>Familia</MenuItem>
                <MenuItem value={'Genero'}>Género</MenuItem>
                <MenuItem value={'Especie'}>Especie</MenuItem>
                {/*<MenuItem value={'Subespecie'}>Subespecie</MenuItem>*/}
                {/*<MenuItem value={'Variedad'}>Variedad</MenuItem>*/}
                {/*<MenuItem value={'Nothoespecie'}>Nothoespecie</MenuItem>*/}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3} >
            <Box sx={{pt:'1rem'}}>
              <MyButtonBacan label={'Buscar'}
                             disabled={value.length < 3}
                             icon={SearchIcon}
                             onClick={() =>{
                               setSelected([])
                               setEspecies([])
                               if(['Especie', 'Subespecie'].includes(taxonrank) === false) {
                                 Promise.all([
                                   API.fetchTaxonomia(value,'Animal',taxonrank),
                                   API.fetchTaxonomia(value,'Archaea',taxonrank),
                                   API.fetchTaxonomia(value,'Bacteria',taxonrank),
                                   API.fetchTaxonomia(value,'Chromista',taxonrank),
                                   API.fetchTaxonomia(value,'Fungi',taxonrank),
                                   API.fetchTaxonomia(value,'Plantae',taxonrank),
                                   API.fetchTaxonomia(value,'Protozoa',taxonrank),
                                   API.fetchTaxonomia(value,'Viruses',taxonrank)
                                 ]).then(([Animal, Animalia, Archaea, Bacteria, Chromista, Fungi, Plantae, Protozoa, Viruses,]) => {
                                   const rslts = {Animal, Animalia, Archaea, Bacteria, Chromista, Fungi, Plantae, Protozoa, Viruses}
                                   const kingdoms = ['Animal', 'Animalia', 'Archaea', 'Bacteria', 'Chromista', 'Fungi', 'Plantae', 'Protozoa', 'Viruses']
                                   let esp = []
                                   kingdoms.forEach(kingdom => {
                                     if(rslts[kingdom]?.length > 0) {
                                       rslts[kingdom].forEach(it => {
                                         API.fetchEspecies({
                                           scientificname:it.scientificname,
                                           kingdom,
                                           taxonRankBusqueda:taxonrank
                                         }).then(r => {
                                           esp = [...esp, ...r]
                                           console.log('. . . . esp: ', esp)
                                           setEspecies(esp)
                                         })
                                       })
                                     }
                                   })
                                 })
                               } else {
                                 Promise.all([
                                   API.fetchTaxonomia(value,'Animal',taxonrank),
                                   API.fetchTaxonomia(value,'Archaea',taxonrank),
                                   API.fetchTaxonomia(value,'Bacteria',taxonrank),
                                   API.fetchTaxonomia(value,'Chromista',taxonrank),
                                   API.fetchTaxonomia(value,'Fungi',taxonrank),
                                   API.fetchTaxonomia(value,'Plantae',taxonrank),
                                   API.fetchTaxonomia(value,'Protozoa',taxonrank),
                                   API.fetchTaxonomia(value,'Viruses',taxonrank)
                                 ]).then(([Animal, Animalia, Archaea, Bacteria, Chromista, Fungi, Plantae, Protozoa, Viruses,]) => {
                                   const rslts = {Animal, Animalia, Archaea, Bacteria, Chromista, Fungi, Plantae, Protozoa, Viruses}
                                   const kingdoms = ['Animal', 'Animalia', 'Archaea', 'Bacteria', 'Chromista', 'Fungi', 'Plantae', 'Protozoa', 'Viruses']
                                   let esp = []
                                   kingdoms.forEach(kingdom => {
                                     if(rslts[kingdom]?.length > 0) {
                                       setEspecies(rslts[kingdom].sort((a,b)=>(a.scientificname > b.scientificname)?1:-1))
                                     }
                                   })
                                 })
                               }
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
