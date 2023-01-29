import React, { useContext } from 'react';
import { Box, Toolbar, Typography, Button, AppBar, useTheme, IconButton } from '@mui/material';
import { LightMode as LightModeIcon, DarkMode as DarkModeIcon } from '@mui/icons-material';
import { blue } from '@mui/material/colors';

import { CountContext } from '../App';
import { ModeContext } from '../ThemeApp';

const Header = ({ clearHandler }) => {

    const count = useContext(CountContext);

    const changeMode = useContext(ModeContext);

    const theme = useTheme();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static' sx={{ bgcolor: blue[500]}}>
                <Toolbar>
                    <Typography
                        variant='h6'
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        Todo App ({count})
                    </Typography>

                    <Button onClick={changeMode}>
                        {theme.palette.mode === "dark" ? (
                            <IconButton>
                                <DarkModeIcon />
                            </IconButton>
                        ) : (
                            <IconButton>
                                <LightModeIcon />
                            </IconButton>
                        )}
                    </Button>

                    <Button color='inherit' onClick={clearHandler}>
                        Clear
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header