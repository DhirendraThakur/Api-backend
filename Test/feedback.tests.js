// use the path of your model

//const Supplement = require('../models/supplementmodel')
const Feedback = require('../models/feedbackModel')
const mongoose= require('mongoose');
const url= 'mongodb://localhost:27017/fitness_management';

beforeAll(async() =>{

    await mongoose.connect(url, {
        useNewUrlParser : true,
        useCreateIndex : true});

});

afterAll(async() =>{
    await mongoose.connection.close();
});

describe('feedback Schema test anything', () => {

    // the code below is for insert testing
    it('Add feedback testing anything', () => {
        const feedback = {
        'feedbackdetail':'kong',
        'feedbackername':'king',
        
    
    };
    return Feedback.create(feedback)
    .then((pro_ret) =>{
        expect(pro_ret.feedbackername).toEqual('king');
});
});
// the code below is for delete testing

it('to test the update', async() =>{
    return Feedback.findOneAndUpdate({_id :Object('5d20c71c0da2982d681e4bf0')},
    {$set :{feedbackername:'king'}})
    .then((pp)=>{expect(pp.feedbackername).toEqual('hd')})
});
})
