
export const retornaChatRooms = (usuario) => {
    return async (dispatch) => {
        try {
            const resp = await fetchRoomsUsuario(usuario);
            const body = await resp.json();

            if (body.ok) {
                dispatch(cargaChatRoms(body.Registro));
            } else {
                Swal.fire("Error", "Error al cargar los chat-room", "error");
            }

        } catch (error) {
            console.log("error al retonar los chats-rooms", error)
        }
    }
}


export const fetchRoomsUsuario = (usuario, method = 'GET') => {
    const url = `https://testvuv.tech/ws/api/chat/room/list?idPerfilUsuario=${usuario}`  

        //envía body en formato json
        return fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            // body: JSON.stringify(data)
        })
}