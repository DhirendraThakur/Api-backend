// use the path of your model

const Supplement = require('../models/supplementmodel')
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

describe('Supplement Schema test anything', () => {

    // the code below is for insert testing
    it('Add supplement testing anything', () => {
        const product = {
        'supplementname':'maybe',
        'supplementrate':'200',
        'supplementtype': 'pre'
    
    };
    return Supplement.create(product)
    .then((pro_ret) =>{
        expect(pro_ret.supplementname).toEqual('Nokia');
});
});
// the code below is for delete testing
it('to test the delete product is working or not', async() =>{

    const status= await Supplement.deleteMany();
    expect(status.ok).toBe(1);
});
it('to test the update', async() =>{
    return Supplement.findOneAndUpdate({_id :Object('5d20c71c0da2982d681e4bf0')},
    {$set :{supplementname:'hd'}})
    .then((pp)=>{expect(pp.supplementname).toEqual('hd')})
});
})
