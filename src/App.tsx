import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { AppThemeProvider } from './shared/contexts';

export const App = () => {
    return (
        <BrowserRouter>
            <AppThemeProvider>
                <AppRoutes />
            </AppThemeProvider>
        </BrowserRouter>
    );
};
