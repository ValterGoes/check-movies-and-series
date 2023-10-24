import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Accordion, AccordionDetails, AccordionSummary, Grid, Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

import { FilmesService, IListagemFIlme } from '../../shared/services/api/filmes/FilmesService';
import { FerramentasDaListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { Environment } from '../../shared/environment';
import { useDebounce } from '../../shared/hooks';



export const ListagemDeFilmes: React.FC = () => {
    // pesquisa por nome do filme
    const [searchParams, setSearchParams] = useSearchParams();
    // hook de debounce
    const { debounce} = useDebounce();

    const navigate = useNavigate();
    // lista de filmes que será exibida na tela
    const [rows, setRows] = useState<IListagemFIlme[]>([]);
    // esatdo de carregamento da lista de filmes
    const [isLoading, setIsLoading] = useState(true);
    // total de filmes
    const [totalCount, setTotalCount] = useState(0);
    // busca por nome do filme
    const busca = useMemo(() => {
        return searchParams.get('busca') ?? '';
    }, [searchParams]);
    // paginação
    const pagina = useMemo(() => {
        return Number(searchParams.get('pagina') ?? '');
    }, [searchParams]);


    useEffect(() => {
        // carregando a lista de filmes
        setIsLoading(true);

        // carregando a lista de filmes
        debounce(() => {
            FilmesService.getAll(pagina, busca)
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

    const handleDelete = (id: number) => {
        if (confirm('Realmente deseja Apagar?')) {
            FilmesService.deleteById(id)
                .then(result => {
                    if (result instanceof Error) {
                        alert(result.message || 'Erro ao apagar');
                    } else {
                        setRows(rows.filter(row => row.id !== id));
                        alert('Apagado com sucesso');
                    }
                });
        }
    };
    

    return (

        <LayoutBaseDePagina
            titulo="Filmes"
            barraDeFerramentas= {
                <FerramentasDaListagem
                    mostrarInputBusca
                    textoDaBusca={busca}
                    textoBotaoNovo='Novo Filme'
                    aoClicarEmNovo={() => navigate('/filmes/detalhe/novo')}
                    aoMudarTextoDaBusca={texto => setSearchParams({ busca: texto, pagina: '1' }, { replace: true })}
                />
            }
        >
            {/* // tabela de filmes */}
            <TableContainer component={ Paper }  sx={{width: 'auto', margin: '.40rem'}}>
                            
                <Table>
                    <TableHead sx={{
                        display: 'flex',
                    }}>  
                        <TableCell > </TableCell>               
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
                                        <Grid item xs={12} sm={1}>
                                            <IconButton size='small' onClick={() => handleDelete(row.id)}> 
                                                <Icon>delete</Icon> 
                                            </IconButton>
                                            <IconButton size='small' onClick={() => navigate(`/filmes/detalhe/${row.id}`)}> 
                                                <Icon>edit</Icon>
                                            </IconButton>
                                        </Grid>
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