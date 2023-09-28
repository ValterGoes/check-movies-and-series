import { Icon, IconButton, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { useDrawerContext } from '../contexts';

interface ILayoutBaseDePaginaProps {
    children: React.ReactNode;
    titulo: string;
}

export  const LayoutBaseDePagina: React.FC<ILayoutBaseDePaginaProps> = ({children, titulo}) => {
    // configura o breakpoint para o tamanho do dispositivo
    const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    // configura o tema
    const theme = useTheme();
    // obtém a função de abrir/fechar o drawer
    const { toggleDrawerOpen } = useDrawerContext();


    return (
        <Box height="100%" display="flex" flexDirection="column" gap={1}>

            <Box display="flex" alignItems="center" height={theme.spacing(12)} padding={1} gap={5}>

                {/* // se o dispositivo for menor que o breakpoint, exibe o botão de menu */}
                {smDown && (
                    <IconButton onClick={toggleDrawerOpen}>
                        <Icon>menu</Icon>
                    </IconButton>
                )}

                <Typography variant={'h5'}>
                    {titulo}
                </Typography>
            </Box>

            <Box>
                Barra de ferramentas
            </Box>

            <Box>
                {children}
            </Box>

        </Box>
    );
};