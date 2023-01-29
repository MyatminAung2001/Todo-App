import { MongoClient, ObjectId } from 'mongodb';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

const mongo = new MongoClient('mongodb://localhost');
const db = mongo.db('todo');

app.get('/', async (req, res) => {
    res.send('Todo Api is running');
});

app.get('/tasks', async (req, res) => {
    const result = await db.collection('tasks').find().toArray();

    res.status(200).json(result);
})

app.post('/tasks', async (req, res) => {
    const { subject } = req.body;

    const result = await db.collection('tasks').insertOne({
        subject, done: false
    });

    const task = await db.collection("tasks").findOne({ 
        _id: ObjectId(result.insertedId)
    });

    res.status(201).json(task)
});

app.get('/tasks/:id', async (req, res) => {
    const { id } = req.params;

    const tasks = await db.collection('tasks').findOne({
        _id: ObjectId(id)
    })

    res.json(tasks[0]);
});

// Update
app.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { subject } = req.body; 

    const result = await db.collection("tasks").updateOne(
        { _id: ObjectId(id) },
        { $set: { subject } }
    )

    res.json(result)
}); 

app.put('/tasks/:id/toggle', async (req, res) => {
    const { id } = req.params;

    const task = await db.collection('tasks').findOne({ _id: ObjectId(id) });

    const done = task.done;

    const result = await db.collection('tasks').updateOne(
        { _id: ObjectId(id) },
        { $set: { done: !done }}
    );

    res.json(result);
})

app.delete('/tasks/:id', async (req, res) => { 
    const { id } = req.params;

    const result = await db.collection("tasks").deleteOne(  
        { _id: ObjectId(id) }
    )

    res.status(204).json(result);
});

app.delete('/tasks', async (req, res) => { 
    const result = await db.collection("tasks").deleteMany(
        { done: true }
    )

    res.status(206).json(result);
});

app.listen(4000 , () => { 
    console.log('Server running on port 4000'); 
});