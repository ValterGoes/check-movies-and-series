import { Box, Button, Icon, Paper, Skeleton,  Theme,  useMediaQuery,  useTheme } from '@mui/material';


interface IFerramentasDeDetalheProps {
    textoBotaoNovo?: string;

    mostarBotaoNovo?: boolean;
    mostarBotaoVoltar?: boolean;
    mostarBotaoSalvar?: boolean;
    mostarBotaoApagar?: boolean;
    // mostarBotaoSalvarVoltar?: boolean;

    mostrarBotaoNovoCarregando?: boolean;
    mostrarBotaoVoltarCarregando?: boolean;
    mostrarBotaoSalvarCarregando?: boolean;
    mostrarBotaoApagarCarregando?: boolean;
    // mostrarBotaoSalvarVoltarCarregando?: boolean;
    
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
    // mostarBotaoSalvarVoltar = true,

    mostrarBotaoNovoCarregando = false,
    mostrarBotaoVoltarCarregando = false,
    mostrarBotaoSalvarCarregando = false,
    mostrarBotaoApagarCarregando = false,
    // mostrarBotaoSalvarVoltarCarregando = false,


    aoClicarEmNovo,
    aoClicarEmVoltar,
    aoClicarEmSalvar,
    aoClicarEmApagar,
    // aoClicarEmSalvarVoltar,

}) => {
    // configura o breakpoint para o tamanho do dispositivo
    const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    // const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
    // configura o tema
    const theme = useTheme();


    return (
        
        
        <Box 
            // condicionar caso tema seja claro usar component Paper ou caso seja escuro usar default
            component={ Paper }
            marginX={1}
            paddingX={2}
            padding={1}
            display='flex'
            gap={1}
            alignItems="revert"
            justifyContent="flex-end"
            height={theme.spacing(5)} 
            
        >

            
            {/* // botão salvar */}
            {smDown && (
                <Button
                    color="primary"
                    disableElevation
                    variant="contained"
                    onClick={aoClicarEmSalvar}
                    fullWidth
                ><Icon>save</Icon></Button>
            )}

            {(mostarBotaoSalvar && !mostrarBotaoSalvarCarregando && !smDown) && (
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

            {/* {mostarBotaoSalvarVoltar && !mostrarBotaoSalvarVoltarCarregando && (
                <Button
                    color="primary"
                    disableElevation
                    variant="outlined"
                    onClick={aoClicarEmSalvarVoltar}
                    startIcon={<Icon>save</Icon>}
                >
                    <Typography variant="button" whiteSpace={'nowrap'}>
                        Salvar e Voltar
                    </Typography>
                </Button>
            )}

            {(mostrarBotaoSalvarVoltarCarregando && !smDown && !mdDown) && (<Skeleton width={180} height={65}/>)} */}


            {/* // botão apagar */}
            {smDown && (
                <Button
                    color="primary"
                    disableElevation
                    variant="contained"
                    onClick={aoClicarEmApagar}
                    fullWidth
                >
                    <Icon>delete</Icon>
                </Button>
            )}

            {(mostarBotaoApagar && !mostrarBotaoApagarCarregando && !smDown) && (
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


            {/* // botão novo */}
            {smDown && (
                <Button
                    color="primary"
                    disableElevation
                    variant="contained"
                    onClick={aoClicarEmNovo}
                    fullWidth
                >
                    <Icon>add</Icon>
                </Button>
            )}

            {(mostarBotaoNovo && !mostrarBotaoNovoCarregando && !smDown) && (
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


            {/* // botão voltar */}
            {smDown && (
                <Button
                    color="primary"
                    disableElevation
                    variant="contained"
                    onClick={aoClicarEmVoltar}
                    fullWidth
                >
                    <Icon>arrow_back</Icon>
                </Button>
            )}

            {(mostarBotaoVoltar && !mostrarBotaoVoltarCarregando && !smDown) && (
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