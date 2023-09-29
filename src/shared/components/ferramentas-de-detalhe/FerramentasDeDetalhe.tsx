import { Box, Button, Divider, Icon, Paper, Skeleton, useTheme,  } from '@mui/material';


interface IFerramentasDeDetalheProps {
    textoBotaoNovo?: string;

    mostarBotaoNovo?: boolean;
    mostarBotaoVoltar?: boolean;
    mostarBotaoSalvar?: boolean;
    mostarBotaoApagar?: boolean;
    mostarBotaoSalvarVoltar?: boolean;

    mostrarBotaoNovoCarregando?: boolean;
    mostrarBotaoVoltarCarregando?: boolean;
    mostrarBotaoSalvarCarregando?: boolean;
    mostrarBotaoApagarCarregando?: boolean;
    mostrarBotaoSalvarVoltarCarregando?: boolean;
    
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

    mostrarBotaoNovoCarregando = false,
    mostrarBotaoVoltarCarregando = false,
    mostrarBotaoSalvarCarregando = false,
    mostrarBotaoApagarCarregando = false,
    mostrarBotaoSalvarVoltarCarregando = false,


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

            {(mostarBotaoSalvar && !mostrarBotaoSalvarCarregando) && (
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

            {mostrarBotaoSalvarCarregando && (<Skeleton width={115} height={65}/>)}

            {(mostarBotaoSalvarVoltar && !mostrarBotaoSalvarVoltarCarregando) && (
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

            {mostrarBotaoSalvarVoltarCarregando && (<Skeleton width={180} height={65}/>)}

            {(mostarBotaoApagar && !mostrarBotaoApagarCarregando) && (
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

            {mostrarBotaoApagarCarregando && (<Skeleton width={115} height={65}/>)}

            {(mostarBotaoNovo && !mostrarBotaoNovoCarregando) &&  (
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

            {mostrarBotaoNovoCarregando && (<Skeleton width={115} height={65}/>)}


            <Divider  variant='middle' orientation='vertical'/>

            {(mostarBotaoVoltar && !mostrarBotaoVoltarCarregando) && (
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

            {mostrarBotaoVoltarCarregando && (<Skeleton width={115} height={65}/>)}

        </Box>
    );
};