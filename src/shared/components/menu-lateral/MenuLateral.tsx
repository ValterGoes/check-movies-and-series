import { Avatar, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

interface IMenuLateralProps {
    children: React.ReactNode;
}

export const MenuLateral: React.FC<IMenuLateralProps> = ({ children }) => {
    const theme = useTheme();

    return (
        <>
            {/* // sidebar */}
            <Drawer variant='permanent'>
                {/* largura sidebar */}
                <Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column">
                    {/* Avatar */}
                    <Box width="100%" height={theme.spacing(20)} display="flex" alignItems="center" justifyContent='center'>
                        <Avatar alt='Remy Sharp' src='https://material-ui.com/static/images/avatar/1.jpg' sx={{ width: theme.spacing(15), height: theme.spacing(15)}} />
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
            
            {/* theme.spacing(28x4 = 112px) == sobrecarga usado em casos específicos */}
            <Box height="100vh" marginLeft={theme.spacing(29)}>
                {children}
            </Box>
        </>
        
    );
};