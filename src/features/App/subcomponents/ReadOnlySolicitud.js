import React from 'react'
import {useSelector} from 'react-redux'
import {Solicitante} from "../../P01Solicitud/subcomponents/Solicitante";
import Proyecto from "../../P01Solicitud/subcomponents/Propuesta";
import Personal from "../../P01Solicitud/subcomponents/Personal";
import AllRecursos from "../../P01Solicitud/subcomponents/AllRecursos";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const ReadOnlySolicitud = () => {
  const instanciaProceso = useSelector(state => state.app.instanciaProceso)
  const solicitud = instanciaProceso.solicitud

  return (
    <>
      <Accordion disableGutters
                 elevation={0}
                 sx={{backgroundColor:'#F4FFF4'}}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-solicitante"
                          id="panel1a-solicitante-header">
          <Typography>Solicitante</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Solicitante solicitud={solicitud} />
        </AccordionDetails>
      </Accordion>

      <Accordion disableGutters
                 elevation={0}
                 sx={{backgroundColor:'#F4FFF4'}}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-solicitud"
                          id="panel1a-solicitud-header">
          <Typography>Contexto y Alcance de la Investigación</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Proyecto solicitud={solicitud} />
        </AccordionDetails>
      </Accordion>

      <Accordion disableGutters
                 elevation={0}
                 sx={{backgroundColor:'#F4FFF4'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-recursos"
          id="panel1a-recursos-header"
        >
          <Typography>Recursos</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AllRecursos solicitud={solicitud} />
        </AccordionDetails>
      </Accordion>

      <Accordion disableGutters
                 elevation={0}
                 sx={{backgroundColor:'#F4FFF4'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-personal"
          id="panel1a-personal-header"
        >
          <Typography>Personal</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Personal solicitud={solicitud} />
        </AccordionDetails>
      </Accordion>
    </>
  )
}
