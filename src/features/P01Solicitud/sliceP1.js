import { createSlice } from '@reduxjs/toolkit'
import {bpm} from 'src/features/P01Solicitud/bpm'

const EMPTY_PAYLOAD     = 'EMPTY_PAYLOAD'
const NOT_SAVED_PAYLOAD = 'NOT_SAVED_PAYLOAD'
const SAVED_PAYLOAD     = 'SAVED_PAYLOAD'

const state0 = {
  tareas: bpm,
  counter: 0,
  payload: {},
  payloadErrors: {},
  payloadStatus: EMPTY_PAYLOAD,
}

export const sliceP1 = createSlice({
  name: 'wf01',
  initialState: {...state0},
  reducers: {
    setPayload: (state, payload) => {
      state.payload = {...state.payload, ...payload}
      state.payloadStatus = NOT_SAVED_PAYLOAD
    },
    resetPayload: (state) => {

      state.payload = {}
      state.payloadStatus = EMPTY_PAYLOAD
    },
    incrementCounter: (state) => {
      state.counter = state.counter + 1
    },
    resetCounter: (state) => {
      state.counter = 0
    }
  }
})

export const {} = sliceP1.actions

// THUNKS !!
