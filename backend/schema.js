const mongoose = require('mongoose');

const quoteSchema = mongoose.Schema({
    ranking:Number,
    quote:String,
    image:String,
    author:String

})

const quoteModel = mongoose.model('quote',quoteSchema)
module.exports=quoteModel;