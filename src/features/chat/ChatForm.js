import { Alert, AlertTitle } from '@mui/material';
import { ChatController, MuiChat } from 'chat-ui-react';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { guardarChat, retornaChatsxRoom } from '../../acciones/chats';
import moment from 'moment';



export const ChatForm = (id) => {

  const dispatch = useDispatch();

  const [chatCtl] = React.useState(new ChatController());

  const handleClick = () => {
    console.log("click-->")
  }


  // React.useMemo(async () => {
  // Chat content is displayed using ChatController
  // await chatCtl.addMessage({

  // React.useEffect(() => {
  //   dispatch(retornaChatsxRoom(id));
  // }, [dispatch])

  const { chatRooms, room, chats } = useSelector(state => state.chat)
  const { uid } = useSelector(state => state.auth)


  chatCtl.clearMessages();
  // chats.map((chat) => (
  // chatCtl.addMessage({
  //antes
  chats.map((chat) => (
    chatCtl.addMessage({
      type: 'text',
      content: `${chat.texto || 'Buenos días'}`,
      self: false,
    })
  ))

  // React.useMemo(() => {
  //   chats.map((chat) => (
  //   chatCtl.addMessage({
  //     type: 'text',
  //     content: `${chat.texto}`,
  //     self: false,
  //   })
  // ))


  //   })))
  // }, [chats]);

  // const name = await chatCtl.setActionRequest({ type: 'text', always: true });
  const name = chatCtl.setActionRequest({ type: 'text', always: true, sendButtonText: 'Enviar', }, (response) => {
    // console.log(response.value);
    const valores = { roomid: uid, fecha: moment().minutes(0).seconds(0).toDate(), texto: response.value, estado: 'E' }
    dispatch(guardarChat(valores));
  });

  // const c = chatCtl.addOnMessagesChanged()

  // }, [chatCtl]);

  // Only one component used for display
  return (
    <div>
      <Alert severity="success">
        <AlertTitle><strong>Tarea:</strong> {room[0].nombre || ''} </AlertTitle>
      </Alert>
      <Alert severity='info' sx={{ display: 'flex' }}>
        <MuiChat chatController={chatCtl} />
      </Alert>

    </div>
  )
}
