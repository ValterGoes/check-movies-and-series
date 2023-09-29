import { BarraDeFerramentas } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';



export const Home = () => {

    return (

        <LayoutBaseDePagina 
            titulo='Home' 
            barraDeFerramentas={(
                <BarraDeFerramentas  
                    mostrarInputBusca
                />
            )}
        >
            <h1>CheckList de filmes</h1>
        </LayoutBaseDePagina>

    );
};