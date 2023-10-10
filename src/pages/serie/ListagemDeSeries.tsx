import { useSearchParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';

import { FerramentasDaListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { SeriesService } from '../../shared/services/api/series/SeriesService';
import { useDebounce } from '../../shared/hooks';



export const ListagemDeSeries: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { debounce} = useDebounce(3000);

    const busca = useMemo(() => {
        return searchParams.get('busca') ?? '';
    }, [searchParams]);


    useEffect(() => {
        
        debounce(() => {
            SeriesService.getAll(1, busca)
                .then((result) => {
                    if (result instanceof Error) {
                        alert(result.message || 'Erro ao buscar Séries');
                    }else{
                        console.log('result', result);
                    }
                });
        });

        console.log('busca', busca);

    }, [busca]);

    return (
        <LayoutBaseDePagina
            titulo="Séries"
            barraDeFerramentas= {
                <FerramentasDaListagem
                    mostrarInputBusca
                    textoBotaoNovo='Nova Série'
                    textoDaBusca={busca}
                    aoMudarTextoDaBusca={texto => setSearchParams({ busca: texto }, { replace: true })}
                />
            }
        >
        </LayoutBaseDePagina>
    );
};