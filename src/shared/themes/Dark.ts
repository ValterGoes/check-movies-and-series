import { createTheme } from '@mui/material';

export const DarkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#f0f2f2',
            dark: '#a8a9a9',
            light: '#f3f4f4',
            contrastText: '#000000',       
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
            fontWeight: 'bold',
        },
    },    
});