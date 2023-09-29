import { createTheme } from '@mui/material';

export const LightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#f0f2f2',
            dark: '#a8a9a9',
            light: '#f3f4f4',
            contrastText: '#000000',
        },
        secondary: {
            main: '#f50057',
            dark: '#ab003c',
            light: '#f73378',
            contrastText: '#000000',
        },
        background: {
            default: '#f0f2f2',
            paper: '#383838',
        },
    },
    typography: {
        allVariants: {
            color: '#000000',
            fontWeight: 'bold',
        },
    },

});