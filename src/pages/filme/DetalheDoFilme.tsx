import { useNavigate, useParams } from 'react-router-dom';
import { FerramentasDeDetalhe } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts/LayoutBaseDePagina';
import { FilmesService } from '../../shared/services/api/filmes/FilmesService';
import { useEffect, useState } from 'react';
import { LinearProgress } from '@mui/material';



export const DetalheDoFilme: React.FC = () => {
    const { id = 'novo' } = useParams<'id'>();
    const navigate = useNavigate();

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
                    }
                });
        }
    }, [id]);
    

    const handleSave = () => {
        alert('salvar');
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

                    aoClicarEmSalvar={handleSave}
                    aoClicarEmVoltar={() => navigate('/filmes')}
                    aoClicarEmNovo={() => navigate('/filmes/detalhe/novo')}
                    aoClicarEmApagar={() => handleDelete(Number(id))}
                />
            }
        >
            {isLoading && <LinearProgress variant='indeterminate' />}

            <p>Detalhe dos Filmes {id}</p>           

        </LayoutBaseDePagina>
    );
};