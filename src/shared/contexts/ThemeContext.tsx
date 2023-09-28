import { createContext, useCallback, useContext, useMemo, useState} from 'react';
import { ThemeProvider } from '@mui/material';
import { Box } from '@mui/system';
import { LightTheme, DarkTheme } from '../themes';

// faz a tipagem do contexto
interface IThemeContextData {
    themeName: 'light' | 'dark';
    toggleTheme(): void;
}

// faz a tipagem do provider
interface IAppThemeProviderProps {
    children: React.ReactNode;
}

// cria o contexto
const ThemeContext = createContext({} as IThemeContextData);

// cria o hook
export const useAppThemeContext = () => {
    return useContext(ThemeContext);

};

// cria o provider
export const AppThemeProvider: React.FC<IAppThemeProviderProps> = ({ children }) => {
    // controla o estado do tema
    const [themeName, setThemeName] = useState<'light' | 'dark'>('light');

    // função que alterna o tema
    const toggleTheme = useCallback(() => {	
        setThemeName(oldThemeName => oldThemeName === 'light' ? 'dark' : 'light');	 
    
    }, []);
    
    // define o tema
    const theme = useMemo(() => {
        if (themeName === 'light') return LightTheme;

        return DarkTheme;
    }, [themeName]);

    return (
        <ThemeContext.Provider value={{ themeName, toggleTheme}}>
            <ThemeProvider theme={theme}>
                <Box width="100vw" height="100vh" bgcolor={theme.palette.background.default}>
                    {children}
                </Box>
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};
