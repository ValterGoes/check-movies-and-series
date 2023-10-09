import { useSearchParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';

import { FilmesService } from '../../shared/services/api/filmes/FilmesService';
import { FerramentasDaListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';



export const ListagemDeFilmes: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const busca = useMemo(() => {
        return searchParams.get('busca') ?? '';
    }, [searchParams]);


    useEffect(() => {
        
        FilmesService.getAll(1, busca)
            .then((result) => {
                if (result instanceof Error) {
                    alert(result.message || 'Erro ao buscar Filmes');
                }else{
                    console.log('result', result);
                }
            });

        console.log('busca', busca);

    }, [busca]);

    return (
        <LayoutBaseDePagina
            titulo="Filmes"
            barraDeFerramentas= {
                <FerramentasDaListagem
                    mostrarInputBusca
                    textoBotaoNovo='Novo Filme'
                    textoDaBusca={busca}
                    aoMudarTextoDaBusca={texto => setSearchParams({ busca: texto }, { replace: true })}
                />
            }
        >
        </LayoutBaseDePagina>
    );
};