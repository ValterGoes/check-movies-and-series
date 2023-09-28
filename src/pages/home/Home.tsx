import { LayoutBaseDePagina } from '../../shared/layouts';



export const Home = () => {

    return (

        <LayoutBaseDePagina titulo='Home' barraDeFerramentas={<>Barra de Ferramentas</>}>
            <h1>CheckList de filmes</h1>
        </LayoutBaseDePagina>

    );
};