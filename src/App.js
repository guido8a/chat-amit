import React, {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {MyAppBar} from 'src/features/App'
import {Bandejas} from 'src/features/App/subcomponents/Bandejas'
import {Routes, Route} from 'react-router-dom'
import {P01Solicitud} from 'src/features/P01Solicitud'
import {P10ATM} from 'src/features/P10ATM'
import {P07DeclaracionMovilizacion} from 'src/features/P07PedidoMovilizacion'
import {P08PermisoImportacion} from 'src/features/P08PermisoImportacion'
import {P11PermisoExportacion} from 'src/features/P11PermisoExportacion'
import {TareasInvestigador} from 'src/features/App/subcomponents/TareasInvestigador'
import {P0102RO} from 'src/features/P01Solicitud/P0102RO'
import {fetchProvincias} from 'src/features/App/sliceApp'
import {useDispatch} from 'react-redux'
import {
  fetchBosques,
  fetchAreasProtegidas,
  fetchFuncionarios,
  fetchInstituciones,
  fetchClpis,
  fetchSetCentrosDocumentacion,
} from 'src/features/App/sliceApp'
import P10ATMRO from "src/features/P10ATM/P10ATMSolicitudRO";
import {P13Dictamen} from 'src/features/P13Dictamen'
import {P15Seguimiento} from 'src/features/P15SegumientoAutorizacion'
import {P09Holotipos} from "src/features/P09SalidaHolotipos"
import {P16CerrarAutorizacion} from "src/features/P16CerrarAutorizacion"
import {P17EvaluarCumplimiento} from "src/features/P17EvaluarCumplimiento"
import {Chat} from "src/features/chat/Chat"

const App = () => {
  const investigador = useSelector(state => state.app.investigador)
  const provincias =  useSelector(state => state.app.provincias)
  const dispatch = useDispatch()

  useEffect(() => {
      setTimeout(() => {
        dispatch(fetchProvincias())
        dispatch(fetchClpis())
      }, 3000)
  }, [])

  useEffect(() => {
    if(provincias.length > 0) {
      dispatch(fetchBosques(provincias))
      dispatch(fetchAreasProtegidas(provincias))
      dispatch(fetchFuncionarios())
      dispatch(fetchInstituciones())
      dispatch(fetchSetCentrosDocumentacion())
    }
  }, [provincias])

  return (
    <>
      <MyAppBar />
      <Routes>
        <Route path='/' element={investigador?<TareasInvestigador />:<Bandejas />} />
        <Route path='/solicitud' element={<P01Solicitud />} />
        <Route path='/atmro' element={<P10ATMRO />} />
        <Route path='/solicitudro' element={<P0102RO />} />
        <Route path='/pedidoMovilizacion' element={<P07DeclaracionMovilizacion />} />
        <Route path='/permisoImportacion' element={<P08PermisoImportacion />} />
        <Route path='/permisoExportacion' element={<P11PermisoExportacion />} />
        <Route path='/validarATM' element={<P10ATM />} />
        <Route path='/dictamen' element={<P13Dictamen />} />
        <Route path='/seguimiento' element={<P15Seguimiento />} />
        <Route path='/holotipos' element={<P09Holotipos />} />
        <Route path='/cerrarsolicitud' element={<P16CerrarAutorizacion />} />
        <Route path='/evaluar' element={<P17EvaluarCumplimiento />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='*' element={<Bandejas />} />
      </Routes>
    </>
  )
}

export default App
