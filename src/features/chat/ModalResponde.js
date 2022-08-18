import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { cerrarModalResponde } from '../../acciones/chats';
import { RoomCreate } from './RoomCreate';
import { UsuarioList } from './UsuarioList';
import CancelIcon from '@mui/icons-material/Cancel';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export const ModalResponde = (estado) => {

    const dispatch = useDispatch()

    const { modalRespOpen } = useSelector(state => state.chat)
  
    const handleClose = () => {
        dispatch(cerrarModalResponde());
    };

    return (
        <div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={modalRespOpen}
                maxWidth={'xs'}
                fullWidth
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {'Selecciona quien responde'}
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <UsuarioList />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus
                        onClick={handleClose} variant="contained" color="primary"
                        startIcon={<CancelIcon />}>
                        Cerrar
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}
