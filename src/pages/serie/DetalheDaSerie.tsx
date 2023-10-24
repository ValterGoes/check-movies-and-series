import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LinearProgress } from '@mui/material';
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
        setIsLoading(true);

        if (id !== 'nova') {
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
            {isLoading && <LinearProgress variant='indeterminate' />}

            <Form ref={formRef} onSubmit={handleSave}>

                <VTextField placeholder='Título do Série' name='titulo' />
                <VTextField placeholder='Ano de Lançamento' name='ano' />
                <VTextField placeholder='Diretor' name='diretor' />
                {/*adicionar campo para foto ou adicionar automaticamente ao adiconar o nome  */}
                <VTextField placeholder='Sinopse' name='sinopse' />

            </Form>      

        </LayoutBaseDePagina>
    );
};