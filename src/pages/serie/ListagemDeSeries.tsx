import { useSearchParams } from 'react-router-dom';
import { Accordion, AccordionDetails, AccordionSummary, Grid, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';

import { IListagemSeries, SeriesService } from '../../shared/services/api/series/SeriesService';
import { FerramentasDaListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { useDebounce } from '../../shared/hooks';
import { Environment } from '../../shared/environment';
import { ExpandMore } from '@mui/icons-material';


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

    const pagina = useMemo(() => {
        return Number(searchParams.get('pagina') ?? '');
    }, [searchParams]);


    useEffect(() => {
        setIsLoading(true);

        debounce(() => {
            SeriesService.getAll(pagina, busca)
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

    }, [busca, pagina]);

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
            <TableContainer component={ Paper }  sx={{width: 'auto', margin: '.40rem'}}>
                            
                <Table>
                    <TableHead sx={{
                        display: 'flex',
                    }}>                 
                        <TableCell >Titulo</TableCell>
                        <TableCell >Ano</TableCell>
                        <TableCell >Diretor</TableCell>
                    </TableHead>

                    <TableBody>

                        {rows.map((row) => (

                            <Accordion key={row.id}>
                                <AccordionSummary
                                    expandIcon={<ExpandMore />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Grid container >
                                        <Grid item xs={12} sm={5}>
                                            <Typography>{row.titulo}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={2}>
                                            <Typography>{row.ano}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <Typography>{row.diretor}</Typography>
                                        </Grid>
                                    </Grid>
                                </AccordionSummary>
                                <AccordionDetails sx={{m: 3, display: 'flex'}}>
                                    <Typography>
                                        <img src={row.imagem} alt={row.titulo} width={150} height={200}/>
                                    </Typography>
                                    <Typography sx={{mx: 2, textAlign: 'justify', width: 'auto'}}>
                                        {row.sinopse}
                                    </Typography>
                                </AccordionDetails>
                                
                            </Accordion>

                        ))}
                    </TableBody> 

                    {totalCount === 0 && !isLoading &&( 
                        <caption>{Environment.LISTAGEM_VAZIA}</caption>
                    )}

                    {/* // footer com paginação da tabela */}
                    <TableFooter>
                        {isLoading && (
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <LinearProgress variant='indeterminate' />
                                </TableCell>
                            </TableRow>
                        )}

                        {(totalCount > 0 && totalCount > Environment.LIMITE_DE_FILMES_POR_PAGINA) && (
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <Pagination 
                                        page={ pagina || 1}
                                        count={Math.ceil(totalCount / Environment.LIMITE_DE_FILMES_POR_PAGINA)} 
                                        color='primary'
                                        onChange={(e, newPage) => setSearchParams({ busca, pagina: newPage.toString() }, { replace: true })}
                                    />
                                </TableCell>
                            </TableRow>
                        )}
                        
                    </TableFooter>
                                      
                </Table> 
            </TableContainer>
        </LayoutBaseDePagina>
    );
};