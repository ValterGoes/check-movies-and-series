import { Button } from '@mui/material';
import { Routes, Route, Navigate} from 'react-router-dom';

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Button variant='contained' color='primary'>Home</Button>} />

    {/* redireciona para a rota /Home caso o usuário digite uma rota inválida */}
            <Route path="*" element={<Navigate to="/"/>} />
        </Routes>
    );
}