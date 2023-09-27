import { createTheme } from '@mui/material';

export const DarkTheme = createTheme({
    palette: {
        primary: {
            main: '#696969',
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
            default: '#202124',
            paper: '#B0C4DE',
        },
    },
    
})