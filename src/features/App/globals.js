import React from 'react'

// export const ENV = 'INSTITUCIONAL'
export const ENV = 'PRUEBAS'

export const NewGLOBALS = () => {
  if(ENV === 'PRUEBAS') {
    return {
      mainUrl : 'https://testvuv.tech/ws',
      investigadoresWS : 'https://testvuv.tech/iv/api/v1/vuv/investigador'
    }
  }
  if(ENV === 'INSTITUCIONAL') {
    return {
      mainUrl : 'http://96.126.118.233:8080/backend-0.0.1-SNAPSHOT-plain',
      investigadoresWS : 'http://68.183.19.195:8585/api/v1/vuv/investigador'
    }
  }
}

const GLOBALS = {
  mainUrl : NewGLOBALS().mainUrl,
  investigadoresWS : NewGLOBALS().investigadoresWS,
}

export default GLOBALS
