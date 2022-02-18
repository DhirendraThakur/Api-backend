// use the path of your model

const Product = require ('../models/productModel')
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

describe('Product  Schema test anything', () => {

    // the code below is for insert testing
    it('Add product testing anything', () => {
        const product = {
        'productname':'khai',
        'productprice':'211',
        'producttype': 'pre'
    
    };
    return Product.create(product)
    .then((pro_ret) =>{
        expect(pro_ret.productname).toEqual('khai');
});
});
// the code below is for delete testing
it('to test the delete product is working or not', async() =>{

    const status= await Product.deleteMany();
    expect(status.ok).toBe(1);
});
it('to test the update', async() =>{
    return Product.findOneAndUpdate({_id :Object('5d20c71c0da2982d681e4bf0')},
    {$set :{productname:'ram'}})
    .then((pp)=>{expect(pp.productname).toEqual('ram')})
});
})
