import React, {useEffect, useState} from 'react'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Paper,
} from '@mui/material'
import Draggable from 'react-draggable'
import {useSelector} from "react-redux";
import {setLastSolicitudIdCreated} from "../features/App/sliceApp";
import {useDispatch} from "react-redux";

const PaperComponent = (props) => (
  <Draggable
    handle="#draggable-dialog-title"
    cancel={'[class*="MuiDialogContent-root"]'}>
    <Paper {...props} />
  </Draggable>
)

const modes = {
  OK_CANCEL_AFTEROK: 'OK_CANCEL_AFTEROK',
  OK_CANCEL: 'OK_CANCEL',
  AFTER_OK: 'AFTER_OK',
}

export const MyConfirm = ({dialogData, setDialogData}) => {
  const dispatch = useDispatch()
  const [mode, setMode] = useState(dialogData['mode'])
  const solicitudIdCreated = useSelector(state => state.app.solicitudIdCreated)

  useEffect(()=> {
    setMode(dialogData['mode'])
  }, [dialogData])

  const close = () => {
    setDialogData({...dialogData, openDialog: false})
    dispatch(setLastSolicitudIdCreated(''))
  }

  return (
      <Dialog open={dialogData['openDialog']}
              onClose={close}
              PaperComponent={PaperComponent}
              aria-labelledby="draggable-dialog-title">
              <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                {dialogData.title}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  {(mode === modes.OK_CANCEL_AFTEROK)?dialogData.message:`${dialogData.messsageAfterOk} ${solicitudIdCreated}`}
                </DialogContentText>
              </DialogContent>
              {
                (mode === modes.OK_CANCEL_AFTEROK)?
                  <DialogActions>
                    <Button autoFocus onClick={close}>
                      Cancelar
                    </Button>
                    <Button onClick={()=> {
                      if(mode !== modes.OK_CANCEL_AFTEROK) {
                        close()
                      } else {
                        dialogData.okAction()
                        setMode(modes.AFTER_OK)
                      }
                    }}>aceptar</Button>
                  </DialogActions>
                :(mode === modes.OK_CANCEL)?
                  <DialogActions>
                    <Button onClick={close}>aceptar</Button>
                  </DialogActions>:
                  <DialogActions>
                    <Button onClick={close}>aceptar</Button>
                  </DialogActions>
              }
      </Dialog>
  )
}
