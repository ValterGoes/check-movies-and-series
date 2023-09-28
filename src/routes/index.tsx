import { Routes, Route, Navigate} from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
import { useEffect } from 'react';
import { Movies } from '../pages/movie/Movies';
import { Home } from '../pages/home/Home';
import { Series } from '../pages';



export const AppRoutes = () => {
    const { setDrawerOptions } = useDrawerContext();

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
            <Route path="/" element={<Home />} />
            <Route path="/filmes" element={<Movies />} />
            <Route path="/series" element={<Series />} />

            {/* redireciona para a rota /Home caso o usuário digite uma rota inválida */}
            <Route path="*" element={<Navigate to="/"/>} />
        </Routes>
    );
};