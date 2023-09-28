import { createTheme } from '@mui/material';

export const DarkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#383838',
            dark: '#1b1b1b',
            light: '#484848',
            contrastText: '#f0f2f2',       
        },
        secondary: {
            main: '#f44336',
            dark: '#ba000d',
            light: '#ff7961',
            contrastText: '#f0f2f2',
        },
        background: {
            default: '#000000',
            paper: '#383838',
        },
    },
    typography: {
        allVariants: {
            color: '#f0f2f2',
        },
    },
    
});