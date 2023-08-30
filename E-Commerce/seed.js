const mongoose = require('mongoose');
const product = require('./modules/product');


mongoose.connect('mongodb+srv://ND2410:ND2410@cluster0.pvng7qa.mongodb.net/?retryWrites=true&w=majority')
    .then(()=>{console.log('DB connected')})
    .catch(err => console.log('err'));



const dummyproduct = [
    {
        name:'iphone 14',
        img:'https://images.unsplash.com/photo-1678652197831-2d180705cd2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aXBob25lJTIwMTR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
        price:150,
        desc:'aa to levu padse mota'
    },

    {
        name:'TV',
        img:'https://images.unsplash.com/photo-1509281373149-e957c6296406?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8VFZ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
        price:200,
        desc:'mane koi jova j nathi datu'
    },

    {
        name:'camera',
        img:'https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNhbWVyYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
        price:100,
        desc:'mare pan photo padvo cha mota'
    },

    {
        name:'drone',
        img:'https://images.unsplash.com/photo-1524143986875-3b098d78b363?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGRyb25lfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
        price:300,
        desc:'aa to hava ma ude cha bhai'
    },

    {
        name:'cat',
        img:'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2F0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
        price:80,
        desc:'aa bov khatar naak cha bhai'
    },

    {
        name:'laptop',
        img:'https://images.unsplash.com/photo-1602080858428-57174f9431cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
        price:130,
        desc:'mari pase cha pan mare navu lavu cha'
    },
];

async function seedDB() {
    
    await product.deleteMany({});
    await product.insertMany(dummyproduct);
    console.log('DB seeded');

}

seedDB();  





