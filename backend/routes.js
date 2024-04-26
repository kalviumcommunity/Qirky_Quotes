const express = require('express');
const router = express.Router();
const { getConnectionStatus } = require('./db');
const quoteModel = require('./schema')
const mongoose = require('mongoose')

router.use(express.json());

router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

router.get('/', async (req, res, next) => {
    try {
        const finalStatus = await getConnectionStatus();
        res.send(finalStatus);
    } catch (error) {
        next(error);  
    }
});

router.get("/ping", (req, res) => {
    res.send('pong');
});

router.post("/post", (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

router.put('/put', async (req, res, next) => {
    try {
        let finalStatus = await getConnectionStatus();
        finalStatus = "hey DB";
        res.send(finalStatus);
    } catch (error) {
        next(error);  
    }
});

router.delete('/delete', async (req, res) => {
    res.send('Data deleted successfully');
});

router.get('/data',async(req,res)=>{
    try {
        const data = await quoteModel.find({})
        res.status(200).json({data})
    } catch (error) {
        console.log(error)
        res.status(500).send('error fetching data')
        
    }
})

router.get('/data/:id',async(req,res)=>{
    const {id} = req.params
    try {
        const data = await quoteModel.findById(id)
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        res.status(500).send('error fetching data')
        
    }
})
//changed
router.post('/add', async (req, res) => {
    try {
        console.log(req.body)
        const newData = await quoteModel.create(req.body);
        console.log(newData)
        res.send(newData);
    } catch (error) {
        console.error(error);
        res.send('Error');
    }

    
});
router.put('/update/:id', async (req, res) => {
    const {id} = req.params
    try {
        const updatedEntity = await quoteModel.findByIdAndUpdate({_id : id},req.body);
        res.json(updatedEntity);
    } catch (err) {
        console.error('Error updating entity:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/delete/:id', async (req, res) => {
    const {id} = req.params
    console.log("id is",id)
    try {
        await quoteModel.findByIdAndDelete(id);
        res.status(200).json("deleted")
    } catch (err) {
        console.error('Error deleting entity:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
