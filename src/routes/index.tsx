import { Button } from '@mui/material';
import { Routes, Route, Navigate} from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
import { useEffect } from 'react';



export const AppRoutes = () => {
    const {toggleDrawerOpen, setDrawerOptions} = useDrawerContext();

    useEffect (() => {
        setDrawerOptions([
            // links do menu lateral
            {label: 'Home', icon: 'home', path: '/'},
            {label: 'Filmes', icon: 'movie', path: '/filmes'},
            {label: 'Séries', icon: 'tv', path: '/series'},

        ]);
    }, []);

    return (
        <Routes>
            {/* rota home */}
            <Route path="/" element={<Button variant='contained' color='secondary' onClick={toggleDrawerOpen}>Menu</Button>} />
            <Route path="/filmes" element={<h1>Filmes</h1>} />
            <Route path="/series" element={<h1>Séries</h1>} />

            {/* redireciona para a rota /Home caso o usuário digite uma rota inválida */}
            <Route path="*" element={<Navigate to="/"/>} />
        </Routes>
    );
};