import { Box, Button, Divider, Icon, Paper, useTheme,  } from '@mui/material';


interface IFerramentasDeDetalheProps {
    textoBotaoNovo?: string;

    mostarBotaoNovo?: boolean;
    mostarBotaoVoltar?: boolean;
    mostarBotaoSalvar?: boolean;
    mostarBotaoApagar?: boolean;
    mostarBotaoSalvarVoltar?: boolean;

    aoClicarEmNovo?: () => void;
    aoClicarEmVoltar?: () => void;
    aoClicarEmSalvar?: () => void;
    aoClicarEmApagar?: () => void;
    aoClicarEmSalvarVoltar?: () => void;
}

export const FerramentasDeDetalhe: React.FC<IFerramentasDeDetalheProps> = ({
    textoBotaoNovo = 'Novo',

    mostarBotaoNovo = true,
    mostarBotaoVoltar = true,
    mostarBotaoSalvar = true,
    mostarBotaoApagar = true,
    mostarBotaoSalvarVoltar = false,

    aoClicarEmNovo,
    aoClicarEmVoltar,
    aoClicarEmSalvar,
    aoClicarEmApagar,
    aoClicarEmSalvarVoltar,

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
            gap={1}
            alignItems="center"
            height={theme.spacing(5)}  
        >

            {mostarBotaoSalvar && (
                <Button
                    color="primary"
                    disableElevation
                    variant="contained"
                    onClick={aoClicarEmSalvar}
                    startIcon={<Icon>save</Icon>}
                >
               Salvar
                </Button>
            )}

            {mostarBotaoSalvarVoltar && (
                <Button
                    color="primary"
                    disableElevation
                    variant="outlined"
                    onClick={aoClicarEmSalvarVoltar}
                    startIcon={<Icon>save</Icon>}
                >
                  Salvar e Voltar
                </Button>
            )}

            {mostarBotaoApagar && (
                <Button
                    color="primary"
                    disableElevation
                    variant="outlined"
                    onClick={aoClicarEmApagar}
                    startIcon={<Icon>delete</Icon>}
                >
                    Apagar
                </Button>
            )}

            {mostarBotaoNovo && (
                <Button
                    color="primary"
                    disableElevation
                    variant="outlined"
                    onClick={aoClicarEmNovo}
                    startIcon={<Icon>add</Icon>}
                >
                    {textoBotaoNovo}
                </Button>
            )}


            <Divider  variant='middle' orientation='vertical'/>

            {mostarBotaoVoltar && (
                <Button
                    color="primary"
                    disableElevation
                    variant="outlined"
                    onClick={aoClicarEmVoltar}
                    startIcon={<Icon>arrow_back</Icon>}
                >
                    Voltar
                </Button>
            )}

        </Box>
    );
};