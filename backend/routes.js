const express = require('express');
const router = express.Router();
const { getConnectionStatus } = require('./db');
const Quote = require('./schema');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { userInfo } = require('./userschema')

router.use(express.json());
router.use(cookieParser());
const secretKey = process.env.SECRET_KEY;

const authSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
});

const quoteSchema = Joi.object({
    ranking: Joi.number().required(),
    quote: Joi.string().required(),
    image: Joi.string(),
    author: Joi.string().required(),
    created_by: Joi.string().required()
});

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

router.get('/data', async (req, res) => {
    try {
        const data = await Quote.find({});
        res.status(200).json({ data });
    } catch (error) {
        console.log(error);
        res.status(500).send('error fetching data');
    }
});

router.get('/data/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const data = await Quote.findById(id);
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).send('error fetching data');
    }
});

router.post('/add', async (req, res) => {
    try {
        // Validate request body
        const { error } = quoteSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        console.log(req.body);
        const newData = await Quote.create(req.body);
        console.log(newData);
        res.send(newData);
    } catch (error) {
        console.error(error);
        res.send('Error');
    }
});

router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // Validate request body
        const { error } = quoteSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const updatedEntity = await Quote.findByIdAndUpdate({ _id: id }, req.body);
        res.json(updatedEntity);
    } catch (err) {
        console.error('Error updating entity:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    console.log("id is", id);
    try {
        const deletedEntity = await Quote.findByIdAndDelete(id);
        res.status(200).json(deletedEntity);
    } catch (err) {
        console.error('Error deleting entity:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/auth', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = {
            "username": username,
            "password": password
        };
        const SECRET_KEY = jwt.sign(user, process.env.SECRET_KEY);
        res.cookie('token', SECRET_KEY, { maxAge: 365 * 24 * 60 * 60 * 1000 });
        res.json({ "accessToken": SECRET_KEY });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        const newUser = await userInfo.create({
            username: username,
            password: password
        });
        res.status(201).json(newUser);
    } catch (err) {
        console.error('Error in user signup:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userInfo.findOne({ username: username, password: password });

        if (!user) {
            return res.status(401).json({ error: 'Invalid username / password' });
        }
        res.status(200).json({ user });

    } catch (err) {
        console.error('Error in user login:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
});

module.exports = router;