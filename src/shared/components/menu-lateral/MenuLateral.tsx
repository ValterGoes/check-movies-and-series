import { Avatar, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useDrawerContext } from '../../contexts';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';

//faz a tipagem das opções do menu lateral
interface IListItemLinkProps {
    label: string;
    icon: string;
    to: string;
    onClick: (() => void) | undefined;
}

//cria o componente
const ListItemLink: React.FC<IListItemLinkProps> = ({ to, icon, label, onClick}) => {
    //navega para a rota
    const navigate = useNavigate();

    // pega o caminho da rota
    const resolvedPath = useResolvedPath(to);
    // verifica se o caminho da rota é o mesmo que o caminho atual da página
    const match = useMatch({path: resolvedPath.pathname, end: false});
    
    //função que executa ao clicar no link
    const handleClick = () => {
        navigate(to);
        //verifica se onClick existe, se sim, executa
        onClick?.();
    };


    return (
        // verifica se o link está selecionado
        <ListItemButton selected={ !!match } onClick={handleClick}>
            <ListItemIcon>
                <Icon>{icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={label} />
        </ListItemButton>

    );
};

//faz a tipagem das props do componente
interface IMenuLateralProps {
    children: React.ReactNode;
}


//cria o componente
export const MenuLateral: React.FC<IMenuLateralProps> = ({ children }) => {
    const theme = useTheme();
    //verifica se a largura da tela é menor que 600px
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    // controla o estado do menu lateral
    const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext();
 
    return (
        <>
            {/* // sidebar */}
            <Drawer open={ isDrawerOpen } variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
                {/* largura sidebar */}
                <Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column">
                    {/* Avatar */}
                    <Box width="100%" height={theme.spacing(20)} display="flex" alignItems="center" justifyContent='center'>
                        <Avatar alt='john Doo' src='/JohnDoo.jpg' sx={{ width: theme.spacing(15), height: theme.spacing(15)}} />
                    </Box>

                    <Divider />
                    
                    {/* menu */}
                    <Box flex={1}>
                        <List component='nav'>
                            {drawerOptions.map( drawerOption => (
                                <ListItemLink
                                    key={drawerOption.path}
                                    icon={drawerOption.icon}
                                    to={drawerOption.path}
                                    label={drawerOption.label}
                                    onClick={smDown ? toggleDrawerOpen : undefined}
                                />
                            ))}
                        </List>

                    </Box>

                </Box>
            </Drawer>
            
            {/* theme.spacing(28x4 = 112px) == sobrecarga usado em casos específicos/ smDown = se a largura for menor que 600px o marginLeft = 0 */}
            <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(29)}>
                {children}
            </Box>
        </>
        
    );
};