import Solicitante from 'src/features/P01Solicitud/subcomponents/P01Solicitud01Solicitante'
import {SolicitanteRO} from 'src/features/P01Solicitud/subcomponents/P0102Solicitud01SolicitanteRO'
import {PropuestaRO} from 'src/features/P01Solicitud/subcomponents/P0102Solicitud01PropuestaRO'
import {RecursosRO} from 'src/features/P01Solicitud/subcomponents/P0102Solicitud01RecursosRO'
import {PersonalRO} from 'src/features/P01Solicitud/subcomponents/P0102Solicitud01PersonalRO'
import {DeclaracionRO} from 'src/features/P01Solicitud/subcomponents/P0102Solicitud01DeclaracionRO'
import Propuesta from 'src/features/P01Solicitud/subcomponents/P01Solicitud02Propuesta'
import RecursosInSitu from 'src/features/P01Solicitud/subcomponents/P01Solicitud03RecursosINSITU'
import RecursosExSitu from 'src/features/P01Solicitud/subcomponents/P01Solicitud03RecursosEXSITU'
import AccesoConocimiento from 'src/features/P01Solicitud/subcomponents/P01Solicitud03AccesoConocimiento'
import Personal from 'src/features/P01Solicitud/subcomponents/P01Solicitud04Personal'
import Declaracion from 'src/features/P01Solicitud/subcomponents/P01Solicitud06Declaracion'
import GLOBALS from 'src/features/App/globals'

const API = {
  sliceName: 'p1',
  processTitle: 'Solicitud de Permiso de Investigación',
  sections: [
    {code:'SOLCTD', sectionTitle: 'Solicitante', f: (payload,mainFormValues,incrementCounter) => <Solicitante payload={payload} mainFormValues={mainFormValues} incrementCounter={incrementCounter} />, jsonSection:'Solicitante',},
    {code:'PROPUE', sectionTitle: 'Contexto y Alcance de la Investigación', f: (payload,mainFormValues,incrementCounter) => <Propuesta payload={payload} mainFormValues={mainFormValues} incrementCounter={incrementCounter} />, jsonSection:'Propuesta',},
    {code:'INSITU', sectionTitle: 'Recursos de la biodiversidad a ser investigados IN SITU', f: (payload,mainFormValues,incrementCounter) => <RecursosInSitu payload={payload} mainFormValues={mainFormValues} incrementCounter={incrementCounter} />, jsonSection:'Recursos',},
    {code:'EXSITU', sectionTitle: 'Recursos de la biodiversidad a ser investigados EX SITU', f: (payload,mainFormValues,incrementCounter) => <RecursosExSitu payload={payload} mainFormValues={mainFormValues} incrementCounter={incrementCounter} />, jsonSection:'Recursos',},

    {code:'ACCESO', sectionTitle: 'Acceso a conocimiento tradicional', f: (payload,mainFormValues,incrementCounter) => <AccesoConocimiento payload={payload} mainFormValues={mainFormValues} incrementCounter={incrementCounter} />, jsonSection:'Recursos',},

    {code:'PERSON', sectionTitle: 'Personal Científico Técnico', f: (payload,mainFormValues,incrementCounter) => <Personal payload={payload} mainFormValues={mainFormValues} incrementCounter={incrementCounter} />, jsonSection:'Personal',},
    {code:'DECLAR', sectionTitle: 'Declaración de veracidad de la información', f: (payload,mainFormValues,incrementCounter) => <Declaracion payload={payload} mainFormValues={mainFormValues} incrementCounter={incrementCounter} />, jsonSection:'Documentos',},
  ],
  sectionsRO: [
    {code:'SOLCTD', sectionTitle: 'Solicitante', f: (payload) => <SolicitanteRO payload={payload}/>, jsonSection:'Solicitante',},
    {code:'PROPUE', sectionTitle: 'Contexto y Alcance de la Investigación', f: (payload) => <PropuestaRO payload={payload} />, jsonSection:'Propuesta',},
    {code:'INSITU', sectionTitle: 'Recursos de la biodiversidad a ser investigados IN SITU', f: (payload,mainFormValues,incrementCounter) => <RecursosRO payload={payload} mainFormValues={mainFormValues} incrementCounter={incrementCounter} />, jsonSection:'Recursos',},
    {code:'EXSITU', sectionTitle: 'Recursos de la biodiversidad a ser investigados EX SITU', f: (payload,mainFormValues,incrementCounter) => <RecursosRO payload={payload} mainFormValues={mainFormValues} incrementCounter={incrementCounter} />, jsonSection:'Recursos',},

    {code:'ACCESO', sectionTitle: 'Acceso a conocimiento tradicional', f: (payload,mainFormValues,incrementCounter) => <AccesoConocimiento payload={payload} mainFormValues={mainFormValues} incrementCounter={incrementCounter} />, jsonSection:'Recursos',},

    {code:'PERSON', sectionTitle: 'Personal Científico Técnico', f: (payload,mainFormValues,incrementCounter) => <PersonalRO payload={payload} mainFormValues={mainFormValues} incrementCounter={incrementCounter} />, jsonSection:'Personal',},
    {code:'DECLAR', sectionTitle: 'Declaración de veracidad de la información', f: (payload,mainFormValues,incrementCounter) => <DeclaracionRO payload={payload} mainFormValues={mainFormValues} incrementCounter={incrementCounter} />, jsonSection:'Documentos',},
  ],
  searchEspecie: async(value, taxonRank, ranks) => {
    const field = ranks[taxonRank].field
    const option = ranks[taxonRank].option
    const body = {
      terminoBusqueda: `${value}`,
      taxonRankBusqueda: `${taxonRank}`,
      [field]: `${option}`
    }
    if(taxonRank === 'Kingdom') {
      body.kingdom = ranks['Kingdom'].option
    }

    const url    = `${GLOBALS.mainUrl}/v1/api/${ranks[taxonRank].method}`
    const res    = await fetch(url,{
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body:JSON.stringify(body)
    })
    return res.json()
  }
}

export default API
