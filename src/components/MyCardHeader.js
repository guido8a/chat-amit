import React from 'react'
import {CardHeader, Stack, Typography} from "@mui/material";
import {CardMenu} from "../features/App/subcomponents/CardMenu";
import RobotoCondensedRegular from "../styles/MyFonts/Roboto_Condensed/RobotoCondensed-Regular.ttf";
import {SatateIndicator} from "./SatateIndicator";

const options = [
  'None',
  'Atria',
  'Callisto',
  'Dione',
];

export const MyCardHeader = ({ bgColor='red', color='white', cardTitle='. . . card title', menu=options, state= {state:'editable', tip:'Editable'} }) => {
  return (
    <CardHeader sx={{backgroundColor:bgColor, color, p:'0.5rem', height:'2.4rem'}}
                title={
                  <Stack direction={'row'} justifyContent='space-between' alignItems='center' sx={{p:'0 0.4rem 0 0.4rem'}}>
                    <Stack direction={'row'} justifyContent='start' alignItems='center' sx={{p:'0 0.4rem 0 0.4rem'}}>
                      <CardMenu menu={menu} />
                      <Typography sx={{m:'0.2rem 0 0.2rem 0.3rem', fontSize: '0.8rem', fontFamily: RobotoCondensedRegular}}>
                        {cardTitle}
                      </Typography>
                    </Stack>
                    <SatateIndicator state={state.state} tip={state.tip}/>
                  </Stack>
                } />
  )
}
