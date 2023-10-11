import { useSearchParams } from 'react-router-dom';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';

import { IListagemSeries, SeriesService } from '../../shared/services/api/series/SeriesService';
import { FerramentasDaListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { useDebounce } from '../../shared/hooks';


export const ListagemDeSeries: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { debounce} = useDebounce();

    const [rows, setRows] = useState<IListagemSeries[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isLoading, setIsLoading] = useState(true);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [totalCount, setTotalCount] = useState(0);

    const busca = useMemo(() => {
        return searchParams.get('busca') ?? '';
    }, [searchParams]);


    useEffect(() => {
        setIsLoading(true);

        debounce(() => {
            SeriesService.getAll(1, busca)
                .then((result) => {
                    setIsLoading(false);

                    if (result instanceof Error) {
                        alert(result.message || 'Erro ao buscar Filmes');
                    }else{
                        console.log('result', result);
                        
                        setTotalCount(result.totalCount);
                        setRows(result.data);
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
            {/* // Adicionar codigo que ao clicar no titulo abra a imagem e a sinopse */}
            <TableContainer component={ Paper }  sx={{m: 1, width: 'auto'}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Titulo</TableCell>
                            <TableCell>Ano</TableCell>
                            <TableCell>Diretor</TableCell>
                        </TableRow>
                    </TableHead> 

                    <TableBody>
                        {rows.map((row) => (
                            
                            <TableRow key={row.id}>
                                <TableCell>{row.titulo}</TableCell>
                                <TableCell>{row.ano}</TableCell>
                                <TableCell>{row.diretor}</TableCell>
                            </TableRow>
                            // <TableRow >
                            //     <TableCell>{row.imagem}</TableCell>
                            //     <TableCell sx={{textAlign: 'justify', width: '40rem'}}>{row.sinopse}</TableCell>
                            // </TableRow>
                            
                        ))}
                    </TableBody>                   
                </Table>
            </TableContainer>


        </LayoutBaseDePagina>
    );
};