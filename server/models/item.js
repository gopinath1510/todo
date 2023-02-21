const mongoose=require("mongoose")
const todoitem=new mongoose.Schema({
    item:{
        type:String,
        required:true
    },
    createdAt : {
        type:String
    }
})

module.exports=mongoose.model("newi",todoitem)