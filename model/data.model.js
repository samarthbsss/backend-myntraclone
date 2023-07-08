const mongoose= require('mongoose');

const dataSchema= mongoose.Schema({
    image:{
        type:String
    },
brand:{
        type:String
    },
    type:{
        type:String
    },
    price:{
        type:String
    },
    MP:{
        type:String
    },
    offer:{
        type:String
    },
    color:{
        type:String
    },

});

const data= mongoose.model('data', dataSchema);

module.exports=data;
