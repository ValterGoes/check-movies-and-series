import { Routes, Route, Navigate} from 'react-router-dom';

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<h1>Home</h1>} />

    {/* redireciona para a rota /Home caso o usuário digite uma rota inválida */}
            <Route path="*" element={<Navigate to="/Home"/>} />
        </Routes>
    );
}