import React, {useState} from 'react'
import {accordeonBox, dialog} from "../../styles/styles";
import {Grid, InputAdornment, Stack, TextField, Typography} from "@mui/material";
import {MySubtitle} from "../../components/MySubtitle";
import {MyReadOnlyTextField} from "../../components/MyReadOnlyTextField";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import {Solicitante} from "../P01Solicitud/subcomponents/Solicitante";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RobotoCondensedRegular from "../../styles/MyFonts/Roboto_Condensed/RobotoCondensed-Regular.ttf";
import {MyReabOnlyTableRecursos} from "../../components/MyReadOnlyTableRecursos";
import {MyTableMuestras} from "../../components/MyTableMuestras";
import {MySwitch} from "../../components/MySwitch";
import {MyUpload} from "../../components/MyUpload";
import {AccountCircle} from "@mui/icons-material";

export const P10ATMRO = ({payload}) => {

  const [recursoSelected, setRecursoSelected] = useState({})

  const solicitud = payload.Solicitud

  const pageStyle = {m:'1.2rem 0 0 0 ', fontSize:'0.9rem'}

  return (
    <Grid container spacing={1} sx={{...accordeonBox.container2, m:'1rem 0 4rem 0'}}>
      <Grid item xs={12} sx={dialog.titleContainer}>
        <MySubtitle subtitle={'Declaración'} />
      </Grid>
      <Grid item xs={6} >
        <MyReadOnlyTextField label={'Identificador'}
                             icon={<BorderColorIcon fontSize={'1rem'} sx={{color:'silver', m:'0 0.8rem 0 0'}}/>}
                             value={solicitud['aprobadaIdentificador']} />
      </Grid>
      <Grid item xs={6} >
        <MyReadOnlyTextField label={'Fecha'}
                             icon={<CalendarMonthIcon fontSize={'1rem'} sx={{color:'silver', m:'0 0.8rem 0 0'}}/>}
                             value={solicitud['fecha']} />
      </Grid>

      <Solicitante solicitud={{solicitud: {payload: solicitud.solicitudAprobada}}} />

      <Grid item xs={12} sx={dialog.titleContainer}>
        <MySubtitle subtitle={'Solicitud'} />
      </Grid>
      <Grid item xs={6}>
        <MyReadOnlyTextField id={'fecha'}
                             label={'Fecha'}
                             value={solicitud.fecha}
                             icon={<CalendarMonthIcon sx={{color: 'silver'}}/>}
                             canEdit={false} />
      </Grid>
      <Grid item xs={3}>
        <Grid container>
          <Grid item xs={8}>
            <MyReadOnlyTextField id={'plazo'}
                                 label={'Plazo de ejecución'}
                                 value={solicitud.plazo}
                                 icon={<AccessTimeIcon sx={dialog.textFieldIcon}/>}/>
          </Grid>
          <Grid item xs={4} sx={{p:'1.1rem 0 0 0.3rem'}}>
            <Typography sx={{color:'#575756',fontfamily: RobotoCondensedRegular,fontSize: '0.9rem',}}>(meses)</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} >
          <MyReadOnlyTextField id={'destinoFinal'}
                               label={'destino-final'}
                               value={solicitud.destinoFinal}
                               icon={<AccessTimeIcon sx={dialog.textFieldIcon}/>}/>
      </Grid>
      <Grid item xs={12} sx={dialog.titleContainer}>
        <MySubtitle subtitle={'Recursos'}/>
      </Grid>
      <Grid item xs={12} sx={dialog.titleContainer}>
        <MyReabOnlyTableRecursos rows={solicitud.recursos}
                                 setRecursoSelected={setRecursoSelected}
                                 reduced={true}/>
      </Grid>
      <Grid item xs={12} sx={dialog.titleContainer}>
        <MySubtitle subtitle={'Muestras y submuestras'} />
      </Grid>
      <Grid item xs={12}>
        {recursoSelected.scientificname}
      </Grid>
      <MyTableMuestras id={'muestras'}
                       muestras={solicitud.muestras}
                       formValues={solicitud}
                       canEdit={false}
                       mode={'ATM'}
                       selected={recursoSelected} />

      <Grid item xs={12} sx={dialog.titleContainer}>
        <MySubtitle subtitle={'Cláusulas'} />
      </Grid>
      <Grid item xs={10} alignItems="center">
          <MySwitch id={'condicion1'}
                    label={'¿El ATM contempla una cláusula de divulgación obligatoria del país de origen, fuente o proveedor de los recursos?'}
                    formValues={solicitud}
                    canEdit={false} />
      </Grid>
      <Grid item xs={2} >
        {
          solicitud['condicion1'] &&
          <Typography sx={pageStyle}>
            {`Página No. ${solicitud.pagina1}`}
          </Typography>
        }
      </Grid>

      <Grid item xs={10} >
          <MySwitch id={'condicion2'}
                    label={'¿El ATM define una cláusula de sometimiento a la legislación ecuatoriana en materia de propiedad intelectual, incluyendo la prohibición de patentar recursos biológicos, genéticos o sus derivados de origen ecuatoriano?'}
                    formValues={solicitud}
                    canEdit={false} />
      </Grid>
      <Grid item xs={2} >
        {
          solicitud['condicion2'] &&
          <Typography sx={pageStyle}>
            {`Página No. ${solicitud.pagina2}`}
          </Typography>
        }
      </Grid>

      <Grid item xs={10} >
          <MySwitch id={'condicion3'}
                    label={'¿El ATM contine una cláusula que incluya la obligación de repatriar los recursos biológicos, genéticos o sus derivados y la información levantada a partir de estos, en caso de incumplimiento de los términos del Acuerdo.?'}
                    formValues={solicitud}
                    canEdit={false} />
      </Grid>
      <Grid item xs={2} >
        {
          solicitud['condicion3'] &&
          <Typography sx={pageStyle}>
            {`Página No. ${solicitud.pagina3}`}
          </Typography>
        }
      </Grid>

      <Grid item xs={10} >
          <MySwitch id={'condicion4'}
                    label={'¿El ATM define la obligación de reportar los resultados alcanzados?'}
                    formValues={solicitud}
                    canEdit={false} />
      </Grid>
      <Grid item xs={2} >
        {
          solicitud['condicion4'] &&
          <Typography sx={pageStyle}>
            {`Página No. ${solicitud.pagina4}`}
          </Typography>
        }
      </Grid>

      <Grid item xs={10} >
          <MySwitch id={'condicion5'}
                    label={'¿El ATM define la obligación del receptor de no transferir a terceros los recursos recibidos?'}
                    formValues={solicitud}
                    canEdit={false} />
      </Grid>
      <Grid item xs={2} >
        {
          solicitud['condicion5'] &&
          <Typography sx={pageStyle}>
            {`Página No. ${solicitud.pagina5}`}
          </Typography>
        }
      </Grid>

      <Grid item xs={10}>
          <MySwitch id={'condicion6'}
                    label={'¿El ATM define el destino final del recurso transferido una vez alcanzando el objetivo?'}
                    formValues={solicitud}
                    canEdit={false} />
      </Grid>
      <Grid item xs={2} >
        {
          solicitud['condicion6'] &&
          <Typography sx={pageStyle}>
            {`Página No. ${solicitud.pagina6}`}
          </Typography>
        }
      </Grid>

      <Grid item xs={12} sx={dialog.titleContainer}>
        <MySubtitle subtitle={'Anexos'} />
      </Grid>
      <Grid item xs={12}>
        <Stack direction={'row'} justifyContent="space-between" alignItems="center">
          <MyUpload id={'atm'}
                    dir={payload.solicitudId}
                    label={'Acuerdo de transferencia de material *'}
                    formValues={solicitud}
                    canEdit={false} />
          <MyUpload id={'atmAdicional'}
                    dir={payload.solicitudId}
                    label={'Documento adicional'}
                    formValues={solicitud}
                    canEdit={false} />
        </Stack>

        <Grid item xs={12} sx={dialog.titleContainer}>
          <MySubtitle subtitle={'Declaración de veracidad de la información'} />
        </Grid>
        <Grid item xs={12}>
          <TextField id='texto'
                     multiline
                     rows={10}
                     value={solicitud.texto}
                     fullWidth
                     variant='standard'
                     aria-readonly={true}
                     sx={dialog.textTypography}
                     InputProps={{
                       disableUnderline: true,
                       startAdornment:(
                         <InputAdornment position="start">
                           <AccountCircle sx={{fontSize: '14px', color:'silver'}}/>
                         </InputAdornment>
                       ),
                       sx: {
                         fontSize: '12px',
                         backgroundColor: 'white',
                       }
                     }}
                     InputLabelProps={{
                       sx: {
                         fontSize: '14px',
                       }
                     }}/>
        </Grid>
        <Grid item xs={10}>
          <MySwitch id={'si'}
                    label={'Aceptar y enviar'}
                    formValues={solicitud}
                    fullWidth={false}
                    canEdit={false} />
        </Grid>
      </Grid>
    </Grid>
  )
}