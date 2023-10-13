import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LinearProgress } from '@mui/material';

import { FerramentasDeDetalhe } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts/LayoutBaseDePagina';
import { SeriesService } from '../../shared/services/api/series/SeriesService';




export const DetalheDaSerie: React.FC = () => {
    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [titulo, setTitulo] = useState('');

    useEffect(() => {
        setIsLoading(true);

        if (id !== 'nova') {
            SeriesService.getById(Number(id))
                .then((result) => {
                    setIsLoading(false);

                    if (result instanceof Error) {
                        alert(result.message || 'Erro ao buscar filme');
                        navigate('/series');
                    }else{
                        setTitulo(result.titulo);
                        console.log('result', result);
                    }
                });
        }
    }, [id]);
    

    const handleSave = () => {
        alert('salvar');
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

                    aoClicarEmSalvar={handleSave}
                    aoClicarEmVoltar={() => navigate('/series')}
                    aoClicarEmNovo={() => navigate('/series/detalhe/nova')}
                    aoClicarEmApagar={() => handleDelete(Number(id))}
                />
            }
        >
            {isLoading && <LinearProgress variant='indeterminate' />}

            <p>Detalhe das Séries {id}</p>           

        </LayoutBaseDePagina>
    );
};