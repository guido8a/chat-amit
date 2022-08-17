import { configureStore } from '@reduxjs/toolkit'

import {sliceApp} from './sliceApp'
import {sliceP1} from 'src/features/P01Solicitud/sliceP1'

const store = configureStore(
  {
    reducer: {
      app: sliceApp.reducer,
      wf01: sliceP1.reducer
    }
  }
)

export default store
