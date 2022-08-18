import GLOBALS from './globals'
import {f} from "../../commons"

const API = { sliceName: 'char' }

const api = API

API.fetchOrgs = async() => {
  const url    = `${GLOBALS.mainUrl}/api/v1/usuarios/getorgs`
  const res    = await fetch(url)
  return res.json()
}






// otros API's







export default API
