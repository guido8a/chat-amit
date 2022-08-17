import {Box, CssBaseline, Grid} from "@mui/material";
import {accordeonBox} from "../../styles/styles";
import AppBar from "@mui/material/AppBar";
import {SectionTitle} from "../../components/SectionTitle";
import API from "./API";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import Toolbar from "@mui/material/Toolbar";
import {MyButtonBacan} from "../../components/MyButtonBacan";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {handleClear} from "../App/sliceApp";
import React from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";


export const P0102PayloadRO = ({payload}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [expanded, setExpanded] = React.useState(false)
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }
  // console.log('.....PAYLOAD RO ::', payload)
  return (
    <>
      <Box sx={{...accordeonBox.container, pt:'2rem', height: '100%', backgroundImage: 'url(src/style/MySvgIcons)'}}>
        <AppBar position='fixed'
                color='primary'
                elevation={0}
                sx={{top:'64px', bottom:'auto', margin: 0, padding:0, backgroundColor:'rgba(148, 193, 32, 0.8)'}} >
          <SectionTitle title={API.processTitle} />
        </AppBar>
        {
          API.sectionsRO.map((section, idx) => (
            <Accordion disableGutters
                       elevation={0}
                       key={`panel${idx+1}`}
                       expanded={expanded === `panel${idx+1}`}
                       onChange={handleChange(`panel${idx+1}`)}
                       sx={{backgroundColor:'#F4FFF4'}}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}
                                aria-controls={`panel${idx + 1}bh-content`}
                                id={`panel${idx + 1}bh-header`}
                                sx={accordeonBox.titleBox2}>
                <Typography sx={accordeonBox.titleTypography2}>
                  {section.sectionTitle}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{pl:'52px'}}>{section.f(payload)}</AccordionDetails>
            </Accordion>
          ))
        }
        <CssBaseline />
        <AppBar position='fixed'
                color='primary'
                elevation={0}
                sx={accordeonBox.bottomBar} >
          <Toolbar>
            <Grid container sx={{p:0, mt:'-1rem'}}>
              <MyButtonBacan label={'Regresar'}
                             myTip={'Regresa a la lista de tareas'}
                             icon={ArrowBackIcon}
                             onClick={() => {
                               dispatch(handleClear())
                               setTimeout(() => navigate('/'), 500)
                             }} />
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}
