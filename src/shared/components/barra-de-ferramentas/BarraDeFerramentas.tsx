import { Box, Button, Icon, TextField, useTheme, Paper } from '@mui/material';


interface IBarraDeFerramentasProps {
    textoDaBusca?: string;
    mostrarInputBusca?: boolean;
    aoMudarTextoDaBusca?: (novoTexto: string) => void;
    textoBotaoNovo?: string;
    mostrarBotaoNovo?: boolean;
    aoClicarEmNovo?: () => void;
}

export const BarraDeFerramentas: React.FC<IBarraDeFerramentasProps> = ({
    textoDaBusca,
    mostrarInputBusca,
    aoMudarTextoDaBusca,
    aoClicarEmNovo,
    textoBotaoNovo = 'Novo',
    mostrarBotaoNovo = true
}) => {
    
    const theme = useTheme();

    return (

        <Box 
        // mudar a cor do fundo
        
            component={Paper}
            marginX={1}
            paddingX={2}
            padding={1}
            display='flex'
            alignItems="center"
            height={theme.spacing(5)}  
        >
            
            {mostrarInputBusca && (
                <TextField 
                    size="small"
                    value={textoDaBusca}
                    onChange={(e) => aoMudarTextoDaBusca?.(e.target.value)}
                    placeholder="Pesquisar..."
                />)
            }

            <Box flex={1} display="flex" justifyContent="end">
                {mostrarBotaoNovo && (
                    <Button 
                        color="primary"
                        disableElevation
                        variant="contained"
                        onClick={aoClicarEmNovo}
                        endIcon={<Icon>add</Icon>}
                    >
                        {textoBotaoNovo}
                    </Button>
                )}
            </Box>

        </Box>
    );
};