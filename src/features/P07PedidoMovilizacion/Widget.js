import React, {useEffect} from 'react'
import {Box} from "@mui/material";
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {f} from 'src/commons/f'
import {handleSetAtms} from 'src/features/App/sliceApp'
import {P07RealizarDeclaracion} from 'src/features/P07PedidoMovilizacion/P07RealizarDeclaracion'
// import API from 'src/features/App/API'

export const Widget = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const perfilUsuario = useSelector(state => state.app.perfilUsuario)
  const instanciaTarea = useSelector(state => state.app.instanciaTarea)
  const instanciaProceso = useSelector(state => state.app.instanciaProceso)
  const solicitud = instanciaProceso?.solicitud
  const solicitudesAprobadas = useSelector(state => state.app.solicitudesAprobadas)
  const atms = useSelector(state => state.app.atms)

  useEffect(() => {
    dispatch(handleSetAtms(perfilUsuario.id,55000005))
  },[perfilUsuario])

  useEffect(()=> {
    if(!f.isValid(instanciaTarea.id)) {navigate('/')}
  }, [instanciaTarea, navigate])

  useEffect(() => {window.scrollTo(0, 0)}, [])

  if(f.isValid(instanciaTarea.id) && f.isValid(instanciaProceso.id) ) {
    const formulario = {
      '55000004_Activity_RealizarDeclaracion':
        () => <P07RealizarDeclaracion instanciaTarea={instanciaTarea}
                                      instanciaProceso={instanciaProceso}
                                      solicitud={solicitud}
                                      perfilUsuario={perfilUsuario}
                                      solicitudesAprobadas={solicitudesAprobadas}
                                      atms={atms} />,
    }[instanciaTarea?.tareaCodigoTarea]
    if(f.isValid(formulario)) {
      return formulario()
    } else {
      return <Box sx={{m:'80px 0 0 0'}}>{`ERROR, EN FORMULARIO PARA TAREA ${instanciaTarea?.nombreTarea} .- (${instanciaTarea?.tareaCodigoTarea})`}</Box>
    }
  }
  else return (
    <Box sx={{m:'80px 0 0 0', height:'80px'}}>
      {'loading'}
    </Box>
  )
}
