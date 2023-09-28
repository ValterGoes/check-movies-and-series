import { ReactNode } from 'react';
import { Icon, IconButton, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { useDrawerContext } from '../contexts';

interface ILayoutBaseDePaginaProps {
    children: React.ReactNode;
    titulo: string;
    barraDeFerramentas?: ReactNode;
}

export  const LayoutBaseDePagina: React.FC<ILayoutBaseDePaginaProps> = ({children, titulo, barraDeFerramentas}) => {
    // configura o breakpoint para o tamanho do dispositivo
    const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
    // configura o tema
    const theme = useTheme();
    // obtém a função de abrir/fechar o drawer
    const { toggleDrawerOpen } = useDrawerContext();


    return (
        <Box height="100%" display="flex" flexDirection="column" gap={1}>

            <Box display="flex" alignItems="center" padding={1} gap={5} height={theme.spacing(smDown ? 6 : mdDown ?  8 : 12)}  >

                {/* // se o dispositivo for menor que o breakpoint, exibe o botão de menu */}
                {smDown && (
                    <IconButton onClick={toggleDrawerOpen}>
                        <Icon>menu</Icon>
                    </IconButton>
                )}

                <Typography 
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    variant={smDown ? 'h5' : mdDown ? 'h4' : 'h3'}
                >
                    {titulo}
                </Typography>

            </Box>

            {barraDeFerramentas && (
                <Box>
                    {barraDeFerramentas}
                </Box>
            )}

            <Box flex={1} overflow="auto">
                {children}
            </Box>

        </Box>
    );
};