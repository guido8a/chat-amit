import React from 'react'
import {useSelector} from 'react-redux'
import {P0102PayloadRO} from "./P0102PayloadRO";
import {f} from "../../commons";

export const P0102RO = () => {
  const instanciaProceso = useSelector(state => state.app.instanciaProcesoRO)
  const solicitud = {...instanciaProceso.solicitud}
  let payload = f.isValid(solicitud.payload)?JSON.parse(solicitud.payload):{}

  payload.solicitudId = solicitud?.id

  if(f.isValid(instanciaProceso.id))
    return <P0102PayloadRO payload={payload} />
  else
    return null
}
