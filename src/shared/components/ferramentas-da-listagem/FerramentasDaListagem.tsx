import { Box, Button, Icon, Paper, TextField, Theme, useMediaQuery, useTheme } from '@mui/material';

import { Environment } from '../../environment';


interface IFerramentasDaListagemProps {
    textoDaBusca?: string;
    mostrarInputBusca?: boolean;
    aoMudarTextoDaBusca?: (novoTexto: string) => void;
    textoBotaoNovo?: string;
    mostrarBotaoNovo?: boolean;
    aoClicarEmNovo?: () => void;
}

export const FerramentasDaListagem: React.FC<IFerramentasDaListagemProps> = ({
    textoDaBusca,
    mostrarInputBusca,
    aoMudarTextoDaBusca,
    aoClicarEmNovo,
    textoBotaoNovo = 'Novo',
    mostrarBotaoNovo = true
}) => {
    
    const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down(425));
    const theme = useTheme();

    return (

        <Box 
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
                    style={{marginRight: 10}}
                    value={textoDaBusca}
                    onChange={(e) => aoMudarTextoDaBusca?.(e.target.value)}
                    placeholder={ Environment.INPUT_DE_BUSCA }
                />)
            }

            <Box flex={1} display="flex" justifyContent="end">

                { smDown && (
                    <Button
                        color="primary"
                        disableElevation
                        variant="contained"
                        onClick={aoClicarEmNovo}
                        endIcon={<Icon>add</Icon>}
                    >
                        {Environment.TEXTO_NOVO}
                    </Button>
                )}

                {mostrarBotaoNovo && !smDown && (
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