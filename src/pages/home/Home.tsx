import { FerramentasDeDetalhe } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';



export const Home = () => {

    return (

        <LayoutBaseDePagina 
            titulo='Home' 
            barraDeFerramentas={(
                <FerramentasDeDetalhe />
            )}
        >
            <h1>CheckList de filmes</h1>
        </LayoutBaseDePagina>

    );
};