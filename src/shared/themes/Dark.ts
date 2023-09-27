import { createTheme } from '@mui/material';

export const DarkTheme = createTheme({
    palette: {
        primary: {
            main: '#383838',
            dark: '#1b1b1b',
            light: '#484848',
            contrastText: '#ffffff',       
        },
        secondary: {
            main: '#f44336',
            dark: '#ba000d',
            light: '#ff7961',
            contrastText: '#ffffff',
        },
        text: {
            primary: '#ffffff',
            secondary: '#ffffff',
            disabled: '#ffffff',
        },
        background: {
            default: '#000000',
            paper: '#383838',
        },
    },
    
});