import express from 'express';
import fs from 'fs'

const PORT = 8080;

const server = express();

server.use(express.json())



server.get('/tasks',(req,res)=>{
    
    const data = fs.readFileSync('db.json', 'utf-8');
    // Parse JSON data
    const tasks = JSON.parse(data);
    // Send the tasks as a JSON response
    res.json(tasks);
})

server.listen(PORT,()=>console.log("Server is running",PORT))