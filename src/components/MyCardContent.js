import React from 'react';
import {CardContent, Stack, Typography} from "@mui/material";
import RobotoCondensedRegular from "../styles/MyFonts/Roboto_Condensed/RobotoCondensed-Regular.ttf";
import Box from "@mui/material/Box";

export const MyCardContent = ({h1, h2, content}) =>
  <CardContent>
    <Stack direction={'row'} justifyContent='space-between'  alignItems='center'>
      <Typography sx={{fontSize:'0.8rem', fontWeight:'bolder', fontFamily: RobotoCondensedRegular}}>
        {h1}
      </Typography>
      <Typography sx={{fontSize:'0.8rem', fontWeight:'bolder', fontFamily: RobotoCondensedRegular}}>
        {h2}
      </Typography>
    </Stack>
    <Box sx={{height:'6rem'}}>
      <Typography sx={{m:'0.4rem 0 0.4rem 0', fontSize: '0.8rem', fontFamily: RobotoCondensedRegular}}>
        {`${(content?.length > 290)?(content.slice(0, 290) + ' . . .'):content??''}`}
      </Typography>
    </Box>
  </CardContent>
