import { createTheme } from '@mui/material';

export const LightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#212121',
            dark: '#000000',
            light: '#484848',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#f44336',
            dark: '#ba000d',
            light: '#ff7961',
            contrastText: '#000000',
        },
        background: {
            default: '#ffffff',
            paper: '#5f5f5f',
        },
    },

});