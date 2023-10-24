import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { SeriesService } from '../../shared/services/api/series/SeriesService';
import { LayoutBaseDePagina } from '../../shared/layouts/LayoutBaseDePagina';
import { FerramentasDeDetalhe } from '../../shared/components';
import { VTextField } from '../../shared/forms/VTextField';


interface IFormData {
    id: number;
    imagem: string;
    titulo: string;
    diretor: string;
    ano: number;
    sinopse: string;
}

export const DetalheDaSerie: React.FC = () => {
    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();

    const formRef = useRef<FormHandles>(null);

    const [isLoading, setIsLoading] = useState(false);
    const [titulo, setTitulo] = useState('');

    useEffect(() => {
        if (id !== 'nova') {
            setIsLoading(true);

            SeriesService.getById(Number(id))
                .then((result) => {
                    setIsLoading(false);

                    if (result instanceof Error) {
                        alert(result.message || 'Erro ao buscar série');
                        navigate('/series');
                    }else{
                        setTitulo(result.titulo);
                        console.log('result', result);

                        formRef.current?.setData(result);
                    }
                });
        }
    }, [id]);
    

    const handleSave = (dados: IFormData) => {
        setIsLoading(true);

        if (id === 'nova') {
            SeriesService
                .create(dados)
                .then((result) => {
                    setIsLoading(false);

                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        // navigate('/series');
                        navigate(`/series/detalhe/${result}`);
                    }
                });
        } else {
            SeriesService
                .updateById(Number(id), dados)
                .then((result) => {
                    setIsLoading(false);

                    if (result instanceof Error) {
                        alert(result.message);
                    }
                });

        }
    };

    const handleDelete = (id: number) => {
        if (confirm('Realmente deseja Apagar?')) {
            SeriesService.deleteById(id)
                .then(result => {
                    if (result instanceof Error) {
                        alert(result.message || 'Erro ao apagar');
                    } else {
                        alert('Apagado com sucesso');
                        navigate('/series');
                    }
                });
        }
    };
    
    return (
        
        <LayoutBaseDePagina 
            titulo= {id === 'nova' ? 'Nova Série' : titulo}
            barraDeFerramentas= {
                <FerramentasDeDetalhe
                    textoBotaoNovo="Nova Série"
                    mostarBotaoSalvar
                    mostarBotaoVoltar
                    mostarBotaoNovo={id !== 'nova'}               
                    mostarBotaoApagar={id !== 'nova'}

                    aoClicarEmSalvar={() => formRef.current?.submitForm()}
                    aoClicarEmVoltar={() => navigate('/series')}
                    aoClicarEmNovo={() => navigate('/series/detalhe/nova')}
                    aoClicarEmApagar={() => handleDelete(Number(id))}
                />
            }
        >

            <Form ref={formRef} onSubmit={handleSave}>

                <Box margin={1} display="flex" flexDirection="column" component={Paper} variant="outlined">

                    <Grid container direction="column" padding={2} spacing={2}>

                        {isLoading && (
                            <Grid item>
                                <LinearProgress variant='indeterminate' />
                            </Grid>
                        )}

                        <Grid item>
                            <Typography variant='h4'>Séries</Typography>
                        </Grid> 
                        
                        <Grid container item direction="row" spacing={2}>
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                <VTextField 
                                    fullWidth
                                    name='titulo' 
                                    label='Título do Série' 
                                    disabled={isLoading}
                                    onChange={e => setTitulo(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Grid container item direction="row" spacing={2}>
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                <VTextField 
                                    fullWidth
                                    name='ano' 
                                    label='Ano de Lançamento' 
                                    disabled={isLoading}
                                />
                            </Grid>
                        </Grid>
                        <Grid container item direction="row" spacing={2}>
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                <VTextField 
                                    fullWidth
                                    name='diretor' 
                                    label='Diretor' 
                                    disabled={isLoading}
                                />
                            </Grid>
                        </Grid>
                        <Grid container item direction="row" spacing={2}>
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                <VTextField 
                                    fullWidth
                                    name='sinopse' 
                                    label='Sinopse' 
                                    disabled={isLoading}       
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
                               
                {/*adicionar campo para foto ou adicionar automaticamente ao adiconar o nome  */}

            </Form>      

        </LayoutBaseDePagina>
    );
};