const express = require('express');
const router = express.Router();
const { getConnectionStatus } = require('./db');
const quoteModel = require('./schema')

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
module.exports = router;
