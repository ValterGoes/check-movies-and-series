import { Routes, Route, Navigate} from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
import { useEffect } from 'react';
import { Home } from '../pages/home/Home';
import { ListagemDeSeries} from '../pages/serie/ListagemDeSeries';
import { ListagemDeFilmes } from '../pages/filme/ListagemDeFilmes';



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
            <Route path="/filmes/detalhe/:id" element={<p>detalhe</p>} />
            <Route path="/series/detalhe/:id" element={<p>detalhe</p>} />

            {/* redireciona para a rota /Home caso o usuário digite uma rota inválida */}
            <Route path="*" element={<Navigate to="/"/>} />
        </Routes>
    );
};