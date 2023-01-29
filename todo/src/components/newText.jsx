import React, { useRef } from 'react';
import { OutlinedInput, IconButton, InputAdornment } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const NewText = ({ add }) => {

    const input = useRef();

    const addHandler = (e) => {
        e.preventDefault();
        let subject = input.current.value;
        if (!subject) { 
            return false
        };
        add(subject);
        input.current.value = "";
        input.current.focus();
    };

    return (
        <form onSubmit={addHandler}>
            <OutlinedInput
                fullWidth
                placeholder='Enter Task'
                inputRef={input}
                sx={{  }}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton type='submit'>
                            <AddIcon />
                        </IconButton>
                    </InputAdornment>
                }
            />
        </form>
    )
};

export default NewText;