import React, { useState, createContext, useEffect } from 'react';
import { Box, Divider } from '@mui/material';
import {  Route, Routes } from 'react-router-dom';

import TodoList from './components/todoList';
import NewText from './components/newText';
import Edit from './components/Edit';
import Header from './components/Header';

export const CountContext = createContext(0);

const App = () => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await fetch("http://localhost:4000/tasks");
            const tasks = await res.json();

            setItems(tasks);
        })()
    }, [])

    const add = (subject) => {
        (async () => {
            const res = await fetch("http://localhost:4000/tasks" , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ subject })
            });

            const task = await res.json();
            console.log(task);

            setItems([ task, ...items ]);
            console.log(items);
        })()
    };

    const deleteHandler = (id) => {
        setItems(items.filter((item) => item._id !== id));
        fetch(`http://localhost:4000/tasks/${id}`, {
            method: 'DELETE'
        })
    };

    const get = (id) => {
        return items.filter((item) => item._id === id)[0];
    };

    const update = (id, subject) => {
        setItems(items.map((item) => {
            if (item._id === id) item.subject = subject;
            return item;
        }));

        fetch(`http://localhost:4000/tasks/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({ subject })
        })
    };

    const toggleHandler = (id) => {
        fetch(`http://localhost:4000/tasks/${id}/toggle`, {
            method: 'PUT'
        });

        const result = items.map((item) => {
            if (item._id === id) {
                item.done = !item.done
            };
            return item
        });
        setItems(result);

    };

    const clearHandler = () => {
        setItems(items.filter(item => !item.done));
        fetch('http://localhost:4000/tasks', {
            method: "DELETE"
        })
    };

    return (
        <CountContext.Provider value={items.length}>
            <Box>
                <Header clearHandler={clearHandler} />
                
                <Routes>
                    <Route path='/' element={
                        <Box sx={{ mt: 4, px: { lg: '200px', md: '50px', sm: '10px' } }}>
                            <NewText add={add} />

                            <TodoList 
                                items={items.filter((item) => item.done)} 
                                deleteHandler={deleteHandler}
                                toggleHandler={toggleHandler}
                            />

                            <Divider/>

                            <TodoList 
                                items={items.filter((item) => !item.done)} 
                                deleteHandler={deleteHandler}
                                toggleHandler={toggleHandler}
                            />
                        </Box>    
                    }/>
                    <Route path='/edit/:id' element={<Edit get={get} update={update} />} />
                </Routes>
            </Box>
        </CountContext.Provider>
    )
};

export default App;