const mongoose = require('mongoose');

// Schema for the Quote entity
const quoteSchema = new mongoose.Schema({
    ranking: {
        type: Number,
        required: true
    },
    quote: {
        type: String,
        required: true
    },
    image: String,
    author: {
        type: String,
        required: true
    },
    created_by: String
});

// Model based on the schema
const Quote = mongoose.model('Quote', quoteSchema);

module.exports = Quote;