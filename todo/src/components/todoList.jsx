import React from 'react';
import { Box, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Delete as DeleteIcon, Check as CheckIcon, Undo as UndoIcon, Edit as EditIcon } from '@mui/icons-material';
import { red, green, grey } from '@mui/material/colors';
import { Link } from 'react-router-dom';

const TodoList = ({ items, toggleHandler, deleteHandler }) => {
    return (
        <Box>
            {items.map((item) => (
                <List key={item._id}>
                    <ListItem>
                        <IconButton onClick={() => toggleHandler(item._id)}>
                            {item.done ? <UndoIcon  /> : <CheckIcon sx={{ color: green[500] }} />}
                        </IconButton>
                        <ListItemText sx={{ 
                            ml: 2, color: item.done ? 'text.fade' : 'text.light'
                        }}>
                            {item.subject} 
                        </ListItemText>
                        <Link to={`/edit/${item._id}`}>
                            <IconButton>
                                <EditIcon sx={{ color: grey[500] }} />
                            </IconButton>
                        </Link>
                        <IconButton onClick={() => deleteHandler(item._id)}>
                            <DeleteIcon sx={{ color: red[500] }} />
                        </IconButton>
                    </ListItem>
                </List>
            ))}
        </Box>
    )
};

export default TodoList;