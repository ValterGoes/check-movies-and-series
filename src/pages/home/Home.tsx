import { Typography } from '@mui/material';
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
            <Typography>
                <h1>CheckList de filmes</h1>
            </Typography>
        </LayoutBaseDePagina>

    );
};