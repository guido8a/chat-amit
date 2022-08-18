import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { esES } from '@mui/material/locale';
import { TablaChats } from './TablaChats';

const theme = createTheme(
    {
        palette: {
            primary: { main: '#1976d2' },
        },
    },
    esES,
);

export const Chat = () => {
    return (
        <div>
            <ThemeProvider theme={theme}>
                <TablaChats />
            </ThemeProvider>
        </div>
    )
}



