import { useEffect } from 'react';
import { Routes, Route, Navigate} from 'react-router-dom';

import { Home } from '../pages/home/Home';
import { useDrawerContext } from '../shared/contexts';
import { ListagemDeSeries} from '../pages/serie/ListagemDeSeries';
import { ListagemDeFilmes } from '../pages/filme/ListagemDeFilmes';
import { DetalheDoFilme } from '../pages/filme/DetalheDoFilme';
import { DetalheDaSerie } from '../pages/serie/DetalheDaSerie';



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
            <Route path="/filmes" element={<ListagemDeFilmes />} />
            <Route path="/series" element={<ListagemDeSeries />} />
            <Route path="/filmes/detalhe/:id" element={<DetalheDoFilme/>} />
            <Route path="/series/detalhe/:id" element={<DetalheDaSerie/>} />

            {/* redireciona para a rota /Home caso o usuário digite uma rota inválida */}
            <Route path="*" element={<Navigate to="/"/>} />
        </Routes>
    );
};