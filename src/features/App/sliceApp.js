import { createSlice } from '@reduxjs/toolkit'
import {loginFormMsgs} from 'src/features/App/consts'
import {f} from 'src/commons/f'

import API from './API'

const state0 = {
  errorMsg:                null,
  nombre:                  '',
  showLoginForm:           true,
  provincias:              [],
  bosques:                 [],
  instituciones:           [],
  areasProtegidas:         [],
  orgs:                    [],
  org:                     {},
  funcionarios:            [],
  usuario:                 {},
  investigador:            false,
  crearPerfilInvestigador: false,
  perfilesUsuario:         [],
  perfilUsuario:           {},
  usuarioSenescyt:         {},
  instanciasTarea:         [],
  instanciaTarea:          {},
  instanciaProceso:        {},
  loadInstanciasTarea:     false,
  bandeja:                 '',
  permisoRelacionado:      {},
  bosquesProtectores:      [],
  laboratorios:            [],
  solicitudAsociada:       {},
  showSnackBar:            false,
  snackBarMessage:         {severity:'', message:''},
  solicitudesAprobadas:    [],
  solicitudAprobada:       {},
  solicitudesNoAprobadas:  [],
  solicitudNoAprobada:     {},
  instanciaProcesoRO:      {},
  atms:                    [],
  clpis:                   [],
  clpiContratos:           [],
  solicitudIdCreated:      '',
  anyPayload:              {},
  centrosDocumentacion:    [],
  recoleccionDeRecursos:   'in-ex-situ',
}

export const sliceApp = createSlice({
  name: API.sliceName,
  initialState: {...state0},
  reducers: {
    setClpis: (state, action) => {
      state.clpis = action.payload
    },
    setClpiContratos: (state, action) => {
      state.clpiContratos = action.payload
    },
    setFuncionarios: (state, action) => {
      state.funcionarios = action.payload
    },
    setProvincias: (state, action) => {
      state.provincias = action.payload
    },
    setBosques:(state, action) => {
      state.bosques = action.payload
    },
    setAreasProtegidas: (state, action) => {
      state.areasProtegidas = action.payload
    },
    setInstituciones: (state, action) => {
      state.instituciones = action.payload
    },
    setNombreProyecto: (state, action) => {
      state.nombreProyecto = action.payload
    },
    setShowLoginForm: (state, action) => {
      state.showLoginForm = action.payload
    },
    setErrorMsg: (state, action) => {
      state.errorMsg = action.payload
    },
    setOrgs: (state, action) => {
      state.orgs = action.payload
    },
    setOrg: (state, action) => {
      state.org = action.payload
    },
    setUsuario: (state, action) => {
      state.usuario = action.payload
      state.investigador = API.esInvestigador(action.payload)
    },
    setCrearPerfilInvestigador: (state, action) => {
      state.crearPerfilInvestigador = action.payload
    },
    setPerfilesUsuario: (state, action) => {
      state.perfilesUsuario = action.payload
      state.perfilUsuario = (action.payload.length > 0)?action.payload[0]:{}
    },
    setPerfilUsuario: (state, action) => {
      const perfilUsuario = action.payload
      const esInvestigador = perfilUsuario?.perfil?.codigoPerfil === 'INVESTIGAD'
      state.perfilUsuario = perfilUsuario
      state.investigador = esInvestigador
    },
    setUsuarioSenescyt: (state, action) => {
      state.usuarioSenescyt = action.payload.usuarioSenescyt
    },
    setInstanciasTarea: (state, action) => {
      state.instanciasTarea = action.payload
    },
    setInstanciaTarea: (state, action) => {
      state.instanciaTarea = action.payload
    },
    setLoadInstanciasTarea: (state, action) => {
      state.loadInstanciasTarea = action.payload
    },
    setInstanciaProceso: (state, action) => {
      state.instanciaProceso = action.payload
    },
    setBandeja:  (state, action) => {
      state.bandeja = action.payload
    },
    setPermisoRelacionado:  (state, action) => {
      state.permisoRelacionado = action.payload
    },
    setBosquesProtectores:  (state, action) => {
      state.bosquesProtectores = action.payload
    },
    setLaboratorios:   (state, action) => {
      state.laboratorios = action.payload
    },
    setSnackMessage: (state, action) => {
      const {payload} =  action
      state.snackBarMessage = payload
      state.showSnackBar = f.isValid(payload.message) && payload.message.trimStart().trimEnd() !== ''
    },
    setSolicitudesAprobadas: (state, action) => {
      state.solicitudesAprobadas = action.payload
    },
    setSolicitudAprobada: (state, action) => {
      state.solicitudAprobada = action.payload
    },
    setSolicitudesNoAprobadas: (state, action) => {
      state.solicitudesNoAprobadas = action.payload
    },
    setSolicitudNoAprobada: (state, action) => {
      state.solicitudNoAprobada = action.payload
    },
    setAtms: (state, action) => {
      state.atms = action.payload
    },
    setLastSolicitudIdCreated: (state, action) => {
      state.solicitudIdCreated = action.payload
    },
    setInstanciaProcesoRO: (state, action) => {
      state.instanciaProcesoRO = action.payload
    },
    setAnyPayload: (state, action) => {
      state.anyPayload = action.payload
    },
    setRecoleccionDeRecursos: (state, action) => {
      state.recoleccionDeRecursos = action.payload
    },
    setCentrosDocumentacion: (state, action) => {
      state.centrosDocumentacion = action.payload
    },
  }
})

export const {
  setShowLoginForm,
  setErrorMsg,
  setOrgs,
  setOrg,
  setInstituciones,
  setFuncionarios,
  setProvincias,
  setUsuario,
  setCrearPerfilInvestigador,
  setPerfilesUsuario,
  setPerfilUsuario,
  setUsuarioSenescyt,
  setInstanciasTarea,
  setInstanciaTarea,
  setInstanciaProceso,
  setLoadInstanciasTarea,
  setBandeja,
  setPermisoRelacionado,
  setBosquesProtectores,
  setLaboratorios,
  setSnackMessage,
  setSolicitudesAprobadas,
  setSolicitudAprobada,
  setSolicitudesNoAprobadas,
  setSolicitudNoAprobada,
  setAtms,
  setLastSolicitudIdCreated,
  setInstanciaProcesoRO,
  setBosques,
  setAreasProtegidas,
  setClpis,
  setClpiContratos,
  setAnyPayload,
  setRecoleccionDeRecursos,
  setCentrosDocumentacion,
} = sliceApp.actions

// THUNKS !!

export const fetchOrgs = () =>  {
  return (dispatch) => {
    return Promise.all([
      API.fetchOrgs()
    ]).then(([orgs]) => {
      dispatch(setOrgs(orgs?.map(it => ({id:it.id, nombre:it.nombreOrganizacion}))))
    }).catch((error) => {
      dispatch(setOrgs([]))
    })
  }
}

export const fetchProvincias = () => {
  return (dispatch) => {
    return Promise.all([
      API.fetchProvincias()
    ]).then(([provincias]) => {
      dispatch(setProvincias([...provincias.map(it => it.nombreProvincia), '']))
    }).catch((error) => {
      dispatch(setProvincias([]))
    })
  }
}

export const fetchBosques = (provincias) => {
  return (dispatch) => {
    return Promise.all([
      API.fetchBosques(provincias)
    ]).then(([bosques]) => {
      dispatch(setBosques([...bosques.map(it => ({nombre:it.nombreBosqueProtector, provincia:it?.provincia?.nombreProvincia})), '']))
    }).catch((error) => {
      console.log('. . . . error fetchBosques: ', error)
      dispatch(setBosques([]))
    })
  }
}

export const fetchFuncionarios = () => {
  return (dispatch) => {
    return Promise.all([
      API.fetchFuncionarios()
    ]).then(([funcionarios]) => {
      dispatch(setFuncionarios(funcionarios))
    }).catch((error) => {
      dispatch(setFuncionarios([]))
    })
  }
}

export const fetchAreasProtegidas = (provincias) => {
  return (dispatch) => {
    return Promise.all([
      API.fetchAreasProtegidas(provincias)
    ]).then(([areasProtegidas]) => {
      dispatch(setAreasProtegidas([...areasProtegidas.map(it => ({nombre:it.nombreAreaProtegida, provincia:it?.provincia?.nombreProvincia})), '']))
    }).catch((error) => {
      console.log('. . . . areasProtegidas fetchAreasProtegidas: ', error)
      dispatch(setAreasProtegidas([]))
    })
  }
}


export const testUsuario = (loginInfo) =>  {
  return (dispatch) => {
    dispatch(setErrorMsg(null))
    API.testUsuario(loginInfo.loginMail).then(
      (usuario) => {
        API.testPass(usuario.id, loginInfo.loginPass).then((resultado) => {
          const res = resultado.resultado
              if(res === true) {
                dispatch(setErrorMsg(null))
                dispatch(setUsuario(usuario))
                dispatch(setShowLoginForm(false))
                // if(API.esInvestigador(usuario) && perfiles.length === 0) {
                //   dispatch(setCrearPerfilInvestigador(true))
                // }
                return true
              } else {
                dispatch(setErrorMsg(loginFormMsgs.errorMsg1))
                dispatch(setUsuario({}))
                dispatch(setPerfilesUsuario([]))
                dispatch(setPerfilUsuario({}))
                return false
              }
          }
        ).then((loadPerfiles) => {
          if(loadPerfiles) {
            API.perfilesUsuario(usuario.id).then((perfiles) => {
              if( Object.prototype.toString.call(perfiles) === '[object Array]' && perfiles.length > 0) {
                dispatch(setPerfilesUsuario(perfiles))
                dispatch(setPerfilUsuario(perfiles[0]))
              } else {
                dispatch(setPerfilesUsuario([]))
                dispatch(setPerfilUsuario({}))
              }
            }).catch((error) => {
              dispatch(setPerfilesUsuario([]))
              dispatch(setPerfilUsuario({}))
            })
          }
        })
      }).catch((error) => {
        dispatch(setErrorMsg(loginFormMsgs.errorMsg2))
        dispatch(setUsuario({}))
        dispatch(setPerfilesUsuario([]))
        dispatch(setPerfilUsuario({}))
    })
  }
}

export const logout = () =>  {
  return (dispatch) => {
    dispatch(setErrorMsg(null))
    dispatch(setUsuario({}))
    dispatch(setPerfilesUsuario([]))
    dispatch(setPerfilUsuario({}))
    dispatch(setUsuarioSenescyt({}))
    dispatch(setShowLoginForm(false))
    dispatch(setInstanciaTarea({}))
    dispatch(setInstanciasTarea([]))
    dispatch(setInstanciaProceso({}))
    dispatch(setShowLoginForm(true))
    dispatch(setSolicitudAprobada({}))
    dispatch(setSolicitudesAprobadas([]))
    dispatch(setAtms([]))
  }
}

export const fetchUsuarioSenescyt = (usuario) => {
  return (dispatch) => {
    if (!usuario.correoUsuario)
      dispatch(setUsuarioSenescyt({}))
    else {
      API.fetchUsuarioSenescyt(usuario.correoUsuario)
        .then((usuarioSenescyt) => dispatch(setUsuarioSenescyt({usuarioSenescyt})))
        .catch(() => dispatch(setUsuarioSenescyt({})))
    }
  }
}

export const handleCreatePerfilInvestigador = (usuarioId) => {
  return (dispatch) => {
    dispatch(setCrearPerfilInvestigador(false))
    if(!!usuarioId) {
      API.createPerfilUsuario(usuarioId, API.perfilInvestigadorId)
        .then( ([perfilUsuario]) => {
          dispatch(setPerfilesUsuario([perfilUsuario]))
          dispatch(setPerfilUsuario(perfilUsuario))
        }).catch((error) => {
        dispatch(setErrorMsg('ERROR, no se pudo crear perfil de investigador'))
      })
    }
  }
}

export const handleCrearProceso = (
  idProceso,
  idPerfilUsuario,
  codigoPerfilUsuario,
  solicitudAprobada={},
  tipoInstanciaProceso=null,
  solicitudId=null) => {

  const json = f.isValid(solicitudAprobada.payloadSolicitud)?JSON.parse(solicitudAprobada.payloadSolicitud):{}
  // console.log('. . .NumeroSolicitud: ', solicitudAprobada.solicitudNumeroSolicitud)
  // console.log('. . . . . . Recursos: ', json['Recursos'])
  // console.log('. . . . .Solicitante: ', json['Solicitante'])
  // console.log('. . . . . .Propuesta: ', json['Propuesta'])
  // console.log('. . . . . . Personal: ', json['Personal'])
  // console.log('. . . . . Resolución: ', json['Resolucion'])
  // console.log('. . . . . . . Father: ', json['father'])
  //
  // console.log('< < < < < . . . . .  > > > > ',
  //   ({
  //   Recursos:        json['Recursos'],
  //   Solicitante:     json['Solicitante'],
  //   Propuesta:       json['Propuesta'],
  //   Personal:        json['Personal'],
  //   Resolucion:      json['Resolucion'],
  //   father:          json['father'] ?? {},
  // }))

  if(!f.isValid(idPerfilUsuario)) {
    return (dispatch) => {
      dispatch(setErrorMsg('ERROR, usuario no válido'))
    }
  } else {
    return (dispatch) => {

      API.crearInstanciaProceso(idProceso, idPerfilUsuario, codigoPerfilUsuario, tipoInstanciaProceso, solicitudAprobada.solicitudNumeroSolicitud, solicitudId)
        .then( (proceso) => {

          dispatch(setErrorMsg(''))
          return proceso
        })
        .then((proceso) => {
          dispatch(setLastSolicitudIdCreated(proceso?.solicitud?.numeroSolicitud))
          API.fetchInstanciaProceso(proceso.id).then(pr => {
            if(!f.isValid(solicitudId)) {
              Promise.all([
                API.asignarTareaPerfilUsuario(pr.instanciaTareaList[0].id, idPerfilUsuario),
                API.setPayload(pr.id,JSON.stringify(
                  f.isValid(solicitudAprobada.solicitudNumeroSolicitud)?
                    {
                      Solicitud:{
                        aprobadaIdentificador: solicitudAprobada.solicitudNumeroSolicitud,
                        solicitudAprobada: JSON.stringify({
                          Recursos:        json['Recursos'],
                          Solicitante:     json['Solicitante'],
                          Propuesta:       json['Propuesta'],
                          Personal:        json['Personal'],
                          Resolucion:      json['Resolucion'],
                          father:          json['father'] ?? {},
                        })
                      }
                    }:{}
                ))
              ]).then(([r1, r2]) => {
                API.fetchTareasPerfilUsuario(idPerfilUsuario).then((tareas) => {
                  dispatch(setInstanciasTarea(tareas))
                }).catch((error) => {
                  dispatch(setInstanciasTarea([]))
                })
              })
            } else {
              Promise.all([
                API.asignarTareaPerfilUsuario(pr.instanciaTareaList[0].id, idPerfilUsuario),
              ]).then(([r1]) => {
                API.fetchTareasPerfilUsuario(idPerfilUsuario).then((tareas) => {
                  dispatch(setInstanciasTarea(tareas))
                }).catch((error) => {
                  dispatch(setInstanciasTarea([]))
                })
              })
            }
          })
        })
        .catch((error) => {
          dispatch(setErrorMsg('ERROR, no se pudo crear proceso'))
        })
    }
  }
}

export const handleRefreshTareas = (idPerfilUsuario) => {
  if(!!!idPerfilUsuario) {
    return (dispatch) => {
      dispatch(setErrorMsg('ERROR, usuario no válido'))
    }
  } else {
    return (dispatch) => {
      API.fetchTareasPerfilUsuario(idPerfilUsuario).then((tareas) => {
        dispatch(setInstanciasTarea(tareas))
      }).catch((error) => {
        dispatch(setInstanciasTarea([]))
      })
    }
  }
}

export const handleFetchInstanciasTarea = (perfilUsuario, tarea) => {
  const perfilUsuarioId = perfilUsuario.id
  const codigoPerfil = perfilUsuario.perfil?.codigoPerfil
  if(codigoPerfil === "COORDSENES") {
    return (dispatch) => {
      API.fetchTareasPerfilAdministrador(perfilUsuarioId)
        .then((tareas) => {
          dispatch(setInstanciasTarea(tareas))
          dispatch(setLoadInstanciasTarea(false))
        }).catch((error) => {
        dispatch(setInstanciasTarea([]))
        dispatch(setLoadInstanciasTarea(false))
      })
    }
  } else {
    return (dispatch) => {
        API.fetchTareasPerfilUsuario(perfilUsuarioId)
          .then((tareas) => {
            dispatch(setInstanciasTarea(tareas))
            dispatch(setLoadInstanciasTarea(false))
          }).catch((error) => {
          dispatch(setInstanciasTarea([]))
          dispatch(setLoadInstanciasTarea(false))
        })

    }
  }
}

export const fetchInstanciaTarea = (idInstanciaTarea) => {
  return (dispatch) => {
    API.fetchInstanciaTarea(idInstanciaTarea)
      .then((tarea) => {
        dispatch(setInstanciaTarea(tarea))
      }).catch((error) => {
      dispatch(setInstanciaTarea({}))
      console.log('ERROR, fetching tarea, ', error)
    })
  }
}

export const fetchInstanciaTareaInstanciaProceso = (idInstanciaTarea) => {
  return (dispatch) => {
    API.fetchInstanciaTarea(idInstanciaTarea)
      .then((tarea) => {
        dispatch(setInstanciaTarea(tarea))
        API.fetchInstanciaProceso(tarea.idInstanciaProceso).then((proceso) => {
          dispatch(setInstanciaProceso(proceso))
        }).catch((error) => {
          dispatch(setInstanciaTarea({}))
          dispatch(setInstanciaProceso({}))
          console.log('ERROR, fetching proceso, ', error)
        })
      }).catch((error) => {
      dispatch(setInstanciaTarea({}))
      dispatch(setInstanciaProceso({}))
      console.log('ERROR, fetching tarea, ', error)
    })
  }
}

export const fetchInstanciaProcesoRO = (idInstanciaProceso) => {
  return (dispatch) => {
    API.fetchInstanciaProceso(idInstanciaProceso).then((proceso) => {
      dispatch(setInstanciaProcesoRO(proceso))
    }).catch((error) => {
      dispatch(setInstanciaProcesoRO({}))
      console.log('ERROR, fetching proceso, ', error)
    })
  }
}

export const fetchPermisoRelacionado = (numeroPermiso) => {
  return (dispatch) => {
    API.fetchPermisoRelacionado(numeroPermiso)
      .then((permiso) => {
        dispatch(setPermisoRelacionado(permiso))
      
      }).catch((error) => {
      dispatch(setPermisoRelacionado({}))
      console.log('ERROR, fetching permiso, ', error)
    })
  }
}

export const handleFetchInstanciaProceso = (idProceso) => {
  if(!!idProceso) {
    return (dispatch) => {
      API.fetchInstanciaProceso(idProceso).then((instanciaProceso) => {
        dispatch(setInstanciaProceso(instanciaProceso))
      }).catch((error) => {
        dispatch(setInstanciaProceso({}))
        dispatch(setErrorMsg(`ERROR, recuperar instancia de proceso (${idProceso})`))
      })
    }
  } else {
    return (dispatch) => {
      dispatch(setInstanciaProceso({}))
    }
  }
}

export const handleSaveSolicitud = (idInstanciaProceso, payload) => {
  return (dispatch) => {
    if(!!idInstanciaProceso && !!payload) {
      API.saveSolicitud(idInstanciaProceso, JSON.stringify(payload)).then(
        (resultado) => {
            API.fetchInstanciaProceso(idInstanciaProceso).then((instanciaProceso) => {
              dispatch(setInstanciaProceso(instanciaProceso))
              dispatch(setSnackMessage({message: 'Se guardó la información', severity: 'info'}))
            }).catch(
              (error) => {
                dispatch(setInstanciaProceso({}))
                dispatch(setErrorMsg({message: 'No se pudo recuoerar la instanciA del proceso', severity: 'error'}))
              })
        }).catch((error) => {
          dispatch(setErrorMsg({message: 'No se pudo guardar la información', severity: 'error'}))
      })
    }
  }
}

export const handCompletarTarea = (idInstanciaProceso, instanciaTarea, idPerfilUsuario, metadata) => {
  const idTarea=instanciaTarea.idTarea
  return (dispatch) => {
    if (!!idInstanciaProceso && !!idTarea) {
      API.completarTarea(idInstanciaProceso, idTarea, idPerfilUsuario, metadata)
        .then((resultado) => {
          dispatch(setSnackMessage({message: 'Se completó la tarea', severity: 'info'}))
          API.fetchTareasPerfilUsuario(idPerfilUsuario)
          .then((tareas) => {
            dispatch(setInstanciasTarea(tareas))
            dispatch(setLoadInstanciasTarea(false))
            dispatch(setInstanciaTarea({}))
            dispatch(setInstanciaProceso({}))
          }).catch((error) => {
            dispatch(setSnackMessage({message: 'Error al tratar de completó la tarea', severity: 'error'}))
          })
        })
    }
  }
}

export const handCompletarTareaAndSalir = (idInstanciaProceso, instanciaTarea, idPerfilUsuario, metadata) => {
  const idTarea = instanciaTarea.idTarea
  return (dispatch) => {
    if (!!idInstanciaProceso && !!idTarea) {
      API.completarTarea(idInstanciaProceso, idTarea, idPerfilUsuario, metadata)
        .then((resultado) => {
          dispatch(setSnackMessage({message: 'Se completó la tarea', severity: 'info'}))
          API.fetchTareasPerfilUsuario(idPerfilUsuario)
            .then((tareas) => {
              dispatch(setInstanciasTarea(tareas))
              //... saliendo
              dispatch(setLoadInstanciasTarea(false))
              dispatch(setInstanciaTarea({}))
              dispatch(setInstanciaProceso({}))
            })
            .catch((error) => {
              //... saliendo (debería?)
              dispatch(setLoadInstanciasTarea(false))
              dispatch(setInstanciaTarea({}))
              dispatch(setInstanciaProceso({}))
              dispatch(setSnackMessage({message: 'no se pudo recuperar tareas', severity: 'error'}))
            })
            .catch((error) => {
              //... saliendo (debería?)
              dispatch(setLoadInstanciasTarea(false))
              dispatch(setInstanciaTarea({}))
              dispatch(setInstanciaProceso({}))
              dispatch(setSnackMessage({message: 'ERROR, no se pudo completar tarea', severity: 'error'}))
            })
        })
    }
  }
}

export const handCompletarTareaCoordinador = (idInstanciaProceso, instanciaTarea, idPerfilUsuario, metadata) => {
  const idTarea = instanciaTarea.idTarea
  if (!!idInstanciaProceso && !!idTarea) {
    if(instanciaTarea.perfilUsuarioId !== null) {
      return (dispatch) => {
        API.completarTarea(idInstanciaProceso, idTarea, idPerfilUsuario, metadata)
          .then((resultado) => {
            API.fetchTareasPerfilAdministrador(idPerfilUsuario)
              .then((tareas) => {
                dispatch(setInstanciasTarea(tareas))
                dispatch(setLoadInstanciasTarea(false))
                dispatch(setInstanciaTarea({}))
                dispatch(setInstanciaProceso({}))
              }).catch((error) => {
              console.log('ERROR, cannot reload tareas del Administrador')
              dispatch(setInstanciaTarea({}))
              dispatch(setInstanciaProceso({}))
            })
          })
          // TODO: detectar si no se grabó
      }
    } else {
      return (dispatch) => {
        // API.asignarTareaPerfilUsuario(instanciaTarea.id, idPerfilUsuario).then(() =>
          API.completarTarea(idInstanciaProceso, idTarea, idPerfilUsuario, metadata)
            .then((resultado) => {
              API.fetchTareasPerfilAdministrador(idPerfilUsuario)
                .then((tareas) => {
                  dispatch(setInstanciasTarea(tareas))
                  dispatch(setLoadInstanciasTarea(false))
                  dispatch(setInstanciaTarea({}))
                  dispatch(setInstanciaProceso({}))
                }).catch((error) => {
                console.log('ERROR, cannot reload tareas del Administrador')
                dispatch(setInstanciaTarea({}))
                dispatch(setInstanciaProceso({}))
              })
            })
        // )
      }
    }
  }
}

export const handleSetBandeja = (origen) => {
  return (dispatch) => {
    dispatch(setBandeja(origen))
  }
}

export const handleClear = () => {
  return (dispatch) => {
    dispatch(setInstanciaTarea({}))
    dispatch(setInstanciaProceso({}))
    dispatch(setInstanciaProcesoRO({}))
  }
}

export const hadleFetchBosquesProtectores = () =>  {
  return (dispatch) => {
    API.fetchBosquesProtectores().then(resultado => dispatch(setBosquesProtectores(resultado?.map(it => it.itemCatalogo))))
  }
}

export const handleFetchLaboratoriosAcreditados = () =>  {
  return (dispatch) => {
    API.fetchLaboratoriosAcreaditados().then(resultado => dispatch(setLaboratorios(resultado?.map(it => it.itemCatalogo))))
  }
}

export const handleFetchSolicitudesAprobadas = (idPerfilUsuario) => {
  return (dispatch) => {
    API.fetchSolicitudesAprobadas(idPerfilUsuario).then(result => {
      dispatch(setSolicitudesAprobadas(result))
    }).catch(error => dispatch(setSolicitudesAprobadas([])))
  }
}

export const handleFetchSolicitudesNoAprobadas = (idPerfilUsuario) => {
  return (dispatch) => {
    Promise.all([
      API.fetchSolicitudesDenegadas(idPerfilUsuario),
      API.fetchSolicitudesRechazadas(idPerfilUsuario)
    ]).then(([denegadas, rechazadas]) => {
      dispatch(setSolicitudesNoAprobadas([...denegadas, ...rechazadas]))
    }).catch(error => dispatch(setSolicitudesNoAprobadas([])))
  }
}

export const clearAprobadas = () => {
  return (dispatch) => {
    dispatch(setSolicitudesNoAprobadas([]))
  }
}

export const clearNoAprobadas = () => {
  return (dispatch) => {
    dispatch(setSolicitudesAprobadas([]))
  }
}


export const handleSetSolicitudAprobada = (solicitud) => {
  return (dispatch) => {
    dispatch(setSolicitudAprobada(solicitud))
  }
}

export const handleSetAtms = (idPerfilusuario, idProceso) => {
  return (dispatch) => {
    API.fetchRecursos(idPerfilusuario,idProceso).then(
      (result) => {
        let mr = result.map(it =>({codigoSolicitud:it.solicitudNumeroSolicitud, ...JSON.parse(it.recursosSolicitud)})).filter(it => it.recursos.length > 0)
        mr.forEach(it => {
          it.muestras.forEach(it2 => {
            it2.cantidad = Number(it2.cantidadDeclarada)
            it2.cantidadDeclarada = 0
          })
        })
        dispatch(setAtms(mr))
      }
    )
  }
}

export const fetchInstituciones = () => {
  return (dispatch) => {
    Promise.all([
      API.fetchIes(),
      API.fetchIpi(),
      API.fetchIts()
    ]).then(([ies, ipi, its]) => {
      const result = [
        ...ies.map(it => it.nombreIes),
        ...ipi.map(it => it.nombreIpi),
        ...its.map(it => it.nombreIts)].sort((it1, it2) => it1 > it2 ? 1: -1)
      dispatch(setInstituciones(result))
    })
  }
}

export const fetchClpis = () => {
  return (dispatch) => {
    API.fetchCCLPI('CLPI').then(clpis => dispatch(setClpis(clpis)))
    API.fetchCCLPI('C').then(contratos => dispatch(setClpiContratos(contratos)))
  }
}

export const handelSetAnyPayload = (payload) => {
  return (dispatch) => {
    dispatch(setAnyPayload(payload))
  }
}

export const handleSetRecoleccionDeRecursos = (recoleccionDeRecursos) => {
  return (dispatch) => {
    dispatch(setRecoleccionDeRecursos(recoleccionDeRecursos))
  }
}

export const fetchSetCentrosDocumentacion = () => {
  return (dispatch) => {
    API.fetchCentrosDocumentacion().then((rslt) => {
      dispatch(setCentrosDocumentacion(rslt.map(it => ({id: it.id, itemCatalogo: it.itemCatalogo,}))))
    })
  }
}
