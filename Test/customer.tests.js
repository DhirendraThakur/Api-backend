// use the path of your model


const Customer = require('../models/customerModel');
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

describe('Customer Schema test anything', () => {

    // the code below is for insert testing
    it('Add Customer testing anything', () => {
        const customer = {
        'username':'johne',
        'password':'cena',
        'address': 'preunknown',
        'phone': '919191919'
    
    };
    return Customer.create(customer)
    .then((pro_ret) =>{
        expect(pro_ret.username).toEqual('john');
});
});
// the code below is for delete testing
it('to test the delete product is working or not', async() =>{

    const status= await Customer.deleteMany();
    expect(status.ok).toBe(1);
});
it('to test the update', async() =>{
    return Customer.findOneAndUpdate({_id :Object('5d20c71c0da2982d681e4bf0')},
    {$set :{username:'hd'}})
    .then((pp)=>{expect(pp.username).toEqual('hd')})
});
})
