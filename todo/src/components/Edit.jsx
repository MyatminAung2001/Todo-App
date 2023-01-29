import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, OutlinedInput, Box, IconButton, InputAdornment } from '@mui/material';
import { ArrowBack as ArrowBackIcon, Save as SaveIcon } from '@mui/icons-material';
import { green } from '@mui/material/colors';

const Edit = ({ get, update }) => {

    const { id } = useParams(); 

    const navigate = useNavigate(); 

    const [subject, setSubject] = useState("");

    useEffect(() => {
        (async() => {
            const res = await fetch(`http://localhost:4000/tasks/${id}`);
            const task = await res.json();

            setSubject(task.subject);
        })();
    }, [id, get]);

    const updateHandler = (e) => {
        e.preventDefault();
        update(id, subject);
        navigate('/');
    }

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Box sx={{ mx: 2 }}>
                <IconButton onClick={() => navigate('/')}>
                    <ArrowBackIcon />
                </IconButton>
            </Box>

            <form onSubmit={updateHandler}>
                <OutlinedInput
                    value={subject}
                    onChange={(e) => {
                        setSubject(e.target.value);
                    }}
                    fullWidth
                    color="error"
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton type="submit">
                                <SaveIcon sx={{ color: green[500] }} />
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </form>
        </Container>
    )
};

export default Edit