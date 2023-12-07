import { useEffect, useState } from 'react';
import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';

import { FilmesService } from '../../shared/services/api/filmes/FilmesService';
import { VTextField, VForm, useVForm, IVFormErrors } from '../../shared/forms';
import { FerramentasDeDetalhe } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';


interface IFormData {
    id?: number;
    ano: string;
    titulo: string;
    diretor: string;
    sinopse: string;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
    id: yup.number().positive(),
    ano: yup.string().required().min(4),
    titulo: yup.string().required().min(4),
    diretor: yup.string().required().min(4),
    sinopse: yup.string().required()
});

export const DetalheDoFilme: React.FC = () => {
    const { formRef, saveAndClose, isSaveAndClose } =  useVForm();
    const { id = 'novo' } = useParams<'id'>();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [titulo, setTitulo] = useState('');

    useEffect(() => {
        if (id !== 'novo') {
            setIsLoading(true);

            FilmesService.getById(Number(id))
                .then((result) => {
                    setIsLoading(false);

                    if (result instanceof Error) {
                        alert(result.message || 'Erro ao buscar filme');
                        navigate('/filmes');
                    }else{
                        setTitulo(result.titulo);
                        console.log('result', result);

                        formRef.current?.setData(result);
                    }
                });
        } else {
            formRef.current?.setData({
                titulo: '',
                ano: '',
                diretor: '',
                sinopse: ''
            });
        }
    }, [id]);
    

    const handleSave = (dados: IFormData) => {
        
        formValidationSchema.
            validate(dados, { abortEarly: false})
            .then((dadosValidados) => {
                setIsLoading(true);

                if (id === 'novo') {
                    FilmesService
                        .create(dadosValidados)
                        .then((result) => {
                            setIsLoading(false);

                            if (result instanceof Error) {
                                alert(result.message);
                            } else {
                                if (isSaveAndClose()) {
                                    navigate('/filmes');
                                } else {
                                    navigate(`/filmes/detalhe/${result}`);
                                }
                            }
                        });
                } else {
                    FilmesService
                        .updateById(Number(id), dadosValidados)
                        .then((result) => {
                            setIsLoading(false);

                            if (result instanceof Error) {
                                alert(result.message);
                            } else {
                                if (isSaveAndClose()) {
                                    navigate('/filmes');
                                }
                            }
                        });

                }
            })
            .catch((errors: yup.ValidationError) => {
                const validationErrors: IVFormErrors = {};

                errors.inner.forEach(error => {
                    if(!error.path) return;

                    validationErrors[error.path] = error.message;
                });

                formRef.current?.setErrors(validationErrors);

            });
    };

    const handleDelete = (id: number) => {
        if (confirm('Realmente deseja Apagar?')) {
            FilmesService.deleteById(id)
                .then(result => {
                    if (result instanceof Error) {
                        alert(result.message || 'Erro ao apagar');
                    } else {
                        alert('Apagado com sucesso');
                        navigate('/filmes');
                    }
                });
        }
    };
    
    return (
        
        <LayoutBaseDePagina 
            titulo= {id === 'novo' ? 'Novo Filme' : titulo}
            barraDeFerramentas= {
                <FerramentasDeDetalhe
                    textoBotaoNovo="Novo Filme"
                    mostarBotaoSalvar
                    mostarBotaoVoltar
                    mostarBotaoNovo={id !== 'novo'}               
                    mostarBotaoApagar={id !== 'novo'}

                    aoClicarEmSalvar={saveAndClose}
                    aoClicarEmVoltar={() => navigate('/filmes')}
                    aoClicarEmNovo={() => navigate('/filmes/detalhe/novo')}
                    aoClicarEmApagar={() => handleDelete(Number(id))}
                />
            }
        >

            <VForm ref={formRef} onSubmit={handleSave}>

                <Box margin={1} display="flex" flexDirection="column" component={Paper} variant="outlined">

                    <Grid container direction="column" padding={2} spacing={2}>

                        {isLoading && (
                            <Grid item>
                                <LinearProgress variant='indeterminate'/>
                            </Grid>
                        )}

                        <Grid item>
                            <Typography variant='h4'>Detalhes do filme</Typography>
                        </Grid>

                        <Grid container item direction="row" spacing={2}>
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                <VTextField 
                                    fullWidth
                                    name='titulo' 
                                    label='Título do Filme' 
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
                                    type='number'
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

            </VForm>     

        </LayoutBaseDePagina>
    );
};