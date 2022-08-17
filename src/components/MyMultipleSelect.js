import React from 'react'
// import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import {Checkbox} from "@mui/material"
import RobotoCondensedRegular from 'src/styles/MyFonts/Roboto_Condensed/RobotoCondensed-Regular.ttf'


export const MyMultipleSelect = ({id, label, data, setFormValues, formValues, canEdit, handleChange}) => {
  return (
    <FormControl id={`${id}-fc`} sx={{m:'1.2rem 0 1.2rem 0',backgrounColor:'blue', width: '98%' }}>
      <InputLabel shrink id={`${id}-label`}>{label}</InputLabel>
      <Select id={`${id}-name`}
              sx={{width:'100%', fontSize:'1rem', fontFamily:RobotoCondensedRegular}}
              multiple
              fullWidth
              value={formValues[id]}
              renderValue={selected => {
                return selected.map((x) => <span key={Math.random()} style={{
                  margin: '0.1rem',
                  padding: '0.2rem 0.4rem',
                  backgroundColor: '#DDDDDD',
                  borderRadius: 4,
                }}>{x}</span>)
              }}
              variant="standard">
        {canEdit?
          <MenuItem key={'idx-todos'}
                    value={'TODOS'}
                    sx={{fontFamily:RobotoCondensedRegular, fontSize:'0.9rem', m:0, p:'0 0 0 1rem'}}
                    onClick={()=> {
                      if(canEdit) {
                        setFormValues({...formValues, [id]:data.filter(it => it !== '')})
                      }
                    }}>
            [SELECCIONAR TODOS]
          </MenuItem>:null
        }
        {canEdit?data.map((item, idx) => (
          <MenuItem key={idx}
                    value={item}
                    sx={{fontFamily:RobotoCondensedRegular, fontSize:'0.9rem', p:0, m:0}}
                    onClick={(e)=> {
                      if(canEdit && e.currentTarget.innerText !== '') {
                        const value = e.currentTarget.innerText
                        const index = formValues[id].findIndex(it => it === value)
                        if(index >= 0) {
                          setFormValues({...formValues, [id]:formValues[id].filter((it, idx) => idx !== index)})
                        } else {
                          const newArray = [...formValues[id]]
                          newArray.unshift(value)
                          setFormValues({...formValues, [id]:newArray})
                        }
                      }
                    }}>
            {(item !== '')?
              <Checkbox style ={{color: "#444444",}}
                        checked={ formValues[id].findIndex((item2) => item2 === item) >= 0} />
              :null
            }
            {item}
          </MenuItem>

        )):null}
        {canEdit?
          <MenuItem key={'idx-ninguno'}
                    value={'NINGUNO'}
                    sx={{fontFamily:RobotoCondensedRegular, fontSize:'0.9rem', m:0, p:'0 0 0 1rem'}}
                    onClick={()=> {
                      if(canEdit) {
                        setFormValues({...formValues, [id]:[]})
                      }
                    }}>
            [LIMPIAR SELECCION]
          </MenuItem>:null
        }
      </Select>
    </FormControl>
  )
}
