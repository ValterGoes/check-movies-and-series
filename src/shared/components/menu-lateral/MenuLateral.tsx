import { Avatar, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useDrawerContext } from '../../contexts';

interface IMenuLateralProps {
    children: React.ReactNode;
}

export const MenuLateral: React.FC<IMenuLateralProps> = ({ children }) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    // controla o estado do menu lateral
    const { isDrawerOpen, toggleDrawerOpen } = useDrawerContext();
 
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
                            <ListItemButton>
                                <ListItemIcon>
                                    <Icon>home</Icon>
                                </ListItemIcon>
                                <ListItemText primary='Página inicial' />
                            </ListItemButton>
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