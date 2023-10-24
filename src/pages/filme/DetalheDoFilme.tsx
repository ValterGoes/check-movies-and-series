import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LinearProgress } from '@mui/material';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { FilmesService } from '../../shared/services/api/filmes/FilmesService';
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

export const DetalheDoFilme: React.FC = () => {
    const { id = 'novo' } = useParams<'id'>();
    const navigate = useNavigate();

    const formRef = useRef<FormHandles>(null);

    const [isLoading, setIsLoading] = useState(false);
    const [titulo, setTitulo] = useState('');

    useEffect(() => {
        setIsLoading(true);

        if (id !== 'novo') {
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
        }
    }, [id]);
    

    const handleSave = (dados: IFormData) => {
        setIsLoading(true);

        if (id === 'novo') {
            FilmesService
                .create(dados)
                .then((result) => {
                    setIsLoading(false);

                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        // navigate('/filmes');
                        navigate(`/filmes/detalhe/${result}`);
                    }
                });
        } else {
            FilmesService
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

                    aoClicarEmSalvar={() => formRef.current?.submitForm()}
                    aoClicarEmVoltar={() => navigate('/filmes')}
                    aoClicarEmNovo={() => navigate('/filmes/detalhe/novo')}
                    aoClicarEmApagar={() => handleDelete(Number(id))}
                />
            }
        >
            {isLoading && <LinearProgress variant='indeterminate' />}

            <Form ref={formRef} onSubmit={handleSave}>

                <VTextField placeholder='Título do Filme' name='titulo' />
                <VTextField placeholder='Ano de Lançamento' name='ano' />
                <VTextField placeholder='Diretor' name='diretor' />
                {/*adicionar campo para foto ou adicionar automaticamente ao adiconar o nome  */}
                <VTextField placeholder='Sinopse' name='sinopse' />

            </Form>     

        </LayoutBaseDePagina>
    );
};